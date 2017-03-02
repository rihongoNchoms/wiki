package com.koreaap.biz.admin.formListInfo.persistence;

import java.util.List;

import com.koreaap.biz.admin.formListInfo.domain.FormListInfo;

public interface FormListInfoMapper {
	List<FormListInfo> findMenuInfo();
}
