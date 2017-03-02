package com.koreaap.sys.dao;

import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

/**
 * 공통 DAO 
 * jdbcTemplate 를 통한 DB 접속
 * @author mscho
 */
public class CommonDaoImpl implements CommonDao {
	
	private NamedParameterJdbcTemplate jdbcTemplate;
	
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
	
	@Override
	public int update(String query, Map<String, Object> param) {
		return jdbcTemplate.update(query, param);
	}

}
