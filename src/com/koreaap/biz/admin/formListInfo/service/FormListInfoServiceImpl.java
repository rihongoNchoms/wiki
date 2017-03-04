package com.koreaap.biz.admin.formListInfo.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.koreaap.biz.admin.formListInfo.domain.FormColumnInfo;
import com.koreaap.biz.admin.formListInfo.persistence.FormListInfoMapper;

@Service
public class FormListInfoServiceImpl implements FormListInfoService {

	@Autowired
	private FormListInfoMapper formListInfoMapper;

	@Override
	public void saveMenuInfo(List<Map<String, Object>> param) {

		for (int i = 0; i < param.size(); i++) {
			Map<String, Object> map = (Map<String, Object>) param.get(i);
			if(map.get("__deleted__") != null) {
				formListInfoMapper.deleteMenuInfo(map);
			} else {
				if((Boolean) map.get("__modified__") && map.get("changeColumn") != "") {
					formListInfoMapper.insertMenuInfo(map);
				} else {
					formListInfoMapper.updateMenuInfo(map);
				}
			}
		}
	}

	@Override
	public void saveColInfoList(List<FormColumnInfo> param) {
		
		for (int i = 0; i < param.size(); i++) {
			FormColumnInfo map = param.get(i);
			if(map.getDeleted() != null) {
				formListInfoMapper.deleteColumnInfo(map);
			} else {
				if(map.getModified() != null && !"".equals(map.getChangeColumn())) {
					formListInfoMapper.insertColumnInfo(map);
				} else {
					formListInfoMapper.updateColumnInfo(map);
				}
			}
		}
	}

}
