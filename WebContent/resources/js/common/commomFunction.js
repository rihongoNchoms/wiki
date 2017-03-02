/*
 * 공통 스크립트 함수 
 * 전 페이지에서 공통으로 사용하는 스크립트 함수를 아래에 기술
 * Axisj 참고 url 위에서 아래로 우선순위...
 * http://jdoc.axisj.com/
 * http://dev.axisj.com/index.html
 * http://axisj.github.io/axisj-about/docs/chapter2.html#
 */

/***********************************************************************************************
 * 
 * cfShowMessage
 * 알림창 메시지 출력용
 * @obj : {type: 1, msg: ""} 형태로 전달
 * 1 : 완료알림, 2: 경고알림, 3: 위험알림
 * 2017-02-09 mscho
 * 
 ***********************************************************************************************/
function cfShowMessage(obj) {
	var type = "";
	
	switch (obj.type) {
	case 1:
		type = "Complete";
		break;
	case 2:
		type = "Warning";
		break;
	case 3:
		type = "Caution";
		break;

	default:
		break;
	}
	
	dialog.push({
		type: type, 
		body: obj.msg
	});
}


/***********************************************************************************************
 * 
 * cfInitGrid
 * GRID - 컬럼 데이트를 통한 그리드 초기화 렌더러
 * @target
 *  - 출력대상 (해당 코드를 기준으로 컬럼 정보를 DB에서 조회한 후 세팅)
 *  - target 정보는 "대상target" 형식으로 전달한다.
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
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
				
			}
		}
	});
	
	return myGrid;
	
}

/***********************************************************************************************
 * 
 * _cfSetGridInfo 
 * - 조회된 컬럼 정보를 colGroup option 형태로 가공하여 전달한다.
 * @data : 조회된 컬럼 정보
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function _cfSetGridInfo(data) {
	
	if(data != null) {
		var colGroup = [];
		
		for(var i = 0; i < data.length; i++) {
			var setColList = {};
			
			setColList.key = (checkTextCase(data[i]["COL_ID"]) > -1) ? getCamelCase(data[i]["COL_ID"]) : data[i]["COL_ID"]; // camelCase 형태로 변환 필요
			setColList.colSeq = i;
			setColList.label = data[i]["COL_NAME"] || "-";
			setColList.width = data[i]["COL_WIDTH"] || "100";
			setColList.align = data[i]["COL_ALIGN"] || "center";
			
			if(data[i]["COL_EDITOR"] != null) {
				var type = "";
				switch (data[i]["COL_EDITOR"]) {
				case 1:
					type = "text";
					break;
				case 2:
					type = "number";
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
				
				// USE_YN option
				if(data[i]["COL_ID"] == "USE_YN" || data[i]["COL_ID"] == "useYn") {
					setColList.editor = Config.CMB_USEYN;
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
 * GRID - 그리드 데이터를 세팅
 * - target 정보는 객체 정보를 그대로 전달한다.
 * @target : 출력대상 (객체 정보를 그대로 전달)
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/
function cfSetGridList(list, target) {
	if(list) {
		var myProgress = new AXProgress();
		myProgress.setConfig({
			theme: "AXlineProgress",
			totalCount: list.length,
			width: 400,
			top: 300
//			duration: 299 // 프로세스바의 애니메이션 속도 값 입니다.
		});

		mask.open();
		myProgress.start(function(){
			if(this.isEnd){
				myProgress.close();
				mask.close();
				toast.push("조회 완료");
			}else{
				// 비동기 AJAX 통신 처리 구문을 수행합니다.
				target.setList(list);
				myProgress.update(); // 프로그레스의 다음 카운트를 시작합니다.
			}
		});
		
	}
}


/***********************************************************************************************
 * 
 * fnSetTreeGrid
 * TREE GRID - 트리형태의 데이터를 그리드 레이아웃에 출력하고자 할 때 사용 
 * @list
 * @target
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
