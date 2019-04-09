import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = `96211b9a697ef36fbdc9702b9112102e`;
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            const result = await axios(`${corsProxy}www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;
            console.log(this.result);
        } catch (error) {
            console.log('Error!');
        }
    }
}