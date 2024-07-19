const {odd, even} = require("./base1");
const checkOddOrEven = require("./base2");

function checkStringOddOrEven(str) {
    if(str.length % 2) {
        return odd;
    }
    return even;
}

console.log("숫자에 대한 홀짝수체크하기1:", checkOddOrEven(10));
console.log("숫자에 대한 홀짝수체크하기2:", checkOddOrEven(5));

console.log("문자열 길이에 대한 홀짝수체크하기1:", checkStringOddOrEven("안녕"));
console.log("문자열 길이에 대한 홀짝수체크하기2:", checkStringOddOrEven("안녕하세요"));