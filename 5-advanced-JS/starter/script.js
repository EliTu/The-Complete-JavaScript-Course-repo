/* eslint-disable no-console */
/************************************************
  * ! Prototypes and Function Constructors
 */

/* Commenting out old code:

let Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calcAge = function() {
    console.log(2019 - this.yearOfBirth);   
}

let john = new Person('John', 1990, 'Teacher');
let mark = new Person('Mark', 1950, 'Retired');
let jane = new Person('Jane', 1985, 'Designer');

Person.prototype.lastName = 'Smith'

john.calcAge();
mark.calcAge();
jane.calcAge();
console.table(john);
console.table(mark);
console.table(jane);
*/

/********************************************************
 * ! Creating Objects: object.create (section 5, lecture 63)
 */

/* Commenting out old code:

let personProto = {
    calcAge: function () {
        console.log(2019 - this.yearOfBirth);
    }
};

const john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'Teacher';
console.log(john);

const jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});
console.log(jane);
*/

/*********************************************
 * ! Primitives vs Objects (Section 5, lecture 64)
 */
/* Commenting out old code:

    // Variables holding primitives:
let a = 23;
let b = a; 
a = 46;
console.log(a, b);

    // Variables holding objects:
let obj1 = {
    name: 'john',
    age: 26
};
let obj2 = obj1;
obj1.age = 30;
console.log(obj1.age, obj2.age);

    // Primitives & Objects on functions:
let age = 27;
let obj = {
    name: 'Eliad',
    city: 'Taipei'
};

function change(a, b) {
    a = 30;
    b.city = "Kaohsiung";
}
change(age, obj);
console.log(age, obj.city);
*/

/********************************************
 * ! First Class Functions - Passing functions as arguments (Section 5, lecture 65)
 */
/* Commenting out old code:
  
 let years = [1991, 2008, 1985, 1950, 1920];

 function arrayCalc(arr, fn) {
     let arrRes = [];
     for (i = 0; i < arr.length; i++) {
         arrRes.push(fn(arr[i]));
     }
     return arrRes;
 }

 function calcAge(el) {
     return 2019 - el;
 }

 function isFullAge(el) {
     return el >= 18;
 }

 function maxHearRate(el) {
     if(el >= 18 && el <= 81) {
     return Math.round(206.9 - (0.67 * el));
     } else {
         return -1;
     }
 }


let ages = arrayCalc(years, calcAge);
let fullAGe = arrayCalc(ages, isFullAge);
let hearRate = arrayCalc(ages, maxHearRate);
console.log(ages);
console.log(fullAGe);
console.log(hearRate);


 let years = [1991, 2008, 1985, 1950, 1920];

*/

/**********************************************************************
 * ! First Class Functions - Functions returning functions (Section 5, lecture 66)
 */
/* Commenting out old code:

 function interviewQuestion(job) {
     if (job === 'designer') {
      return function(name) {
             console.log(name + ', can you please explain what UX design is ?');
         }
         } else if(job === 'teacher') {
             return function(name) {
                 console.log(name + ', what subject do you teach ?');
             }
         } else {
             return function(name) {
                 console.log('hello ' + name + ', what do you do?')
             }
         }
     }

 let teacherQuestion = interviewQuestion('teacher');
 teacherQuestion('John');

 let designerQuestion = interviewQuestion('designer');
 designerQuestion('John');

 teacherQuestion('Jane');
 designerQuestion('Mark');
 teacherQuestion('Mike');

 interviewQuestion('teacher')('Mark'); // Calling a function and the function inside of it
*/

/*********************************************************************
 * ! Immediately invoked function expressions (IIFE) (Section 5, lecture 67)
 */
/* Commenting out old code:

function game() {
    let score = Math.floor(Math.random() * (9 - 0) + 1 );
    if (score >= 5) {
        console.log('WIN!');
    } else {
        console.log('LOSE!');
    }
    console.log(score); // For checking 
}
game();

(function() {
    let score = Math.floor(Math.random() * (9 - 0) + 1);
    if (score >= 5) {
        console.log('WIN!');
    } else {
        console.log('LOSE!');
    }
})();

(function(goodLuck) {
    let score = Math.floor(Math.random() * (9 - 0) + 1);
    if (score >= 5 - goodLuck) {
        console.log('WIN!');
    } else {
        console.log('LOSE!');
    }
})(4);
*/

/*************************************************************
 * ! Closures(Section 5, lecture 68)
 */
/* Commenting out old code:

 function retire(retireAge) {
     let a = ' years left until retirement.';
     return (yearOfBirth) => { // ES6 BABY! YEAHHHH!
         let age = 2019 - yearOfBirth;
         console.log((retireAge - age) + a);
     }
 }

 var retirementIsrael = retire(67); // Store the function in a fixed expression with a name.
 retirementIsrael(1991); // Call it with a year of birth.

 retire(65)(1991); // Shorter call method.
 
  // Challenge - rewrite a previous function to use closures:

    
    // My attempt:
 function interviewQuestion(job) {
     let greet = 'Hello';
     let interest = 'why do you want to be a ' + job + '?';
     if (job === 'designer') {
         return (name) => {
             console.log(greet + ' ' + name + ', can you please explain what UX design is ?');
             console.log(name + ', ' + interest);
         }
     } else if (job === 'teacher') {
         return (name) => {
             console.log(greet + ' ' + name + ', what subject do you teach ?');
             console.log(name + ', ' + interest);
         }
     } else {
         return (name) => {
             console.log(greet + ' ' + name + ', what do you do?');
             console.log(name + ', ' + interest);
         }
     }
 }
 let interviewBar = interviewQuestion('bartender');
 interviewBar('Mooki');
 let interviewDesigner = interviewQuestion('designer');
 interviewDesigner('Moshe');


    // Solution:
 function interviewQuestion(job) { // We can create 
     return (name) => {
        if (job === 'teacher') {
            console.log(name + ', can you please explain what UX design is ?');
        } else if(job === 'designer') {
            console.log(name + ', what subject do you teach ?');
        } else {
            console.log('hello ' + name + ', what do you do?');
        }
     }
 }
 let interviewBar = interviewQuestion('bartender');  interviewBar('Mooki');
 interviewQuestion('designer')('Moshe');

    // Rewrite of my attempt:
function interviewQuestion(job) {
    let greet = 'Hello';
    let interest = 'why do you want to be a ' + job + '?';
    return (name) => {
        if (job === 'designer') {
            console.log(greet + ' ' + name + ', can you please explain what UX design is ?');
            console.log(name + ', ' + interest);
        } else if (job === 'teacher') {
            console.log(greet + ' ' + name + ', what subject do you teach ?');
            console.log(name + ', ' + interest);
        } else {
            console.log(greet + ' ' + name + ', what do you do?');
            console.log(name + ', ' + interest);
        }
    }
}
 interviewQuestion('designer')('Losha');
 interviewQuestion('Pro gamer')('Slavoj');
 */

/***********************************************************************
  * ! Bind, Call and Apply (Section 5, lecture 69)
  */
/* Commenting out old code:
 let john = {
     name: 'John',
     age: 28,
     job: 'Teacher',
     presentation: function(style, timeOfDay) {
         if (style === 'formal') {
             console.log('Good ' + timeOfDay + ' ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ', and I am ' + this.age + ' years old.');
         } else if (style === 'friendly') {
            console.log('Hey, whazzap? I\'m ' + this.name + ', and I\'m ' + this.age + ' years old' + '. Have a nice ' + timeOfDay + '.');
         } 
     }
 };

  john.presentation('formal', 'morning');

    // '.call' method:
 let emily = {
     name: 'Emily',
     age: 35,
     job: 'designer'
 };

 john.presentation.call(emily, 'friendly', 'evening');

    // '.apply' method:
 john.presentation.apply(emily, ['friendly', 'afternoon']);

    // '.bind' method:
let johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('teatime');
johnFriendly('Kawanza');

let emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('Purging');
*/
/*

let years = [1991, 2008, 1985, 1950, 1920];

function arrayCalc(arr, fn) {
    let arrRes = [];
    for (i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calcAge(el) {
    return 2019 - el;
}

function isFullAge(el, limit) {
    return el >= limit;
}

let ages = arrayCalc(years, calcAge);
console.log(ages);

let isOverLimit = arrayCalc(ages, isFullAge.bind(this, 21));
console.log(isOverLimit); 
*/

/*******************************************************
 * ! Coding Challenge #7:
 */

/* 
  * INSTRUCTIONS:
  1. Build a constructor function to describe a question. A question should include:
    - the question itself
    - the answers, one of them is correct (should be an array)
    - correct answer

  2. Create a couple of questions using this constructor

  3. Store them all into an array

  4. Select one random question and log it to the console, with the possible answer (write a method for the Question object for this task).

  5. use the 'prompt' function to ask the user the user for the answer. The user should select a number as the correct answer.

  6. Check if the answer is correct and print to the console weather the answer is correct or not (Write method for this).

  7. Make sure that all your code is private and doesn't interfere with the other programmers code (IIFE)

  8. After you display the result, display the next random question, so the game never ends (Write a function for this)

  9. Make an 'exit' option for the user. In this case the program won't call the function from section 8.

  10. Track the user's score. Every time the answer is correct, add one point (Can use closures here).

  11. Display the score in the console. (Can write another method here)

 */

(function() {
    
     // 1. Question constructor function:

     const Question = function (content, answers, correct) {
         this.content = content;
         this.answers = answers;
         this.correct = correct;
     }

     let score = 0;

     // 2. Questions:

     const question_1 = new Question(
         'Inside which HTML element do we put the JavaScript?',
         ['0: <scripting>',
             '1: <js>',
             '2: <script>'
         ],
         2
     );

     const question_2 = new Question(
         'Where is the correct place to insert a JavaScript?',
         ['0: The <body> tag',
             '1: The <head> tag',
             '2: Both the <head> section and the <body> section are correct'
         ],
         0
     );

     const question_3 = new Question(
         'The external JavaScript file must contain the <script> tag.',
         ['0: True',
             '1: False'
         ],
         0
     );

     const question_4 = new Question(
         'How do you write "Hello World" in an alert box',
         ['0: msg("Hello World")',
             '1: alert("Hello World")',
             '2: alertBox("Hello World")'
         ],
         1
     );

     const question_5 = new Question(
         'How do you create a function in JavaScript?',
         ['0: function myFunction()',
             '1: function:myFunction()',
             '2: function = function()'
         ],
         0
     );

     const question_6 = new Question(
         'How to write an IF statement in JavaScript?',
         ['0: if i === 5 then',
             '1: if(i===5)',
             '2: if i = 5'
         ],
         1
     );
     // 3. Question array:

     const questionArr = [question_1, question_2, question_3, question_4, question_5, question_6];

     // 4. Random question:
     function randomQuestion(arr, fn1, fn2) {
         let random = arr[Math.floor(Math.random() * (6 - 0))];
         return fn1(random), fn2(random);
     }
     randomQuestion(questionArr, logQuestion, askUser);

     function logQuestion(el) {
         console.log(el.content);
         for (let i = 0; i < el.answers.length; i++) {
             console.log(el.answers[i].toString());
         }
     }

     // 5. Use prompt function:
     function askUser(el) {
         let userInput = prompt(`Please insert the number of the correct answer for the following question:`);
         if (userInput == el.correct) {
             correct();
             randomQuestion(questionArr, logQuestion, askUser);
         } else if (userInput === `exit`) {
             exitGame();
         } else {
             incorrect();
             randomQuestion(questionArr, logQuestion, askUser);
         }
     }

     function correct() {
         console.log('\n');
         console.log(`CORRECT!`);
         score++;
         console.log(`Current Score: ${score.toString()}`);
         console.log('\n');
     }

     function incorrect() {
         console.log('\n');
         console.log('WRONG!');
         score--;
         console.log(`Current Score: ${score.toString()}`)
         console.log('\n');
     }

     function exitGame() {
         console.log('\n');
         console.log('GAME OVER!');
         console.log(`End Game Score: ${score.toString()}`);
         console.log('\n');
     }
})();

/*
// Jonas's Solution:

(function() { // IIFE for the whole code we wrote to make it inaccessible from the outside and secure.
	// Constructor:
	function Question(question, answer, correct) {
		this.question = question;
		this.answer = answer;
		this.correct = correct;
	}

	Question.prototype.displayQuestion = function () { // Writing a method to display the questions and the answers, but instead of writing it inside the Question constructor we input it in the prototype of the instances, so whenever a random question initiated, it would be able to call on this method because it's in its prototype.
		console.log(this.question);
		for (let i = 0; i < this.answer.length; i++) {
			console.log(i + ' ' + this.answer[i]); // The initial 'i' would simply display the index number of the answer.
		}
	};

	Question.prototype.checkAnswer = function(ans, callback) {
        let score;
		if (ans === this.correct) {
            console.log('Correct!');
            score = callback(true);
		} else {
            console.log('Wrong!');
            score = callback(false);
        }
        this.displayScore(score);
    };

	// Instantiation - Questions:
	let q1 = new Question(
		'Is JavaScript the coolest programming language in the world?',
		['Yes', 'No'],
		0
	);
	let q2 = new Question(
		'What\'s the name of this course\'s teacher?',
		['Larry', 'Jonas', 'Barry'],
		1
	);
	let q3 = new Question(
		'What is the type of an \'arrow function\'?',
		['Function declaration', 'Function literal', 'Function expression', 'None of the above'],
		2
    );

    	// Sort into an array:
    let questions = [q1, q2, q3];

    function score() {
        let userScore = 0;
        return function (correct) {
            if (correct) { // If correct === true;
                userScore++; // Simply adds 1.
            } 
            return userScore;
        } // No need for 'else', if the answer is anything but correct it will simply return the current score and won't update anything.
    }

    Question.prototype.displayScore = function(score) {
        console.log(`your current score is ${score}`);
        console.log(`------------------------------------`);
    }

    let keepScore = score();

	function nextQuestion() {
		// Random question from the array:
		var n = Math.floor(Math.random() * questions.length); // The min-max values of the Math.random method is the length of the array, meaning between 0 and 2.

		// Displaying the questions:
		questions[n].displayQuestion();

		// Prompt:
		let answer = prompt('Please select the correct answer:'); 

        if(answer !== `exit`) {
            questions[n].checkAnswer(parseInt(answer), keepScore); 
        //Whatever text we input into the prompt field will be a string, but our answer in the questions instances are numbers(integers), so we need to use the parseInt method in order to convert strings to integers. 
            nextQuestion();
        }
    }

    nextQuestion();
})();
*/
