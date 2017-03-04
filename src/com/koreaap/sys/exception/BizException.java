package com.koreaap.sys.exception;

public class BizException extends RuntimeException {

	private static final long serialVersionUID = -2667568501485349081L;

    public BizException(String code)
    {
        this(code, "", null, null);
    }

    public BizException(String code, Exception ex)
    {
        this(code, "", null, ex);
    }

    public BizException(String code, Object arguments[])
    {
        this(code, "", arguments, null);
    }

    public BizException(String code, Object arguments[], Exception ex)
    {
        this(code, "", arguments, ex);
    }

    public BizException(String code, String defaultMessage, Object arguments[])
    {
        this(code, defaultMessage, arguments, null);
    }

    public BizException(String code, String defaultMessage, Object arguments[], Exception ex)
    {
        super(code, ex);
        this.code = code;
        this.defaultMessage = defaultMessage;
        this.arguments = arguments;
        exception = ex;
    }

    public String getCode()
    {
        return code;
    }

    public String getDefaultMessage()
    {
        return defaultMessage;
    }

    public Object[] getArguments()
    {
        return arguments;
    }

    public Exception getException()
    {
        return exception;
    }

    protected String code;
    protected String defaultMessage;
    protected Object arguments[];
    protected Exception exception;
	
}
