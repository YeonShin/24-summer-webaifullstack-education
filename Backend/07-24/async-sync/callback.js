function fnPlus(a,b) {
    let c = a+b;
    // 콘솔로깅 전용함수를 호출해서 콘솔에 계산 결과값 출력
    fnLogging(c);
    return c;
};

// 특정함수를 매개변수로 전달해서 해당 함수내 특정 위치에서
// 콜백함수가 실행되게 구현
function fnPlusCallback(a,b,func) {
    let c = a+b;
    func(c);
    return c;
};

function fnLogging(result){
    console.log(`계산 결과값은 ${result} 입니다.`)
};

function fnLoggingDelivery(result){
    const totalPrice = result + 3000;
    console.log(`총 ${result} 입니다.`)
};
// const result = fnPlus(1,2);
// console.log('더하기 함수 결과값 = ',result);
// fnLogging(100);

// fnPlus() 함수내에서 fnLogging()함수를 호출하여 순차적 동기방식 프로그래밍
const result = fnPlus(100,200);

// 자바스크립트 언어에서 함수는 객체로 인식
// 자바스크립트 함수는 특정 함수에 파라메터(매개변수)로 전달가능
const result1 = fnPlusCallback(1000,2000,fnLogging);

const result0 = fnPlusCallback(1000,2000,function(result){
    console.log(`계산 결과값은 ${result} 입니다.`)
});

const result2 = fnPlusCallback(1000,2000,fnLoggingDelivery);