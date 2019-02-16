//! Modules:

//* Budget Control Module:

const budgetController = (() => {

    // Constructor functions for income and expanse:
    const Expanse = function (id, description, value) {
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

    }

})();

//* UI Control Module:

const UIController = (() => {

    const DOMClasses = { // Object containing the class names of DOM elements.
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputAmount: '.add__value',
        inputBtn: '.add__btn'
    };

    return { // returns an object that we can use publicly.

        getValues: function () { // Method that returns an object that selects the values of the input elements.
            return {
                typeVal: document.querySelector(DOMClasses.inputType).value, // Moves between income(+) and expanses(-)
                descriptionVal: document.querySelector(DOMClasses.inputDescription).value,
                amountVal: document.querySelector(DOMClasses.inputAmount).value
            };
        },

        getDOMClasses: function () { // Granting access to the DOMClasses variable to the outside scope.
            return DOMClasses;
        }
    };

})();

//*  Controller Module:
const appController = ((budgetCtrl, UICtrl) => {

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


    const addItem = () => {

        // 1. Get the input data(type, description, amount):

        const inputValues = UIController.getValues(); //Method in the UIController module. Returns an object of all the values of the input fields.

        //  TODO 2. Update the data - Update the item to the budget controller.

        // TODO 3. Calculate the budget.

        // TODO 4. Update the UI - Update the item to the UI controller.
    }

    return {
        // The app initialization function
        init: function () {
            eventListenerSetup();
        }
    };

})(budgetController, UIController);

//! Global scope:

// Call init function:
appController.init();