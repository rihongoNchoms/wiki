package com.koreaap.biz.admin.logInfo.persistence;

import java.util.List;
import java.util.Map;

public interface LogInfoMapper {
	List<Map<String, Object>> findLogInfo(Map<String, Object> map);
}
