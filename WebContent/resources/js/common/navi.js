/* 
*------------------------------------------------------------------------------
* NAME : navi.js
* DESC : 네비게이션  
* PROJ : 
* Copyright 2017 ...
*------------------------------------------------------------------------------
*                  변         경         사         항
*------------------------------------------------------------------------------
*    DATE     AUTHOR       DESCRIPTION
* ----------  ------  ---------------------------------------------------------
* 2017.01.26  조민수          최초개발
*------------------------------------------------------------------------------
*/

(function() {
	
	function Navi() {
		
		/* 
		 * private variables
		 */
		var _navi;
		var _contents;
		var _cxContents;
		var _selectedNode;
		var timeout;
		
		/**
		 * backbone router 를 이용하여 url 변경 시에도 페이지 새로 로딩이 되지 않도록 함
		 */
	    var Router = Backbone.Router.extend({
		    routes: {         
		    	"" : "home",
		    	":menuId": "defaultRouteS",
		    	":menuGrp/:menuId": "defaultRoute"
		    },
		    home: function() {
		    	// TODO. 뒤로가기 후의 home 주소일 경우를 처리할 방법 ...
		    },
		    defaultRoute: function(menuGrp, menuId) {
		    	_load(menuGrp, menuId);
		    },
		    defaultRouteS: function(menuId) {
		    	_load("info", menuId);
		    }
		});
	    
	    var router;
	    
		/* 
		 * 초기화 메소드
		 */
		function _init() {
			bindEvent();
			
			_navi = $('.navi ul li');
			_contents = $('.contents');
			_cxContents = $('.cxContents'); // main 페이지에서 사이드 메뉴 클릭 시 사용
			
			router = new Router; 
			Backbone.history.start();
		}
		
		/**
		 * 동적으로 페이지 로딩
		 * contents 라는 panel 공간에만 변경이 되도록 설정
		 * 기타 스크립트 등은 페이지 변경 시 재로딩하지 않도록 함
		 */
		function _load(menuGrp, menuId, params) {
			
			if(menuGrp != "info") {
				$(".contents").empty();  // to prevent memory leak
			} else {
				$(".cxContents").empty();
			}
			_pageLoad(menuGrp, menuId, params);
		}
		
		/**
		 * 동적으로 페이지 변경 시 해당 페이지에서 사용하는 스크립트 파일을 동적으로 삽입하기 위함
		 */
		function _importJs(menuGrp, menuId) {
			var id = document.getElementById("dynamicScript");
			if(id) {
				document.getElementsByTagName("head")[0].removeChild(id);
			}
			
			var src = "/resources/js/views/" + menuGrp + "/" + menuId + ".js";
	    	importJS(src);
		}
		
		/**
		 * url에 해당되는 page 정보를 contents에 삽입
		 */
		function _pageLoad(menuGrp, menuId, params){
			
			var queryString = "";

			if(params) {
				queryString = "?" + $.param(params);
			}
			
			var url = menuGrp + "/" + menuId;
			
			if(menuGrp != "info") {
				_contents.load(url, function(responseText, status, jqXHR) {
					// 페이지 변경 시 해당 페이지에 대한 script 파일을 동적으로 import
					// 페이지 로드가 끝나고 난 뒤에 호출해야 함
					_importJs(menuGrp, menuId);
				});
			} else {
				_cxContents.load(url, function(responseText, status, jqXHR) {
				});
			}
		}
		
		/* 
		 * 이벤트 바인드
		 */
		function bindEvent() {
			
			
		}
		
		function _finalize() {
		}
		
		return {
            init : _init,
            finalize : _finalize
        };
    };
    
    var navi = new Navi();
    navi.init();
    
})();

//# sourceURL=navi.js