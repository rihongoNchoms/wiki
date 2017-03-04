package com.koreaap.biz.admin.formListInfo.persistence;

import java.util.List;
import java.util.Map;

import com.koreaap.biz.admin.formListInfo.domain.FormColumnInfo;
import com.koreaap.biz.admin.formListInfo.domain.FormListInfoStd;

public interface FormListInfoMapper {
	List<FormListInfoStd> findMenuInfo();
	void insertMenuInfo(Map<String, Object> map);
	void updateMenuInfo(Map<String, Object> map);
	void deleteMenuInfo(Map<String, Object> map);
	
	List<FormColumnInfo> findColInfoList();
	void insertColumnInfo(FormColumnInfo list);
	void updateColumnInfo(FormColumnInfo list);
	void deleteColumnInfo(FormColumnInfo list);
}
