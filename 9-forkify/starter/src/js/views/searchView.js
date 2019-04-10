// Imports:
import {
    elements
} from './base';

// Get the value of search input:
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''
};

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
};

const renderRecipe = recipe => {
    const recipeResultTemplate = `
                <li>
                    <a class="results__link" href="${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}"
                            alt = "${recipe.title}" >
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
    elements.searchResultsList.insertAdjacentHTML('afterend', recipeResultTemplate);
};

export const renderResults = results => {
    results.forEach(renderRecipe);
};