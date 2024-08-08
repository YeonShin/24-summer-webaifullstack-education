class Animal {
    // 일반화된 속성 정의
    name: string;

    // 일반화된 기능 정의
    move() {
        console.log(`${this.name} 움직이고 있어요`);
    }

    constructor(name:string='') {
        this.name = name;
    }
}

// 클래스는 클래스를 상속받아 기능과 속성을 확장할 수 있다.
class Dog extends Animal {
    bark(){
        console.log(`${this.name} 짖고 있어요.`);
    }
}

let myDog = new Dog('누루');
console.log(`내 강아지 ${myDog.name}가`);
myDog.bark();

