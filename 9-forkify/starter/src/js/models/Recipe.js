// Imports:
import axios from 'axios';
import {
    key,
    corsProxy,
} from '../config';

// Recipe item class:
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        // Call the API for the recipe details
        try {
            const result = await axios(`${corsProxy}www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

            // Get specific data from the result:
            this.title = result.data.recipe.title;
            this.publisher = result.data.recipe.publisher;
            this.ingredients = result.data.recipe.ingredients;
            this.url = result.data.recipe.source_url;
            this.image = result.data.recipe.image_url;
        } catch (error) {
            console.log(error);
        }
    }

    // Calculate (roughly) dish prepare time:
    calculateTime() {
        // Assuming that we need 15 mins for every 3 ingredients
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients / 3);
        this.time = periods * 15;
    }

    // Calculate amount of servings per recipe:
    calculateServings() {
        this.servings = 4;
    }
}
