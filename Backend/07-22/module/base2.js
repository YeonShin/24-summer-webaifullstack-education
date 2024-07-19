const {odd, even, test} = require('./base1');

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}

console.log("base2에서 사용하는 base1.js의 test 함수 호출하기", test());

module.exports = checkOddOrEven;