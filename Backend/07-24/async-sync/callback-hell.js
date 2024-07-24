// 자바스크립트/노드 프로그래밍은 기본적으로 비동기방식으로 작동합니다.

// setTimeout() 함수는 특정 시간(초)이 지난후에 특정 로직이 길행되는 내장함수
var fnSample = function () {
  console.log("fnSample() 함수가 실행됩니다....");

  // setTimeout 함수가 실행되면 4초 후에 내부 로직이 실행됩니다.
  setTimeout(function () {
    console.log("로직1 실행완료 - 4초 경과");
  }, 4000);

  // setTimeout 함수가 실행되면 3초 후에 내부 로직이 실행됩니다.
  setTimeout(function () {
    console.log("로직2 실행완료 - 3초 경과");
  }, 3000);

  // setTimeout 함수가 실행되면 2초 후에 내부 로직이 실행됩니다.
  setTimeout(function () {
    console.log("로직3 실행완료 - 2초 경과");
  }, 2000);

  // setTimeout 함수가 실행되면 1초 후에 내부 로직이 실행됩니다.
  setTimeout(function () {
    console.log("로직4 실행완료 - 1초 경과");
  }, 1000);
};

// 뒤에 비동기방식으로 작동되는 fnSample()함수 로직을 동기방식(순차적 프로그래밍)으로 구현해보자
// 순서 기반으로 로직1->로직2->로직3->로직4 순서대로 함수가 실행되어야하는 임무가 있다 생각해보자

// 동기방식 기반으로 작동하는 fnSyncSample
// 그래서 일반적으로 동기방식을 구현하기 위해 콜백함수를 사용하면 콜백지옥이슈가 발생
// 이 이슈를 해결하기 위한 방식으로 자바스크립트에서는 promise / async/await이라는 키워드를 제공합니다.
// 가장 최신의 비동기방식으로 순차적 프로그래밍 구현할수 있는 권장되는 방식은 async/await 방식을 추천합니다.
var fnSyncSample = function() {
    console.log("fnSyncSample() 함수가 실행됩니다....");

    // setTimeout 함수가 실행되면 4초 후에 내부 로직이 실행됩니다.
    setTimeout(function () {
      console.log("로직1 실행완료 - 4초 경과");

      // 로직2 기능구현하기
      setTimeout(function () {
        console.log("로직2 실행완료 - 3초 경과");

        // 로직3 기능구현하기
        setTimeout(function () {
            console.log("로직3 실행완료 - 2초 경과");

            // 로직4 기능 구현하기
            setTimeout(function () {
                console.log("로직4 실행완료 - 1초 경과");
              }, 1000);
          }, 2000);
      }, 3000);
    }, 4000);
}

// 비동기방식으로 작동되는 fnSample() 함수를 실행합니다.
// fnSample();

// 동기방식으로 순차적 프로그래밍을 하려면 함수로직내에서 다름 함수를 정의/실행하는 방식을 사용(콜백함수)하는데
// 콜백함수를 계속사용하면 콜백지옥이 발생한다.
fnSyncSample();