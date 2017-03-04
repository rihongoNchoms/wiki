package com.koreaap.sys.security.authentication;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import com.koreaap.sys.security.userDetails.CustomJdbcDaoImpl;
import com.koreaap.sys.security.userDetails.CustomUserInfo;

public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private CustomJdbcDaoImpl userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private SaltSource saltSource;
	
	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		
		String username = authentication.getName();
		String password = (String) authentication.getCredentials();
		
		Collection<? extends GrantedAuthority> authorities;
		
		CustomUserInfo userDetails;
		
		try {
			userDetails = userDetailsService.loadUserByUsername(username);
			
//			logger.info("org password : " + password);
			String hashedPassword = passwordEncoder.encodePassword(password, saltSource.getSalt(userDetails));
			
//			logger.info("username : " + username + " / password : " + password + " / hash password : " + hashedPassword);
//			logger.info("username : " + userDetails.getUsername() + " / password : " + userDetails.getPassword());
			
            WebAuthenticationDetails webAuthenticationDetails = (WebAuthenticationDetails) authentication.getDetails();
            String userIpAddr = webAuthenticationDetails.getRemoteAddress();
            
            if(!hashedPassword.equals(userDetails.getPassword())) throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
            if(userDetails.getIpAllowYn().equals("Y")) {
            	if(!userDetails.getAllowIp1().equals(userIpAddr) && !userDetails.getAllowIp2().equals(userIpAddr) && !userDetails.getAllowIp3().equals(userIpAddr)) {
            		throw new DisabledException("접속 가능한 IP가 아닙니다.");
            	}
            }
            
            authorities = userDetails.getAuthorities();
            
//            logger.info("authorities : " + authorities);
			
		} catch(UsernameNotFoundException e) {
            logger.info(e.toString());
            throw new UsernameNotFoundException(e.getMessage());
        } catch(BadCredentialsException e) {
            logger.info(e.toString());
            throw new BadCredentialsException(e.getMessage());
        } catch (DisabledException e) {
        	logger.info(e.toString());
            throw new DisabledException(e.getMessage());
		} catch(Exception e) {
            logger.info(e.toString());
            throw new RuntimeException(e.getMessage());
        }
		
		return new UsernamePasswordAuthenticationToken(userDetails, password, authorities);
	}

	@Override
	public boolean supports(Class<? extends Object> authentication) {
//		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	public CustomJdbcDaoImpl getUserDetailsService() {
		return userDetailsService;
	}

	public void setUserDetailsService(CustomJdbcDaoImpl userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

}
