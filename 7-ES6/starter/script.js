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

// Destructuring arrays in ES5:

var john = ['John', 26];
var name5 = john[0];
var age5 = john[1];

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
console.log(a);
console.log(b);

// Using destructuring to return multiple values from a function:

const timeToRetire = (year) => {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
const [age, yearsLeft] = timeToRetire(1991);
console.log(age); // -> 28
console.log(yearsLeft); // -> 37