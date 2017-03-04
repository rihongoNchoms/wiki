<%@page import="com.koreaap.sys.security.userDetails.CustomUserInfo"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	// 로그인한 사용자 이름을 화면 상단에 출력해주기 위해 사용
	Authentication auth = (Authentication)request.getUserPrincipal();
	String name = "";
	
	if(auth != null) {
		Object principal = auth.getPrincipal();
		if(principal != null && principal instanceof CustomUserInfo) {
			name = ((CustomUserInfo)principal).getUsername();
		}
	}
%>
<!-- ax-header: include -->
<div class="ax-header">
	<div class="ax-wrap">
		<div class="ax-layer">
			<div class="ax-col-8">
				<div class="ax-unit">
					<div class="ax-logo">
						<a href="/"><span class="logo-img"><i class="axi axi-ion-happy"></i></span><span class="logo-txt">PROJECT MAIN</span></a>
					</div>
				</div>
				<div class="ax-unit">
                    <!-- 상단 top-down-menu 표시 영역 : s-->
					<div id="ax-top-menu" class="ax-top-menu AXMenuBox"></div>
                    <!-- e : 상단 top-down-menu 표시 영역 -->
                    <div class="mx-top-menu"><a id="mx-top-menu-handle" class="mx-menu-button"><i class="axi axi-th"></i></a></div>
				</div>
			</div>
			
			<div class="ax-col-4">
				<!-- 로그인 상태가 아닌 경우 로그인 버튼 -->
				<sec:authorize access="isAnonymous()">
				<div class="ax-unit">
					<ul class="ax-loginfo" id="ax-loginfo">
						<li class="btns"><a href="/admin/login" class="AXButton"><i class="axi axi-power-off"></i> 로그인</a></li>
					</ul>
					<div class="mx-loginfo"><a id="mx-loginfo-handle" class="mx-menu-button"><i class="axi axi-bars"></i></a></div>
				</div>
				</sec:authorize>
				
				<!-- 로그인이 된 경우 보여줄 로그아웃 버튼 -->
				<sec:authorize access="isAuthenticated()">
				<div class="ax-unit">
					<ul class="ax-loginfo" id="ax-loginfo">
						<li class="profile"><div class="photo"></div></li>
						<!-- 로그인 사용자 계정명을 화면에 출력 -->
						<li class="account"><%=name%></li> 
						<li class="btns"><a href="/admin/logout" class="AXButton"><i class="axi axi-power-off"></i> 로그아웃</a></li>
					</ul>
					<div class="mx-loginfo"><a id="mx-loginfo-handle" class="mx-menu-button"><i class="axi axi-bars"></i></a></div>
				</div>
				</sec:authorize>
			</div>
			
			<div class="ax-clear"></div>
		</div>
	</div>
</div>
<div class="H60"></div>
