// Imports:
import Search from './models/Search';
import * as searchView from './views/searchView';
import {
    elements,
    renderLoader,
    removeLoader
} from './views/base';

// The global state variable:
const state = {
    /* Global state of the app:
    * Search object
    TODO - Current recpie object
    TODO - Shopping list object
    TODO - Liked recipe
    */
};

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

        // Search for recipes by making an API call:
        await state.search.getResults();

        // Render results on UI:
        removeLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchContainer.addEventListener('submit', controlSearch);