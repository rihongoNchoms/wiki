package com.koreaap.sys.model;

public class BaseModel {
	private Boolean deleted;
	private Boolean modified;
	private String changeColumn;
	private int __index;
	private Boolean __modified;
	private Boolean __selected;
	
	public Boolean getDeleted() {
		return deleted;
	}
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
	public Boolean getModified() {
		return modified;
	}
	public void setModified(Boolean modified) {
		this.modified = modified;
	}
	public String getChangeColumn() {
		return changeColumn;
	}
	public void setChangeColumn(String changeColumn) {
		this.changeColumn = changeColumn;
	}
	public int get__index() {
		return __index;
	}
	public void set__index(int __index) {
		this.__index = __index;
	}
	public Boolean get__modified() {
		return __modified;
	}
	public void set__modified(Boolean __modified) {
		this.__modified = __modified;
	}
	public Boolean get__selected() {
		return __selected;
	}
	public void set__selected(Boolean __selected) {
		this.__selected = __selected;
	}
	
}
