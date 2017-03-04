package com.koreaap.biz.comm.web;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koreaap.biz.comm.persistence.CommonInfoMapper;

@Controller
@RequestMapping("/comm")
public class CommonInfoController {
	private Logger log = Logger.getLogger(this.getClass());
    
	@Autowired
	private CommonInfoMapper commonInfoMapper;
	
	@RequestMapping("/findGridColInfo")
	@ResponseBody
	public List<Map<String, Object>> findGridColInfo(@RequestBody Map<String, Object> param) {
		List<Map<String, Object>> list = commonInfoMapper.findGridColInfo(param);
		return list;
	}
	
}
