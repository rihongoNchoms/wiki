/**
 * admin > 화면관리에서 사용
 */
(function() {
	
	function FormListInfo() {
		
		/* 
		 * private variables
		 */
		var myTree = null;
		
		/* 
		 * 초기화 메소드
		 */
		
		function _init() {
			bindEvent();
			
			// 트리메뉴 조회
			_findTreeMenu();
		}
		
		function _findTreeMenu() {
			// TREE 메뉴 조회
			cfFind(Config.CONTEXT_PATH + "admin/formListInfo/findMenuInfo", null, function(data) {
				
				if(data.length > 0) {
					myTree = fnSetTreeGrid(data, "formList");
				}
				
			}, false);
		}
		
		function bindEvent() {
			//getSelectedList
			$(".AXButton").on("click", function(e) {
				switch (e.target.value) {
				case "추가":
					test();
					break;
				case "자식추가":
					test2();
					break;

				default:
					break;
				}
				e.preventDefault();
			});
		}
		
		function test() {
			var obj = myTree.getSelectedListParent();
			console.log(obj);
			
			myTree.appendTree(obj.index, obj.item, [{
				useYn: "Y",
				parentcd: (obj.item.formId | 0)
			}]);
		}
		function test2() {
			var obj = myTree.getSelectedListParent();
			console.log(obj);
			
			myTree.appendTree(obj.index, obj.item, [{
				useYn: "Y",
				parentcd: obj.item.formId
			}]);
		}
		
		function addTree() {
			document.treeWriteForm.reset();
			document.treeWriteForm.writeMode.value = "append";
			myModal.openDiv({
				modalID:"addTreeModal",
				targetID:"modalContent",
				width:300,
				top:100
			});
			document.treeWriteForm.nodeName.focus();
		}
		
		function _finalize() {
		}
		
		return {
            init : _init,
            finalize : _finalize
        };
    };
    
    var formListInfo = new FormListInfo();
    formListInfo.init();
    
})();

//# sourceURL=formListInfo.js