package com.koreaap.biz.admin.formListInfo.web;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.koreaap.biz.admin.formListInfo.domain.FormColumnInfo;
import com.koreaap.biz.admin.formListInfo.domain.FormListInfoStd;
import com.koreaap.biz.admin.formListInfo.persistence.FormListInfoMapper;
import com.koreaap.biz.admin.formListInfo.service.FormListInfoService;
import com.koreaap.sys.framework.util.JxlsUtil;
import com.koreaap.sys.ui.CustomRequest;
import com.koreaap.sys.ui.CustomResponse;

@Controller
@RequestMapping("/admin/formListInfo")
public class FormListInfoController {
	private Logger log = Logger.getLogger(this.getClass());
    
	@Autowired
	private FormListInfoMapper formListInfoMapper;
	
	@Autowired 
	private FormListInfoService formListInfoService;
	
	@RequestMapping("")
	public String main() {
		return "/admin/formListInfo";
	}
	
	@RequestMapping("/findMenuInfo")
	@ResponseBody
	public List<FormListInfoStd> findMenuInfo() {
		
		List<FormListInfoStd> list = formListInfoMapper.findMenuInfo();
		return list;
	}
	
	@RequestMapping("/saveMenuInfo")
	@ResponseBody
	public CustomResponse saveMenuInfo(@RequestBody List<Map<String, Object>> param) {
		
		formListInfoService.saveMenuInfo(param);
		return new CustomResponse();
	}
	
	@RequestMapping("/findColInfoList")
	@ResponseBody
	public List<FormColumnInfo> findColInfoList() {
		
		List<FormColumnInfo> list = formListInfoMapper.findColInfoList();
		return list;
	}
	
	@RequestMapping("/saveColInfoList")
	@ResponseBody
	public CustomResponse saveColInfoList(@RequestBody CustomRequest req) {
		
		List<FormColumnInfo> list = req.getDataSet("list", FormColumnInfo.class);
		System.out.println(list);
		
		formListInfoService.saveColInfoList(list);
		return new CustomResponse();
	}
	
	/**
	 * 엑셀 업로드
	 * for Servlet2.5 Multipart FileUpload
	 * @throws FileUploadException 
	 */
	@RequestMapping("/fileUpload")
	@ResponseBody
	public CustomResponse fileUploadSubmit(@RequestParam("file") MultipartFile part, HttpServletRequest request) {
		log.debug(part);
		ServletContext context = request.getSession().getServletContext();
		String path = context.getRealPath("/WEB-INF/jxlsXmls");
		InputStream in = null;
		List<FormColumnInfo> list = new ArrayList<FormColumnInfo>();
		
        try {
        	Map<String, Object> beans = new HashMap<String, Object>();
            beans.put("list", list);
            
			JxlsUtil.readExcel(part.getInputStream(), path + "/columnInfoList.xml", beans);
        } catch (Exception e) {
        	try {
				throw new FileUploadException();
			} catch (FileUploadException e1) {
				e1.printStackTrace();
			} 
        } finally {
        	if(in != null) try { in.close(); } catch (IOException e) {}
        }
        
        return new CustomResponse().addList("columnInfoList", list);
    }
	
}
