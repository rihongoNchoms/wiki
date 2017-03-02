package com.koreaap.biz.comm.persistence;

import java.util.List;
import java.util.Map;

public interface CommonInfoMapper {
	List<Map<String, Object>> findGridColInfo(Map<String, Object> param);
}
