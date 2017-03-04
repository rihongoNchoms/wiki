package com.koreaap.sys.ui.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

import com.koreaap.sys.exception.UiException;

/**
 * 데이터 컨버터 (String -> int)
 *
 */
public class StringToIntConverter implements Converter<String, Integer> {

	/**
	 *  String  을 방아서  int  형태로 컴버팅함.
	 *  데이터가 없을 경우 초기값 0 으로 바인딩
	 */
	public Integer convert(String source) {
		int data = 0;
		if(StringUtils.hasText(source)){
			try {
				data=Integer.parseInt(source);
			} catch (Exception e) {
				throw new UiException("[" +source + "] 는 int  유형으로  컨버팅 할 수 없습니다. ");
			}
		}
		return data;
	}

}
