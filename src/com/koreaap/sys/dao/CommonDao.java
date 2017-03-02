package com.koreaap.sys.dao;

import java.util.Map;
/**
 * 공통 DAO 
 * 화면 CRUD 작업 외에 별도의 쿼리 실행 시 사용
 * @author mscho
 */
public interface CommonDao {
	
	// 로그인, 로그아웃 시간 업데이트 
	// 패스워드 변경일자 업데이트 시 사용 예정
	int update(String query, Map<String, Object> param);
}
