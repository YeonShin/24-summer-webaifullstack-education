const odd = "홀수입니다.";
const even = "짝수입니다.";

function test() {
  console.log("base1 모듈에서 실행되는 test 함수입니다.");
}

module.exports = {
  odd,
  even: even,
  test,
};
