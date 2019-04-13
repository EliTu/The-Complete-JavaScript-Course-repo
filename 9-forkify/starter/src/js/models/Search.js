// Imports:
import axios from 'axios';

// Exporting a search class:
export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Async search function:
    async getResults() {
        // Personal API key value:
        const key = `96211b9a697ef36fbdc9702b9112102e`;
        // CORS proxy address:
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            // The API request function with axios:
            const result = await axios(`${corsProxy}www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // Pass the result as a property of the class:
            this.result = result.data.recipes;
            console.log(this.result);

        } catch (error) {
            // Error handling:
            console.log('Error!');
        }
    }
}