package com.koreaap.biz.main.persistence;

import java.util.List;
import java.util.Map;

import com.koreaap.biz.main.domain.MainForm;

public interface MainMapper {
	List<MainForm> findTopMenu();
	List<MainForm> findTreeMenu();
	List<Map<String, Object>> findCrudTest(Map<String, Object> param);
	Map<String, Object> findStdDate();
	void updateCrudTest(Map<String, Object> param);
	void insertCrudTest(Map<String, Object> param);
	void deleteCrudTest(Map<String, Object> param);
}
