// Object that contains all the relevant elements from the DOM:
export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchContainer: document.querySelector('.search'),
    searchResultsList: document.querySelector('.results__list'),
    resultsContainer: document.querySelector('.results'),
    searchResultPages: document.querySelector('.results__pages'),
    recipeContainer: document.querySelector('.recipe'),
    shoppingListContainer: document.querySelector('.shopping__list'),
    likesListContainer: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
};

// Object that contains all of the relevant DOM element strings:
export const elementStrings = {
    loader: 'loader',
    searchItem: 'search-item',
};

// Create a loader HTML template and append it:
export const renderLoader = (parent) => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// Remove the loader from the UI:
export const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) loader.parentElement.removeChild(loader);
};
