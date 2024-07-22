// 프로젝트에 설치된 노드패키지를 참조합니다.
// node.js backend에서는 require예약어를 사용해 설치된 패키지를 참조합니다.
const moment = require("moment");


// console 객체는 node framework 자체에서 제공하는 내장객체
// console 객체는 웹브라우저 개발자도구 console의 로그와 다릅니다.
console.log("index.js 모듈이 시작되었습니다.");

var toDate = Date();
var toDate2 = Date.now();

console.log("현재 일시를 출력합니다. -순수자바스크립트1:", toDate);
console.log("현재 일시를 출력합니다. -순수자바스크립트2:", toDate2);

var formatedDate = moment(toDate2).format("YYYY-MM-DD HH:mm:ss");

console.log("현재 일시를 출력합니다. -formatedDate:", formatedDate);

// 대부분의 자바스크립트 오류는 오탈자입니다.
// 초기 자바스크립트 언어개발시 문제가 있다면 오탈자/대소문자 문제입니다.
// 자바스크립트는 대소문자를 가려요...