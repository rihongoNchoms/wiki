<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>	

<!-- ax-col-12 에 ax-content 클래스를 제거한 경우 
사이드 메뉴가 없어진 상태의 확장된 화면을 보여준다 -->

<div class="ax-body">
	<div class="ax-wrap">
		<div class="ax-layer ax-title">
			<div class="ax-col-12">
				<h1>관리자 > 화면관리</h1>
				<p class="desc">관리자용 > 화면 리스트를 관리한다.</p>
			</div>
			<div class="ax-clear"></div>
		</div>
	
		<div class="ax-layer">
			<div class="ax-col-12">
	
			<!-- s.CXPage -->
			<div id="CXPage">
				<div class="ax-layer">
					<div class="ax-col-12">
						<div class="ax-unit">
							<div class="ax-box sample-01">
								<div class="ax-box-wrap">
									<h1>
										화면 리스트
									</h1>
									<div id="formList" class="axisj-ui" style="height:400px;"></div>
									<div class="H10"></div>
									
									<div>
						                <input type="button" value="추가" class="AXButton" />
						                <input type="button" value="자식추가" class="AXButton" />
						                <input type="button" value="선택삭제" class="AXButton" />
						                <input type="button" value="수정" class="AXButton" />
						                |
						                <input type="button" value="위로" class="AXButton"/>
						                <input type="button" value="아래로" class="AXButton" />
						                <input type="button" value="이동하기" class="AXButton" />
						            </div>
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
		</div>
	</div> <!-- e.ax-wrap -->
</div> <!-- e.ax-body -->