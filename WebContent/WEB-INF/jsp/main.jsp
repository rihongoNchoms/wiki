<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <%@include file="/resources/inc/incCss.jsp" %>
  </head>
<body>
<div id="AXPage">
<%@include file="/resources/inc/top.jsp" %>
	
<div class="contents">
	<div class="ax-body">
			<div class="ax-wrap">
	
				<div class="ax-layer ax-title">
					<div class="ax-col-12 ax-content">
						<h1>Axisj 샘플</h1>
						<p class="desc">그리드 표시 방법 등 기타 컴포넌트 사용방법에 대해 표기.</p>
					</div>
					<div class="ax-clear"></div>
				</div>
	
				<div class="ax-layer">
					<div class="ax-col-12 ax-content">
	
						<!-- s.CXPage -->
						<div id="CXPage">
							<div class="ax-layer">
								<div class="ax-col-12">
									<div class="ax-unit">
										<div class="ax-box sample-01">
											<div class="ax-box-wrap">
												<h1>
													Tree Grid test
													<a href="#" class="more">more <i class="axi axi-external-link-square"></i></a>
												</h1>
												
												<div id="ui-tree-control-target" class="axisj-ui" style="height:200px;"></div>
											</div>
										</div>
										<div class="ax-clear"></div>
										<div class="H20"></div>
									</div>
								</div>
								<div class="ax-col-12">
									<div class="ax-unit">
										<div class="ax-box">
											<div class="ax-box-wrap">
												<h1>
													AXGrid 출력
													<a href="#" class="more">more <i class="axi axi-external-link-square"></i></a>
												</h1>
												<p>1. 단순 조회용 일반 그리드</p>
												<div id="test001" style="height: 150px;"></div>
												<p>2. inline edit 그리드</p>
												<div id="test002" style="height: 150px;"></div>
												<p>3. 컬럼 헤더 스타일 변경 그리드</p>
												<div id="test003" style="height: 150px;"></div>
												
												<p>4. CRUD TEST 그리드</p>
												<input type="button" value="조회" class="AXButton crudBtn" />
												<input type="button" value="추가" class="AXButton crudBtn" />
												<input type="button" value="삭제" class="AXButton crudBtn" />
												<input type="button" value="저장" class="AXButton crudBtn" />
												<div id="test004" style="height: 150px;"></div>
											</div>
										</div>
										<div class="ax-clear"></div>
										<div class="H20"></div>
									</div>
								</div>
								<div class="ax-clear"></div>
							</div>
	
							<div class="ax-layer">
								<div class="ax-col-12">
									<div class="ax-unit">
										<div class="ax-box">
											<div class="ax-box-wrap">
												<h1>
													Chart Doughnut
													<a href="#" class="more">more <i class="axi axi-external-link-square"></i></a>
												</h1>
												<p>Chart.js를 이용한 차트 Canvas태그를 사용가능해야 합니다.</p>
												<canvas id="chart-canvas-doughnut" height="200" style="min-height: 256px;"></canvas>
											</div>
										</div>
										<div class="ax-clear"></div>
										<div class="H20"></div>
									</div>
								</div>
								<div class="ax-col-12">
									<div class="ax-unit">
										<div class="ax-box">
											<div class="ax-box-wrap">
												<h1>
													Chart Line
													<a href="#" class="more">more <i class="axi axi-external-link-square"></i></a>
												</h1>
												<p>Chart.js를 이용한 차트 Canvas태그를 사용가능해야 합니다.</p>
												<canvas id="chart-canvas-line" height="200" style="min-height: 256px;"></canvas>
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
	
			</div>
	</div>
    <!-- e ax-body -->
    
    <!-- 좌측 퀵 메뉴 : s-->
	<div class="ax-aside">
	    <div class="ax-layer ax-aside-menu-box">
	        <a class="ax-aside-menu"><i class="axi axi-angle-double-right fa-lg"></i><i class="axi axi-angle-double-left fa-lg"></i></a>
	    </div>
	    <div class="ax-layer ax-aside-box">
	        <div class="ax-unit">
	            <div class="ax-box">
	                <h3>바로가기</h3>
	                <ul class="ax-aside-ul" id="ax-aside-ul"></ul>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- e : 좌측 퀵 메뉴-->
</div> <!-- e contents -->

    <!-- include footer -->
	<%@include file="/resources/inc/footer.jsp" %>

</div>	
<%@include file="/resources/inc/incJs.jsp" %>
    <script type="text/javascript" src="resources/js/common/common.js"></script>
	<script type="text/javascript" src="resources/js/common/navi.js"></script>
	<script type="text/javascript" src="resources/js/common/util.js"></script>
    <script type="text/javascript" src="resources/js/views/index.js"></script>
  </body>
</html>