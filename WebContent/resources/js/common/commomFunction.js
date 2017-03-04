/* 
*------------------------------------------------------------------------------
* NAME : commonFunction.js
* DESC : 공통 자바스크립트 
* PROJ : 
* Copyright 2017 ...
*------------------------------------------------------------------------------
*                  변         경         사         항
*------------------------------------------------------------------------------
*    DATE     AUTHOR       DESCRIPTION
* ----------  ------  ---------------------------------------------------------
* 2017.02.01  조민수          최초개발
*------------------------------------------------------------------------------
*/
/**
 * @type : intro
 * @desc : AxisJ / Ax5ui(그리드 만 해당)을 이용한 컴포넌트 생성 및 이벤트 처리 등을 위한 
 * 공통함수를 기술하는 페이지 
 * 전 페이지에서 공통으로 사용하는 스크립트 함수를 아래에 기술
 * Axisj 참고 url 위에서 아래로 우선순위로 체크
 * http://jdoc.axisj.com/
 * http://dev.axisj.com/index.html
 * http://axisj.github.io/axisj-about/docs/chapter2.html#
 * 
 * Ax5ui grid 참고 > 컴포넌트 중 그리드만 아래 라이브러리를 사용
 * 그리드 툴만 아래 라이브러리로 진행..
 * http://ax5.io/ax5ui-grid/
 * 
 * 함수 Naming Rule은 다음과 같다.
 * <pre>
 *     - cf  : common function
 *     - fn	 : general function
 *     - co  : common object
 *     - cov : common object for validation
 *     - _XX : internal function
 * </pre>
 * 
 */

/***********************************************************************************************
 * 
 * cfShowMessage
 * @param obj : {title: "", type: 1, msg: ""} 형태로 전달
 * @author mscho
 * @since 2017-02-09
 * @desc 알림창 메시지 출력용 1 : 완료알림, 2: 경고알림, 3: 위험알림
 * 
 ***********************************************************************************************/
function cfShowMessage(obj) {
	var type = "";
	var title = "";
	
	switch (obj.type) {
	case 1:
		type = "Complete";
		title = "완료 알림";
		break;
	case 2:
		type = "Warning";
		title = "알림";
		break;
	case 3:
		type = "Caution";
		title = "경고 알림";
		break;

	default:
		break;
	}
	
	dialog.push({
		title: title || "시스템 알림",
		type: type, 
		body: obj.msg
	});
}

/***********************************************************************************************
 * 
 * cfInitGrid
 * @desc GRID - 전달받은 컬럼 데이터를 통한 그리드 초기화 렌더러
 * @param target - 그리드 출력 대상
 * @param colGroup - 컬럼 정보가 담긴 object
 * @param rowSelector - 그리드 옵션
 * @param DESCRIPTION - 출력대상 : 개발자가 직접 가공한 데이터를 전달
 *  - target 정보는 "대상target" 형식으로 전달한다.
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function cfInitGrid(target, colGroup, rowSelector, footGroup) {
	// 필수 태그를 그리드 초기화 시 세팅
	$("#" + target).attr("data-ax5grid", target);
	
	if(colGroup == null) {
		cfShowMessage({ type: 3, msg: "전달된 오브젝트가 없습니다."});
		return false;
	}
	
	// 2. 그리드 default options 설정
	var myGrid = new ax5.ui.grid();
	myGrid.setConfig({
		target: $('#' + target), 
		showRowSelector: (rowSelector) ? true : false,
		showLineNumber: (rowSelector) ? true : false,
		rowSelectorColumnWidth: 30,
		header: {
	        align: "center",
	        columnHeight: 30 // default 28
	    },
	    body: {
	    	onClick: function () { // grid body 영역 클릭 시
            },
            onDataChanged: function() { // grid cell 데이터 수정 시
            },
            mergeCells: true,
	    	columnHeight: 30 // default 28
	    },
        onLoad: function() {
        },
		columns: (colGroup.length < 0) ? null : colGroup,
		footSum: (footGroup && footGroup.length < 0) ? null : [footGroup]
	});
	
	return myGrid;
}

/***********************************************************************************************
 * 
 * cfInitDynGrid
 * @desc GRID - 저장된 컬럼 데이터를 통한 그리드 초기화 렌더러
 * @param target 대상 그리드
 * @param rowSelector row 체크박스 유무를 true / false 로 전달 (default false)
 * @param DESCRIPTION - 출력대상 (해당 코드를 기준으로 컬럼 정보를 DB에서 조회한 후 세팅)
 *  - target 정보는 "대상target" 형식으로 전달한다.
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function cfInitDynGrid(target, rowSelector) {
	
	// 필수 태그를 그리드 초기화 시 세팅
	$("#" + target).attr("data-ax5grid", target);
	
	// 1. 컬럼 list 조회한 후 세팅 (DB에서 조회할 내용임)
	var params = {
			target : target
	};
	
	// grid default option
	var colGroup = [];
	
	cfFind(Config.CONTEXT_PATH + "/comm/findGridColInfo", params, function(data) {
		
		if(data.length > 0) {
			// 1. 그리드 head init
			colGroup = _cfSetGridInfo(data);
		}
		
	}, true, "POST"); // sync
	
	// 2. 그리드 default options 설정
	var myGrid = new ax5.ui.grid();
	myGrid.setConfig({
		target: $('#' + target),   //		target: $('[data-ax5grid=' + target + ']'),
		showRowSelector: (rowSelector) ? true : false,
		showLineNumber: (rowSelector) ? true : false,
		rowSelectorColumnWidth: 30,
		header: {
	        align: "center",
	        columnHeight: 30 // default 28
	    },
	    body: {
	    	onClick: function () {
	    		if(rowSelector) {
	    			this.self.select(this.dindex);
	    		}
            },
            onDataChanged: function() {
            },
            mergeCells: true,
	    	columnHeight: 30 // default 28
	    },
        onLoad: function() {
        },
		columns: (colGroup.length < 0) ? null : colGroup
	});
	
	return myGrid;
}

/***********************************************************************************************
 * 
 * _cfSetGridInfo 
 * @desc 조회된 컬럼 정보를 colGroup option 형태로 가공하여 전달한다.
 * @param data : 조회된 컬럼 정보
 * @param DESCRIPTION
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function _cfSetGridInfo(data) {
	if(data != null) {
		var colGroup = [];
		
		for(var i = 0; i < data.length; i++) {
			var setColList = {};
			
			setColList.key = (checkTextCase(data[i]["COL_ID"]) > -1) ? getCamelCase(data[i]["COL_ID"]) : data[i]["COL_ID"].toLowerCase(); // camelCase 형태로 변환 필요
			setColList.colSeq = i;	// column sequence index
			setColList.label = data[i]["COL_NAME"] || "-"; // column label 
			setColList.width = parseInt(data[i]["COL_WIDTH"]) || 100; // column width 
			setColList.align = (data[i]["COL_ALIGN"] == "0") ? "left" : (data[i]["COL_ALIGN"] == "1") ? "center" : "right"; // column align
			setColList.sortable = (data[i]["SORT_ABLE"] == "1") ? true : false; // column sort 
			
			if(data[i]["COL_EDITOR"] != null) {
				var type = "";
				switch (data[i]["COL_EDITOR"]) {
				case 1:
					type = "text";
					break;
				case 2:
					type = "number";
					setColList.formatter = "money"; // formatter
					break;
				case 3:
					type = "date";
					break;
				case 4:
					type = "select";
					break;
				default:
					type = "";
					break;
				}
				
				setColList.editor = {
					type : type
				}
				
				// TODO. combo value 처리할 것..
				if(data[i]["COL_ID"] == "USE_YN" || data[i]["COL_ID"] == "useYn"
					|| data[i]["COL_ID"] == "SORT_ABLE" || data[i]["COL_ID"] == "sortAble") { // USE_YN, SORT_ABLE option
					setColList.editor = Config.CMB_USEYN;
					setColList.formatter = function() {
						
						var obj = Config.CMB_USEYN.config.options;
						if(obj.length > 0) {
							for(var i = 0; i < obj.length; i++) {
								if(obj[i]["CD"] == this.value) {
									return obj[i]["NM"];
								} 
							}
						}
						
						return this.value;
					}
				} else if(data[i]["COL_ID"] == "COL_EDITOR" || data[i]["COL_ID"] == "colEditor") { // COL_EDITOR option
					setColList.editor = Config.CMB_EDITOR_TYPE;
					setColList.formatter = function() {
						
						var obj = Config.CMB_EDITOR_TYPE.config.options;
						if(obj.length > 0) {
							for(var i = 0; i < obj.length; i++) {
								if(obj[i]["CD"] == this.value) {
									return obj[i]["NM"];
								}
							}
						}
						
						return this.value;
					}
				} else if(data[i]["COL_ID"] == "COL_ALIGN" || data[i]["COL_ID"] == "colAlign") { // COL_ALIGN option
					setColList.editor = Config.CMB_COL_ALIGN;
					setColList.formatter = function() {
						
						var obj = Config.CMB_COL_ALIGN.config.options;
						if(obj.length > 0) {
							for(var i = 0; i < obj.length; i++) {
								if(obj[i]["CD"] == this.value) {
									return obj[i]["NM"];
								}
							}
						}
						
						return this.value;
					}
				}
			}
			
			colGroup.push(setColList);
		}
	}
	
	return colGroup;
}

/***********************************************************************************************
 * 
 * cfSetGridList
 * @param list : 출력할 데이터
 * @param target : 출력대상 (객체 정보를 그대로 전달)
 * @param DESCRIPTION
 * @desc GRID - 그리드 데이터를 세팅, target 정보는 객체 정보를 그대로 전달한다.
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function cfSetGridList(list, target) {
	if(!target) {
		return false;
	}
	for(var i = 0; i < list.length; i++) {
		list[i].changeColumn = "";
	}
	if(list) {
		target.keyDown("KEY_DOWN", function() {
		});
		target.setData(list);
	}
}

/***********************************************************************************************
 * 
 * cfSetGridPagingList
 * GRID - 페이징이 포함된 그리드 호출 시 사용
 * @param list : 출력할 데이터
 * @param target : 출력대상 (객체 정보를 그대로 전달)
 * @param count : 한 페이지에 출력할 리스트 갯수를 전달
 * @desc
 * 2017-02-15 mscho
 * 
 ***********************************************************************************************/
function cfSetGridPagingList(list, target, count) {
    target.config.page = {
		navigationItemCount: 10,
        height: 30,
        display: true,
        firstIcon: '<i class="axi axi-step-backward" aria-hidden="true"></i>',
        prevIcon: '<i class="axi axi-ion-arrow-left-b" aria-hidden="true"></i>',
        nextIcon: '<i class="axi axi-ion-arrow-right-b" aria-hidden="true"></i>',
        lastIcon: '<i class="axi axi-step-forward" aria-hidden="true"></i>',
        onChange: function () {
        	_fnSetPagingData(target, target.page.selectPage, list, target.page.pageSize);
        }
    };
    
    // 최초 호출
	_fnSetPagingData(target, 0, list, count);
}

/***********************************************************************************************
 * 
 * cfSetSearchCondition
 * 조회조건 동적 생성하여 화면에 출력
 * @param list : 출력할 조회조건 object
 * @param target : 출력대상 
 * @desc list 전달 형태 - key, label, type 필수 || width default는 110 -> 배열 형태로 전달
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
				type: "selector",
				selCode: "LOG_SEARCH_TYPE",
				width: 120
			}];
 * 2017-03-03 mscho
 * 
 ***********************************************************************************************/
function cfSetSearchCondition(list, target) {
	if(!list) { return false; }
	
	var setList = [];
	for(var i = 0; i < list.length; i++) {
		setList.push({
			label        : list[i].label || "조건 " + (i+1),
			labelWidth   : "",
			width        : list[i].width || "110",
			key          : list[i].key,
			addClass     : "secondItem",
			valueBoxStyle: "",
			type         : (list[i].type == "select") ? "selectBox" : "inputText",
		    value        : "",
			AXBind       : {
				type: list[i].type
			}
		});
		
		// default value setting
		switch (list[i].type)
		{
		case "date":
			setList[i].value = (list[i].key == "fromDate") ? "2016-12-31" : "2017-03-02";
			break;
		case "text":
			setList[i].value = "";
			break;
		case "select":
			setList[i].options = Config[list[i].selCode];
			setList[i].AXBind.config = Config[list[i].selCode];
			break;
			
		default:
			break;
		}
		
	}
	
	var condition = new AXSearch();
	
	condition.setConfig({
		targetID: target,
		theme : "AXSearch",
		rows:[{
			display: true, addClass: "", style: "", list: setList
		}]
	});
	
	return condition;
}

/***********************************************************************************************
 * 
 * _fnSetPagingData 
 * - 페이징 그리드 세팅을 위한 함수
 * @param target : 대상 그리드
 * @param pageNo : 현재 클릭한 페이지 (0부터 1씩 증가값이 전달됨)
 * @param data : 전체 data
 * @param count : 한페이지에 출력될 데이터 갯수
 * @param DESCRIPTION
 * 2017-02-15 mscho
 * 
 ***********************************************************************************************/
function _fnSetPagingData(target, pageNo, data, count) {
	var _pageNo = pageNo;
	var _count = count || 50;
	
	var list = [];
    for (var i = 0; i < count; i++) {
    	var idx = (_pageNo * count) + i;
    	list.push(data[idx]);  
    }
    
    target.setData({
        list: list,
        page: {
            currentPage: _pageNo || 0,
            pageSize: _count,
            totalElements: data.length,
            totalPages: Math.ceil(data.length / _count)
        }
    });
    
    return target;
}

/***********************************************************************************************
 * 
 * cfBeforeSaveGrid
 * CRUD 그리드 수정 저장 전 validation check 및 변경된 리스트를 object로 return
 * @param target
 * @param DESCRIPTION
 * 2017-02-14 mscho
 * 
 ***********************************************************************************************/
function cfBeforeSaveGrid(target) {
	var obj = null;
	var obj_m = null;
	
	if(target) {
		obj = target.getList("deleted");
		obj_m = target.getList("modified");
	}
	
	for(var i = 0; i < obj.length; i++) {
		obj[i].deleted = true;
	}
	
	for(var i = 0; i < obj_m.length; i++) {
		obj_m[i].modified = true;
	}
	
	for(var i = 0; i < obj_m.length; i++) {
		obj.push(obj_m[i]);
	}
	
	if(obj.length < 1) {
		cfShowMessage({
			type: 2,
			msg: "변경된 사항이 없습니다."
		});
	}
	
	return obj;
}

/***********************************************************************************************
 * 
 * _cfBeforeDeleteGrid
 * CRUD 그리드 리스트 삭제 전 체크된 리스트가 있는지 확인
 * @param target
 * @param DESCRIPTION
 * 2017-02-14 mscho
 * 
 ***********************************************************************************************/
function _cfBeforeDeleteGrid(target) {
	var obj = null;
	
	if(target) {
		obj = target.getList("selected");
	}
	
	if(obj.length < 1) {
		cfShowMessage({
			type: 2,
			msg: "선택한 항목이 없습니다."
		});
	}
	
	return obj;
}

/***********************************************************************************************
 * 
 * cfGridAddRow
 * GRID - row 추가 시 사용
 * @param target 대상 그리드
 * @param obj row 추가 시 직접 입력할 데이터가 있는 경우에 사용
 * @param DESCRIPTION
 * 2017-02-16 mscho
 * 
 ***********************************************************************************************/
function cfGridAddRow(target, obj) {
	var idx = target.getList().length;
	var keys;
	var newItem = {};
	
	if(idx == 0) {
		keys = Object.keys(target.columns[0]);
	} else {
		keys = Object.keys(target.getList()[idx - 1]);
	}
	
	if(!obj) {
		for(var i = 0; i < keys.length; i++) {
			newItem[keys[i]] = "";
		}
		newItem["changeColumn"] = "inserted";
	} else {
		for(var i = 0; i < obj.length; i++) {
			obj[i].changeColumn = "inserted";
			obj[i].__modified__ = true;
		}
		
		newItem = obj;
	}
	
	target.addRow(newItem);
}

/***********************************************************************************************
 * 
 * cfGridDeleteRow
 * GRID - row 삭제 시 사용 : 체크박스 체크한 row 나 선택된 row에 한해서만 삭제가 이루어지도록 함
 * @param target 대상 그리드
 * @param DESCRIPTION
 * 2017-02-16 mscho
 * 
 ***********************************************************************************************/
function cfGridDeleteRow(taget) {
	var obj = _cfBeforeDeleteGrid(taget);
	
	if(obj.length != 0) {
		taget.deleteRow("selected");
	}
}

/***********************************************************************************************
 * 
 * cfSetParameter
 * 조회조건 파라미터 생성
 * @param target - 조회조건 대상 폼
 * @param DESCRIPTION
 * 2017-03-03 mscho
 * 
 ***********************************************************************************************/
function cfSetParameter(target) {
	if(!target) { return false; }
	var params = target.getParam();
	
	/*
	for(var i = 0; i < target.AXBinds.length; i++) {
		var type = target.AXBinds[i].item.AXBind.type;
		
		if(type == "selector") {
			var key = target.AXBinds[i].item.key;
			
			var id = target.getItemId(key);
			if(id) {
				params[key] = $("#" + id).val();
			}
		}
	}
	*/
	
	params = params.queryToObject();
	
	return params;
}

/***********************************************************************************************
 * 
 * fnSetTreeGrid
 * TREE GRID - 트리형태의 데이터를 그리드 레이아웃에 출력하고자 할 때 사용 
 * @param list
 * @param target
 * @param DESCRIPTION
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function fnSetTreeGrid(list, target) {
	var config = {
			targetID : target,
			theme: "AXTree",
			relation:{
				parentKey: "pno",
				childKey: "no",
				openKey: "open"
			},
			showConnectionLine: true,
			colGroup: [
				{key:"formId", label:"ID.", width:"100", align:"left"},
				{
					key:"label", label: "NAME.", width: "200", indent:true,
					getIconClass: function(){
						return {
							addClass:"userHtml",
							html: ((this.item.__subTreeLength > 0) ? '<i class="axi axi-folder-open"></i>' : '<i class="axi axi-file"></i>')
						};
					},
					formatter:function() {
						return this.item.label;
					}
				},
				{key:"parentFormId", label:"Parent ID.", width:"100", align:"left"},
				{key:"url", label:"URL.", width:"100", align:"left"},
				{key:"useYn", label:"USEYN.", width:"100", align:"left"}]
				, colHead: {
					display:true
				}
			};
	var myTree = new AXTree();
	myTree.setConfig(config);
	myTree.setList(list);
	return myTree;
}


/************************************************************************************************
 * 
 * fnSetTopMenu
 * TOP MENU TREE (메인화면)
 * @param DESCRIPTION
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function fnSetTopMenu(list, target) {
	var topMenu = new AXTopDownMenu();
	var mobileMenu = new AXMobileMenu();
	
	topMenu.setConfig({
        targetID: target,
        parentMenu: {
            className: "parentMenu"
        },
        childMenu: {
            className: "childMenu",
            hasChildClassName: "expand", // script 방식에서만 지원 됩니다.
            align: "center",
            valign: "top",
            margin: {top: 0, left: 0},
            arrowClassName: "varrow2",
            arrowMargin: {top: 1, left: 0}
        },
        childsMenu: {
            className: "childsMenu",
            hasChildClassName: "expand",
            align: "left",
            valign: "top",
            margin: {top: -4, left: 0},
            arrowClassName: "harrow",
            arrowMargin: {top: 13, left: 1}
        },
        onComplete: function () {
            if (window.page_menu_id) topMenu.setHighLightOriginID(window.page_menu_id);
        }
    });
    topMenu.setTree(list);

    axdom("#mx-top-menu-handle").bind("click", function () {
        mobileMenu.open();
    });

    mobileMenu.setConfig({
        reserveKeys: {
            primaryKey: "parent_srl",
            labelKey: "label",
            urlKey: "link",
            targetKey: "target",
            addClassKey: "ac",
            subMenuKey: "cn"
        },
        onclick: function () { // 메뉴 클릭 이벤트
            mobileMenu.close();
            location.href = this.url;
        }
    });
    mobileMenu.setTree(list);

    loginInfoModal.setConfig({
        width: 300, height: 160,
        head: {
            close: {
                onclick: function () {

                }
            }
        },
        onclose: function () {
            trace("close bind");
        }
    });
    axdom("#mx-loginfo-handle").bind("click", function () {
        var obj = loginInfoModal.open();
        obj.modalHead.html('<div class="modal-log-info-title">Login Info</div>');
        obj.modalBody.html('<div class="modal-log-info-wrap"><ul class="ax-loginfo">' + axdom("#ax-loginfo").html() + '</ul><div style="clear:both;"></div></div>');
    });
}


/************************************************************************************************
 * 
 * cfDrawChart
 * @list 차트에 출력할 데이터를 object 형식으로 가공하여 전달
 * @target 대상 차트 canvas (필수 태그여야 함)
 * @desc [필수 항목]
    - type : line, bar, radar ... 중 1개는 반드시 명시할 것
	  - type 이 polarArea, pie, doughnut, bubble 인 경우에는 chartOption 내 모든 값들이 단일 시리즈로 전달되어야 함
	- chartOption 
	  - labels, data 는 필수 항목
	  - type : line + bar 같이 혼합형 챠트일 경우에는 명시할 것, 그 외에는 제거 (*line, bar 가 아닌 그 외 챠트인 경우는 반드시 제거)
	  
	[선택 항목]
	- yAxisOption, xAxisOption : 선택 항목, 일반적인 line, bar 챠트 등에만 명시할 것 (*line, bar 가 아닌 그 외 챠트인 경우는 반드시 제거)
	
	ex > line, bar, line+bar
	var data = {
				type: "bar", // 필수
				chartOption: {
					labels: ["January","February","March","April","May","June","July"], // [] array 형태로 전달
					data: aaa, // [] array 형태로 전달
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
		
   ex > radar
   var data = {
					type: "radar", // 필수
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], // [] array 형태로 전달
						data: aaa, // [] array 형태로 전달
						seriesName: ["aaa", "bbb"]
					}
			}; 
   
   ex> 그 외
   var data = {
					type: "bubble", // 필수
					chartOption: {
						labels: ["January", "February", "March", "April", "May", "June", "July"], // [] array 형태로 전달
						data: [data], // [] 단일 데이터
						seriesName: ["aaa"]
					}
			};
 * 2017-02-24 mscho
 * TODO. tooltip 등 그외 옵션들 적용
 ***********************************************************************************************/
function cfDrawChart(list, target) {
	// global options setting (default)
//	Chart.defaults.global.legend.display = false;
	Chart.defaults.global.legend.position = "bottom";
	Chart.defaults.global.legend.labels.boxWidth = 20;
	
	// default colors 
	var colors = Config.COLORS;
	var borderColors = Config.BORDERCOLORS;
	
	// target
	var _target = $("#" + target);
	// chart type
	var _type = list.type || "line";
	// chart options
	var _chartOption = list.chartOption || [];
	// y axis options
	var _yOptions = list.yAxisOption || [];
	// x axis options
	var _xOptions = list.xAxisOption || [];
	
	// chart data (array)
	var _dataset = [];
	for(var i = 0; i < _chartOption.data.length; i++) {
		var obj = {
				label : (_chartOption.seriesName != null) ? _chartOption.seriesName[i] || "series #" + (i + 1) : "series #" + (i + 1),
				type: (_chartOption.type != null && _chartOption.type[i] != null) ? _chartOption.type[i] : _type,
				data : _chartOption.data[i] || null,
				fillColor : colors[i],
				strokeColor : borderColors[i],
				borderColor: borderColors[i],
				pointBorderColor: "#fff",
				pointBackgroundColor: borderColors[i],
				pointHighlightStroke : "#fff",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				backgroundColor : "rgba(255, 255, 255, 0)",
				borderWidth: 2
		};
		
		
		// chart type 에 따라 속성을 달리함
		if(obj.type == "bar" || obj.type == "radar") {
			obj.backgroundColor = colors[i];
		}
		
		if(obj.type == "polarArea" || obj.type == "doughnut" || obj.type == "pie") {
			obj.borderColor = [];
			obj.backgroundColor = [];
			for(var idx = 0; idx < _chartOption.data[i].length; idx++) {
				obj.backgroundColor.push(colors[idx]);
			}
		}
		
		if(obj.type == "bubble") {
			obj.backgroundColor = colors[i];
			var setData = [];
			for(var idx = 0; idx < _chartOption.data[i].length; idx++) {
				setData.push({
					x: (idx + 1),
					y: _chartOption.data[i][idx],
					r: 10
				});
			}
			obj.data = setData;
		}
		
		// second y axis use
		if(_yOptions.length > 1 && i == _chartOption.data.length - 1) {
			obj.yAxisID = "right-y";
		}
		
		_dataset.push(obj);
	}
	
	// chart options
	var _options = {
			responsive : true,
			legendCallback: function(chart) {
				var legendHtml = [];
	            legendHtml.push('<div>');
	            for (var i=0; i<chart.data.datasets.length; i++) {
	                legendHtml.push('<div class="chart-legend" style="float:left; border-color:' + chart.data.datasets[i].backgroundColor + '">&nbsp;&nbsp;</div>');                    
	                if (chart.data.datasets[i].label) {
	                    legendHtml.push('<div style="float:left;" class="chart-legend-label-text" onclick="updateDataset(event, ' + '\'' + chart.legend.legendItems[i].datasetIndex + '\'' + ')">' + chart.data.datasets[i].label + '</div>');
	                }                                                                              
	            }                                                                                  
	            legendHtml.push('</div>');                                                       
	            return legendHtml.join("");  
		    },
			scales: {
				yAxes: [],
				xAxes: []
			}
	};
	
	// y option setting
	if(_yOptions != null) {
		for(var i = 0; i < _yOptions.length; i++) {
			var yaxis = {
					id : ((i == 0) ? "left-y" : "right-y")
			};
			
			if(_yOptions[i].title != null) {
				yaxis.scaleLabel = {
					display : true,
					labelString : _yOptions[i].title
				};
			}
			
			if(_yOptions[i].tickFormatNum != null) {
				var num = _yOptions[i].tickFormatNum;
				yaxis.ticks = {
					callback: function(label, index, labels) {
                		return Number(label).toFixed(num);
                    }
				}
			}
			
			if(yaxis) {
				if(i > 0) {
					yaxis.position = "right";
				}
				_options.scales.yAxes.push(yaxis);
			}
		}
	}
	
	// x option setting
	if(_xOptions != null) {
		for(var i = 0; i < _xOptions.length; i++) {
			var xaxis = {
					id: ((i == 0) ? "left-x" : "right-x")
			};
			
			if(_xOptions[i].title != null) {
				xaxis.scaleLabel = {
					display : true,
					labelString : _xOptions[i].title
				};
			}
			
			if(xaxis) {
				if(i > 0) {
					xaxis.position = "top";
				}
				_options.scales.xAxes.push(xaxis);
			}
		}
	}
	
//	updateDataset = function(e, datasetIndex) {
//	    var index = datasetIndex;
//	    var ci = e.view.weightChart;
//	    var meta = ci.getDatasetMeta(index);
//
//	    // See controller.isDatasetVisible comment
//	    meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
//
//	    // We hid a dataset ... rerender the chart
//	    ci.update();
//	};
	
	
	// create new Chart
	var chart = new Chart(_target, {
		type: _type,
		data: {
			labels: _chartOption.labels,
			datasets: _dataset
		},
		options: _options
	});
	
//	trace(chart.generateLegend());
//	$("#" + target + "-legend").html(chart.generateLegend());
	
	return chart;
}










/*=============================================================================================================
 * 사용 안함
 *=============================================================================================================/

/* axisJ 버전 그리드 생성
function cfInitGrid(target) {
	// 1. 컬럼 list 조회한 후 세팅 (DB에서 조회할 내용임)
	var params = {
			target : target
	};
	
	// grid option
	var colGroup = [];
	
	cfFind(Config.CONTEXT_PATH + "/comm/findGridColInfo", params, function(data) {
		
		if(data.length > 0) {
			// 1. 그리드 head init
			colGroup = _cfSetGridInfo(data);
		}
		
	}, true, "POST"); // sync
	
	// 2. 그리드 default options 설정
	var myGrid = new AXGrid();
	myGrid.setConfig({
		targetID: target,
		colHeadTool : false,
		colHeadAlign:"center",
		sort: false,
		colGroup: (colGroup.length < 0) ? null : colGroup,
		body:{
			onclick: function() {
				console.log("on click");
			},
			onKeydown: function() {
				console.log("onKeydown");
			}
		}
	});
	
	return myGrid;
}
*/
