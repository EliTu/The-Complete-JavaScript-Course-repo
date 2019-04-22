// Imports:
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {
    elements,
    renderLoader,
    removeLoader,
    elementStrings,
} from './views/base';

// The global state variable:
const state = {
    /* Global state of the app:
    * Search object
    * Current recpie object
    TODO - Shopping list object
    TODO - Liked recipe
    */
};
window.state = state;
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

    // If there is an search item id available:
    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeContainer);

        // Highlight selected search item
        if (state.search) searchView.highlightSelectedItem(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            // console.log(state.recipe);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calculateServings();
            state.recipe.calculateTime();

            // Render the recipe
            removeLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            console.log(error);
        }
    }
};

/*
 * List controller:
 */
const controlList = () => {
    // If there is no new list, create a new one
    if (!state.list) state.list = new List();

    // Add each ingredient to the list
    state.recipe.ingredients.forEach((ingredient) => {
        const item = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
        listView.renderItem(item);
    });
};

// Event listeners for the shopping list delete button and update:
elements.shoppingListContainer.addEventListener('click', (e) => {
    // Get the item ID
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Delete button event:
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from the state object:
        state.list.deleteItem(id);
        // Delete from the UI:
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        // Get the value of the input field
        const value = parseFloat(e.target.value);
        // Update the count:
        state.list.updateCount(id, value);
    }
});

// Add multiple events to the same element and function:
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Event listeners for recipe add button, and '+' / '-' buttons:
elements.recipeContainer.addEventListener('click', (e) => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) state.recipe.updateServings('dec');
        recipeView.updateServingsAndIngredients(state.recipe);
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsAndIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // fIRST Check for existing list and remove if found:
        if (state.list) listView.removeList();
        controlList();
    }
});
