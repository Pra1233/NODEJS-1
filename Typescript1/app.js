//  | symbol is union of type
// Typecasting if we know type
var n1 = document.getElementById('n1');
var n2 = document.getElementById('n2');
var btna = document.querySelector('button');
// Error because typescript dont know where button is
btna.addEventListener('click', function () {
    var num1 = n1.value;
    var num2 = n2.value;
    console.log(add(+num1, +num2));
});
// function add(num1:number|string, num2:number|string) {
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + num2;
    }
    else
        return +num1 + +num2;
}
function obj(o) {
    console.log("object.val", o.val, o.timestamp);
}
var ans = add(1, 6);
var oans = obj({ val: ans, timestamp: new Date() });
console.log(ans);
console.log(add('1', '3'));
// Array;
var numArray = [];
var stringArray = [];
numArray.push(ans);
stringArray.push('a');
console.log("numArray", numArray);
console.log(stringArray);
// console.log(add('1', '6'));
