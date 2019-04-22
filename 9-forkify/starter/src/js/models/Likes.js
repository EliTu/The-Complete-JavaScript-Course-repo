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
        this.likes.push(like);
        return like;
    }

    // Delete an item based on the recipe id:
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    // Check if the recipe is already in the likes array by id:
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // Get the total number of liked items in the array:
    getNumberOfLikes() {
        return this.likes.length;
    }
}
