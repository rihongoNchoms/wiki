package com.koreaap.sys.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koreaap.sys.security.authentication.UserInfoHolder;
import com.koreaap.sys.security.userDetails.CustomUserInfo;
import com.koreaap.sys.security.userDetails.IChangePassword;

@Controller
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	private IChangePassword changePasswordDao;
	
	@RequestMapping("/changePassword")
	@ResponseBody
	public Map changePassword(@RequestBody Map<String, String> param) {
	
		try {
			String oldPassword  = param.get("oldPassword");
			String newPassword  = param.get("newPassword");
//			UserDetails user = UserInfoHolder.getUserPrincipal();
			
			CustomUserInfo user = UserInfoHolder.getUserPrincipal();
			
			changePasswordDao.changePassword(user, oldPassword, newPassword);

			SecurityContextHolder.clearContext();
			
			return addSuccessMessage();
		} catch(Exception e) {
			return addFailMessage(e.getMessage());
		}
	}
	
	private Map addSuccessMessage() {
		Map response = new HashMap<String, String>();
		response.put("result", "success");
		return response;
	}
	
	private Map addFailMessage(String msg) {
		Map response = new HashMap<String, String>();
		response.put("result", "fail");
		response.put("msg", msg);
		return response;
	}
}
