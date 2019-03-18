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
/* Commenting out lecture code

// Map declaration and basic methods:

const question = new Map(); // Creating a new map object

question.set('question', 'What is the official name of the latest major JavaScript version?');

question.set(1, 'ES6');
question.set(2, 'ES5');
question.set(3, 'ES2014');
question.set(4, 'ES2015');

question.set('correct', 4);

question.set(true, 'Correct Answer!');
question.set(false, 'Wrong!');

console.log(question);

console.log(question.get('question')); // retrieve the value of a map key.
console.log(question.size); // -> 8. shows the amount of items the map has.
question.delete(1); // -> removes a map element by key. Now the question.size is 7.

if (question.has(1)) question.delete(1); // -> If the map has an element with the key of '1', delete it.

question.clear(); // deletes all the elements in the map
console.log(question.size); // -> 0

// Looping over maps:

// forEach:
question.forEach((value, key) => {
    console.log(`The key is: ${key}. its value is: ${value}.`);
});

// for of (With destructuring):
for (let [key, value] of question.entries()) {
    console.log(`The key is: ${key}. its value is: ${value}.`);
}

// Displaying the question and the answers:
console.log(question.get('question'));
for (let [key, value] of question.entries()) {
    if (typeof (key) === 'number') console.log(`Answer number ${key}: ${value}`);
}
// Getting the answer and displaying results:
const answer = parseInt(prompt('Write the correct answer'));

console.log(question.get(answer === question.get('correct')));
*/

/*****************************************************
 * Classes (Section 7, 115)
 */
/* Commenting out lecture code:

//  ES5 Constructors:

var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calcAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');
john5.calcAge(); // -> 29

// ES6 Classes:
class Person6 {

    // Constructor part:
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    // Inherited class method:
    calcAge() {
        let age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    // Static method - not inherited:
    static greeting() {
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');
john6.calcAge(); // -> 29

Person6.greeting(); // -> Hey there!
*/

/*************************************************
 * Classes with subclasses (Section 7, lecture 115)
 */
/* Commenting out lecture code:

// ES5 constructor inheritance:

// The person "Super-class":
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calcAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

// The athlete "sub-class":
var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    // Call the super-class:
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

// Pass the prototypes of the super-class to the sub-class prototype:
Athlete5.prototype = Object.create(Person5.prototype);

// sub-class specific method, does not get inherited by the super-class (Need to be set after the class inheritance):
Athlete5.prototype.wonMedal = function () {
    this.medals++
    console.log(this.medals);;
}

// Instance of an Athlete with the Person properties:
var johnAthlete5 = new Athlete5('John', 1990, 'Swimmer', 3, 10);
console.log(johnAthlete5); // -> {name: "John", yearOfBirth: 1990, job: "Swimmer", olympicGames: 3, medals: 10}

// Calling the Inherited super-class method:
johnAthlete5.calcAge(); // -> 29

// Calling the sub-class method:
johnAthlete5.wonMedal(); // -> 11


// ES6 Classes and Sub-classes:
class Person6 {

    // Constructor part:
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    // Inherited class method:
    calcAge() {
        let age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

// ES6 Sub-class:

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        // Calling the super-class:
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    // Sub-class method:
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

// New class instance:
const johnAthlete6 = new Athlete6('John', 1990, 'Swimmer', 3, 10);

// Call the super-class method;
johnAthlete6.calcAge(); // -> 29

// Call the sub-class method:
johnAthlete6.wonMedal(); //-> 11
*/

/***************************************************
 * Coding Challenge #8 (Section 7, lecture 117)
 */

/* Info:
   - We're in charge of parks and streets.
   - The town has 3 parks, and 4 streets.
   - All the parks and streets have a name and a build year.
*/
/* Tasks:
   - Present the tree density of each park in the town (Formula: number of trees / park area).
   - Average age of each towns park (Formula: sum of all ages/ number of parks).
   - The name of the park that has more than 1000 trees.
   - Total and average length of the town's streets.
   - Size classification of all the streets: tiny/small/norma/big/huge. If size is unknown, the default is normal.
*/
/* Plan:
    // - Create 2 main classes: one for parks and one for streets.
    // - Each class should have the following general properties: name, buildYear. 
    // - Park class should include extra properties: areaSize, numberOfTrees. Street class should have: length.
    // - Created relevant methods and static methods for streets and parks.
    // - Instances of parks and streets should be put inside a maps. 
    // - Create an array of total amount of park instances(?).
    // - Create an array of total amount of street instances(?).
*/


// start code:
{
    // City assets superclass:
    class Assets {
        constructor(name, buildYear) {
            this.name = name;
            this.buildYear = buildYear;
        }
    }

    // Street subclass:
    class Street extends Assets {
        constructor(name, buildYear, length, size = 'Normal') {
            super(name, buildYear);
            this.length = length;
            this.size = size;
        }

        calcSize() {
            if (this.length >= 20) {
                this.size = 'Huge';
            } else if (this.length >= 15 && this.length <= 20) {
                this.size = 'Big';
            } else if (this.length >= 10 && this.length <= 15) {
                this.size = size;
            } else {
                this.size = 'Small';
            }
            return this.size;
        }

        static calcLength(totalLength, totalStreets) {
            console.log(`The average length of a street is ${(totalLength/ totalStreets).toFixed(2)} km, while the total length is ${totalLength} km.`);
        }
    }

    // Street instances array setup:
    const streetArr = [];
    const streetInstanceArr = function (name, year, length, size) {
        streetArr.push(new Street(name, year, length, size));
    }
    // Street instances list:
    const shuiYuanSt = streetInstanceArr('ShuiYuan Street', 1950, 17.5);
    const daAnSt = streetInstanceArr('Daan Street', 1927, 22.3);
    const tongAnSt = streetInstanceArr('TongAn Street', 1962, 7);
    const pingAnSt = streetInstanceArr('PingAn Street', 1947, 19.1);

    // Set street size:
    function setSize(...instances) {
        instances.forEach((instance) => {
            instance.calcSize();
        });
    }
    setSize(...streetArr); // Call using spread operator.

    // Street map:
    const streetMap = new Map();

    // Set streets into the map: 
    function setStreet(...instances) {
        instances.forEach((instance, i) => {
            streetMap.set(i, instance);
        });
    }
    setStreet(...streetArr); // Call using spread operator.

    // total streets:
    const streetMapSize = streetMap.size;

    // total length:
    const totalLength = function () {
        const lengthArr = [];
        for (let [key, value] of streetMap.entries()) {
            lengthArr.push(value.length);
        }
        const sum = lengthArr.reduce((total, entry) => total + entry);
        return sum;
    }

    // Average length: 
    const lengthAverage = totalLength / streetMapSize;

    // Display streets info:
    function displayStreet(key) {
        console.log(`${streetMap.get(key).name}, built in ${streetMap.get(key).buildYear}, is a ${streetMap.get(key).size} street.`);
    }

    // Park class:
    class Park extends Assets {
        constructor(name, buildYear, numberOfTrees, areaSize) {
            super(name, buildYear);
            this.numberOfTrees = numberOfTrees;
            this.areaSize = areaSize;
        }

        treeDensity() {
            console.log(`The total tree density of ${this.name} is: ${(this.numberOfTrees / this.areaSize).toFixed(2)} per square km.`);
        }

        static averageAge(totalAges, totalParks) {
            console.log(`The average age of our town's parks is ${totalAges / totalParks} years.`);
        }
    }

    // Park Instances array setup:
    const parkArr = [];
    const parkInstanceArr = function (name, year, treesNo, size) {
        parkArr.push(new Park(name, year, treesNo, size));
    }

    function calcDensity(...instances) {
        instances.forEach((instance) => {
            instance.treeDensity();
        });
    }
    setSize(...parkArr);

    // Park instance list:
    const daanPark = parkInstanceArr('Daan Park', 1940, 1300, 22);
    const neihuPark = parkInstanceArr('Neihu Park', 1982, 765, 13.3);
    const zhongzhengPark = parkInstanceArr('ZhongZheng Park', 1955, 980, 18.4);

    // Park Map:
    const parkMap = new Map();

    // Set map:
    function setParks(...instances) {
        instances.forEach((instance, i) => {
            parkMap.set(i, instance);
        });
    }
    setParks(...parkArr);

    // Calculate total amount of parks:
    const totalParks = parkMap.size;

    // Calculate total ages:
    const CalculateAges = function () {
        const currentYear = new Date().getFullYear();
        agesArr = [];
        for (let [key, value] of parkMap.entries()) {
            agesArr.push(currentYear - value.buildYear);
        }
        const sum = agesArr.reduce((total, age) => {
            return total + age;
        }, 0);
        return sum;
    }

    // Display parks with over 1000 trees:
    function thousandTrees() {
        for (let [key, value] of parkMap.entries()) {
            if (value.numberOfTrees >= 1000) console.log(`${value.parkName} has over 1000 trees, the precise amount is ${value.numberOfTrees} trees.`);
        }
    }

    // Display report data - Streets:
    console.log(`---STREET REPORT---`);
    console.log('\n');
    Street.calcLength(totalLength(), streetMapSize);
    displayStreet(0);
    displayStreet(1);
    displayStreet(2);
    displayStreet(3);
    console.log(`\n`);

    // Display report data - Parks:
    console.log(`---PARKS REPORT---`);
    console.log(`\n`);
    Park.averageAge(CalculateAges(), totalParks);
    parkMap.get(0).treeDensity();
    parkMap.get(1).treeDensity();
    parkMap.get(2).treeDensity();
    thousandTrees();
    console.log(`\n`);
    console.log(`---END OF THE REPORT---`);
}
// End of code 

// Jonas' solution:
/*
class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    static calc(arr) {
        const sum = arr.reduce((total, el) => {
            return total + el;
        }, 0).toFixed(2);

        return [sum, (sum / arr.length).toFixed(2)];
    }
}

class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; // km2
        this.numTrees = numTrees;
    }

    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}

const allParks = [
    new Park('Green Park', 1987, 0.2, 215),
    new Park('National Park', 1894, 2.9, 3541),
    new Park('Oak Park', 1953, 0.4, 949),
];

const allStreets = [
    new Street('Ocean Avenue', 1999, 1.1, 4),
    new Street('Evergreen Street', 2008, 2.7, 2),
    new Street('4th Street', 2015, 0.8),
    new Street('Sunset Boulevard', 1982, 2.5, 5),
];

function reportParks(p) {
    console.log(`--- PARK REPORT ---`);

    // Density
    p.forEach(el => el.treeDensity());

    // Average age
    const ages = p.map(el =>
        new Date().getFullYear() - el.buildYear
    );
    const [totalAge, averageAge] = Element.calc(ages);
    console.log(`Our ${p.length} parks have an average of ${averageAge} years.`);

    // Which park has more than 1000 trees
    const index = p.map(el => el.numTrees).findIndex(
        el => el >= 1000);
    console.log(`${p[index].name} has more than 1000 trees.`);
}

function reportStreets(s) {
    console.log(`--- STREET REPORT ---`);

    // Total and average length
    const [totalLength, averageLength] = Element.calc(s.map((el) => el.length));
    console.log(`Our ${s.length} streets have a total of ${totalLength}, with an average of ${averageLength}`);

    // Classify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);
*/