// Imports:
import Search from './models/Search';

// The global state variable:
const state = {
    /* Global state of the app:
    - Search object
    - Current recpie object
    - Shopping list object
    - Liked recipe
    */
};

// Search input event listeners:

const controlSearch = async (e) => {

    // Prevent the page from reloading upon pressing the search button:
    e.preventDefault();

    // Get the query from the view:
    const searchFieldValue = document.querySelector('.search__field').value;

    const query = searchFieldValue; // To be moved to the view model eventually 

    if (query) {
        // New search object, and add it to state:
        state.search = new Search(query);

        // Prepare the UI for the results:

        // Search for recipes by making an API call:
        await state.search.getResults();

        // Render results on UI:
        console.log(state.search.result);
    }
}

const searchInput = document.querySelector('.search');

searchInput.addEventListener('submit', controlSearch);