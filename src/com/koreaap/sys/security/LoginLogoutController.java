package com.koreaap.sys.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginLogoutController {
	
	@RequestMapping("/admin/login")
	public ModelAndView login(@RequestParam(value="error", required=false) String error) {
		
		ModelAndView model = new ModelAndView();
		String errorMsg = "";

		if (error != null) {
			if(error.equals("badCredentials")) {
				errorMsg = "패스워드를 잘못 입력하였습니다.";
			} else if(error.equals("accountDisabled")) {
				errorMsg = "접속가능한 IP가 아닙니다.";
			} else if(error.equals("accountNotFound")) {
				errorMsg = "존재하지 않는 계정입니다.";
			}
			model.addObject("error", errorMsg);
		}
		
		model.setViewName("/admin/login");
		return model;
	}
	
	@RequestMapping("/index")
	public String index() {
		return "/";
	}
	
}
