// Likes class:
export default class Likes {
    constructor() {
        this.likes = [];
    }

    // Add a like item based on recipe id to the likes array:
    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img,
        };
        // Push a new like to the likes array:
        this.likes.push(like);

        // Store the liked items in the localStorage:
        this.saveInLocalStorage();

        return like;
    }

    // Delete an item based on the recipe id:
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Update the liked item list in the localStorage:
        this.saveInLocalStorage();
    }

    // Check if the recipe is already in the likes array by id:
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // Get the total number of liked items in the array:
    getNumberOfLikes() {
        return this.likes.length;
    }

    // Store localStorage functionality:
    saveInLocalStorage() {
        // Store the likes array and turn in into a string:
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // Get data from localStorage:
    getLocalStorageData() {
        // Get the stored data and parse it into JSON:
        const storageData = JSON.parse(localStorage.getItem('likes'));
        // If there is data stored in the localStorage, set it to the likes array:
        if (storageData) this.likes = storageData;
    }
}
