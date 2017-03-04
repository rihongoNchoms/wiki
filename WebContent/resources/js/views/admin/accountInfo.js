/**
 * admin > 계정에서 사용
 */
(function() {
	
	function AccountInfo() {
		
		/* 
		 * private variables
		 */
		var formList = null;
		var columnInfoList = null;
		
		/* 
		 * 초기화 메소드
		 */
		function _init() {
			bindEvent();
			
			// 메뉴 조회
			_findGridList();
			// 컬럼정보 그리드 조회
			_findColInfoList();
		}
		
		// 그리드 데이터 추가 시
		function _appendGridList() 
		{
			_fnAddRowFormColList(formList); // 명칭 바꾸어야 함.. 공통으로 뺄 방법을 모색
		}
		
		// 그리드 데이터 조회 시
		function _findGridList() {
			
			formList = cfInitDynGrid("formList", true);
			
			// 화면리스트 조회
			cfFind(Config.CONTEXT_PATH + "admin/formListInfo/findMenuInfo", null, function(data) {
				
				if(data.length > 0) {
					cfSetGridList(data, formList);
				}
				
			}, false);
		}
		
		// 그리드 데이터 저장 시
		function _saveGridList() {
			var obj = cfBeforeSaveGrid(formList);
			
			if(obj.length != 0) {
				cfSave(Config.CONTEXT_PATH + "admin/formListInfo/saveMenuInfo", obj);
			}
		}
		
		// 그리드 데이터 삭제 시
		function _removeGridList() 
		{
			cfGridDeleteRow(formList);
		}
		
		
		// 컬럼정보 그리드 조회
		function _findColInfoList() {
			
			columnInfoList = cfInitDynGrid("columnInfoList", true);
			
			// 화면리스트 조회
			cfFind(Config.CONTEXT_PATH + "admin/formListInfo/findColInfoList", null, function(data) {
				
				if(data.length > 0) {
					cfSetGridList(data, columnInfoList);
					
					// TEST (copy & paste)
					//////////////////////////////////////////////////////
					/*
					document.getElementById(target).addEventListener("paste", function(e) {
						
						var keys = [];
						for(var i = 0; i < colGroup.length; i++) {
							keys[i] = colGroup[i].key;
						}
						
						var clipboardData, pastedData;
						  
					    // Stop data actually being pasted into div
					    e.stopPropagation();
					    e.preventDefault();
					 
					    // Get pasted data via clipboard API
					    clipboardData = e.clipboardData || window.clipboardData;
					    pastedData = clipboardData.getData('Text');
					    
					    // Do whatever with pasteddata
					    var obj = pastedData.split("\n");
					    for(var i = 0; i < obj.length; i++) {
					    	var item = obj[i].split("	");
					    	for(var j = 0; j < item.length; j++) {
					    		myGrid.setValue(0, keys[j], item[j]); // 첫번째 parameter 수정 필요
					    	}
					    }
					});
					*/
				}
				
			}, false);
		}
		
		// 컬럼정보 그리드  데이터 추가 시
		function _appendColInfoList() 
		{
			cfGridAddRow(columnInfoList);
		}
		
		// 컬럼정보 그리드 데이터 삭제 시
		function _removeColInfoList() 
		{
			cfGridDeleteRow(columnInfoList);
		}
		
		// 컬럼정보 그리드 데이터 저장 시
		function _saveColInfoList() {
			var obj = cfBeforeSaveGrid(columnInfoList);
			
			if(obj.length != 0) {
				cfSave(Config.CONTEXT_PATH + "admin/formListInfo/saveColInfoList", obj, function(result) {
					if(result.success) {
						cfShowMessage({
							type: 1,
							msg: "저장되었습니다."
						});
						
						_findColInfoList(); // 그리드 재조회
					} else {
						cfShowMessage({
							type: 2,
							msg: "저장 오류"
						});
					}
				}, true);
			}
		}
		
		// 엑셀 데이터 import 시 
		function _findExcelImportData(subId) {
			var id = "file-" + subId;
			$('input[id=' + id + ']').click();   
		}
		
		// 그리드 컬럼정보 그리드 ROW 추가 시 
		function _fnAddRowFormColList(target) {
			var checkObj = target.getList("selected")[0];
			var orgObj = target.getList();
			var newObj = [];
			
			if(checkObj) {
				// 신규 row를 생성
				var keys = Object.keys(checkObj);
				var newItem = {};
				for(var i = 0; i < keys.length; i++) {
					if(keys[i] == "parentFormId") {
						newItem[keys[i]] = checkObj["formId"];
					} else if(keys[i] == "sortSeq") {
						newItem[keys[i]] = checkObj["sortSeq"] + 1;
					} else if(keys[i] == "useYn") {
						newItem[keys[i]] = 'Y';
					} else {
						newItem[keys[i]] = "";
					}
				}
				newItem["changeColumn"] = "inserted";
				newItem["__index"] = checkObj.__index + 1;
				
				for(var i = 0; i < orgObj.length; i++) {
					if(i == checkObj.__index) {
						newObj.push(orgObj[i]);
						newObj.push(newItem);
					} else if(i > checkObj.__index) {
						orgObj[i].__index = orgObj[i].__index + 1;
						newObj.push(orgObj[i]);
					} else {
						newObj.push(orgObj[i]);
					}
					
				}
				
				target.setData(newObj);
				target.clearSelect();
				target.select(checkObj.__index + 1);
			} else {
				var idx = target.getList().length;
				var keys = Object.keys(target.getList()[idx - 1]);
				var newItem = {};
				
				for(var i = 0; i < keys.length; i++) {
					newItem[keys[i]] = "";
				}
				newItem["changeColumn"] = "inserted";
				
				target.addRow(newItem);
			}
		}
		
		/* 
		 * 이벤트 바인드
		 */
		function bindEvent() {
			
			// 화면리스트 버튼 클릭 이벤트
			$(".formBtn").on("click", function(e) {
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
					formList.exportExcel("formList.xls");
					break;

				default:
					break;
				}
			});
			
			// 그리드 컬럼 정보 버튼 클릭 이벤트
			$(".colInfoBtn").on("click", function(e) {
				switch (e.currentTarget.id) {
				case "조회":
					_findColInfoList();
					break;
				case "추가":
					_appendColInfoList();
					break;
				case "삭제":
					_removeColInfoList();
					break;
				case "저장":
					_saveColInfoList();
					break;
				case "엑셀":
					columnInfoList.exportExcel("columnInfoList.xls");
					break;
				case "importExcel":
					_findExcelImportData(e.currentTarget.id);
					break;
					
				default:
					break;
				}
			});
			
			
			// Excel 파일 데이터 import 기능 
			// import 데이터 파일에 type이 그리드 컬럼 type과 동일해야 함...
			$("#file-importExcel").on("change", function(e) {
				if($("#file-importExcel").val() == null || $("#file-importExcel").val() == "") { return false; }
				var ext = $("#file-importExcel").val().split(".").pop().toLowerCase();
				
				if(ext.length > 0) {
					if(ext != "xls") { 
						alert("xls 파일만 업로드 할수 있습니다.");
						return false; 
					} else {
						cfUpload(Config.CONTEXT_PATH + "admin/formListInfo/fileUpload", "file-importExcel", function(result) {
							// 업로드 완료 시 
							var obj = result["columnInfoList"];
							
							if(obj.length > 0) {
								cfShowMessage({
									type: 1, msg: "업로드 완료!"
								});
								cfGridAddRow(columnInfoList, obj);
								
								// browser version 체크 후 file inputbox 초기화 진행
								var browserType = cfGetBrowser();
								
								if(browserType == "MSIE") {//IE version
							        $("#file-importExcel").replaceWith( $("#file-importExcel").clone(true) );
								} else {// other browser
								    $("#file-importExcel").val("");
								}
							}
							
						});
					}                  
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
    
    var accountInfo = new AccountInfo();
    accountInfo.init();
    
})();

//# sourceURL=formListInfo.js