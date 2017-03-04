package com.koreaap.sys.security.authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.koreaap.sys.security.userDetails.CustomUserInfo;

public class UserInfoHolder {

	/*
	public static String getUserId() {
		User user = getUserPrincipal();
		return user.getUsername();
	}
	
	public static boolean checkUserRole(String role) {
		
		if(role == null) {
			return false;
		}
		
		User user = getUserPrincipal();
		
		List list = new ArrayList(user.getAuthorities());
		for(int i=0; i<list.size(); i++) {
			if(role.equals(list.get(i).toString())) {
				return true;
			}
		}
		
		return false;
	}
	
	public static String getPassword() {
		User user = getUserPrincipal();
		return user.getPassword();
	}
	
	public static User getUserPrincipal() {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth == null) { return null; }
		
		User user = (User)auth.getPrincipal();
		return user;
	}
	
	*/
	
	
	
	private static <T> T getUserInfo(Class<? extends UserDetails> clazz) {
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			
			if(auth == null) { return null; }
			
			if(auth.getPrincipal() instanceof String && auth.getPrincipal().toString().equalsIgnoreCase("anonymousUser")) {
				return (T) new CustomUserInfo(auth.getPrincipal().toString(), "no_authenticated", "N", "", "", "", "", null);
//				return (T) new CustomUserInfo(auth.getPrincipal().toString(), "no_authenticated", "N", "", "", "", null);
			}
		} catch (Exception e) {
			new RuntimeException("Authentication 객체를 생성할 수 없습니다.");
		}
		
		return (T) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
	
	public static CustomUserInfo getUserPrincipal() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth == null) { return null; }
		
		CustomUserInfo user = (CustomUserInfo) auth.getPrincipal();
		return user;
	}
	
	public static String getUserId() {
		CustomUserInfo userDetails = getUserInfo(CustomUserInfo.class);
		if(userDetails == null) { return ""; }
		return userDetails.getUsername();
	}
	
	public static String getUserIpAllowYn() {
		CustomUserInfo userDetails = getUserInfo(CustomUserInfo.class);
		if(userDetails == null) { return ""; }
		return userDetails.getIpAllowYn();
	}
	
	public static String getChPwdYn() {
		CustomUserInfo userDetails = getUserInfo(CustomUserInfo.class);
		if(userDetails == null) { return ""; }
		return userDetails.getChPwdYn();
	}
	
	
	
}
