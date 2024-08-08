// 반드시 genderTypee 변수는 Male, Female 두 개의 문자열값으로 값을 제한하겠다.
// 변수 선언시 특정 값으로 변수의 할당되는 값들의 범위를 제한할 수 있다.
let genderType: "Male" | "Female";

// 선언된 변수에 값을 할당하는데 변수 선언시 정의한 특정값의 범위를 벗어난 값은 할당불가
genderType = "Male";

// genderType = "Sample";

// type alias를 이용해 사용자 객체의 타입을 정의해보자
type User = {
    name:string;
    age:number;
    userType: "admin" | "user";
    address: {city: string; country: string};
}

const user:User = {
    name: '김연신',
    age: 24,
    userType: "admin",
    address: {city: "Changwon", country: "South Korea"}
}

// 함수를 만들고 함수의 반환값을 특정 값으로 제약하기
function getUserType(user): 1 | 2 {
    if (user.userType === "admin") {
        return 1;
    } else {
        return 2;
    }
}

getUserType(user);

// 열거형에 대해 알아봅시다.
// 특정 값의 범위를 상수처럼 한 번 할당해서 값의 범위를 제약한다.
enum DisplayType {
    NoneDisplay = 0,
    Display = 1,
}

const displayCode = 1;
const display = displayCode as DisplayType;

const displayTestCode:DisplayType = 1;
const displayTestCode1:DisplayType = DisplayType.NoneDisplay;
const displayTestCode2 = DisplayType.NoneDisplay;

// 열거형을 정의해서 사용하는 주요 목적은
// 코드성 데이터를 소스내에 직접 박아서 사용하는것은 좋지않아서
// 반복적으로 또는 값이 범위가 제한되어 있는 데이터들을 enum 타입을 이용해서
// 값의 설명과 실제값을 표시하여 사용한다.
if (display === DisplayType.Display) {
    console.log("해당 게시글은 게시중 상태입니다.");
}

// 회원가입시 SNS으로 가입한 경우 시스템에서 제공한 SNS가입유형코드관리
enum SNSType {
    None = "",
    Facebook = "F",
    Instagram = "I",
    Twitter = "T"
};

// enum 타입은 실제 값을 할당하지 않으면 0부터 시작하는 숫자값이 자동으로 할당됩니다.
enum EntryState {
    Inactive,
    Active,
    Pending
}

enum MemberType {
    Admin = 2,
    User = 1,
    Guest = 0,
}

type Member = {
    id:number;
    email:string;
    password:string;
    entryState:EntryState;
    memberType:MemberType;
    snsType:SNSType;
};

const snsTypeCode: string = "F";

let member = {
    id: 1,
    email: "test@test.co.kr",
    password: "12345678",
    entryState: EntryState.Active,
    memberType: MemberType.Admin,
    snsType: snsTypeCode as SNSType, 
};