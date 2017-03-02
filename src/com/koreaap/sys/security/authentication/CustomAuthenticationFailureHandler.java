package com.koreaap.sys.security.authentication;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {
		
		String errorMessage = "";
		
		if(exception instanceof BadCredentialsException) {
			errorMessage = "badCredentials";
		} else if(exception instanceof DisabledException) {
			errorMessage = "accountDisabled";
		} else if(exception instanceof UsernameNotFoundException) {
			errorMessage = "accountNotFound";
		}
		
		response.setCharacterEncoding("UTF-8");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.sendRedirect(request.getContextPath() + "/admin/login?error=" + errorMessage);
		
	}

}
