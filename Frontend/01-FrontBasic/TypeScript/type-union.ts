let productCode: string | number = "10000";
productCode = 20000;

// 파라미터로 숫자/문자 둘 다 지원하는 함수
function getCode(code:number | string):string {
    // 파라미터로 전달된 코드의 데이터 타입이 숫자형이면 숫자형을 문자로 반환하고 문자열을 반환한다.
    if(typeof code === 'number') {
        code = "P-" + code.toString();
    }
    return code;
}

// 동일한 함수인데 숫자를 전달하는 경우
console.log("getCode: ", getCode(1000));

// 동일한 함수인데 문자를 전달하는 경우
console.log("getCode: ", getCode("S-1000"));

// 배열내의 값들에 대한 타입을 다양하게 지정하고 제한할 수 있다.
const userData:(string | number | boolean)[] = ['홍길동', 40, false];

// type 선언자를 이용해 개발자가 원하는 타입을 정의하고 사용할 수 있다.
// 특정값으로 데이터 값을 제한할 수 있다.
type ProcessStates = "open" | "close";

let state:ProcessStates = "open";

// 특정값만 설장할 수있는 type 변수에 할당할 수 없는 값을 지정하면 에러발생
// let state1: ProcessStates = "open1"

type OddNumberUnderTen = 1 | 3 | 5 | 7 | 9;
let oddNumber:OddNumberUnderTen = 3;

// 할당할 수 없는 값을 지정하면 에러발생
// let oddNumber2:OddNumberUnderTen = 2;