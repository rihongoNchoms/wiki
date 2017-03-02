package com.koreaap.sys.framework.util;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;

public class LoggerJdbcDaoImpl extends JdbcDaoImpl {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
    
	public void insertLogging(String query, Map<String, Object> param) {
		getJdbcTemplate().update(query, param.get("userId"), param.get("formId"), param.get("dbJobType"), param.get("ipAddr"));
	}

}
