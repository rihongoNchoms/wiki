<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<% 
response.setHeader("Catche-Control","no-cache");
response.setHeader("Pragma","no-cache");
response.setDateHeader("Expires",0);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/resources/inc/incCss.jsp" %>
</head>

<body>
<div id="AXPage" class="login">

    <div class="ax-body">
        <div class="ax-wrap">

            <div class="ax-layer ax-title">
                <div class="ax-col-12">
                    <h1><i class="axi axi-axu"></i></h1>
                    <p class="desc">Application eXperience Universal Administrator</p>
                </div>
                <div class="ax-clear"></div>
            </div>

            <div class="ax-layer">
                <div class="ax-col-12">
                    <div class="ax-unit">

                        <div class="ax-box">
                            <h1>로그인</h1>
                            <p>관리자 계정으로 로그인 해주세요.</p>
                            <div class="H20"></div>
                            <form id="loginForm" name="login-form" method="post" action="j_spring_security_check" onsubmit="">
                                <div class="ax-input">
                                    <span class="name">Account</span>
                                    <input type="text" id="j_username" name="j_username" value="" class="AXInput" placeholder="account">
                                </div>
                                <div class="ax-input">
                                    <span class="name">Password</span>
                                    <input type="password" id="password" name="password" value="" class="AXInput" placeholder="password">
                                    <input type="hidden" id="j_password" name="j_password"/>
                                </div>

                                <div class="ax-clear"></div>
                                <div class="H20"></div>

                                <div class="ax-funcs">
                                    <button type="submit" class="AXButtonLarge Blue">&nbsp;&nbsp;로그인&nbsp;&nbsp;</button>
                                </div>
                                
                            </form>

                            <div class="ax-clear"></div>
                            <div class="H20"></div>

                            <div class="ax-opts">
                                <c:if test="${not empty error}">	
									<p style="color: red;">${error}</p>
								</c:if>
                            </div>

                            <p>
                                IE8+, Chrome, Firefox, safari
                            </p>
                            <div class="H20"></div>

                        </div>

                    </div>
                </div>
                <div class="ax-clear"></div>
            </div>


        </div>
    </div>
    <%@include file="/resources/inc/footer.jsp" %>
</div>
	<%@include file="/resources/inc/incJs.jsp" %>
	<script type="text/javascript" src="/resources/js/views/login.js"></script>
</body>
</html>