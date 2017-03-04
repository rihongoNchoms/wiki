<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>	

<!-- ax-col-12 에 ax-content 클래스를 제거한 경우 
사이드 메뉴가 없어진 상태의 확장된 화면을 보여준다 -->

<div class="ax-body">
	<div class="ax-wrap">
	
		<div class="ax-layer ax-title">
			<div class="ax-col-12">
				<h1>관리자 > 로그관리</h1>
				<p class="desc">사용자 접속 로그를 확인한다.</p>
			</div>
			<div class="ax-clear"></div>
		</div>
	
		<!-- ax-col-12를 기준으로 한 세트 -->
		<div class="ax-col-12">
			<div class="ax-unit">
				<div class="ax-box">
					<div class="ax-box-wrap">
						<h1>로그 현황</h1>
						
						<!-- 조회 조건 상단 버튼 -->
						<div class="tag-result" style="float: right;">
							<a class="formBtn AXButton" id="조회"><i class="axi axi-check-circle-o"></i>조회</a>
							<a class="formBtn AXButton Green" id="엑셀"><i class="axi axi-file-excel-o"></i>엑셀다운</a>
						</div>
						<div class="ax-clear"></div>
						<div class="H10"></div>
						
						<!-- 조회 조건 - 스크립트를 이용하여 동적 생성하도록 함  -->
						<div id="searchCondition" style="border-top:1px solid #ccc; border-right:1px solid #ccc;"></div>
						
						<div class="ax-clear"></div>
						<div class="H10"></div>
						
						<!-- 그리드 -->
						<div id="logList" style="height: 550px;"></div>
						
					</div>
				</div>
				<div class="ax-clear"></div>
				<div class="H20"></div>
			</div>
		</div>
		
	</div> <!-- e.ax-wrap -->
</div> <!-- e.ax-body -->