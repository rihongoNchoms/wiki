package com.koreaap.sys.security;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.StringUtils;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:META-INF/spring/applicationContext*.xml")
@ActiveProfiles("local")
public class HashTest {

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	SaltSource saltSource;
	
	@Autowired
	DataSource dataSource;
	
	@Test
	public void hashTest() {
		// 패스워드는 아래와 같이 두 번의 hash 를 거쳐 저장됨
		
		// 1. 평문 패스워드 + salt(WIKITESTPROJECT) 를 sha256 으로 한 번
		// 2. 1번의 결과 + salt(사용자ID) 를 sha256으로 또 한 번
		
		// param1 : encode될 password 
		// param2 : salt (WIKITESTPROJECT) 고정된 값
		String hashString = passwordEncoder.encodePassword("gkswkvud", "WIKITESTPROJECT");
		System.out.println(hashString);
		
		// param1 : encode될 password 
		// param2 : salt (userId)
		hashString = passwordEncoder.encodePassword(hashString, "admin");
		System.out.println(hashString);
		
		String hashString2 = "3279070421f9ffd883a7ea188f7ea5fecd697464c44a8c552c9547910c8699aa";
//		String hashString2 = "d8a686ae7a49554ddbe8ae15e5eb577e7ee9aa191839b16f4e4b5339bc8833f3";
		assertThat(hashString, is(hashString2));
		/*
		 * update elsidx.dbo.userinfo set userPWD = 'a43406ec919f29b8addf825353e8efec92d46a43667619e133ceff5ada8c7295' where userId = 'kap'
		 */
		
	}
	
	@Test
	@Ignore
	public void procedureTest() {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		
		// TEST #1
		//Map map = jdbcTemplate.queryForMap("exec elsidx.dbo.USP_ElsTradeType_Sel ?", new Object[]{"20140818"});
		//assertThat((String)map.get("tradeType"), is("2"));
		
		
		// TEST #2
		MyStoredProcedure sproc = new MyStoredProcedure(jdbcTemplate, "elsidx.dbo.USP_ElsTradeType_Ins");
        Map results = sproc.executeProcedure("2014-08-18", "2");
        printMap(results);
        
        
        // TEST #3
		SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("USP_ElsTradeType_Ins").withCatalogName("elsidx.dbo").withoutProcedureColumnMetaDataAccess();
		simpleJdbcCall.declareParameters(new SqlParameter("std_date", Types.VARCHAR));
		simpleJdbcCall.declareParameters(new SqlParameter("tradeType", Types.CHAR));
		
		final MapSqlParameterSource in = new MapSqlParameterSource();
		in.addValue("std_date", "2014-08-18");
		in.addValue("tradeType", "2");
		
		Map<String, Object> results2 = simpleJdbcCall.execute(in);
		
		List list = (List) results2.get("#result-set-2");
		System.out.println(list.get(0));
		
	}
	
	private class MyStoredProcedure extends StoredProcedure {
		
		public MyStoredProcedure(JdbcTemplate jdbcTemplate, String name) {
			super(jdbcTemplate, name);
			declareParameter(new SqlParameter("std_date", Types.VARCHAR));
			declareParameter(new SqlParameter("tradeType", Types.CHAR));
			//declareParameter(new SqlOutParameter("tradeType", java.sql.Types.VARCHAR));
			compile();
		}
		
		public Map executeProcedure(String date, String type) {
            // the 'sysdate' sproc has no input parameters, so an empty Map is supplied...
			Map map = new HashMap();
			map.put("std_date", date);
			map.put("tradeType", type);
            return execute(map);
        }
		
	}
	
	private static void printMap(Map results) {
        for (Iterator it = results.entrySet().iterator(); it.hasNext(); ) {
            System.out.println("===========" + it.next());
        }
    }
	
	
}
