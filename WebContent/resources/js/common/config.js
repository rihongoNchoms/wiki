/***********************************************************************************************
 * 
 * Config
 * Configuration Script 
 * 프로젝트 > 스크립트 단에서 사용하는 config 정보를 아래에 기술
 * Config.naming 형태로 호출하여 사용
 * 2017-02-01 mscho
 * 
 ***********************************************************************************************/

var Config = {
	
	CONTEXT_PATH : "", // 필요하다면 PATH를 사용자별 구분하는 것으로 할 예정
	SHA256_SALT: "{WIKITESTPROJECT}", 
	// 패스워드 암호화 (추가로 필요한 암호화 방식이 있다면 적용할 예정)
	
	CMB_USEYN : {
		type: "select",
		optionValue : "CD",
		optionText : "NM",
		options : [
		   {CD: 1, NM: "Y"},
		   {CD: 2, NM: "N"}
		]
	}
};