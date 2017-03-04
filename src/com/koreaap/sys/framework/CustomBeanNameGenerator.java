package com.koreaap.sys.framework;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationBeanNameGenerator;

public class CustomBeanNameGenerator extends AnnotationBeanNameGenerator {

	@Override
	protected String buildDefaultBeanName(BeanDefinition definition) {

		// Bean name 충돌을 막기위해 shortName 대신에 package 를 포함한 클래스명을 Bean name 으로 함
		// Annotation 으로 Bean name 을 명시한 경우는 해당사항 없음
		//String shortClassName = ClassUtils.getShortName(definition.getBeanClassName());
		//return Introspector.decapitalize(shortClassName);
		
		return definition.getBeanClassName();
	}
}
