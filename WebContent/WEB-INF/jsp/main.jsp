<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <%@include file="/resources/inc/incCss.jsp" %>
  </head>
<body>
<div id="AXPage">
<%@include file="/resources/inc/top.jsp" %>

<!-- s contents -->
<div class="contents">
	<div class="ax-body">
		<div class="ax-wrap">
	
			<div class="ax-layer ax-title">
				<div class="ax-col-12 ax-content">
					<h1>메인페이지</h1>
					<p class="desc">그리드 출력, 차트 생성 등의 샘플을 표기.</p>
				</div>
				<div class="ax-clear"></div>
			</div>
	
			<div class="ax-layer cxContents">
			
				<div class="ax-col-12 ax-content">
					<div class="ax-unit">
						<div class="ax-box">
							<div class="ax-box-wrap">
								<h1>
									AXGrid 출력
								</h1>
								<p>5. CHART GRID </p>
								<div id="test005" style="height: 300px;"></div>
								
								<p>1. 단순 조회용 일반 그리드</p>
								<p>- 그리드 헤더 및 데이터를 직접 가공하여 전달하는 방식</p>
								<div id="test001" style="height: 300px;"></div>
								<div class="H10"></div>
								
								<p>2. 컬럼 추가 테스트</p>
								<a class="addColTest AXButton Blue">컬럼추가</a>
								<a class="delColTest AXButton Blue">컬럼삭제</a>
								<div class="H10"></div>
								<div id="test002" style="height: 300px;"></div>
								<div class="H10"></div>
								
								<p>3. 컬럼 헤더 스타일 변경 그리드</p>
								<div id="test003" style="height: 300px;"></div>
								<div class="H10"></div>
								
								<p>4. CRUD TEST 그리드</p>
								<div class="tag-result" style="float: right;">
									<a class="crudBtn AXButton" id="조회"><i class="axi axi-check-circle-o"></i>조회</a>
									<a class="crudBtn AXButton Red" id="삭제"><i class="axi axi-trash-o"></i>삭제</a>
									<a class="crudBtn AXButton Green" id="추가"><i class="axi axi-plus-circle"></i>추가</a>
									<a class="crudBtn AXButton Blue" id="저장"><i class="axi axi-save"></i>저장</a>
									<a class="crudBtn AXButton Green" id="엑셀"><i class="axi axi-file-excel-o"></i>엑셀다운</a>
								</div>
								<div class="ax-clear"></div>
								<div class="H10"></div>
								
								<div id="test004" style="height: 300px;"></div>
								<div class="H10"></div>
								
							</div>
						</div>
						<div class="ax-clear"></div>
						<div class="H20"></div>
					</div>
				</div>
				
				<div class="ax-col-12 ax-content">
				
					<div class="ax-unit">
						<div class="ax-box">
							<div class="ax-box-wrap">
								<h1>
									Line + Bar Chart (bar)
								</h1>
								<canvas id="chart-canvas-mix" width="500" height="300" style="width: 400px; min-height: 300px;"></canvas>
<!-- 							<div id="chart-canvas-mix-legend" class="ax-col-12" style="height: 25px;"></div> -->
							</div>
						</div>
						<div class="ax-clear"></div>
						<div class="H20"></div>
					</div>
					
					<div class="ax-unit">
						<div class="ax-box">
							<div class="ax-box-wrap">
								<h1>
									Line Chart (line)
								</h1>
								<canvas id="chart-canvas-line" width="500" height="200" style="width: 400px; min-height: 256px;"></canvas>
							</div>
						</div>
						<div class="ax-clear"></div>
						<div class="H20"></div>
					</div>
					
					<div class="ax-col-6">
						<div class="ax-unit">
							<div class="ax-box">
								<div class="ax-box-wrap">
									<h1>
										Doughnut Chart (doughnut)
									</h1>
									<canvas id="chart-canvas-doughnut" width="500" height="300" style="min-height: 256px;"></canvas>
								</div>
							</div>
							<div class="ax-clear"></div>
							<div class="H20"></div>
						</div>
					</div>
					
					<div class="ax-col-6">
						<div class="ax-unit">
							<div class="ax-box">
								<div class="ax-box-wrap">
									<h1>
										Pie Chart (pie)
									</h1>
									<canvas id="chart-canvas-pie" width="500" height="300" style="min-height: 256px;"></canvas>
								</div>
							</div>
							<div class="ax-clear"></div>
							<div class="H20"></div>
						</div>
					</div>
					
					<div class="ax-col-6">
						<div class="ax-unit">
							<div class="ax-box">
								<div class="ax-box-wrap">
									<h1>
										Radar Chart (radar)
									</h1>
									<canvas id="chart-canvas-radar" width="500" height="300" style="min-height: 256px;"></canvas>
								</div>
							</div>
							<div class="ax-clear"></div>
							<div class="H20"></div>
						</div>
					</div>
					
					<div class="ax-col-6">
						<div class="ax-unit">
							<div class="ax-box">
								<div class="ax-box-wrap">
									<h1>
										Polar Area Chart (polarArea)
									</h1>
									<canvas id="chart-canvas-polarArea" width="500" height="300" style="min-height: 256px;"></canvas>
								</div>
							</div>
							<div class="ax-clear"></div>
							<div class="H20"></div>
						</div>
					</div>
					
					<div class="ax-unit">
						<div class="ax-box">
							<div class="ax-box-wrap">
								<h1>
									Bubble Chart (bubble)
								</h1>
								<canvas id="chart-canvas-bubble" width="500" height="200" style="min-height: 256px;"></canvas>
							</div>
						</div>
						<div class="ax-clear"></div>
						<div class="H20"></div>
					</div>
					
				</div> 
				<!-- e : ax-col-12 ax-content -->
			</div> 
			<!-- e: ax-layer cxContents -->			
		</div>
		<!-- e : ax-wrap -->
	</div>
    <!-- e : ax-body -->
    
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
	<script type="text/javascript" src="resources/js/common/navi.js"></script>
	<script type="text/javascript" src="resources/js/common/util.js"></script>
    <script type="text/javascript" src="resources/js/views/index.js"></script>
  </body>
</html>