// Imports:
import axios from 'axios';
import {
    key,
    corsProxy,
} from '../config';

// Exporting a search class:
export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Async search function:
    async getResults() {
        try {
            // The API request function with axios:
            const result = await axios(`${corsProxy}www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // Pass the result as a property of the class:
            this.result = result.data.recipes;
        } catch (error) {
            // Error handling:
            console.log('Error!');
        }
    }
}
