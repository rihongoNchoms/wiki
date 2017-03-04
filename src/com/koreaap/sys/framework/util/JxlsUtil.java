package com.koreaap.sys.framework.util;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Map;

import net.sf.jxls.reader.ReaderBuilder;
import net.sf.jxls.reader.XLSReadStatus;
import net.sf.jxls.reader.XLSReader;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.Converter;
import org.apache.commons.beanutils.converters.BigDecimalConverter;

public class JxlsUtil {

	/**
	 * Jxls Excel 파일 read 수행
	 * 수행 전 Converter 를 등록할 수 있으며 thread safe 하도록 synchronized 메소드로 정의함
	 */
	synchronized public static void readExcel(InputStream in, String xmlFileName, Map<String, Object> beans, Map<Class, Converter> map) throws RuntimeException {
		
		ConvertUtils.deregister();
		
		// null => 0으로 초기화하기 위해
		ConvertUtils.register(new BigDecimalConverter(new BigDecimal(0)), BigDecimal.class);
		
		// Custom Converter 추가 가능함
		if(map != null) {
			for(Map.Entry<Class, Converter> entry : map.entrySet()) {
				ConvertUtils.register(entry.getValue(), entry.getKey());
			}
		}
		
    	InputStream inputXML;
		try {
			inputXML = new FileInputStream(xmlFileName);  // jxls excel reader config file
			XLSReader mainReader = ReaderBuilder.buildFromXML(inputXML);
	        InputStream inputXLS = new BufferedInputStream(in);
	        
	        XLSReadStatus readStatus = mainReader.read(inputXLS, beans);  // read excel file
		} catch (Exception e) {
			throw new RuntimeException(e);
		}  
	}
	
	public static void readExcel(InputStream in, String xmlFileName, Map<String, Object> beans) throws RuntimeException {
		readExcel(in, xmlFileName, beans, null);
	}
}
