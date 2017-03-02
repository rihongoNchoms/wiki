package com.koreaap.sys.security.authentication;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.koreaap.sys.dao.CommonDao;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	
	@Autowired
	CommonDao commonDao;

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	/**
	 * 로그인 성공 시 핸들러 구현
	 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication) throws IOException,
			ServletException {
		// 로그인 시간 update
		updateUserLoginTime(request, response);
		
		// 접속한 사용자의 권한에 따라 페이지 이동을 구분함
		handle(request, response, authentication);
		clearAuthenticationAtrributes(request);
		
//		response.sendRedirect(request.getContextPath() + "/index.do");
	}
	
	protected void updateUserLoginTime(HttpServletRequest request, 
			HttpServletResponse response) {
		String query = "UPDATE WIKI_USER_INFO SET LOG_IN_DATE = getdate() WHERE USER_ID = :userId";
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", UserInfoHolder.getUserId());
		
		try {
			commonDao.update(query, map);
		} catch (Exception e) {
			HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }

            SecurityContext context = SecurityContextHolder.getContext();
            context.setAuthentication(null);

	        SecurityContextHolder.clearContext();
		}
		
	}
	
	protected void handle(HttpServletRequest request, 
			HttpServletResponse response, Authentication authentication) throws IOException {
		String targetUrl = determineTargetUrl(authentication);
		
		redirectStrategy.sendRedirect(request, response, targetUrl);
	}
	
	protected String determineTargetUrl(Authentication authentication) {
		boolean isAdmin = false;
		
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		
		for(GrantedAuthority grantedAuthority : authorities) {
			if(grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
				isAdmin = true;
			}
		}
		
		System.out.println("=====================================================");
		System.out.println("=====================================================");
		System.out.println("=====================================================");
		System.out.println("====isAdmin================================================" + isAdmin);
		System.out.println(UserInfoHolder.getChPwdYn());
		
		if(isAdmin) {
			return "/#/admin/formListInfo";
		} else {
//			if("N".equals(UserInfoHolder.getChPwdYn())) {
//				return "/setInitUserInfo.do";
//			}
			return "/";
		}
	}
	
	protected void clearAuthenticationAtrributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session == null) {
			return;
		}
		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}
	
	public RedirectStrategy getRedirectStrategy() {
		return redirectStrategy;
	}

	public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
		this.redirectStrategy = redirectStrategy;
	}

}
