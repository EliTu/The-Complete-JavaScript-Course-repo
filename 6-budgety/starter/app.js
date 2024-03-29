//! Modules - The MVC architect module structure:

//* Budget Control Module - MODEL:

const budgetController = (() => {

    // Constructor functions for expanse items:
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // Prototype method for the Expense constructor to calculate item percentage of the total income:
    Expense.prototype.calcPercent = function (totalInc) {
        // Calculate the percentage and round it to an integer if there's income:
        totalInc > 0 ?
            this.percentage = (this.value / totalInc) * 100 :
            this.percentage = -1;
    };

    // Return the calculated value, parse it into floating number and fix the floating point to 2 numbers after the '.':
    Expense.prototype.getPercentage = function () {
        return parseFloat(this.percentage).toFixed(2);
    };

    // Constructor functions for income items:
    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Calculate the value sum of all the items:
    const calcItems = (type) => {
        // Initial sum value:
        let sum = 0;

        // Get the value of each array item and add it to the sum:
        budgetData.allItems[type].forEach((item) => {
            sum += item.value;
        });

        // Assign the sum of the items value to the totals according to the type of the item:
        budgetData.totals[type] = sum;
    };

    // Expense and Income item data storage:
    const budgetData = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },

        budgetTotal: 0,
        percentage: -1
    };

    // Public functions:
    return {

        // Adding an item to the data storage
        addNewItem: (type, des, val) => {

            let newItem, idNumber;

            // Create a new and unique ID for each new item based on the number of the last item in the array
            budgetData.allItems[type].length > 0 ?
                idNumber = budgetData.allItems[type][budgetData.allItems[type].length - 1].id + 1 :
                idNumber = 0;

            // New item based on the type - expense or income
            type === 'exp' ?
                newItem = new Expense(idNumber, des, val) :
                newItem = new Income(idNumber, des, val);

            // Push new item into the budgetData array based on the type
            budgetData.allItems[type].push(newItem);
            return newItem;
        },

        // Calculating the income and expense values 
        calcData: () => {

            // Get the total item sum by exectuting the calculation function on both 'inc' and 'exp':
            calcItems('inc');
            calcItems('exp');

            // Sum up the totals = income - expenses.
            budgetData.budgetTotal = budgetData.totals.inc - budgetData.totals.exp;

            // Calculate the(rounded) % of the expenses out of the total income, if there are income items
            budgetData.totals.inc > 0 ?
                budgetData.percentage = parseFloat((budgetData.totals.exp / budgetData.totals.inc) * 100).toFixed(2) :
                budgetData.percentage = -1;
        },

        // Calculate the expense items percentages:
        calcExpPercent: () => {
            budgetData.allItems.exp.forEach((item) => {
                item.calcPercent(budgetData.totals.inc);
            });
        },

        // Get the percentages of the calculated exp items
        getCalculatedPercent: () => {
            const percentData = budgetData.allItems.exp.map((item) => {
                return item.getPercentage();
            });
            return percentData;
        },

        // Remove items from the budgetData object:
        deleteBudgetItem: (type, id) => {
            // Looping over all the items in the array, if the id matches the selected item id, remove the item:
            const itemsArr = budgetData.allItems[type];

            itemsArr.forEach((item, i) => {
                if (id === item.id) budgetData.allItems[type].splice(i, 1);
            });
        },

        // Get the date data to display the current month:
        getDate: () => {
            // Get the current date:
            const date = new Date();

            // Get current month and year:
            const months = date.getMonth();
            const years = date.getFullYear();

            // Month names array:
            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];

            // Return an object that contains the full month (with a name instead of an integer) and the current year:
            return {
                currentMonth: monthNames[months],
                currentYear: years
            };

            // TODO Add the current date (DD/MM/YY) to the UI top left panel.
        },

        // TODO ADD LOCAL DATA STORAGE

        // Return the data that has been calculated
        getData: () => {
            return {
                totalExp: budgetData.totals.exp,
                totalInc: budgetData.totals.inc,
                totalBudget: budgetData.budgetTotal,
                percentage: budgetData.percentage
            }
        }
    };

})();

//* UI Control Module - VIEW:

const UIController = (() => {

    const DOMClasses = { // Object containing the class names of DOM elements.

        // Input fields
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputAmount: '.add__value',
        inputBtn: '.add__btn',
        // Item list
        container: '.container',
        inc: '.income__list',
        exp: '.expenses__list',
        itemPercent: '.item__percentage',
        // Top section budget display values
        totalVal: '.budget__value',
        incVal: '.budget__income--value',
        expVal: '.budget__expenses--value',
        percent: '.budget__expenses--percentage',
        month: '.budget__title--month'
    };

    // Formating numbers in the UI for better display and functionality:
    const formatNumber = (num, type) => {

        // Create a 2 number decimal point:
        num = Math.abs(num);
        num = num.toFixed(2);

        // Add a comma to separate larger than 1000 numbers: 
        const numSplit = num.split('.'); // Split the number between the integer and the decimal.
        let int = numSplit[0];
        let dec = numSplit[1];
        if (int.length > 3) {
            int = `${int.substr(0,int.length - 3)},${int.substr(int.length - 3, 3)}`;
        }

        // Add '+' or '-' sign before the number:
        let sign;
        type === 'exp' ? sign = '-' : sign = '+';

        return `${sign} ${int}.${dec}`;
    };

    // Public functions:
    return { // returns an object that we can use publicly.

        // Method that returns an object that selects the values of the input elements.
        getValues: () => {
            return {
                typeVal: document.querySelector(DOMClasses.inputType).value, // Moves between income(+) and expanses(-)
                descriptionVal: document.querySelector(DOMClasses.inputDescription).value,
                amountVal: parseFloat(document.querySelector(DOMClasses.inputAmount).value) // Convert the value from a string to a floating point number 
            };
        },

        // Adding and displaying an item at the app UI
        addListItem: (obj, type) => {
            // DOM list by item type and create a new div for new item
            const listType = document.querySelector(DOMClasses[type]);
            const newDiv = document.createElement('div');

            // The new item template
            newDiv.innerHTML = `
            <div class="item clearfix" id="${type}-${obj.id}">
            <div class="item__description">${obj.description} </div> 
            <div class="right clearfix">
            <div class="item__value">${formatNumber(obj.value, type)} </div> 
            <div class="item__percentage"></div>
            <div class="item__delete">
            <button class="item__delete--btn"> 
            <i class="ion-ios-close-outline"></i> </button>
            </div> 
            </div> 
            </div>
            `;

            // Sort a new item inside the corresponding list
            listType.appendChild(newDiv);

            // If its an income item, remove the percentage indicator div
            if (type !== 'exp') {
                document.querySelector(DOMClasses.itemPercent).remove();
            }
        },

        // Remove items from the UI:
        deleteListItem: (id) => {
            // Select the item to be removed by id and remove it:
            document.getElementById(id).remove();
        },

        // Clear the input fields after a new item has been added
        clearField: () => {
            // Select the input fields and output a node list
            const fields = document.querySelectorAll(`${DOMClasses.inputDescription}, ${DOMClasses.inputAmount}`);

            // Loop over them and clear each one.
            fields.forEach((field) => field.value = '');

            // Return the focus to the 'description' input
            fields[0].focus();
        },

        // Display the calculated budget in the UI: income, expense, total and percentage
        displayBudget: (obj) => {

            // Checking type for the 'formatNumber' function to work properly on the top section:
            let type;
            obj.totalBudget > 0 ? type = 'inc' : type = 'exp';

            // Displaying the top section values in the UI:
            document.querySelector(DOMClasses.totalVal).textContent = formatNumber(obj.totalBudget, type);
            document.querySelector(DOMClasses.expVal).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMClasses.incVal).textContent = formatNumber(obj.totalInc, 'inc');

            // If the calculated % is greater than 0 or defaulted:
            const topPercent = document.querySelector(DOMClasses.percent);

            if (obj.percentage >= 0) {
                topPercent.classList.add('opacity');
                topPercent.textContent = `${obj.percentage}%`;
            } else {
                topPercent.classList.remove('opacity');
                topPercent.textContent = '';
            }

        },

        // Display the percentage of the expense out of the income in each exp item:
        displayExpPercentage: (percent) => {
            // If it's an expense item (has 'percentage' label):
            if (document.querySelector(DOMClasses.itemPercent)) {
                // Get a node list of all the items:
                const expItemNode = document.querySelectorAll(DOMClasses.itemPercent);

                // Loop over them and add the percentage:
                expItemNode.forEach((item, i) => {
                    if (percent[i] > 0) {
                        item.textContent = percent[i] + '%';
                    } else {
                        item.textContent = '---';
                    }
                });
            }
        },

        // Display the current budget month and year in the UI:
        displayDate: (getDateFunc) => {
            // Get the data from the budgetController module
            const currentMonth = getDateFunc();
            // Manipulate the DOM with the data:
            document.querySelector(DOMClasses.month).textContent = `${getDateFunc().currentMonth}, ${getDateFunc().currentYear}`;
        },

        // eventListener callback function - change the colors of the input field borders by toggle between 'exp' and 'inc':
        changeColor: () => {
            // Get the input field DOM classes:
            const fields = document.querySelectorAll(
                `${DOMClasses.inputType}, ${DOMClasses.inputDescription}, ${DOMClasses.inputAmount}`
            );

            // Loop over them and apply the special class:
            fields.forEach((field) => {
                field.classList.toggle('red-focus');
            });

            // Get the add button and apply the special class:
            document.querySelector(DOMClasses.inputBtn).classList.toggle('red-button');
            document.querySelector(DOMClasses.inputBtn).classList.toggle('red-button:hover');
        },

        // Granting access to the DOMClasses variable to the outside scope.
        getDOMClasses: () => {
            return DOMClasses;
        }
    };
})();

//*  Controller Module - CONTROLLER:
const appController = ((budgetCtrl, UICtrl) => {

    // Setup the event listeners
    const eventListenerSetup = () => {

        // Submit DOM button event-listener:
        const DOM = UICtrl.getDOMClasses(); // Access the DOMClasses object in the UIController module. 

        const addBtn = document.querySelector(DOM.inputBtn).addEventListener('click', addItem);

        // keyboard press event listener:
        const keyPressed = document.addEventListener('keypress', (e) => {
            if (e.keyCode !== 13) return; // If not 'Enter' key, do not execute.
            addItem(e);
        });

        // Using event delegation to attach event listener to the 'delete' button:
        const removeItem = document.querySelector(DOM.container).addEventListener('click', deleteItem);

        // Change input fields colors between inc and exp event:
        const changeColor = document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeColor);
    }
    // eventListener callback function - Add income/expense items:
    const addItem = () => {
        // Get the input data(type, description, amount):

        const inputValues = UIController.getValues(); //Method in the UIController module. Returns an object of all the values of the input fields.

        // Make sure no empty items or NaN values are being added
        if (inputValues.descriptionVal === '' || isNaN(inputValues.amountVal) || inputValues.amountVal === 0) return;

        // TODO - Display warning & success messages upon a press

        // Update the data - Update the item to the budget controller based on the inputValues method variables.
        const newItem = budgetCtrl.addNewItem(inputValues.typeVal, inputValues.descriptionVal, inputValues.amountVal); // The method arguments correspond to the budgetController addNewItem function parameters of (type, des, val).

        // Clear the fields after adding a new item:
        const clear = UICtrl.clearField();

        // Calculate the budget.
        const update = updateBudget(inputValues.typeVal);

        // Update the UI - Update the item to the UI controller.
        const addToList = UICtrl.addListItem(newItem, inputValues.typeVal);

        // Calculate and update the expense items percentages:
        const expPercentages = updateItemPercent();
    };

    // eventListener callback function - Delete items from the list event listener function
    const deleteItem = (e) => {

        // Getting the value of the id of the item that is being clicked:
        const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
        const inputValues = UIController.getValues();

        // If the target has an ID number:
        if (itemId) {
            // Split the ID at the '-' to have type and number:
            const idType = itemId.split('-')[0]; // inc or exp
            const idNum = parseInt(itemId.split('-')[1]); // the number part of item id.

            // Remove the item from the data object:
            budgetCtrl.deleteBudgetItem(idType, idNum);

            // Remove the item from the UI:
            UICtrl.deleteListItem(itemId);

            // Update the budget UI:
            updateBudget(inputValues.typeVal);

            // Update the exp item percentages:
            updateItemPercent();
        }
    };

    // Budget calculation, data update and display functions.
    const updateBudget = () => {

        // Calculate the budget
        budgetCtrl.calcData();

        // Return the calculated budget
        const calculatedBudget = budgetCtrl.getData();

        // Display the budget on the UI
        UICtrl.displayBudget(calculatedBudget);
    };

    // Calculating and displaying the expense item percentage of the total income:
    const updateItemPercent = () => {

        // Calculate the percentages
        budgetCtrl.calcExpPercent();

        // Get them from the budgetController
        const expPercentages = budgetCtrl.getCalculatedPercent();

        // Update the UI
        UICtrl.displayExpPercentage(expPercentages);
    };

    // Public functions:
    return {
        // The app initialization function
        init: () => {
            // Initialize the event listeners upon page load:
            eventListenerSetup();
            // Initialize the date upon load:
            UICtrl.displayDate(budgetCtrl.getDate);
        }
    };

})(budgetController, UIController);

//! Global scope:

// Call init function:
appController.init();

//! To-do List:

// todo: UI - Display warning & success messages upon a press.
// todo: UI - Add the current date (DD/MM/YY) to the UI top left panel.
// todo: UI - Add item add date.
// todo: DATA - ADD LOCAL DATA STORAGE.
// todo: CONTROL - Add 'delete all' and 'undo' buttons.