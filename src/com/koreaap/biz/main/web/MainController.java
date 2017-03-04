package com.koreaap.biz.main.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koreaap.biz.main.domain.MainForm;
import com.koreaap.biz.main.persistence.MainMapper;
import com.koreaap.biz.main.service.MainService;
import com.koreaap.sys.ui.CustomResponse;

@RequestMapping("")
@Controller
public class MainController {
	private Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private MainService mainService;

	@Autowired
	private MainMapper indexMapper;

	@RequestMapping("/findStdDate")
	@ResponseBody
	public Map findStdDate() {
		Map<String, Object> map = indexMapper.findStdDate();
		return map;
	}

	@RequestMapping("/findTopMenu")
	@ResponseBody
	public List findTopMenu(@RequestBody Map<String, Object> param) {
		List<MainForm> list = indexMapper.findTopMenu();

		return list;
	}

	@RequestMapping("/findTreeMenu")
	@ResponseBody
	public List findTreeMenu(@RequestBody Map<String, Object> param) {
		List<MainForm> list = indexMapper.findTreeMenu();

		return list;
	}

	@RequestMapping("/findCrudTest")
	@ResponseBody
	public List findCrudTest(@RequestBody Map<String, Object> param) {
		List<Map<String, Object>> list = indexMapper.findCrudTest(param);

		return list;
	}

	@RequestMapping("/saveCrudTest")
	@ResponseBody
	public CustomResponse saveCrudTest(@RequestBody List<Map<String, Object>> param) {

		Map<String, Object> result = new HashMap<String, Object>();

		mainService.saveCrudTest(param);

		return new CustomResponse();
	}

	/**
	 * LinkedHashMap 으로 return 받은 경우에 아래와 같이 values 를 이용하여 map 형태로 전달
	 */
	private Map convertDhtmlxGridJsonObj(List<Map<String, Object>> list) {
		Map response = new HashMap<String, List>();

		List resList = new ArrayList();

		for (int i = 0; i < list.size(); i++) {
			Map map = new HashMap();
			map.put("id", i + 1);
			map.put("data", list.get(i).values());

			resList.add(map);
		}

		response.put("result", "success");
		response.put("rows", resList);
		return response;
	}

	private Map convertDhtmlxGridJsonObj(List<Map<String, Object>> list, List<Map<String, Object>> list2) {
		Map response = new HashMap<String, List>();

		List resList = new ArrayList();

		int pos = 1;
		for (int i = 0; i < list.size(); i++) {
			Map map = new HashMap();

			if (list.get(i).get("MATRIX_ID").equals("UST00")) {
				map.put("id", pos++);
				map.put("data", list.get(i).values());

				resList.add(map);
			}
		}

		for (int i = 0; i < list2.size(); i++) {
			Map map = new HashMap();
			map.put("id", pos++);
			map.put("data", list2.get(i).values());

			resList.add(map);
		}

		response.put("result", "success");
		response.put("rows", resList);
		return response;
	}

}
