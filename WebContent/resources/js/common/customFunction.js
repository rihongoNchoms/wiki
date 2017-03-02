/*
 * CUSTOM FUNCTION 
 * resources/axisj/dist/AXJ.all.js 에서 사용하는 함수들 중 
 * custom 하여 사용하고자 할 때 아래에 기술
 * 주의!!!
 * - 함수명은 해당 API에서 제공하고 있는 함수명 그대로 기술한다.
 * - 커스터마이징한 소스코드는 공개 자료로 사용하지 못한다.
 * 
 */

/**
 * 리스트형 데이터를 부모 참조키와 자식 참조키를 이용하여 트리형 데이터로 변환처리 합니다.
 * @method Array.convertTree
 * @param {String} parentKey
 * @param {String} childKey
 * @param {String} [hashDigit=3] - 트리의 주소값에 해당하는 hash 의 자릿수 단위 설정 (기본값 3)
 * @returns {Object}
 * @example
 * ```js
 * var a = [
 *     {pno:0, no:1, name:"장기영"},
 *     {pno:1, no:2, name:"장기영"},
 *     {pno:1, no:3, name:"장기영"},
 *     {pno:3, no:4, name:"장기영"},
 *     {pno:3, no:5, name:"장기영"},
 *     {pno:5, no:6, name:"장기영"},
 *     {pno:5, no:7, name:"장기영"}
 * ];
 *
 * var myTree = a.convertTree("pno", "no");
 * trace(myTree);
 * //[{"pno":0, "no":1, "name":"장기영", "cn":[{"pno":1, "no":2, "name":"장기영", "__subTreeLength":0, "cn":[], "pHash":"000_000", "hash":"000_000_000"}, {"pno":1, "no":3, "name":"장기영", "__subTreeLength":2, "cn":[{"pno":3, "no":4, "name":"장기영", "__subTreeLength":0, "cn":[], "pHash":"000_000_001", "hash":"000_000_001_000"}, {"pno":3, "no":5, "name":"장기영", "__subTreeLength":2, "cn":[{"pno":5, "no":6, "name":"장기영", "__subTreeLength":0, "cn":[], "pHash":"000_000_001_001", "hash":"000_000_001_001_000"}, {"pno":5, "no":7, "name":"장기영", "__subTreeLength":0, "cn":[], "pHash":"000_000_001_001", "hash":"000_000_001_001_001"}], "pHash":"000_000_001", "hash":"000_000_001_001"}], "pHash":"000_000", "hash":"000_000_001"}], "__subTreeLength":2, "pHash":"000", "hash":"000_000"}]
 * ```
 */
function convertTree_c(array, parentKey, childKey, hashDigit) {
    var tree = [];
    var pointer = {};
    var seq = 0;
    var hashDigit = hashDigit || 3;
    for (var idx = 0; idx < array.length; idx++) {
        var L = array[idx];
        if (!L.isRoot) {
            pointer[L[childKey]] = idx;

            if (typeof L[parentKey] === "undefined" || L[parentKey] == "" || L[parentKey].number() == 0) {
                L["cn"] = [];
                L.__subTreeLength = 0;
                L["pHash"] = "0".setDigit(hashDigit);
                L["hash"] = "0".setDigit(hashDigit) + "_" + seq.setDigit(hashDigit);
                tree.push(AXUtil.copyObject(L));
                seq++;
            }
            else {
                L.__subTreeLength = 0;
            }
        }
    }

    for (var idx = 0; idx < array.length; idx++) {
        var L = array[idx];
        if (L["pHash"] == undefined && !L.isRoot) {
            var pItem = array[pointer[L[parentKey]]];
            var pHash = pItem["hash"];
            var pHashs = pHash.split(/_/g);
            var pTree = tree;
            var pTreeItem;
            axf.each(pHashs, function (idx, T) {
                if (idx > 0) {
                    pTreeItem = pTree[T.number()];
                    pTree = pTree[T.number()].cn;
                }
            });
            L["cn"] = [];
            var __subTreeLength = pItem.__subTreeLength;

            L["pHash"] = pHash;
            L["hash"] = pHash + "_" + __subTreeLength.setDigit(hashDigit);
            pTree.push(AXUtil.copyObject(L));
            pItem.__subTreeLength++;
            pTreeItem.__subTreeLength = pItem.__subTreeLength;
        }
    }
    return tree;
}

/**
 * 동적으로 페이지 변경 시 
 * 해당 소스에서 사용하는 스크립트를 동적으로 변경해준다.
 * @param src
 */
function importJS(src) {
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute("id", "dynamicScript");
	scriptElement.setAttribute("src", src);
	scriptElement.setAttribute("type", "text/javascript");
	document.getElementsByTagName("head")[0].appendChild(scriptElement);
}
