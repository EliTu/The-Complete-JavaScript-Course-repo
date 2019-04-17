// Imports:
import {
    elements,
    elementStrings,
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
    // Search result items
    const searchRecipeItems = document.querySelectorAll(`.${elementStrings.searchItem}`);

    // If there are items in the container, remove them
    if (searchRecipeItems) {
        searchRecipeItems.forEach(item => item.remove());
    }

    // Remove pagination buttons before rendering new ones to the UI:
    elements.searchResultPages.innerHTML = '';
};

// Set the recipe title name to ... if over 17 characters long:
const limitRecipeTitle = (recipeTitle, limit = 17) => {
    // Array to hold split strings.
    const newTitle = [];

    //  Check to see if the title is longer than 17 chars:
    if (recipeTitle.length > limit) {
        recipeTitle.split(' ').reduce((total, word) => {
            if (total + word.length <= limit) {
                newTitle.push(word);
            }
            return total + word.length;
        }, 0);

        // Return the new title by converting the array into string and adding '...'.
        return `${newTitle.join(' ')}...`;
    }
    // If not return the original title:
    return recipeTitle;
};

// Create the HTML template to display the search results data:
const renderRecipe = (recipe) => {
    const recipeResultTemplate = `
                <li class="search-item">
                    <a class="results__link" href="#${recipe.recipe_id}">
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

// Create an HTML template for the pagination buttons:
const setButtonTemplate = (pageNum, type) => {
    const changePage = type === 'prev' ? pageNum - 1 : pageNum + 1;
    const setIconDirection = type === 'prev' ? 'left' : 'right';
    return `
                <button class="btn-inline results__btn--${type}"
                data-goto="${changePage}">
                <span>Page ${changePage}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${setIconDirection}"></use>
                    </svg>
                </button>
                `;
};

// Render the pagination buttons to the UI:
const renderPaginationButtons = (page, numOfResults, resultsPerPage) => {
    const calculatePageNum = Math.ceil(numOfResults / resultsPerPage);
    let button;

    if (page === 1 && calculatePageNum > 1) {
        button = setButtonTemplate(page, 'next');
    } else if (page < calculatePageNum) {
        button = `
            ${setButtonTemplate(page, 'next')}
            ${setButtonTemplate(page, 'prev')}
            `;
    } else if (page === calculatePageNum && calculatePageNum > 1) {
        button = setButtonTemplate(page, 'prev');
    }

    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

// Get the search results, loop over them and apply the template:
export const renderResults = (results, page = 1, resultsPerPage = 10) => {
    // Render results of current page:
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    results.slice(start, end).forEach(renderRecipe);

    // Render pagination buttons:
    renderPaginationButtons(page, results.length, resultsPerPage);
};
