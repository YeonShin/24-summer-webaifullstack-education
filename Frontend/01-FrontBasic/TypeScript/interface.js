;
function greeting(user) {
    return "Hello, ".concat(user.name, "!!");
}
var user = { name: "Alice", age: 20 };
console.log(greeting(user));
var Car = /** @class */ (function () {
    function Car(speed) {
        this.speed = speed;
    }
    Car.prototype.move = function () {
        console.log("\uD604\uC7AC \uC790\uB3D9\uCC28\uB294 ".concat(this.speed.toString(), "km \uC18D\uB3C4\uB85C \uC774\uB3D9\uC911\uC785\uB2C8\uB2E4."));
    };
    return Car;
}());
var myCar = new Car(500);
console.log(myCar.speed);
myCar.move();
