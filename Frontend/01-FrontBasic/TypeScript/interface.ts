// 인터페이스의 목적은
// 데이터 타입을 정의하ㅓ거나
// 특정 인터페이스를 상속받아 기능을 확장 가능하며
// 특정 클래스에서 해당 인터페이스를 상속받으면 반드시 인터페이스의 기능과 속성을 클래스에서 구현해야 한다.

interface User {
    name: string;
    age:number;
};

type MemberType = {
    name: string;
    age:number;
};

function greeting(user: User): string {
    return `Hello, ${user.name}!!`;
}

let user:User = {name: "Alice", age: 20};

console.log(greeting(user));

interface Movable {
    speed: number;
    move(): void;
}

class Car implements Movable {
    speed: number;

    constructor(speed:number) {
        this.speed = speed;
    }
    move() {
        console.log(`현재 자동차는 ${this.speed.toString()}km 속도로 이동중입니다.`);
    }
}

let myCar = new Car(500);
console.log(myCar.speed);
myCar.move();