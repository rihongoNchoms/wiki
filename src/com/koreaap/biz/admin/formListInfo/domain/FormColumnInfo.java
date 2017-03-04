package com.koreaap.biz.admin.formListInfo.domain;

import java.io.Serializable;

import com.koreaap.sys.model.BaseModel;

/**
 * 동적으로 생성되는 그리드 컬럼정보를 담는 클래스
 * BaseModel 을 확장한 형태로 
 * 그리드 입력,수정,삭제 등의 이벤트 시 
 * 변경된 정보를 담기 위함이다.
 * 
 * @since 2017-02-17
 * @author mscho
 *
 */
public class FormColumnInfo extends BaseModel implements Serializable {
	private String codeId;
	private String sortSeq;
	private String colId;
	private String colName;
	private String colWidth;
	private int colAlign;
	private int colEditor;
	private int sortAble;
	
	public String getCodeId() {
		return codeId;
	}
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}
	public String getSortSeq() {
		return sortSeq;
	}
	public void setSortSeq(String sortSeq) {
		this.sortSeq = sortSeq;
	}
	public String getColId() {
		return colId;
	}
	public void setColId(String colId) {
		this.colId = colId;
	}
	public String getColName() {
		return colName;
	}
	public void setColName(String colName) {
		this.colName = colName;
	}
	public String getColWidth() {
		return colWidth;
	}
	public void setColWidth(String colWidth) {
		this.colWidth = colWidth;
	}
	public int getColAlign() {
		return colAlign;
	}
	public void setColAlign(int colAlign) {
		this.colAlign = colAlign;
	}
	public int getColEditor() {
		return colEditor;
	}
	public void setColEditor(int colEditor) {
		this.colEditor = colEditor;
	}
	public int getSortAble() {
		return sortAble;
	}
	public void setSortAble(int sortAble) {
		this.sortAble = sortAble;
	}
	
}
