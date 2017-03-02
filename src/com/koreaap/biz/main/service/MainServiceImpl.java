package com.koreaap.biz.main.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koreaap.biz.main.persistence.MainMapper;

@Service
public class MainServiceImpl implements MainService {

	@Autowired
	private MainMapper mainMapper;

	@Override
	public int saveCrudTest(List<Map<String, Object>> param) {

		// =====================================================
		// {useYn=1, menuGrp=G_0003, menuType=2, menuId=M_0003, menuLink=/yslee,
		// menuName=yslee, _CUD=U}
		// =====================================================
		// {useYn=1, menuGrp=G_0002, menuType=2, menuId=M_0002, menuLink=/chyun,
		// menuName=chyun, _isDel=true}

		for (int i = 0; i < param.size(); i++) {
			Map<String, Object> map = param.get(i);
			System.out.println("=====================================================");
			System.out.println(map);

			if ((Boolean) map.get("_isDel")) {
				// mainMapper.deleteCrudTest(map);
			} else {
				if("U".equals(map.get("_CUD"))) {
					 mainMapper.updateCrudTest(map);
				} else {
					// mainMapper.insertCrudTest(map);
				}
			}
		}

		return 0;
	}

}
