package com.koreaap.biz.admin.formListInfo.domain;

public class FormListInfoStd {
	private String formId;
	private String formName;
	private String parentFormId;
	private int sortSeq;
	private String pathUrl;
	private String useYn;
	
	public String getFormId() {
		return formId;
	}
	public void setFormId(String formId) {
		this.formId = formId;
	}
	public String getFormName() {
		return formName;
	}
	public void setFormName(String formName) {
		this.formName = formName;
	}
	public String getParentFormId() {
		return parentFormId;
	}
	public void setParentFormId(String parentFormId) {
		this.parentFormId = parentFormId;
	}
	public int getSortSeq() {
		return sortSeq;
	}
	public void setSortSeq(int sortSeq) {
		this.sortSeq = sortSeq;
	}
	public String getPathUrl() {
		return pathUrl;
	}
	public void setPathUrl(String pathUrl) {
		this.pathUrl = pathUrl;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	
}
