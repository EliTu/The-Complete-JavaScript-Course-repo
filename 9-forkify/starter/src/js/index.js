import str from './models/Search';

// import {
//     add as a,
//     multiply as m,
//     ID as id
// } from './views/searchView';


// console.log(`Using imported functions: ${a(id, 7)}, ${m(id, 2)} ${str}`); // ->Using imported functions: 30, 46 I am an exported string!

import * as searchView from './views/searchView';

console.log(`Using imported functions: ${searchView.add(searchView.ID, 7)}, ${searchView.multiply(searchView.ID, 2)} ${str}`)