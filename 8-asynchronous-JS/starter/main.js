 /* Async code (Section 8, lecture 123):  */

 // const second = () => {
 //     setTimeout(() => {
 //         console.log('Async party!');
 //     }, 2000);
 // }

 // const first = () => {
 //     console.log('Hey There!');
 //     second();
 //     console.log('The End!');
 // }
 // first();

 /* The old way: callback hell (Section 8, lecture 122): */

 // function getRecpie() {

 //     setTimeout(() => {
 //         const recipeID = [520, 360, 123, 225];
 //         console.log(recipeID);

 //         setTimeout(id => {

 //             const recpie = {
 //                 title: 'Fresh Tomato Pasta',
 //                 publisher: 'Archimedes'
 //             };
 //             console.log(`${id}: ${recpie.title}, by ${recpie.publisher}.`);

 //             setTimeout(publisher => {
 //                 const recpie = {
 //                     title: 'Pizza',
 //                     publisher: 'Archimedes'
 //                 };
 //                 console.log(recpie.title);

 //             }, 1500, recpie.publisher);

 //         }, 1500, recipeID[2]);

 //     }, 1500);
 // }
 // getRecpie();

 /* Promises (Section 8, lecture 123): */

 // Declaring a promise - new Promise((resolve, reject)):
 // const getId = new Promise((resolve, reject) => {

 //     setTimeout(() => {
 //         resolve([520, 360, 123, 225]);
 //     }, 1500);
 // });

 // const getRecpie = recId => {
 //     return new Promise((resolve, reject) => {

 //         setTimeout((id) => {

 //             const recpie = {
 //                 title: 'Fresh Tomato Pasta',
 //                 publisher: 'Archimedes'
 //             };
 //             resolve(`${id}: ${recpie.title}, by ${recpie.publisher}.`);

 //         }, 1800, recId);
 //     });
 // }

 // const getRelated = (publisher) => {
 //     return new Promise((resolve, reject) => {
 //         setTimeout((pub) => {
 //                 const recpie = {
 //                     title: 'Pizza',
 //                     publisher: 'Archimedes'
 //                 };
 //                 resolve(`${pub}: ${recpie.title}`);
 //             },
 //             1900, publisher);
 //     });
 // }

 // // Consuming a promise (then/catch):
 // getId
 //     .then(IDs => {
 //         console.log(IDs); // -> [520, 360, 123, 225]
 //         return getRecpie(IDs[2]);
 //     })
 //     .then((recpie) => {
 //         console.log(recpie); // -> 123: Fresh Tomato Pasta, by Archimedes.
 //         return getRelated('Jonas');
 //     })
 //     .then((recpie) => {
 //         console.log(recpie); //-> Jonas: Pizza
 //     })
 //     .catch((error) => {
 //         console.log('Error!');
 //     });

 /****************
  *  From Promises to Async / Await (Section 8, lecture 124):
  * */

 //  const getId = new Promise((resolve, reject) => {

 //      setTimeout(() => {
 //          resolve([520, 360, 123, 225]);
 //      }, 1500);
 //  });

 //  const getRecpie = recId => {
 //      return new Promise((resolve, reject) => {

 //          setTimeout((id) => {

 //              const recpie = {
 //                  title: 'Fresh Tomato Pasta',
 //                  publisher: 'Archimedes'
 //              };
 //              resolve(`${id}: ${recpie.title}, by ${recpie.publisher}.`);

 //          }, 1800, recId);
 //      });
 //  }

 //  const getRelated = (publisher) => {
 //      return new Promise((resolve, reject) => {
 //          setTimeout((pub) => {
 //                  const recpie = {
 //                      title: 'Pizza',
 //                      publisher: 'Archimedes'
 //                  };
 //                  resolve(`${pub}: ${recpie.title}`);
 //              },
 //              1900, publisher);
 //      });
 //  }

 //  // Consuming a promise (async/await):

 //  async function asyncRecpie() {
 //      const IDs = await getId;
 //      console.log(IDs); // -> [520, 360, 123, 225]

 //      const recpie = await getRecpie(IDs[2]);
 //      console.log(recpie); // -> 123: Fresh Tomato Pasta, by Archimedes.

 //      const related = await getRelated('Jonas');
 //      console.log(related); // -> Jonas: Pizza

 //      return recpie;
 //  }

 //  // Calling the consuming function, and then getting the result:
 //  asyncRecpie().then(result => console.log(`${result} is here!`)); // -> 123: Fresh Tomato Pasta, by Archimedes. is here!

 //  //   const getRec = asyncRecpie();
 //  //   console.log(getRec);

 /*********************************************
  * Making AJAX calls with 'fetch' and Promises (Section 8, lecture 126)
  */
 /* Commenting out lecture code:

 function getWeather(woeId) {
     fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeId}/`)
         .then(result => {
             return result.json(); // -> returns a promise, needs to be parsed from a string to JSON.
         })
         .then(data => {
             console.log(data); //-> {consolidated_weather: Array(6), time: "2019-03-20T01:25:37.634494-07:00", sun_rise:...

             const todaysWeather = data.consolidated_weather[0];

             console.log(`On ${todaysWeather.applicable_date}, Temperatures in ${data.title} stay between ${todaysWeather.min_temp} and ${todaysWeather.max_temp}.`);
         })
         .catch(error => {
             console.log(error); // -> Log an error in case of request reject
         });
 }
 getWeather(2487956); // For San Francisco -> On 2019-03-20, Temperatures in San Francisco stay between 10.415 and 12.09.
 getWeather(44418); // For London -> On 2019-03-20, Temperatures in London stay between 7.1 and 16.05.
 */

 /**********************************************
  * Making AJAX calls with async / await (Section 8, lecture 127)
  */

 async function getWeather(woeId) {
 	try {

 		const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeId}/`);

 		const data = await result.json();
 		const weatherReports = data.consolidated_weather;

 		weatherReports.forEach((report, i) => {
 			if (i <= 1)
 				console.log(`On ${report.applicable_date}, Temperatures in ${data.title} stay between ${report.min_temp} and ${report.max_temp}.`);
 		});
 		return data; // return the result of the promise

 	} catch (error) {
 		console.log(error);
 	}
 }
 getWeather(2487956);
 getWeather(44418);

 let fetchData = getWeather(44418).then((data) => {
 	console.log(data);
 });