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
		
		/* 
		 * 초기화 메소드
		 */
		function _init() {
			bindEvent(); // 버튼 등의 component에 이벤트를 삽입
			
			// 메뉴 조회
			_findTreeMenu();
			_findTopMenu();
			
			// 그리드 기능 테스트
			_fnTest();
		}
		
		function _findTreeMenu() {
			// TREE 메뉴 조회
			cfFind(Config.CONTEXT_PATH + "/findTreeMenu", null, function(data) {
				
				if(data.length > 0) {
					fnSetTreeGrid(data, "ui-tree-control-target");
				}
				
			}, false, "POST");
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
		
		function _appendGridList() 
		{
			test004.appendList({ });
		}
		
		function _removeGridList() 
		{
			var selectedList = test004.getSelectedItem();
			if(selectedList.error) 
			{
				cfShowMessage({ type : 2, msg : selectedList.description });
			} 
			else 
			{
				trace(selectedList);
//				test004.removeList(selectedList.item);
				test004.removeListIndex( [{index : 1}] );
				
				
				var obj = test004.getList("C,U,D"); 
				trace(obj);
			}
			
		}
		
		function _findGridList() {
			// 그리드 데이터 조회
			cfFind(Config.CONTEXT_PATH + "/findCrudTest", null, function(data) {
				
//				trace(data);
				if(data.length > 0) {
					cfSetGridList(data, test004);
				}
				
			}, false, "POST");
		}
		
		function _saveGridList() {
			// TEST
			var obj = test004.getList("C,U,D"); // TODO. 제공하는 함수를 그대로 사용해야 하는것인지....... 고민 좀 해보자
			trace(obj);
			if(obj) {
				cfSave(Config.CONTEXT_PATH + "/saveCrudTest", obj, function(response) {
					console.log(response);
				});
			}
		}
		
		
		// 요건 테스트하고 있는 함수지롱~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		function _fnTest() {
			// grid 컬럼 초기화
			test001 = cfInitGrid("test001");
			
			var data = [
			    		{no:1, title:"AXGrid 첫번째 줄 입니다.", writer:"aaa", regDate:"2013-01-18",
			    			desc:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price:123000, amount:0}, // item
			    		{no:2, title:"AXGrid 두번째 줄 입니다.", writer:"bbb", regDate:"2013-01-18",
			    			desc:"myGrid.setList 의 첫번째 사용법 list json 직접 지정 법", price:12300, amount:7}
			    	];
			
			cfSetGridList(data, test001);
			
			test002 = cfInitGrid("test002");
			test002.setList(data);
			
			////////////////////////////////////////////
			test003 = cfInitGrid("test003");
			
			test003.config.colHeadTool= true; // 단일 속성은 적용됨
			test003.config.fixedColSeq = 2; // 틀고정
			test003.config.fitToWidth = true; // 그리드 전체 가로길이 화면 사이즈에 맞추기
			test003.config.mergeCells = [1,1]; 
			test003.config.sort = true; 
			
			test003.config.colHead = {
					rows: [
							[
								{colSeq:0, rowspan:2},
								{colSeq: null, colspan:3, label:"표현식", align:"center"} 
							],
							[
								{colSeq:1},
								{colSeq:2},
								{colSeq:3}
							]
						]
			};
			
			test003.setConfig(test003.config);
//			test003.setHeight(400);
			
			test003.setList(data);

			
			test004 = cfInitGrid("test004");
			_findGridList();
		}
		
		function bindEvent() {
			
			$(".crudBtn").on("click", function(e) {
				e.preventDefault();
				
				switch (e.target.value) {
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

				default:
					break;
				}
				
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