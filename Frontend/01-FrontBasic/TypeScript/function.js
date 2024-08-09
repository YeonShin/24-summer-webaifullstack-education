function add1(a, b) {
    return a + b;
}
function add2(a, b) {
    console.log("결과값: ", a + b);
}
var result1 = add1(10, 10);
var data1 = 20;
var data2 = 30;
add2(data1, data2);
// 일반함수: function 함수명(){}
function greeting1(name) {
    return "Hello~ ".concat(name, "\uB2D8...");
}
var greeting2 = function (name) {
    return "Hello~ ".concat(name, "\uB2D8...");
};
function greet(name, msg) {
    if (name === void 0) { name = 'Guest'; }
    if (msg) {
        return "".concat(name, "\uB2D8 ").concat(msg);
    }
    else {
        return "Hello~ ".concat(name);
    }
}
console.log(greet());
console.log(greet("김연신"));
console.log(greet("김연신", "반갑소"));
