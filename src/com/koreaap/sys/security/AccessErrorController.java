package com.koreaap.sys.security;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class AccessErrorController {

	@RequestMapping("/notAccessPage")
	public ModelAndView notAccessPage(Principal user) {
		
		ModelAndView model = new ModelAndView();
		
		model.addObject("errorTitle", "Access Denied");
		if (user != null) {
			model.addObject("message", "[" + user.getName() + "] 해당 계정은 접속 권한이 없습니다.");
		} else {
			model.addObject("message", "로그인이 되지 않았습니다.");
		}
		
		model.setViewName("error");
		return model;
	}
	
	@RequestMapping("/notFindPage")
	public ModelAndView notFindPage() {
		
		ModelAndView model = new ModelAndView();
		
		model.addObject("errorTitle", "Not Find Page");
		model.addObject("message", "요청하신 페이지가 존재하지 않습니다.");
		
		model.setViewName("error");
		return model;
	}
}
