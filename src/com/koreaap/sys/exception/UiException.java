package com.koreaap.sys.exception;

public class UiException extends RuntimeException {

	private static final long serialVersionUID = -8202028644786776737L;

	public UiException() {
		super();
	}

	public UiException(String msg) {
		super(msg);
	}

	public UiException(Exception e) {
		super(e);
	}

	public UiException(String msg, Exception e) {
		super(msg, e);
	}
	
}
