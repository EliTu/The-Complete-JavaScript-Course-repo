// Imports:
import Search from './models/Search';
import * as searchView from './views/searchView';
import {
    elements,
    renderLoader,
    removeLoader,
} from './views/base';
import Recipe from './models/Recipe';

// The global state variable:
const state = {
    /* Global state of the app:
    * Search object
    * Current recpie object
    TODO - Shopping list object
    TODO - Liked recipe
    */
};

/*
 * Search Controller:
 */
// Search input event listeners:
const controlSearch = async (e) => {
    // Prevent the page from reloading upon pressing the search button:
    e.preventDefault();

    // Get the query from the view model:
    const query = searchView.getInput();

    if (query) {
        // New search object, and add it to state:
        state.search = new Search(query);

        // Prepare the UI for the results - clear input, loader:
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.resultsContainer);
        try {
            // Search for recipes by making an API call:
            await state.search.getResults();

            // Render results on UI:
            removeLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            removeLoader();
            console.log('Something went wrong!');
        }
    }
};

// Search list pagination button navigation:
const moveToPage = (e) => {
    const button = e.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
};

// Search controller Event listeners:
elements.searchContainer.addEventListener('submit', controlSearch);
elements.searchResultPages.addEventListener('click', moveToPage);

/*
 * Recipe controller:
 */
const controlRecipe = async () => {
    // Get search item id from the URL:
    const id = window.location.hash.replace('#', '');
    console.log(id);

    // If there is an search item id available:
    if (id) {
        // Prepare the UI for changes
        renderLoader(elements.recipeContainer);

        // Create new recipe object
        state.recipe = new Recipe(id);

        window.r = state.recipe;

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calculateServings();
            state.recipe.calculateTime();

            // Render the recipe
            removeLoader();
            console.log(state.recipe);
        } catch (error) {
            removeLoader();
            console.log('Something went wrong!');
        }
    }
};

// Add multiple events to the same element and function:
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
