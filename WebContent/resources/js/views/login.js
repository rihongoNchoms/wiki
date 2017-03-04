/************************************************************************************************
 * login.js
 * login 처리 스크립트
 * 
 ***********************************************************************************************/
(function() {
	
	function Login() {
		
		/* 
		 * private variables
		 */
		
		/* 
		 * 초기화 메소드
		 */
		
		function _init() {
			bindEvent();
		}
		
		function bindEvent() {
			$("#j_username").focus();
			
			$("#loginForm").submit(function(event) {
				$("#j_password").val(CryptoJS.SHA256($("#password").val() + Config.SHA256_SALT));
			});
		}
		
		function _finalize() {
		}
		
		return {
            init : _init,
            finalize : _finalize
        };
    };
    
    var login = new Login();
    login.init();
    
})();

//# sourceURL=login.js