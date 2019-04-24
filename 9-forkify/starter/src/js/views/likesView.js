/* eslint-disable import/prefer-default-export */
import {
    elements,
} from './base';
import {
    limitRecipeTitle,
} from './searchView';

// Toggle the like button (liked/unliked) upon pressing:
export const toggleLikeButton = (isLiked) => {
    // Toggle the boolean variable:
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // Toggle the attribute of the icon 'like' button:
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

// Toggle the 'heart' icon to appear if there are liked items:
export const toggleLikeMenu = (numberOfLikes) => {
    elements.likesListContainer.style.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
    const likesTemplate = `
     <li>
         <a class="likes__link" href="#${like.id}">                        <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.publisher}</p>
            </div>
         </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', likesTemplate);
};

export const deleteLike = (id) => {
    const item = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (item) item.parentElement.removeChild(item);
};
