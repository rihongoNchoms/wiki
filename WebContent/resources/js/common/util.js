/*
 * 공통으로 사용할 커스텀 유틸리티 함수를 기록
 * 2017-01-26 mscho
 */

/******************************************************************************
 * 
 * log
 * console.log(); 대신 log(); 로 브라우저 콘솔로그 확인하기 위함
 * Axisj 에서 제공하는 trace(); 함수도 있음
 * 2017-02-09 mscho
 * 
 ******************************************************************************/
function log(msg) {
	if (window.console && window.console.log) {
		window.console.log(msg);
	}
}

/******************************************************************************
 * 
 * checkTextCase
 * 문자열에 대해서 camelCase 형태 유무를 확인하기 위함
 * 2017-02-09 mscho
 * 
 ******************************************************************************/
function checkTextCase(value) {
	if(!value) { return false; }
	
	return value.indexOf("_");
}

/******************************************************************************
 * 
 * getCamelCase
 * camelCase 형태로 문자열 변환 (ex> CODE_ID ==> codeId)
 * 2017-02-09 mscho
 * 
 ******************************************************************************/
function getCamelCase(value) {
	if(!value) { return false; }

    return (value||'').toLowerCase().replace(/(_)\w/g, function(m) {
        return m.toUpperCase().replace(/_/,'');
    });
}

/******************************************************************************
 * 
 * getUnderscore
 * underScore 형태로 문자열 변환 (ex> codeId ==> CODE_ID)
 * 2017-02-09 mscho
 * 
 ******************************************************************************/
function getUnderscore(value) {
	if(!value) { return false; }

    return value.replace(/([A-Z])/g, function(m){
        return "_" + m;
    }).toUpperCase();
}

/******************************************************************************
 * 
 * cfFind
 * ajax call 를 통한 데이터 조회 시 사용
 * 2017-01-26 mscho
 * 
 ******************************************************************************/
function cfFind(url, obj, fnSuccess, isSync, type) {
	
	$.ajax({
		beforeSend: function(xhr) {
	        xhr.setRequestHeader("AJAX", true);
	    },
		dataType : "json",
		type : type || "GET",
		url : url,
		contentType : "application/json; charset=utf-8",
		data : JSON.stringify(obj),
		async : (isSync)? false : true,  /* sync */
		success : fnSuccess || function(jsonData){
			console.log(jsonData);
		},
		error : function(request){
			if(request.status == "401") {
				alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	            location.href = Config.CONTEXT_PATH + "/j_spring_security_logout";
			} else if (request.status == "403") {
				alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
				location.href = Config.CONTEXT_PATH + "/j_spring_security_logout";
			}
			log("통신중 에러가 발생하였습니다.\n"+"code:"+request.status+"\nmessage:"+request.responseText);
		}
	});
}

/******************************************************************************
 * 
 * cfSave
 * ajax call 를 통한 데이터 수정 시 사용
 * 2017-01-26 mscho
 * 
 ******************************************************************************/
function cfSave(url, obj, fnSuccess) {
	
	$.ajax({
		beforeSend: function(xhr) {
	        xhr.setRequestHeader("AJAX", true);
	    },
		dataType : "json",
		type : "POST",
		url : url,
		contentType : "application/json; charset=utf-8",
		data : JSON.stringify(obj),
		success : fnSuccess || function(jsonData){
			if(jsonData.result == "success") {
				alert("저장되었습니다.");
			}
			else {
				alert("에러 발생");
			}
		},
		error : function(request){
			if(request.status == "401") {
				alert("인증에 실패 했습니다. 로그인 페이지로 이동합니다.");
	            location.href = Config.CONTEXT_PATH + "/j_spring_security_logout";
			} else if (request.status == "403") {
				alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
				location.href = Config.CONTEXT_PATH + "/j_spring_security_logout";
			}
			log("통신중 에러가 발생하였습니다.\n"+"code:"+request.status+"\nmessage:"+request.responseText);
		}
	});
}

/*
 * 패스워드 변경 (TEST)
 */
function cfSavePassword(oldPassword, newPassword1, newPassword2) {

	// validation
	if(!oldPassword) {
		alert("현재 비밀번호를 확인하십시오");
		return false;
	}
	
	if(newPassword1.length < 6) {
		alert("새 비밀번호는 6자리 이상이어야 합니다");
		return false;
	}
	
	if(newPassword1 && newPassword1 != newPassword2) {
		alert("새 비밀번호가 일치하지 않습니다");
		return false;
	}
	
	oldPassword  = CryptoJS.SHA256(oldPassword  + Config.SHA256_SALT) + "";
	newPassword1 = CryptoJS.SHA256(newPassword1 + Config.SHA256_SALT) + "";
	
//	cfSave(Config.CONTEXT_PATH + "/account/changePassword.do", {oldPassword:oldPassword, newPassword:newPassword1}, function(jsonData){
//		if(jsonData.result == "success") {
//			alert("패스워드가 변경되었습니다. 로그인 페이지로 이동합니다");
//			//$("#modalChangePassword").modal("hide");
//			goLoginPage();
//		}
//		else {
//			var message = jsonData.msg || "에러 발생";
//			alert(message);
//			return false;
//		}
//	});
}