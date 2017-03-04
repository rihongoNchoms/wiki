package com.koreaap.sys.security.userDetails;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IChangePassword extends UserDetailsService {

	public void changePassword(UserDetails user, String oldPassword, String newPassword);
	public void changePassword2(UserDetails user, String newPassword, String userName, String comName, String comTel);
}
