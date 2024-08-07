var productCode = "10000";
productCode = 20000;
// 파라미터로 숫자/문자 둘 다 지원하는 함수
function getCode(code) {
    // 파라미터로 전달된 코드의 데이터 타입이 숫자형이면 숫자형을 문자로 반환하고 문자열을 반환한다.
    if (typeof code === 'number') {
        code = "P-" + code.toString();
    }
    return code;
}
// 동일한 함수인데 숫자를 전달하는 경우
console.log("getCode: ", getCode(1000));
// 동일한 함수인데 문자를 전달하는 경우
console.log("getCode: ", getCode("S-1000"));
