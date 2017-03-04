package com.koreaap.biz.admin.formListInfo.service;

import java.util.List;
import java.util.Map;

import com.koreaap.biz.admin.formListInfo.domain.FormColumnInfo;
import com.koreaap.biz.admin.formListInfo.domain.FormListInfoStd;

public interface FormListInfoService {
	void saveMenuInfo(List<Map<String, Object>> param);
	void saveColInfoList(List<FormColumnInfo> param);
}
