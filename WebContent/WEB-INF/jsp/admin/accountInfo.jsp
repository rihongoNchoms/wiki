<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>	

<!-- ax-col-12 에 ax-content 클래스를 제거한 경우 
사이드 메뉴가 없어진 상태의 확장된 화면을 보여준다 -->

<div class="ax-body">
	<div class="ax-wrap">
	
		<div class="ax-layer ax-title">
			<div class="ax-col-12">
				<h1>관리자 > 계정관리</h1>
				<p class="desc">사용자 계정 리스트를 관리한다.</p>
			</div>
			<div class="ax-clear"></div>
		</div>
	
		<!-- ax-layer를 기준으로 한 세트 -->
		<div class="ax-layer">  <!-- s.ax-layer-->
			<div class="ax-col-12">
			<!-- s.CXPage -->
			<div id="CXPage">
				<div class="ax-layer">
					<div class="ax-col-12">
						<div class="ax-unit">
							<div class="ax-box">
								<div class="ax-box-wrap">
									<h1>계정 리스트</h1>
									<div class="tag-result" style="float: right;">
										<a class="accountBtn AXButton" id="조회"><i class="axi axi-check-circle-o"></i>조회</a>
										<a class="accountBtn AXButton Red" id="삭제"><i class="axi axi-trash-o"></i>삭제</a>
										<a class="accountBtn AXButton Green" id="추가"><i class="axi axi-plus-circle"></i>추가</a>
										<a class="accountBtn AXButton Blue" id="저장"><i class="axi axi-save"></i>저장</a>
										<a class="accountBtn AXButton Green" id="엑셀"><i class="axi axi-file-excel-o"></i>엑셀다운</a>
									</div>
									<div class="ax-clear"></div>
									<div class="H10"></div>
									
									<div id="accountList" style="height: 400px;"></div>
								</div>

							</div>
							<div class="ax-clear"></div>
							<div class="H20"></div>
						</div>
					</div>
					<div class="ax-clear"></div>
				</div>
			</div>
			<!-- e.CXPage -->
	
			</div>
			<div class="ax-clear"></div>
		</div> <!-- e.ax-layer-->
		
	</div> <!-- e.ax-wrap -->
</div> <!-- e.ax-body -->