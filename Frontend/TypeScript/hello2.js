var userId = 'hong';
var userName = '홍길동';
function sayHello(userId, userName) {
    console.log('안녕하세요.' + userName + '님. 아이디는' + userId + '입니다.');
    console.log("\uC548\uB155\uD558\uC138\uC694. ".concat(userName, "\uB2D8. \uC544\uC774\uB514\uB294 ").concat(userId, "\uC785\uB2C8\uB2E4."));
}
sayHello(userId, userName);
