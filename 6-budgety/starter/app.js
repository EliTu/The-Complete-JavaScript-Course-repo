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

        // Calculating the data 
        calcData: (type) => {

            // Get the total item sum by type
            const getSum = budgetData.allItems[type].reduce((total, item) => {
                return total + item.value;
            }, 0);

            // Sort the total item sum at the total data storage
            if (type === 'inc') {
                budgetData.totals.inc = getSum;
            } else {
                budgetData.totals.exp = getSum;
            }

            // Sum up the totals = income - expenses. 
            let updateTotal = budgetData.totals.inc - budgetData.totals.exp;
            console.log(updateTotal);
            console.log(budgetData.totals);
        }
    };

})();

//* UI Control Module:

const UIController = (() => {

    const DOMClasses = { // Object containing the class names of DOM elements.
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputAmount: '.add__value',
        inputBtn: '.add__btn',
        inc: '.income__list',
        exp: '.expenses__list'
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
            <div class="item clearfix" id="expense-${obj.id}">
            <div class="item__description">${obj.description} </div> 
            <div class="right clearfix">
            <div class="item__value">${obj.value} </div> 
            <div class="item__percentage">2%</div>
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
            if (type !== 'exp') document.querySelector('.item__percentage').remove();

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

        // If the input fields are clear do not add anything
        // alertEmptyField: (desc, val) => {
        //     if (desc === '' || val === '') {
        //         console.log('Hi, I work!');
        //         return;
        //     }
        // },

        // Granting access to the DOMClasses variable to the outside scope.
        getDOMClasses: () => {
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
        // Get the input data(type, description, amount):

        const inputValues = UIController.getValues(); //Method in the UIController module. Returns an object of all the values of the input fields.

        // Make sure no empty items or NaN values are being added
        if (inputValues.descriptionVal === '' || isNaN(inputValues.amountVal) || inputValues.amountVal === 0) return;

        // TODO - Display warning & success messages upon a press

        // Update the data - Update the item to the budget controller based on the inputValues method variables.
        const newItem = budgetCtrl.addNewItem(inputValues.typeVal, inputValues.descriptionVal, inputValues.amountVal); // The method arguments correspond to the budgetController addNewItem function parameters of (type, des, val).

        // Clear the fields after adding an ew item:
        const clear = UICtrl.clearField();

        // TODO Calculate the budget.
        const update = updateBudget(inputValues.typeVal);

        // Update the UI - Update the item to the UI controller.
        const addToList = UICtrl.addListItem(newItem, inputValues.typeVal);

    };

    const updateBudget = (type) => {

        // Calculate the budget
        budgetCtrl.calcData(type);

        // Return the budget

        // Display the budget on the UI
    };

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




/* *Code Trash Bin:

 // Jonas's version of updating items in the UI:

  let html, element, newHtml;
  // Create HTML string with placeholder text:

  if (type === 'inc') {
      element = DOMClasses.incomeContainer;
      html = `
                <div class="item clearfix" id="income-%id%">
                  <div class="item__description">%description%</div>
                     <div class="right clearfix">
                           <div class="item__value">%value%</div>
                         <div class="item__delete">
                             <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                         </div>
                      </div>
                 </div>
                 `;
  } else {
      element = DOMClasses.ExpenseContainer;
      html = `
                <div class="item clearfix" id="expense-%id%">
                  <div class="item__description">%description%</div>
                 <div class="right clearfix">
                     <div class="item__value">%value%</div>
                      <div class="item__percentage">21%</div>
                      <div class="item__delete">
                         <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                      </div>
                    </div>
                 </div>
                 `;
  }

  // Replace the placeholder with and acutal data

  newHtml = html.replace(`%id%`, obj.id); // Replace id placeholder with an actual item id.
  newHtml = newHtml.replace(`%description%`, obj.description); // Replace the description in the new variable (so we can override the other placeholders) with an actual item description.
  newHtml = newHtml.replace(`%value%`, obj.value); // Replace placeholder value with an acutal value.


  // Insert the HTML into the DOM
  document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  }
}
*/