package com.koreaap.sys.framework.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.util.AntUrlPathMatcher;
import org.springframework.security.web.util.UrlMatcher;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.koreaap.sys.security.authentication.UserInfoHolder;

public class LoggerInterceptor extends HandlerInterceptorAdapter {
	/**
	 * log 처리를 위한 변수 선언
	 */
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private UrlMatcher urlMatcher = new AntUrlPathMatcher();
	
	@Autowired
	private LoggerJdbcDaoImpl loggerJdbcDaoImpl;
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		if(logger.isDebugEnabled()) {
			logger.debug("==================================================");
			logger.debug(" Request URI \t : " + request.getRequestURI());
		}
		
		// 쿠키에 담긴 사용자id와 url정보를 통해 로깅 유무를 결정
		Cookie[] cookies = request.getCookies();
		Map cookieInfo = new HashMap<String, String>();
		
		if(cookies != null) {
			
			for(Cookie cookie : cookies) {
				cookieInfo.put(cookie.getName(), cookie.getValue());
			}
			
			String userId = (String) cookieInfo.get("userId") != null ? (String) cookieInfo.get("userId") : "" ;
			String menuUrl = (String) cookieInfo.get("menuUrl") != null ? (String) cookieInfo.get("menuUrl") : "" ;
			
			// 로깅에 해당하는 url 접속인 경우에만 로그 기록 
			if(isLogginUrl(request.getRequestURI())) {
				if(!userId.equals(UserInfoHolder.getUserId()) || !menuUrl.equals(request.getRequestURI())) {
					insertLogging(request, request.getRequestURI());
				}
			}
		}
		
		return super.preHandle(request, response, handler);
	}
	
	private void insertLogging(HttpServletRequest request, String requestUrl) {
		logger.info("======================================================");
		logger.info("LogInterceptor");
		logger.info("======================================================");
		logger.info("userId:     {}", UserInfoHolder.getUserId());
		logger.info("IP address: {}", request.getRemoteAddr());
		logger.info("requestUrl: {}", requestUrl);
		logger.info("dbJobType: {}", convertToJobType(requestUrl));
		logger.info("======================================================");
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userId",       UserInfoHolder.getUserId());
		param.put("formId",       requestUrl);
		param.put("dbJobType",    convertToJobType(requestUrl));
		param.put("ipAddr",    	  request.getRemoteAddr());
		
		String query = "INSERT INTO NMP_USER_LOG ("
				   + "    SYS_DATE, USER_ID, FORM_ID,"
				   + "    DB_JOB_TYPE, IP_ADDR"
				   + ")"
				   + " VALUES ("
				   + "    getdate(), ?, ?,"
				   + "    ?, ?"
				   + ")";
		
		loggerJdbcDaoImpl.insertLogging(query, param);
		
	}
	
	private boolean isLogginUrl(String requestUrl) {
		// 우선 페이지 접속로그만 할 것이므로 ..
		if(urlMatcher.pathMatchesUrl("/kapweb/multipleWeb.do", requestUrl) || urlMatcher.pathMatchesUrl("/kapweb/userInfo.do", requestUrl)
				|| urlMatcher.pathMatchesUrl("/kapweb/userLogInfo.do", requestUrl) || urlMatcher.pathMatchesUrl("/kapweb/dcfCalc.do", requestUrl)) {
			return true;
		}
		return false;
	}
	
	/**
	 * URL 로 DbJobType 판단
	 * 
	 * R : 조회
	 * U : 수정
	 * E : 엑셀다운
	 * 
	 * ex) /mr/pm/portSetting/findPortfolioAp => R
	 */
	private Object convertToJobType(String url) {
		
		String dbJobType = "R";
		
		if(url.lastIndexOf("/") >= 0) {
			url = url.substring(url.lastIndexOf("/") + 1);
		}
		
		if(url.endsWith("Excel")) {
			dbJobType = "E"; 
		}
		else if(url.startsWith("save") || url.startsWith("insert") || url.startsWith("update") ||
		   url.startsWith("delete") || url.startsWith("add") || url.startsWith("remove") || 
		   url.startsWith("modify")) {
			dbJobType = "U"; 
		}
		
		return dbJobType;
	}
	
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

		// 사용자 url 접속 후 (로깅 후) cookie 정보를 기록 
		// 전처리에서 이 cookie 정보를 통해 새로고침 유무를 확인하여 로깅의 유무를 결정함
		if(isLogginUrl(request.getRequestURI())) {
			Cookie cookie = new Cookie("userId", UserInfoHolder.getUserId());
			cookie.setPath("/");
			response.addCookie(cookie);
			cookie = new Cookie("menuUrl", request.getRequestURI());
			response.addCookie(cookie);
		}
		
		super.postHandle(request, response, handler, modelAndView);
	}
	
}
