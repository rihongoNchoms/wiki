/***********************************************************************************************
 * 
 * index.js
 * main.jsp에서 사용하는 스크립트를 정리
 * - 상단 메뉴를 테이블에서 조회 후 출력해준다.
 * - 관리자 로그인 유무에 따라 관리자용 메뉴를 출력해준다.
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
(function() {
	
	function Index() {
		
		/* 
		 * private variables
		 */
		var test001 = null;
		var test002 = null;
		var test003 = null;
		var test004 = null;
		var test005 = null;
		
		/* 
		 * 초기화 메소드
		 */
		function _init() {
			bindEvent(); // 버튼 등의 component에 이벤트를 삽입
			
			// 메뉴 조회
			_findTopMenu();
			
			// TODO. 이하 모든 함수는 main.js 로 이동할 것.
			// 그리드 기능 테스트
			var currentUrl = document.location.href;
			if(currentUrl.indexOf('#') < 0) {
				_fnTest();
				
				_fnDrawChart();
			}
		}
		
		function _fnDrawChart() {
			
			// TEST DATA
			var randomScalingFactor = function(){ return Math.round(Math.random()*100) + 0.5};
			var testData = [];
			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
//			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
			testData.push([randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]);
			testData.push([randomScalingFactor()+40,randomScalingFactor()+40,randomScalingFactor()+40,randomScalingFactor()+40,randomScalingFactor()+40,randomScalingFactor()+40,randomScalingFactor()+40]);
			
			var mixData = {
					type: "bar", // 필수
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], // [] array 형태로 전달
						data: testData, // [] array 형태로 전달
						seriesName: ["aaa", "bbb"], // [] array 형태로 전달
						type: ["line", "bar"] // 혼합일 때만 사용
					}, // chartOption은 필수 입력 값 (labels, data)
					yAxisOption: [{
						title: "Test Y",
						tickFormatNum: 2
					}, {
						title: "Test Y2",
						tickFormatNum: 2
					}],
					xAxisOption: [{
						title: "Test X"
					}]
			};
			
			cfDrawChart(mixData, "chart-canvas-mix");
			
			var lineData = {
					type: "line",
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], 
						data: testData, 
						seriesName: ["aaa", "bbb"] 
					},
					yAxisOption: [{
						title: "Test Y",
						tickFormatNum: 2
					}]
			};
			
			cfDrawChart(lineData, "chart-canvas-line");
			
			var donutData = {
					type: "doughnut",
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], 
						data: [testData[0]], 
						seriesName: ["aaa"] 
					}
			};
			
			cfDrawChart(donutData, "chart-canvas-doughnut");
			
			
			var pieData = {
					type: "pie",
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], 
						data: [testData[0]], 
						seriesName: ["aaa"] 
					}
			};
			
			cfDrawChart(pieData, "chart-canvas-pie");
			
			var radarData = {
					type: "radar",
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], 
						data: testData, 
						seriesName: ["aaa", "bbb"] 
					}
			};
			
			cfDrawChart(radarData, "chart-canvas-radar");
			
			var polarAreaData = {
					type: "polarArea",
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], 
						data: [testData[1]], 
						seriesName: ["aaa", "bbb"] 
					}
			};
			
			cfDrawChart(polarAreaData, "chart-canvas-polarArea");
			
			var bubbleData = {
					type: "bubble",
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], 
						data: testData, 
						seriesName: ["aaa", "bbb"] 
					}
			};
			
			cfDrawChart(bubbleData, "chart-canvas-bubble");
			
		}
		
		function _findTopMenu() {
			var loginInfo = '';
			if($("#ax-loginfo .account")[0]) {
				loginInfo = $("#ax-loginfo .account")[0].innerText;
			}
			
			// TOP 메뉴 조회
			cfFind(Config.CONTEXT_PATH + "/findTopMenu", null, function(data) {
				
				if(data.length > 0) {
					var menu = convertTree_c(data, "pno", "no");
					if(loginInfo) {
						menu.push({
							no: "100",
							label: "화면관리",
							url: "#/admin/formListInfo"
						}, {
							no: "101",
							label: "계정관리",
							url: "#/admin/accountInfo"
						}, {
							no: "102",
							label: "로그관리",
							url: "#/admin/logInfo"
						});
					}
					fnSetTopMenu(menu, "ax-top-menu");
				}
				
			}, false, "POST");
		}
		
		// 그리드 데이터 추가 시
		function _appendGridList() 
		{
			cfGridAddRow(test004);
		}
		
		// 그리드 데이터 조회 시
		function _findGridList() {
			// 그리드 데이터 조회 (callback 함수를 직접 입력 시)
			cfFind(Config.CONTEXT_PATH + "/findCrudTest", null, function(data) {
				if(data.length > 0) {
					// 일반 그리드
					cfSetGridList(data, test003);
					// 페이징 그리드 
					cfSetGridPagingList(data, test004, 2);
				}
				
			}, false, "POST");
		}
		
		// 그리드 데이터 저장 시
		function _saveGridList() {
			var obj = cfBeforeSaveGrid(test004);
			
			if(obj.length != 0) {
				cfSave(Config.CONTEXT_PATH + "/saveCrudTest", obj);
			}
		}
		
		// 그리드 데이터 삭제 시
		function _removeGridList() 
		{
			cfGridDeleteRow(test004);
		}
		
		// 엑셀 다운
		function _excelGridList() {
			test004.exportExcel("test.xls");
		}
		
		function _addColumnGrid() {
			var obj = [{
				key: "b",
				label: "필드B"
			}, {
				key: "c",
				label: "필드C"
			}];
			
			test002.addColumn(obj);
		}
		
		// 요건 테스트하고 있는 함수지롱~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function _fnTest() {
			// 1. grid 컬럼 및 데이터를 직접 입력 시
			var colObj = [{
				key: "no",
				colSeq: 0,
				label: "NO.",
				width: 100,
				align: "center"
			}, {
				key: "title",
				colSeq: 1,
				label: "TITLE.",
				width: 200,
				align: "left"
			}, {
				key: "writer",
				colSeq: 2,
				label: "WRITER.",
				width: 100,
				align: "center"
			}, {
				key: "date",
				colSeq: 3,
				label: "DATE.",
				width: 100,
				align: "center"
			}];
			
			test001 = cfInitGrid("test001", colObj, true);
			
			var data = [{no:1, title:"AXGrid 첫번째 줄 입니다.", writer:"aaa", date:"2013-01-18",
			    			desc:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price:123000, amount:0},
			    		{no:1, title:"AXGrid 첫번째 줄 입니다.", writer:"aaa", date:"2013-01-19",
			    			desc:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price:12300, amount:7},
		    			{no:1, title:"AXGrid 두번째 줄 입니다.", writer:"bbb", date:"2013-01-18",
		    				desc:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price:12300, amount:7},
		    			{no:2, title:"AXGrid 두번째 줄 입니다.", writer:"ccc", date:"2013-01-18",
		    				desc:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price:12300, amount:7}
			    	   ];
			
			cfSetGridList(data, test001);
			
			// 2.
			var data2 = [{no2:1, title2:"AXGrid 첫번째 줄 입니다.", writer2:"aaa", date2:"2013-01-18",
    			desc2:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price2:123000, amount:0},
    			{no2:2, title2:"AXGrid 두번째 줄 입니다.", writer2:"bbb", date2:"2013-01-18",
        			desc2:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price2:123000, amount:0}
    	    ];
			
			test002 = cfInitDynGrid("test002");
			cfSetGridList(data2, test002);

			// 3.
			test003 = cfInitDynGrid("test003");
			
			// 4.
			test004 = cfInitDynGrid("test004", true);
			_findGridList();
			
			
			var colObj5 = [];
			
			for(var i = 0; i < 31; i++) {
				colObj5.push({
					key: "col" + i,
					colSeq: 0,
					label: " ",
					width: 30,
					align: "center"
				});
			}
			
			var testObj = [{
				label : "11",
				align: "center"
			},{
				label : "22",
				align: "center"
			},{
				label : "33",
				align: "center"
			},{
				label : "44",
				align: "center"
			}];
			
			test005 = cfInitGrid("test005", colObj5, false, testObj);
			for(var i = 0; i < 10; i++) {
				test005.addRow({});
			}
		}
		
		/* 
		 * 이벤트 바인딩
		 */
		function bindEvent() {
			
			$(".crudBtn").on("click", function(e) {
				switch (e.currentTarget.id) {
				case "조회":
					_findGridList();
					break;
				case "추가":
					_appendGridList();
					break;
				case "삭제":
					_removeGridList();
					break;
				case "저장":
					_saveGridList();
					break;
				case "엑셀":
					_excelGridList();
					break;

				default:
					break;
				}
			});
			
			$(".addColTest").on("click", function(e) {
				_addColumnGrid();
			});
			
			$(".delColTest").on("click", function(e) {
				test002.removeColumn();
			});
			
		}
		
		function _finalize() { // TODO. finalize 함수가 필요한 것인지 확인.
		}
		
		return {
            init : _init,
            finalize : _finalize
        };
    };
    
    var index = new Index();
    index.init();
    
})();

//# sourceURL=index.js