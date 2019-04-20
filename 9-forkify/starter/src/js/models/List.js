/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
// Imports:
import uniqid from 'uniqid';

// List class:
export default class List {
    constructor() {
        this.items = [];
    }

    // Add a new item to the items array:
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        };
        this.items.push(item);
        return item;
    }

    // Delete an item from the array based on its id:
    deleteItem(id) {
        // Find the index of the designated item:
        const targetItemIndex = this.items.findIndex(el => el.id === id);
        // Remove it from the items array:
        this.items.splice(targetItemIndex, 1);
    }

    // Update the count of the shopping list items:
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}
