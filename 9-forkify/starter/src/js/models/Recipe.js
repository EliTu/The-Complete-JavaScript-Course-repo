import axios from 'axios';
import {
    key,
    corsProxy
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        // Personal API key value:
        try {
            const result = await axios(`${corsProxy}www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

            this.title = result.data.recipe.title;
            this.publisher = result.data.recipe.publisher;
            this.ingredients = result.data.recipe.ingredients;
            this.url = result.data.recipe.source_url;
            this.image = result.data.recipe.image_url;

            console.log(result.data.recipe);
        } catch (error) {
            console.log(error);
        }
    }

    calculateTime() {
        // Assuming that we need 15 mins for every 3 ingredients
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients / 3);
        this.time = periods * 15;
    }

    calculateServings() {
        this.servings = 4;
    }
}