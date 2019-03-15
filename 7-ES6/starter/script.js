/**************************************
 * 'let' and 'const' variable declaration keywords (Section 7, lecture 104)
 */

/* Commenting out lecture code

//  ES5 Syntax demonstration - 'var':

var name5 = 'John Doe';
var age5 = 23;

name5 = 'John Smith'; // Variable mutation is possible.
console.log(name5); // -> John Smith.

// ES6 Syntax demonstartion - 'let' and 'const':

const name6 = 'John Doe'; // Constant variables, immutable.
let age6 = 23; // Mutable variables.

// name6 = 'John Smith'; // Trying to mutate const variable.
// console.log(name6); // -> ERROR.

// ES5 and ES6 - Function scope and block scope:

// ES5 demonstartion:

function driversLicence5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1998;

        console.log(`${firstName} born in ${yearOfBirth} is now officially allowed to drive a car.`);
    }
}
driversLicence5(true); // -> Outputs the string with the variables.

// ES6 demonstration:
const driversLicence6 = (passedTest) => {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1998;
    }
    console.log(`${firstName} born in ${yearOfBirth} is now officially allowed to drive a car.`);
}
driversLicence6(true); //-> if the console.log is inside the 'if' statement block, the string will be loged to the console. But if the console.log is outside the 'if' scope, we will receive an error: 'firstName' is not defined.

// Solution for the 'block scope' problem:
const driversLicence62 = (passedTest) => {
    let firstName; // Declare variables outside the blocked scope
    const yearOfBirth = 1998; // const can only be declared ones and cannot be reassigned or mutated. 
    if (passedTest) {
        firstName = 'John'; // assign a value inside the block scope.
    }
    console.log(`${firstName} born in ${yearOfBirth} is now officially allowed to drive a car.`);
}
driversLicence62(true); //-> Outputs the string with the variables.

// ES6 global and block scope variable assignment:

let i = 23; // Declaring a variable in the global scope

for (let i = 0; i < 5; i++) { // Declaring variable with the same in a blocked scope.
    console.log(i); // -> i === 0~4. 
}
console.log(i); // -> i === 23. Although the 2 variables have the same name, using 'let', the 2 variables are different, due to the difference in the global scope and the block scope.

// ES5 global and block scope variable assignment:

var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i); // i === 0~4.
}
console.log(i); // i === 5. The 2 variables are the same in the global scope and in the block scope.

*/

/***************************************************
 * Blocks and IIFEs (Section 7, lecture 105)
 */

/* Commenting out lecture code

//  ES6 Creating a block scope that is not accessible from the outside, instead of an ES5 IIFE:

{
    const a = 1;
    let b = 2;
    var c = 3;
}
console.log(a + b); // -> ERROR. Variables are not available.
console.log(c); // -> Output: 3. the c variable is available since 'var' is function scoped, and here we have a block scope.

// ES5 IIFE:

(function () {
    var c = 3;
})();
console.log(c); // -> ERROR. Variables are not available.
*/

/********************************************************
 * Strings in ES6 (Section 7, lecture 106)
 */

/* CCommenting out lecture code

// Template literals:

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1998;
const calcAge = (year) => {
    return 2019 - year;
}

// ES5 Strings:
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6 Strings using template literals:
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

// ES6 string methods:

const n = `${firstName} ${lastName}`;

// .srartsWith():
console.log(n.startsWith('Jo')); // -> true.
console.log(n.startsWith('N')); // -> false.
console.log(n.startsWith('j')); // -> false.

// .endsWith():
console.log(n.endsWith('th')); // -> true.
console.log(n.endsWith('sm')); // -> false.

// .includes():
console.log(n.includes(' ')); // -> true. The string has a space.
console.log(n.includes('oh')); // -> true.
console.log(n.includes('z')); // -> false.

// .repeat():
console.log(firstName.repeat(5)); // -> JohnJohnJohnJohnJohn.
console.log(`${firstName} `.repeat(5)); //-> John John John John John.
*/

/**********************************************
 * Arrow functions: Basics (Section 7, lecture 107)
 */
/* Commenting out lecture code

const years = [1990, 1965, 1982, 1937];

// ES5 function declaration:

var ages5 = years.map(function (year) {
    return 2019 - year;
});
console.log(ages5); // -> [29, 54, 37, 82]

// ES6 arrow functions syntax - simplified arrow function (one argument, one return line):

let ages6 = years.map(year => 2019 - year);
console.log(ages6); // -> [29, 54, 37, 82]

// Arrow functions - multiple parameters - add parameters parantheses:

ages6 = years.map((year, i) => `Age element ${i + 1}: ${2019 - year}.`);
console.log(ages6); // -> ["Age element 1: 29.", "Age element 2: 54.", "Age element 3: 37.", "Age element 4: 82."]

// Arrow functions - multiple code lines - use curly braces and indicate 'return':

ages6 = years.map((year, i) => {
    const now = new Date().getFullYear();
    const age = now - year;
    return `Age element ${i + 1}: ${age}.`;
});
console.log(ages6); // -> ["Age element 1: 29.", "Age element 2: 54.", "Age element 3: 37.", "Age element 4: 82."]
*/

/********************************************************
 * Arrow functions: Lexical 'this' keyword(Section7, lecture 108)
 */

/* Commenting lecture code

// ES5 Syntax - Object method with an anonymous function expression:

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', function () {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box5.clickMe(); // -> 'This is box number undefined and it is undefined'. The function doesn't read the 'this' keyword of the box5 object since the 'this' variable of the object does not apply for the anonymous eventListener function.

// ES6 syntax - Object method with an anonymous arrow function:

const box6 = {
    color: 'blue',
    position: 2,
    clickMe: function () {
        document.querySelector('.blue').addEventListener('click', () => {
            const str = `This is box number ${this.position} and it's ${this.color}`;
            alert(str);
        });
    }
}
box6.clickMe(); // -> 'This is box number 2 and it's blue'.

// ES6 syntax - Object arrow function method with anonymous arrow function:

const box66 = {
    color: 'blue',
    position: 2,
    clickMe: () => {
        document.querySelector('.blue').addEventListener('click', () => {
            const str = `This is box number ${this.position} and it's ${this.color}`;
            alert(str);
        });
    }
}
box66.clickMe() // -> 'This is box number undefined and it is undefined'. The 'this' keyword receives its value from from the object method, but because it itself an arrow function, the value of the 'this' keyword comes from the global object, and not from the method itself, and so the values will be undefined.


// ES5 'this' with function declarations:

function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (friend) {
        return this.name + ' is friends with ' + friend;
    });
    console.log(arr);
}
var friends = ['Chewie', 'Luke', 'Han'];

new Person('John').myFriends5(friends); // -> [" is friends with Chewie", " is friends with Luke", " is friends with Han"]. The name is not displayed because the 'this' keyword of the instance is not available at the anonymous function.

// ES6 'this' with arrow functions:

Person.prototype.myFriends6 = function (friends6) {
    const arr = friends.map(friend =>
        `${this.name} is friends with ${friend}`
    );
    console.log(arr);
}
var friends6 = ['Chewie', 'Luke', 'Han'];

new Person('Java').myFriends6(friends); // -> ["Java is friends with Chewie", "Java is friends with Luke", "Java is friends with Han"]. The 'this' keyword is set for the object that is calling the function, which is the Person constructor instance.
*/

/****************************************************
 * Destructuring(Section 7, lecture 109)
 */

/* Commenting lecture code

// Destructuring arrays in ES5:

var john = ['John', 26];
var name5 = john[0]; // -> John
var age5 = john[1]; // -> 26

// Destructuring arrays in ES6:

const [name6, age6] = ['John', 26];

console.log(name6); // -> John
console.log(age6); // -> 26

// Deconstructing objects in ES6:

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    firstName,
    lastName
} = obj;
console.log(firstName); // -> John
console.log(lastName); // -> Smith

// Destructring objects by assigning a different variable name:
const {
    firstName: a,
    lastName: b
} = obj;
console.log(a); // -> John
console.log(b); // -> Smith

// Using destructuring to return multiple values from a function:

const timeToRetire = (year) => {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
const [age, yearsLeft] = timeToRetire(1991);
console.log(age); // -> 28
console.log(yearsLeft); // -> 37
*/

/***********************************************************
 * Arrays in ES6 (Section 7, lecture 110)
 */
/* Commenting out lecture code:

const boxes = document.querySelectorAll('.box'); // -> node list

// Converting node list into an array:

// ES5 conversion - '.slice' + '.call()':

var boxesArr5 = Array.prototype.slice.call(boxes); // a hack to transform node list to an array,

boxesArr5.forEach((box) => {
    box.style.background = 'dodgerblue';
});


// ES6 conversion - '.from()':
// an array method that transforms a node list into an array.
const boxArr6 = Array.from(boxes);

Array.from(boxes).forEach((box) => {
    box.style.background = 'goldenrod';
});

// Loops:

// ES5 loops - 'for' loops:

for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') continue;
    boxesArr5[i].innerHTML = 'I\'m the new blue!';
}


// ES6 'for of' loop:

boxArr6.forEach((box) => {
    if (box.className === 'orange') continue;
    box.innerHTML = 'Wazzaaa!';
}); // -> ERROR: Illegal continue statement


for (const box of boxArr6) {
    if (box.className.includes('orange')) continue;
    box.innerHTML = `I'm the new ORANGE!`;
}

// ES5 finding index and element based on index:

var ages = [12, 17, 8, 21, 14, 11];

var fullAge = ages.map(function (age) {
    return age >= 18;
});
console.log(fullAge); // -> [false, false, false, true, false, false].

console.log(fullAge.indexOf(true)); // -> 3

const ageIndex = fullAge.indexOf(true);
console.log(ages[ageIndex]); // -> 21

// ES6 Finding index array methods - '.finedIndex():

const fullAge6 = ages.findIndex(age => age >= 18);
console.log(fullAge6); // -> 3

// ES6 Finding the element based on index - '.find()':

const ageIndex6 = ages.find(age => age >= 18);
console.log(ageIndex6); // -> 21
*/

/**********************************************
 * The Spread Operator(Section 7, lecture 111)
 */
/* Commenting out lecture code:

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1); // -> 81

// ES5 passing an array as an argument in a function:

var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages); // Calls the array and its elements as arguments on the function.
console.log(sum2); // -> 81

// ES6 passing an array as an argument in a function:

const sum3 = addFourAges(...ages); // addFourAges(18, 30, 12, 21);
console.log(sum3); // -> 81

// Using ES6 spread operator for joining arrays:

const smithFamily = ['John', 'Jane', 'Mark'];
const millerFamily = ['Mary', 'Bob', 'Ann'];

const joinFamily = [...smithFamily, 'Georgey', ...millerFamily];
console.log(joinFamily); // ["John", "Jane", "Mark", "Georgey", "Mary", "Bob", "Ann"]

// Using ES6 spread operator on node list:

const boxes = document.querySelectorAll('.box');
const heading = document.querySelector('h1');

const allElements = [...boxes, heading]; // -> node list: [div.box.green, div.box.blue, div.box.orange, h1]

allElements.forEach((element) => {
    element.style.color = 'blueviolet';
});
*/

/***********************************************************
 * Rest parameters (Section 7, lecture 112)
 */
/* Commenting out lecture code:

// ES5:

function fullAge5() {
    console.log(arguments); // -> [1990, 1999, 1965,] An array-like object, but not an array.

    var argsArr = Array.prototype.slice.call(arguments); // convert the object to an array.

    argsArr.forEach(function (arg) {
        var age = new Date().getFullYear();
        console.log((age - arg) >= 18);

    });
}
fullAge5(1990, 2003, 1965); // -> true, false, true
fullAge5(1982, 2002, 2000, 1988, 1992); // -> true, false, true, true, true

// ES6 with rest parameters:

function fullAge6(...years) {
    console.log(years); // -> [1990, 2003, 1965] An array.

    years.forEach(year => {
        const age = new Date().getFullYear();
        console.log((age - year) >= 18);
    });
}
fullAge6(1990, 2003, 1965); // -> true, false, true
fullAge6(1953, 1999, 2013, 2004); // -> true, true, false, false


// More usage of the rest parameters - special argument:

// ES5:

function fullAge5(limit) {

    var argsArr = Array.prototype.slice.call(arguments, 1);
    console.log(argsArr); // -> [1990, 2003, 1965]

    argsArr.forEach(function (arg) {
        var age = new Date().getFullYear();
        console.log((age - arg) >= limit);

    });
}
fullAge5(21, 1990, 2003, 1965); // -> true, false, true

// ES6:

function fullAge6(limit, ...years) {

    years.forEach(year => {
        const age = new Date().getFullYear();
        console.log((age - year) >= limit);
    });
}
fullAge6(21, 1999, 2003, 1965, 1996); // -> false, false, true, true
*/

/*************************************************
 * Default Parameters (Section 7, lecture 113)
 */

/* Commenting out lecture code:

// ES5 predefined function parameters:

function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName;
    nationality === undefined ? nationality = 'American' : lastName;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990); // Only 2 arguments in the function call
console.log(john); // -> {firstName: "John", lastName: "Smith", yearOfBirth: 1990, nationality: "American"}
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
console.log(emily); // -> {firstName: "Emily", lastName: "Diaz", yearOfBirth: 1983, nationality: "Spanish"}

// ES6 default parameters:

function starkPerson(firstName, yearOfBirth, lastName = 'Stark', nationality = 'Northern') {

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
const ned = new starkPerson('Eddard', 4431);
console.log(ned); // -> {firstName: "Eddard", lastName: "Stark", yearOfBirth: 4431, nationality: "Northern"}
const jon = new starkPerson('Jon', 4470, 'Targaryen', 'Westerosi');
console.log(jon); // -> {firstName: "Jon", lastName: "Targaryen", yearOfBirth: 4470, nationality: "Westerosi"}
*/

/***********************************************************
 * Maps (Section 7, lecture 114)
 */