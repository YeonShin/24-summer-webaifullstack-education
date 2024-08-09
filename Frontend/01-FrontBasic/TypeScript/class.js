var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        if (name === void 0) { name = ''; }
        this.name = name;
    }
    // 일반화된 기능 정의
    Animal.prototype.move = function () {
        console.log("".concat(this.name, " \uC6C0\uC9C1\uC774\uACE0 \uC788\uC5B4\uC694"));
    };
    return Animal;
}());
// 클래스는 클래스를 상속받아 기능과 속성을 확장할 수 있다.
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log("".concat(this.name, " \uC9D6\uACE0 \uC788\uC5B4\uC694."));
    };
    return Dog;
}(Animal));
var myDog = new Dog('누루');
console.log("\uB0B4 \uAC15\uC544\uC9C0 ".concat(myDog.name, "\uAC00"));
myDog.bark();
