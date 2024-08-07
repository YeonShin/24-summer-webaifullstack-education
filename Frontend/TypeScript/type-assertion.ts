let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

console.log("notSure: ", notSure);

let fullName: any = "Yeonshin Kim";

// 변수의 형변환 하기 <string>fullName  은 fullName을 string 타입으로 형변환
let fullNameLength:number = (<string>fullName).length;

// 변수의 형변환 하기2
let fullNameLength2:number = (fullName as string).length;

const companyName = 'MSoftware' as string;

// 인터페이스는 객체의 구조와 속성의 타입을 지정하는 방법
interface User {
    id:number;
    name:string;
    email:string;
    telephone?:string; // telephone 속성값은 반드시 입력안해도된다는 선택적 속성을 지정할때는 '?'
}

let user = {} as User;
user.id = 1;
user.name = "kim";
user.email = "test@test.co.kr";

console.log("user---->", user);

