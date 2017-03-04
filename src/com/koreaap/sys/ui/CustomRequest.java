package com.koreaap.sys.ui;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.ConfigurablePropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.core.convert.support.ConversionServiceFactory;
import org.springframework.core.convert.support.GenericConversionService;

import com.koreaap.sys.exception.UiException;
import com.koreaap.sys.ui.converter.StringToBigDecimalConverter;
import com.koreaap.sys.ui.converter.StringToDateConverter;
import com.koreaap.sys.ui.converter.StringToIntConverter;

public class CustomRequest {

	private Map<String, String> params;
	
	private Map<String, List<Map<String, Object>>> dataSetMap;
	
	private GenericConversionService conversionService = ConversionServiceFactory.createDefaultConversionService();
	
	private static final Logger logger = LoggerFactory.getLogger(CustomRequest.class);
	
	/**
	 * getDataSet()
	 */
	@SuppressWarnings("unchecked")
	public <E> List<E> getDataSet(String id, Class<E> clazz) {
		
		// HashMap 이나 Model Class를 인자로 받아서
		// Model List을 리턴
		
		List<Map<String, Object>> list = dataSetMap.get(id);
		
		if (Map.class.isAssignableFrom(clazz)) {
			return (List<E>) list;
		}
		
		List<E> resultList = new ArrayList<E>();
		
		for(Map<String, Object> map : list) {
			E bean = getBean(map, clazz);
			resultList.add(bean);
		}
		
		return resultList;
	}
	
	
	private <E> E getBean(Map<String, Object> map, Class<E> clazz) {
		
		final E bean = newInstance(clazz);
		
		ConfigurablePropertyAccessor propertyAccessor = PropertyAccessorFactory.forDirectFieldAccess(bean);
		conversionService.addConverter(new StringToDateConverter());
		conversionService.addConverter(new StringToIntConverter());
		conversionService.addConverter(new StringToBigDecimalConverter());
		propertyAccessor.setConversionService(conversionService);
		
		for(String key : map.keySet()){
			
			try {
				propertyAccessor.setPropertyValue(key, map.get(key));
			} catch(Exception e) {
				logger.debug("Request - getBean() : Class={" + clazz.getName()+ "}, field:" + key + " 가 존재하지 않습니다." );
			}
		}
			
		return bean;
	}
	
	private final <E> E newInstance(Class<E> clazz) {
		E bean;

		try {
			bean = clazz.newInstance();
		} catch (InstantiationException e) {
			throw new UiException("InstantiationException", e);
		} catch (IllegalAccessException e) {
			throw new UiException("IllegalAccessException", e);
		}

		return bean;
	}
	
	
	/**
	 * getParam()
	 */
	public String getParam(String id) {
		return params.get(id);
	}


	
	
	public Map<String, String> getParams() {
		return params;
	}

	public void setParams(Map<String, String> params) {
		this.params = params;
	}

	protected Map<String, List<Map<String, Object>>> getDataSetMap() {
		return dataSetMap;
	}

	public void setDataSetMap(Map<String, List<Map<String, Object>>> dataSetMap) {
		this.dataSetMap = dataSetMap;
	}
	
	
}
