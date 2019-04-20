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

    parseIngredients() {
        // Instances of units we get from the API call data:
        const oldUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'kilograms', 'grams', 'g'];
        // The units we want to have for our code:
        const newUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        // Other units, like grams etc
        const units = [...newUnits, 'kg', 'g', 'g'];

        const newIngredients = this.ingredients.map((item) => {
            // Standardize units by looping over the old units and replacing them with new ones:
            let ingredient = item.toLowerCase();
            oldUnits.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, units[i]);
            });

            // Remove parentheses
            ingredient = ingredient.replace(/[\])}[{(]/g, '');

            // Parse ingredients into count, unit and ingredient
            const ingredientArr = ingredient.split(' ');
            const unitIndex = ingredientArr.findIndex(el => units.includes(el));

            let objIngredient;
            if (unitIndex > -1) {
                // If there is a unit
                const arrCount = ingredientArr.slice(0, unitIndex);

                // To avoid eval: convert fractions to decimals
                const fractionStrToDecimal = str => str.split('/').reduce((p, c) => p / c);

                let count;
                if (arrCount.length === 1) {
                    count = Number(fractionStrToDecimal(ingredientArr[0].replace('-', '+')));
                } else {
                    const integer = Number(ingredientArr.slice(0, unitIndex)[0]);
                    const decimal = fractionStrToDecimal(ingredientArr.slice(0, unitIndex)[1]);

                    count = Number([integer + decimal]);
                }

                objIngredient = {
                    count,
                    unit: ingredientArr[unitIndex],
                    ingredient: ingredientArr.slice(unitIndex + 1).join(' '),
                };
            } else if (parseInt(ingredientArr[0], 10)) {
                // If there is no unit, but the 1st element is a number
                objIngredient = {
                    count: parseInt(ingredientArr[0], 10),
                    unit: '',
                    ingredient: ingredientArr.slice(1).join(' '),
                };
            } else if (unitIndex === -1) {
                // There is no unit and no number in 1st position
                objIngredient = {
                    count: '',
                    unit: '',
                    ingredient,
                };
            }
            console.log(objIngredient);
            return objIngredient;
        });
        this.ingredients = newIngredients;
    }
}
