package com.koreaap.biz.admin.formListInfo.web;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koreaap.biz.admin.formListInfo.domain.FormListInfo;
import com.koreaap.biz.admin.formListInfo.persistence.FormListInfoMapper;

@Controller
@RequestMapping("/admin/formListInfo")
public class FormListInfoController {
	private Logger log = Logger.getLogger(this.getClass());
    
	@Autowired
	private FormListInfoMapper formListInfoMapper;
	
	@RequestMapping("")
	public String main() {
		return "/admin/formListInfo";
	}
	
	@RequestMapping("/findMenuInfo")
	@ResponseBody
	public List<FormListInfo> findMenuInfo() {
		
		List<FormListInfo> list = formListInfoMapper.findMenuInfo();
		return list;
	}
	
}
