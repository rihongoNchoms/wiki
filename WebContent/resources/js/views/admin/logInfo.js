/**
 * admin > 로그관리에서 사용
 */
(function() {
	
	function LogInfo() {
		
		/* 
		 * private variables
		 */
		var logList = null;
		var condition = null;
		
		/* 
		 * 초기화 메소드
		 */
		function _init() {
			bindEvent();
			
			// set Condition
			_setInitCondition();
			
			// init Grid
			_setInitLogList();
			
			// 로그 조회
			_findLogList();
		}
		
		// set Condition
		function _setInitCondition() {
			
			// TODO. 타입의 종류를 파악하고
			// 단일 조건이 아닌 다중 조건의 조회조건 레이아웃도 구상할 것......
			var obj = [{
				key: "fromDate",
				label: "시작일",
				type: "date",
				width: 120
			}, {
				key: "toDate",
				label: "종료일",
				type: "date",
				width: 120
			}, {
				key: "userId",
				label: "사용자ID",
				type: "text",
				width: 120
			}, {
				key: "searchType",
				label: "조회타입",
				type: "select",
				selCode: "LOG_SEARCH_TYPE",
				width: 120
			}];
			
			// 조회조건 init
			condition = cfSetSearchCondition(obj, "searchCondition");
		}
		
		// init Grid
		function _setInitLogList() {
			logList = cfInitDynGrid("logList");
		}
		
		// 그리드 데이터 조회 시
		function _findLogList() {
			// set params
			var params = cfSetParameter(condition);
			if(!params) { return false; }
			
			// TODO. 조회 시 스크롤 초기화 및 리스트 클리어 방법 모색 & 프로그레스 바 적용 필요 
			// 로그 데이터 조회
			cfFind(Config.CONTEXT_PATH + "/admin/logInfo/findLogInfo", params, function(data) {
				cfSetGridPagingList(data, logList, 50);
			}, false, "POST");
		}
		
		/* 
		 * 이벤트 바인드
		 */
		function bindEvent() {
			
			// 화면리스트 버튼 클릭 이벤트
			$(".formBtn").on("click", function(e) {
				switch (e.currentTarget.id) {
				case "조회":
					_findLogList();
					break;
				case "엑셀":
					logList.exportExcel("logList.xls");
					break;

				default:
					break;
				}
			});
			
		}
		
		function _finalize() {
		}
		
		return {
            init : _init,
            finalize : _finalize
        };
    };
    
    var logInfo = new LogInfo();
    logInfo.init();
    
})();

//# sourceURL=logInfo.js