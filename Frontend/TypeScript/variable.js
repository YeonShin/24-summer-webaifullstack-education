// 변수별 타입을 지정하고 값을 할당합니다.
var memberName = '김연신';
var age = 24;
var price = 12000;
var isMale = true;
var totalPayPrice = 0;
function showTotalPrice(price, count) {
    totalPayPrice = price * count;
    console.log("totalPayPrice: ".concat(totalPayPrice));
}
console.log('사용자명: ', memberName);
console.log('나이: ', age);
console.log('가격: ', price);
console.log('성별: ', isMale ? '남자' : '여자');
showTotalPrice(price, 2);
