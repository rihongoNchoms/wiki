(function(global){
	
	// COMMON 루트 객체 정의
	global.COMMON = global.COMMON || {};
	
	COMMON.apps = COMMON.apps || {};
	COMMON.currentMenuId = "";
	
	COMMON.addMenu = function(menuId, func) {
		COMMON.apps[menuId] = func;
	};

	// namespace 생성
	COMMON.createNamespace = function(namespace){
		var parts = namespace.split('.');
        var parent = COMMON;
        var currentPart = '';

		// 처음에 중복되는 전역 객체명은 제거한다.
	    if ( parts[0] === "COMMON" ) {
	        parts = parts.slice(1);
	    }

	    for(var i = 0, length = parts.length; i < length; i++) {
	        currentPart = parts[i];
	        parent[currentPart] = parent[currentPart] || {};
	        parent = parent[currentPart];
	    }

		return parent;
	};
	
	COMMON.setTopMenu = function (topMenu_data) {
		var topMenu = new AXTopDownMenu();
		
        topMenu.setConfig({
            targetID: "ax-top-menu",
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
        topMenu.setTree(topMenu_data);


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
        mobileMenu.setTree(topMenu_data);


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

    };
	
	// 글로벌 변수
	COMMON.locale = "ko";
	
	// 일자 관련 변수들을 저장해둔 객체
	COMMON._date = {
		today : "",                 /* 현재일 */
		prevWorkDay : "",           /* 이전 영업일 */
		retrieveDateTime : null     /* 날짜를 조회해온 시간 */
	};
	
	// 서버로 부터 날짜 정보를 가져옴
	COMMON._getStdDate = function() {
		
		var httpMethod = "POST";
		var httpParams = setParameters([], "bpo.common.getStdDate", "common.Home");
		httpParams += "&biz_key="  + "common.Home";
		var httpURL = QUERY_PATH;
		
		sendRequest(httpURL, httpParams, function() {
			if (xmlHttpReq.readyState == 4) {
	            if (xmlHttpReq.status == 200) {
	                var rsData = xmlHttpReq.responseText.trim();
	                var dsList = new Dataset(rsData);
	                if(dsList.getRowCnt() > 0) {
	                	COMMON._date.today            = dsList.getColumn("today", 0);
	                	COMMON._date.prevWorkDay      = dsList.getColumn("prev_work_day", 0);
	                	COMMON._date.retrieveDateTime = new Date().getTime();
	                }
	                else {
	                	COMMON._date.today            = COMMON._getLocalToday();  // 조회해온 결과가 없을 경우 임시로 사용자pc의 날짜를 사용
	                	COMMON._date.prevWorkDay      = COMMON._getLocalToday();
	                	COMMON._date.retrieveDateTime = new Date().getTime();
	                }
	            }
			}
		}, httpMethod);
	};
	
	// 현재일자를 가져옴
	COMMON.getToday = function() {
		
		var term = 1000 * 60 * 60;  // 1시간
		
		var currentTime = (new Date()).getTime();
		
		// 날짜 정보가 없거나 조회해온 시간이 1시간을 넘으면 재조회 
		if(!COMMON._date.today) {
			COMMON._getStdDate();
		}
		else if((currentTime - COMMON._date.retrieveDateTime) > term) {
			COMMON._getStdDate();
		}
		
		return COMMON._date.today;
	};
	
	// 이전 영업일자를 가져옴
	COMMON.getPrevWorkDay = function() {
		
		var term = 1000 * 60 * 60;  // 1시간
		
		var currentTime = (new Date()).getTime();
		
		// 날짜 정보가 없거나 조회해온 시간이 1시간을 넘으면 재조회
		if(!COMMON._date.prevWorkDay) {
			COMMON._getStdDate();
		}
		else if((currentTime - COMMON._date.retrieveDateTime) > term) {
			COMMON._getStdDate();
		}
		
		return COMMON._date.prevWorkDay;
	};
	
	// 사용자pc의 날짜 조회
	COMMON._getLocalToday = function() {
		var now = new Date();                                                  
        var nowTime = now.getFullYear();
        if(now.getMonth()+1 < 10) {
        	nowTime += "0";
        }
        nowTime += now.getMonth()+1;
        
        if(now.getDate() < 10) {
        	nowTime += "0";
        }
        nowTime += now.getDate();

        return nowTime;
	};
	
	// 사용자 쿠키 정보 저장
	COMMON._setUserCookie = function(cname, cvalue, exdays) {
		var dt = new Date();
		
		dt.setTime(dt.getTime() + (exdays * 1 * 60 * 60 * 1000)); // 1시간
	    var expires = "expires="+ dt.toGMTString();
	    
	    document.cookie = cname + "=" + cvalue + ";" + expires;
	};
	
	// 사용자 쿠키 정보 조회
	COMMON._getUserCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	};
	
	// 사용자 쿠키 정보 체크
	COMMON.checkUserCookie = function(username, menuId) {
		
		var user = COMMON._getUserCookie("username");
		var menu = COMMON._getUserCookie("menu");
		
		console.log(user);
		console.log(menu);
		
		if(menu == "home" && (user == "none" || user == "homepg")) {
			COMMON._setUserCookie("defaultBondId", "", 1);
		}
		
		// 쿠키에 저장된 user id 와 page 가 없는 경우만 접속 정보 저장 (새로고침은 제외)
		if(user == null || user == "") {
			COMMON._setUserInfo(username, menuId);
		} else if(user != null && menu != menuId) {
			COMMON._setUserInfo(username, menuId);
		}
	};
	
	COMMON.setDefConditionCookie = function(defaultBondId) {
		if(defaultBondId) {
			COMMON._setUserCookie("defaultBondId", defaultBondId, 1);
		}
	};
	
	COMMON.getDefConditionCookie = function() {
		var defaultBondId = COMMON._getUserCookie("defaultBondId");
		
		return defaultBondId || null;
	};
	
	COMMON._setUserInfo = function(username, menuId) {// 6월 10일~
		
		COMMON._setUserCookie("username", username, 1);
		COMMON._setUserCookie("menu", menuId, 1);
		
		var httpMethod = "POST";
		var httpParams = setParameters([menuId, 'F', 'Y', '', '', ''], "bpo.common.setUserInfo", "common.Home");
		httpParams += "&biz_key="  + "common.Home";
		var httpURL = UPDATE_PATH;
		
		sendRequest(httpURL, httpParams, function() {}, httpMethod);
	};
	
	// 세션 정보를 저장해둔 객체
	COMMON._session = {
		userId : "",
		userName : "",
		userMenuList : null  // 사용자 메뉴
	};
	
	COMMON.getUserId = function() {
		return COMMON._session.userId;
	};
	
	COMMON.getUserName = function() {
		return COMMON._session.userName;
	};
	
	COMMON.getUserMenuList = function() {
		return COMMON._session.userMenuList;
	};
	
	COMMON.setUserId = function(userId) {
		COMMON._session.userId = userId;
	};
	
	COMMON.setUserName = function(userName) {
		COMMON._session.userName = userName;
	};
	
	COMMON.setUserMenuList = function(userMenuList) {
		COMMON._session.userMenuList = userMenuList;
	};
	
	
	COMMON.resetLoginLabel = function() {
		if(COMMON.getUserId() && COMMON.getUserId().trim().length > 0) {
			$("a#loginOut").html("Log Out");
    		$("a#loginOut").removeClass("mainLogin");
    		$("a#loginOut").addClass("mainLogout");
    		
    		$("#barPwd").removeClass("hideChangePassword");
    		$("#changePassword").removeClass("hideChangePassword");
		}
		else {
			$("a#loginOut").html("Log In");
    		$("a#loginOut").removeClass("mainLogout");
    		$("a#loginOut").addClass("mainLogin");
    		
    		$("#barPwd").addClass("hideChangePassword");
    		$("#changePassword").addClass("hideChangePassword");
		}
	};
	
	/*
	// 세션 사용자 정보를 가져옴
	COMMON.getSessionInfo = function() {
		
		var httpMethod = "POST";
		var httpURL = "/jsp/common/getSessionInfo.jsp";
		var httpParams = "";
		
		sendRequest(httpURL, httpParams, function() {
			if (xmlHttpReq.readyState == 4) {
	            if (xmlHttpReq.status == 200) {
	                var rsData = xmlHttpReq.responseText.trim();
	                
	                var dsLists = rsData.split("~!~");
	                
	                // 사용자 정보
	                var dsUser = new Dataset(dsLists[0]);
	                if(dsUser.getRowCnt() > 0) {
	                	COMMON.setUserId((dsUser.getColumn("userId", 0)).trim());
	                	COMMON.setUserName((dsUser.getColumn("userName", 0)).trim());
	                }
	                else {
	                	COMMON.setUserId("");
	                	COMMON.setUserName("");
	                }
	                
	                if(dsLists[1]) {
	                	// 사용자 메뉴 정보
	                	var dsUserMenuList = new Dataset(dsLists[1]);
	                	if(dsUserMenuList.getRowCnt() > 0) {
		                	COMMON.setUserMenuList(dsUserMenuList);
		                }
		                else {
		                	COMMON.setUserMenuList(null);
		                }
	                }
	                
	                COMMON.resetLoginLabel();
	            }
			}
		}, httpMethod);
	};
	*/
	
	// 추가 예정
	COMMON._browser = {
		isMobile:""
	};
	
	// 모바일 디바이스 체크
	COMMON.isMobileDevice = function() {
		if(!COMMON._browser.isMobile) {
			var expr = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
			var isMobile = expr.test(navigator.userAgent.toLowerCase());
			COMMON._browser.isMobile = (isMobile)?"Y":"N"; 
			return isMobile;
		}
		else {
			return (COMMON._browser.isMobile == "Y")?true:false;
		}
	};
	
	/*
	 * browser check 
	 * IE 9 이하는 메시지 출력
	 */
	COMMON._getBrowser = function() {
		var ua = navigator.userAgent;
		var tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		
		if(/trident/i.test(M[1])){
			tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
			return 'IE '+(tem[1]||'');
		}   
		if(M[1]==='Chrome'){
			tem=ua.match(/\bOPR\/(\d+)/);
			if(tem!=null)   {return 'Opera '+tem[1];}
		}   
		M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
		return M[0];
	};

	COMMON._getBrowserVersion = function() {
		var ua = navigator.userAgent;
		var tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		
		if(/trident/i.test(M[1])){
			tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1]||'');
		}
		if(M[1]==='Chrome'){
			tem=ua.match(/\bOPR\/(\d+)/);
			if(tem!=null)   {return 'Opera '+tem[1];}
		}   
		M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
		return M[1];
	};
	
	var browserName = COMMON._getBrowser();
	var browserVersion = COMMON._getBrowserVersion();
	
	if(browserName == "MSIE" && parseInt(browserVersion) < 9) {
		alert("원활한 정보 조회 및 접속을 위해 Internet Explorer 9 이상의 버전으로 접속하시기를 권장합니다.");
	}
	 
	// dynamic javascript load
	COMMON.jsLoad = function(src){
		$('#contents').append('<script src="'+src+'" type="text/javascript"></script>');
	};
	
	COMMON.cssLoad = function(src){
        $('head').appendChild('<link href="'+src+'" type="text/css" rel="stylesheet">');
    };
	
})(window);