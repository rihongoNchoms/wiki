<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>

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
<div id="AXPage">

	<div class="ax-body">
		<div class="ax-wrap">
			<div class="ax-layer">
				<div class="ax-col-12 ax-content">
					<h1>${errorTitle}</h1>
					<h3>${message}</h3>
					<p class="desc"><a href="/">메인으로 이동</a></p>
				</div>
				<div class="ax-clear"></div>
			</div>
				
		</div>
	</div>
	<%@include file="/resources/inc/footer.jsp" %>
</div>	
	<%@include file="/resources/inc/incJs.jsp" %>
</body>
</html>