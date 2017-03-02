package com.koreaap.biz.main.domain;

public class MainForm {
	private int level;
	private String pno;
	private String no;
	private String formId;
	private String label;
	private String parentFormId;
	private String url;
	private String type;
	private boolean open;
	private char useYn;
	
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getPno() {
		return pno;
	}
	public void setPno(String pno) {
		this.pno = pno;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getFormId() {
		return formId;
	}
	public void setFormId(String formId) {
		this.formId = formId;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getParentFormId() {
		return parentFormId;
	}
	public void setParentFormId(String parentFormId) {
		this.parentFormId = parentFormId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public char getUseYn() {
		return useYn;
	}
	public void setUseYn(char useYn) {
		this.useYn = useYn;
	}
	
}
