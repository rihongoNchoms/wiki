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
	
	
	// TODO. 아래 콤보용 데이터는 DB에서 호출하는 방식으로 변경할 것
	// Ax5ui 그리드 내 Editor 콤보로 사용하는 경우임
	CMB_USEYN : {
		type: "select",
		config: {
			columnKeys: {
				optionValue : "CD",
				optionText : "NM"
			}, 
			options : [
				{CD: 0, NM: "N"},
				{CD: 1, NM: "Y"}
			]
		}
	},
	CMB_EDITOR_TYPE : {
		type: "select",
		config: {
			columnKeys: {
				optionValue : "CD",
				optionText : "NM"
			}, 
			options : [
				{CD: 0, NM: "NONE"},
				{CD: 1, NM: "TEXT"},
				{CD: 2, NM: "NUMBER"},
				{CD: 3, NM: "DATE"},
				{CD: 4, NM: "SELECT"}
			]
		}
	},
	CMB_COL_ALIGN : {
		type: "select",
		config: {
			columnKeys: {
				optionValue : "CD",
				optionText : "NM"
			}, 
			options : [
				{CD: 0, NM: "LEFT"},
				{CD: 1, NM: "CENTER"},
				{CD: 2, NM: "RIGHT"}
			]
		}
	},
	
	// Axisj 콤보 options
	LOG_SEARCH_TYPE: {
		options: [{
			optionValue: "",
			optionText: "전체"
		}, {
			optionValue: "R",
			optionText: "조회"
		}, {
			optionValue: "U",
			optionText: "수정"
		}, {
			optionValue: "E",
			optionText: "엑셀다운"
		}]
	},
	
	// chartjs default color 
	COLORS : [
	          "rgba(77, 191, 191, 0.4)"
             , "rgba(255, 99, 132, 0.4)"
             , "rgba(54, 162, 235, 0.4)"
             , "rgba(255, 206, 86, 0.4)"
             , "rgba(191, 172, 77, 0.4)"
             , "rgba(153, 102, 255, 0.4)"
             , "rgba(255, 159, 64, 0.4)"
             , "rgba(50, 102, 199, 0.4)"
	         , "rgba(217, 54, 17, 0.4)"
	         , "rgba(250, 146, 0, 0.4)"
	         , "rgba(16, 148, 23, 0.4)"
	         , "rgba(143, 0, 0, 0.4)"
	         , "rgba(27, 171, 204, 0.4)"
	         , "rgba(72, 41, 110, 0.4)"
	         , "rgba(40, 142, 67, 0.4)"
	         , "rgba(118, 160, 227, 0.4)"
	         , "rgba(194, 37, 37, 0.4)"
	         , "rgba(148, 16, 104, 0.4)"
	         , "rgba(165, 199, 105, 0.4)"
	         , "rgba(87, 232, 67, 0.4)"
	         , "rgba(232, 67, 139, 0.4)"
	         , "rgba(22, 16, 201, 0.4)"
	         , "rgba(212, 242, 13, 0.4)"
	         , "rgba(12, 202, 13, 0.4)"
	         , "rgba(13, 22, 13, 0.4)"
	         ],
	BORDERCOLORS : ["rgba(77, 191, 191, 1)"
	                 , "rgba(255, 99, 132, 1)"
	                 , "rgba(54, 162, 235, 1)"
	                 , "rgba(255, 206, 86, 1)"
	                 , "rgba(191, 172, 77, 1)"
	                 , "rgba(153, 102, 255, 1)"
	                 , "rgba(255, 159, 64, 1)"
	                 , "rgba(50, 102, 199, 1)"
			         , "rgba(217, 54, 17, 1)"
			         , "rgba(250, 146, 0, 1)"
			         , "rgba(16, 148, 23, 1)"
			         , "rgba(143, 0, 0, 1)"
			         , "rgba(27, 171, 204, 1)"
			         , "rgba(72, 41, 110, 1)"
			         , "rgba(40, 142, 67, 1)" 
			         , "rgba(118, 160, 227, 1)"
			         , "rgba(194, 37, 37, 1)"
			         , "rgba(148, 16, 104, 1)"
			         , "rgba(165, 199, 105, 1)"
			         , "rgba(87, 232, 67, 1)"
			         , "rgba(232, 67, 139, 1)"
			         , "rgba(22, 16, 201, 1)"
			         , "rgba(212, 242, 13, 1)"
			         , "rgba(12, 202, 13, 1)"
			         , "rgba(13, 22, 13, 1)"]
};