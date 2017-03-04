package com.koreaap.biz.admin.logInfo.web;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koreaap.biz.admin.logInfo.persistence.LogInfoMapper;

@Controller
@RequestMapping("/admin/logInfo")
public class LogInfoController {
	private Logger log = Logger.getLogger(this.getClass());
    
	@Autowired
	private LogInfoMapper logInfoMapper;
	
	@RequestMapping("")
	public String main() {
		return "/admin/logInfo";
	}
	
	@RequestMapping("/findLogInfo")
	@ResponseBody
	public List<Map<String, Object>> findLogInfo(@RequestBody Map<String, Object> map) {
		
		List<Map<String, Object>> list = logInfoMapper.findLogInfo(map);
		return list;
	}
	
	
}
