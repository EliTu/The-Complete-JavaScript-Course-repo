// Imports:
import {
    elements
} from './base';

// Get the value of search input:
export const getInput = () => elements.searchInput.value;

// Clear the search input field after pressing the button:
export const clearInput = () => {
    elements.searchInput.value = '';
    elements.searchInput.focus();
};

// Clear the previous results after pressing the button:
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
};

// Set the recipe title name to ... if over 17 characters long:
const limitRecipeTitle = (recipeTitle, limit = 17) => {

    // Array to hold split strings.
    const newTitle = [];

    //  Check to see if the title is longer than 17 chars:
    if (recipeTitle.length > limit) {
        recipeTitle.split(' ').reduce((total, char) => {
            if (total + char.length <= limit) {
                newTitle.push(char);
            }
            return total + char.length;
        }, 0);

        // Return the new title by converting the array into string and adding '...'.
        return `${newTitle.join(' ')}...`;
    }
    // If not return the original title:
    return recipeTitle;
};

// Create the HTML template to display the search results data:
const renderRecipe = recipe => {
    const recipeResultTemplate = `
                <li>
                    <a class="results__link" href="${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}"
                            alt = "${recipe.title}" >
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
    // Append the template string to the DOM:
    elements.searchResultsList.insertAdjacentHTML('afterend', recipeResultTemplate);
};

// Get the search results, loop over them and apply the template:
export const renderResults = results => {
    results.forEach(renderRecipe);
};