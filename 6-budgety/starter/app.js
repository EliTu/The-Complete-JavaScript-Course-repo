//! Modules:

//* Budget Control Module:

const budgetController = (() => {

    // Constructor functions for income and expanse:
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
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
        }
    };

    // Public functions:
    return {

        // Adding an item to the data storage
        addItem: (type, des, val) => {
            let newItem, ID;

            // Create a new and unique ID for each new item based on the number of the last item in the array
            if (budgetData.allItems[type].length > 0) {
                ID = budgetData.allItems[type][budgetData.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // New item based on the type - expense or income
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push new item into the budgetData array based on the type
            budgetData.allItems[type].push(newItem);
            return newItem;
        },

        viewData: () => console.log(budgetData)

    };

})();

//* UI Control Module:

const UIController = (() => {

    const DOMClasses = { // Object containing the class names of DOM elements.
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputAmount: '.add__value',
        inputBtn: '.add__btn'
    };

    // Public functions:
    return { // returns an object that we can use publicly.

        getValues: () => { // Method that returns an object that selects the values of the input elements.
            return {
                typeVal: document.querySelector(DOMClasses.inputType).value, // Moves between income(+) and expanses(-)
                descriptionVal: document.querySelector(DOMClasses.inputDescription).value,
                amountVal: document.querySelector(DOMClasses.inputAmount).value
            };
        },

        getDOMClasses: () => { // Granting access to the DOMClasses variable to the outside scope.
            return DOMClasses;
        }
    };

})();

//*  Controller Module:
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
    }

    // Main functionality control function - Add income/expense items:
    const addItem = () => {

        // 1. Get the input data(type, description, amount):

        const inputValues = UIController.getValues(); //Method in the UIController module. Returns an object of all the values of the input fields.

        // 2. Update the data - Update the item to the budget controller based on the inputValues method variables.

        const newItem = budgetCtrl.addItem(inputValues.typeVal, inputValues.descriptionVal, inputValues.amountVal); // The method arguments correspond to the budgetController addItem function parameters of (type, des, val).
        // console.log(newItem);
        // budgetCtrl.viewData();

        // TODO 3. Calculate the budget.

        // TODO 4. Update the UI - Update the item to the UI controller.
    }

    // Public functions:
    return {
        // The app initialization function
        init: () => {
            eventListenerSetup();
        }
    };

})(budgetController, UIController);

//! Global scope:

// Call init function:
appController.init();