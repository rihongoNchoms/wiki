package com.koreaap.sys.security.userDetails;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;

/**
 * 
 * 로그인 암호화
 * 기본적으로 Spring Security의 SHA-256 hash와 사용자ID salt를 사용함
 * 구간 암호화를 위해 SSL을 적용하고자 하였으나
 * SSL이 불필요하다고 하여 사용을 못 함
 * 패스워드의 평문 전송만은 피하기 위해
 * javascript에서 CryptoJS.SHA256()를 사용함 
 * (로그인 하는 부분(login.jsp)과 패스워드를 변경하는 부분(util.js) 두 군데서 사용함)
 * salt는 랜덤한 값이 아닌 간단한 텍스트인 {WIKITESTPROJECT} 를 사용함(config.js)
 * (salt를 감싼 중괄호는 Spring Security의 salt 구분자 형식을 그대로 사용했음. (org.springframework.security.authentication.encoding.BasePasswordEncoder.mergePasswordAndSalt() 참고) 
 *
 */
public class CustomJdbcDaoImpl extends JdbcDaoImpl implements IChangePassword {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	SaltSource saltSource;
	
	@Override
	public CustomUserInfo loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		
		List<UserDetails> users = loadUsersByUsername(username);
		
		if(users.size() == 0) {
			logger.debug("조회된 계정 정보가 없습니다 : " + username);
			
			throw new UsernameNotFoundException("Not found Account");
		}
		
		CustomUserInfo user = (CustomUserInfo) users.get(0);
		
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		
		if(getEnableAuthorities()) {
			authList.addAll(loadUserAuthorities(user.getUsername()));
		}
		
		user.setAuthorities(authList);
		
		return user;
	}
	
	@Override
	protected List<UserDetails> loadUsersByUsername(String username) {
		return getJdbcTemplate().query(getUsersByUsernameQuery(), new String[] {username}, new RowMapper<UserDetails>() {
			public UserDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				String username = rs.getString(1);
				String password = rs.getString(2);
//				boolean enabled = rs.getString(3).equals("true") ? true : false;
				String ipAllowYn = rs.getString(4);
				String allowIp1 = rs.getString(5);
				String allowIp2 = rs.getString(6);
				String allowIp3 = rs.getString(7);
				String chPwdYn = rs.getString(8);
				
//				return new CustomUserInfo(username, password, ipAllowYn, allowIp1, allowIp2, allowIp3, AuthorityUtils.NO_AUTHORITIES);
				return new CustomUserInfo(username, password, ipAllowYn, allowIp1, allowIp2, allowIp3, chPwdYn, AuthorityUtils.NO_AUTHORITIES);
			}
		});
	}
	
	@Override
	protected List<GrantedAuthority> loadUserAuthorities(String username) {
		return getJdbcTemplate().query(getAuthoritiesByUsernameQuery(), new String[] {username}, new RowMapper<GrantedAuthority>() {
			public GrantedAuthority mapRow(ResultSet rs, int rowNum) throws SQLException {
				String roleName = rs.getString(2); // 사용자 role
				
				return new GrantedAuthorityImpl(roleName);
			}
		});
	}
	
	public void changePassword(UserDetails user, String oldPassword, String newPassword) {
		
		String userId = user.getUsername();
		String userPassword = user.getPassword();
		
		String encodedOldPassword = passwordEncoder.encodePassword(oldPassword, saltSource.getSalt(user));
		String encodedNewPassword = passwordEncoder.encodePassword(newPassword, saltSource.getSalt(user));
		
		if(!checkPassword(userPassword, encodedOldPassword)) {
			throw new RuntimeException("현재 비밀번호가 맞지 않습니다");
		}
		
		getJdbcTemplate().update("UPDATE NMP_USER_INFO set USER_PWD = ? where USER_ID = ?", encodedNewPassword, userId);
	}
	
	public void changePassword2(UserDetails user, String newPassword, String userName, String comName, String comTel) {
		
		String userId = user.getUsername();
		
		String encodedNewPassword = passwordEncoder.encodePassword(newPassword, saltSource.getSalt(user));
		
		getJdbcTemplate().update("UPDATE NMP_USER_INFO set USER_PWD = ?, USER_NAME = ?, CMP_NAME = ?, TEL = ?, PWD_CHG_DATE = getdate() where USER_ID = ?", encodedNewPassword, userName, comName, comTel, userId);
	}

	private boolean checkPassword(String sessionPassword, String encodedOldPassword) {
		return sessionPassword.equals(encodedOldPassword);
	}

}
