//To be put into server --> for request via chat_Main.js
//all fucntions necessary to get all names of genres, stars and directors
//---------------------------------------------------------------------------------------------------------
const movieContent = require('./imdb.json'); //fix exact link!!!!
const starContent = require('./actorinfo.json'); //fix exact link!!!!

function getAllGenres() {//via imdb.json
     let allGenres = [];

     for (let i = 0; i < movieContent.data.length; ++i) {
          for (let r = 0; r < movieContent.data[i].genre.length; ++r) {
               let theGenre = movieContent.data[i].genre[r];
               for (let k = 0; k < allGenres.length; ++k) {
                    if (theGenre === allGenres[k]) {/*no addings*/ }
                    else { allGenres.push(theGenre) }
               }
          }

     }
     console.log("all existing genres: " + getAllGenres());
     return allgenres;
}

function getAllDirectors() {//via imdb.json
     let allDirectors = [];

     for (let i = 0; i < movieContent.data.length; ++i) {
          for (let r = 0; r < movieContent.data[i].director.length; ++r) {
               let theDirector = movieContent.data[i].director[r];
               for (let k = 0; k < allDirectors.length; ++k) {
                    if (theDirector === allDirectors[k]) {/*no addings*/ }
                    else { allDirectors.push(theDirector) }
               }
          }

     }
     console.log("all existing directors: " + getAllDirectors());
     return allDirectors;
}


function getAllStars() {//via actorinfo.json
     let allStars = [];

     for (let i = 0; i < starContent.data.length; ++i) {
          let theStar = starContent.data[i].star;
          allStars.push(theStar);
     }
     console.log("all existing stars: " + getAllStars());
     return allStars;
}


