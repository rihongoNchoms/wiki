/**
 * 메뉴 관리에 대한 로직 처리
 * @param global
 */

(function(global){
	// navi  namespace 생성
	COMMON.createNamespace("COMMON.Navi");
	
	// 즉각 실행으로 Navi 지정
	COMMON.Navi = (function(){
		//var _isInit = false;
		var _navi;
		var _contents;
		var _selectedNode;
		var timeout;
		
		/**
		 * backbone router 를 이용하여 url 변경 시에도 페이지 새로 로딩이 되지 않도록 함
		 */
	    var Router = Backbone.Router.extend({
		    routes: {         
		    	"" : "home",
		    	":menuGrp/:menuId": "defaultRoute"
		    },
		    home: function() {
//		    	console.log("home");
		    },
		    defaultRoute: function(menuGrp, menuId) {
		    	// 페이지 변경 시 해당 페이지에 대한 script 파일을 동적으로 import
		    	_importJs(menuGrp, menuId);
		    	
		    	_load(menuGrp, menuId);
		    }
		});
	    
	    var router;
	    
	    // 메뉴정보를 아래에 담을 것
	    var _menuList = {};
	    
		var _init = function(naviId, contentsId){
			
			_navi = $('.'+naviId+" ul li");
			_contents = $('.'+contentsId);
			
			router = new Router; 
			Backbone.history.start();
		};
		
		/**
		 * 동적으로 페이지 로딩
		 * contents 라는 panel 공간에만 변경이 되도록 설정
		 * 기타 스크립트 등은 페이지 변경 시 재로딩하지 않도록 함
		 */
		function _load(menuGrp, menuId, params){
			
			$(".contents").empty();  // to prevent memory leak
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
			
	    	importJS("/resources/js/views/" + menuGrp + "/" + menuId + ".js");
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
			_contents.load(url, function(responseText, status, jqXHR) {
				
			});
		}
		
		return {
			init: _init
		};

	})();
	
	COMMON.Navi.init("navi","contents");

})(window);