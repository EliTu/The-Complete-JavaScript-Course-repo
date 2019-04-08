// API Key: 96211b9a697ef36fbdc9702b9112102e
// Search URL: https://www.food2fork.com/api/search 
// Search parameters: [API key, question, sort, page]
// Recpie requests: https://www.food2fork.com/api/get 

import axios from 'axios';

async function getResults(query) {
    try {

        const key = `96211b9a697ef36fbdc9702b9112102e`;
        const result = await axios(`www.food2fork.com/api/search?key=${key}&q=${query}`);
        console.log(result);
    } catch {
        console.log('Error!');
    }
}
getResults();