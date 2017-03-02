package com.koreaap.sys.security.userDetails;

import java.io.Serializable;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserInfo implements Serializable, UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4785144804295540189L;
	
	private String username;
	private String password;
	private String ipAllowYn;
	private String allowIp1;
	private String allowIp2;
	private String allowIp3;
	private String chPwdYn;
	
	private List<GrantedAuthority> authorities;

	public CustomUserInfo(String username, String password, String ipAllowYn,
			String allowIp1, String allowIp2, String allowIp3, String chPwdYn,
			List<GrantedAuthority> authorities) {
		this.username = username;
		this.password = password;
		this.ipAllowYn = ipAllowYn;
		this.allowIp1 = allowIp1;
		this.allowIp2 = allowIp2;
		this.allowIp3 = allowIp3;
		this.chPwdYn = chPwdYn;
		this.authorities = authorities;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getIpAllowYn() {
		return ipAllowYn;
	}

	public void setIpAllowYn(String ipAllowYn) {
		this.ipAllowYn = ipAllowYn;
	}

	public String getAllowIp1() {
		return allowIp1;
	}

	public void setAllowIp1(String allowIp1) {
		this.allowIp1 = allowIp1;
	}

	public String getAllowIp2() {
		return allowIp2;
	}

	public void setAllowIp2(String allowIp2) {
		this.allowIp2 = allowIp2;
	}

	public String getAllowIp3() {
		return allowIp3;
	}

	public void setAllowIp3(String allowIp3) {
		this.allowIp3 = allowIp3;
	}
	
	public String getChPwdYn() {
		return chPwdYn;
	}

	public void setChPwdYn(String chPwdYn) {
		this.chPwdYn = chPwdYn;
	}

	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
