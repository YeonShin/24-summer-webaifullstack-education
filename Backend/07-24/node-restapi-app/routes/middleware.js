// exports 함수명은 해당 모듈파일에서 여러개의 재사용 가능한 함수의 기능을 바로 외부에서 사용할 수 있게 노출합니다.

// 사용자 요청 URL을 분석해서 파라미터 방식으로 같이 전달된 경우 특정 파라미터 값을 추출해서
// 비지니스 로직을 처리한다.
exports.checkParams = (req, res, next) => {
    if (req.params.id === undefined) {
        console.log("id 파라미터가 존재하지가 않습니다.");
        // res.redirect("/");
    } else {
        console.log("id 파라미터 값: ", req.params.id);
    }
    next();
}
// 쿼리 스트링 방식으로 키값을 추출해서 비지니스 로직 처리
exports.checkQuery = (req, res, next) => {
    if (req.query.category === undefined) {
        console.log("category 키값이 존재하지가 않습니다.");
    } else {
        console.log("cagegory 파라미터 값: ", req.params.category);
    }
    next();
}