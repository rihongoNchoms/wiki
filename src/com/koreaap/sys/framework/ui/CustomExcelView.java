package com.koreaap.sys.framework.ui;

import java.io.FileInputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.view.document.AbstractExcelView;


public class CustomExcelView extends AbstractExcelView {

	@Value("#{app['excel.basePath']}")
	private String excelBasePath;
	
	@Override
	protected void buildExcelDocument(Map<String, Object> model,
			HSSFWorkbook workbook, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		XLSTransformer transformer = new XLSTransformer();
		
		String excelFileName = (String) model.get("excelFile");
		String destFileName = excelFileName;
		
		// markAsFixedSizeCollection 설정
		String[] array = (String[]) model.get("fixedSizeCollections");
		if(array != null) {
			for(int i = 0; i < array.length; i++) {
				transformer.markAsFixedSizeCollection(array[i]);
			}
		}
		
		String templateFileName = excelBasePath + excelFileName;
		
		Workbook resultWorkbook = transformer.transformXLS(new FileInputStream(templateFileName), model);
		
		StringBuffer contentDisposition = new StringBuffer();
		contentDisposition.append("attachment;fileName=\"");
		contentDisposition.append(destFileName);
		contentDisposition.append("\";");
		
		response.setHeader("Content-Disposition", contentDisposition.toString());
		response.setContentType("application/vnd.ms-excel");
		resultWorkbook.write(response.getOutputStream());
		
	}

}
