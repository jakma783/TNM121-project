//************************************ Movie-words based functions ***********************************************************************
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//

//genre functions-------------------------------------------------------------------------------------------------
function getGenre(messageArray) {

     for (let i = 0; i < messageArray.length; ++i) {
          const thisWord = (isGenre(messageArray[i]));

          if (thisWord != null) {
               removeObject(userGenre, thisWord);
               removeObject(userDisslikeGenres, thisWord);
               userGenre.push(thisWord);
          }
     }

     return userGenre;
}

function isGenre(word) {
     for (let i = 0; i < allGenres.length; ++i) {
          if (allGenres[i] === word) {
               return allGenres[i];
          }
     }
     return null;
}


//runtime----------------------------------------------------------------------------------------------------------
function getRuntime(messageArray) {
     for (let i = 0; i < messageArray.length; ++i) {
          messageArray[i] = messageArray[i].replace(",", "."); // replacing any "," with "."  to fix number

          if (isFinite(messageArray[i])) {

               for (let s = 0; s < runtimeUnits.length; ++s) {
                    if (messageArray[i + 1] === runtimeUnits[s]) {

                         if (messageArray[i + 1].startsWith("m")) {
                              userRuntimeMax = userRuntimeMax + parseFloat(messageArray[i]);
                         }
                         if (messageArray[i + 1].startsWith("h")) {
                              userRuntimeMax = userRuntimeMax + 60 * (parseFloat(messageArray[i])); // converting hours to min
                         }
                         console.log("time number to be removed from userMessage: " + messageArray[i]);
                         removeObject(userMessage, messageArray[i]);
                         console.log("removed time was your number: " + userMessage);
                    }
               }
          }
     }
}


//Stars or directors, movie names ect----------------------------------------------------------------------------------------------------------------

function getName(messageArray, allNames, userNames) {
     for (let i = 0; i < messageArray.length; ++i) {
          if (i != messageArray.length - 1) { //if it's not the last word message, or else no last name
               let possibleFullName = messageArray[i] + " " + messageArray[i + 1];

               for (let s = 0; s < allNames.length; ++s) {
                    if (possibleFullName === allNames[s].toLowerCase()) {
                         userNames.push(allNames[s]);
                    }
               }
          }
          else { break; }
     }
}


//release year--------------------------------------------------------------------------------------------------------------------------------------

function getYear(messageArray) {
     let checkMark = false;
     let yearCounter = 0;
     let years = [];

     for (let i = 0; i < messageArray.length; ++i) {
          if (validYear(messageArray[i]) != null) {
               let theYear = validYear(messageArray[i]); // if valid year string
               yearCounter = yearCounter + 1;
               years.push(theYear);
          }
     }

     if (years.length === 2) {// case 1: if user gave two different years
          if (years[0] > years[1]) {
               userYearMax = years[0];
               userYearMin = years[1];
          }
          else {
               userYearMax = years[1];
               userYearMin = years[0];
          }
          userYearOne = null;
     }

     else if (years.length === 1) {
          for (let i = 0; i < messageArray.length; ++i) {
               if (validYear(messageArray[i]) != null) {
                    for (let r = i - 1; r > -1; --r) {
                         if (messageArray[r] === "from" || messageArray[r] === "made" || messageArray[r] === "in") {
                              userYearOne = years[0]; // only one element in array
                              checkMark = true;
                              userYearMax = null;
                              userYearMin = null;
                              break;
                         }
                    }
               }
          }
          if (checkMark === false) {
               userYearOne = "undefined: " + years[0]; // user did mention a year, but not before/after/during --> AI ask back F
          }
     }
}

function validYear(inputYearString) {
     let yearString = inputYearString.replace("s", "");
     yearString = yearString.replace("S", "");

     if (isFinite(yearString)) { // string is a year
          if (yearString.length === 4) {
               return parseFloat(yearString);
          }

          if (yearString.length === 2 && (inputYearString.indexOf("s") === 2 || inputYearString.indexOf("S") === 2)) {
               let fixedYear = 0;

               if (yearString.indexOf("0") === 0) {
                    const addYear = parseFloat(yearString);
                    fixedYear = 2000 + addYear;
                    return fixedYear;
               }
               else {
                    const addYear = parseFloat(yearString);
                    fixedYear = 1900 + addYear;
                    return fixedYear;
               }
          }
     }
     return null;
}

//Bechdel Rating and IMDB rating

function getRatings(messageArray) {
     let caseExist = false;
     let bechdelRatingPosition_1 = null;
     let bechdelRatingPosition_2 = null;
     let bechdelScore_1 = null;
     let bechdelScore_2 = null;
     let bechdelCounter = 0;

     let IMDbRatingPosition_1 = null;
     let IMDbRatingPosition_2 = null;
     let IMDbScore_1 = null;
     let IMDbScore_2 = null;
     let IMDbCounter = 0;

     for (let i = 0; i < messageArray.length; ++i) {
          if (messageArray[i] === "bechdel" || messageArray[i] === "imdb") { //userMessage already made toLoweCase()
               console.log(messageArray[i] + " - user rating system");
               let currentOpponent = "";
               if (messageArray[i] === "bechdel") { currentOpponent = "imdb" }
               if (messageArray[i] === "imdb") { currentOpponent = "bechdel" }

               for (let r = i - 1; r > -1; --r) { //reverse search
                    if (messageArray[r] === currentOpponent) { break; }//stop searching fore more numbers that might be related to other rating System
                    if (isFinite(messageArray[r])) {//testing only numbers
                         console.log("rating is a number");
                         if (messageArray[i] === "bechdel") { bechdelCounter = bechdelCounter + 1; bechdelRatingPosition_1 = r; }
                         if (messageArray[i] === "imdb") { IMDbCounter = IMDbCounter + 1; IMDbRatingPosition_1 = r; }
                         if ((validBechdel(messageArray[r]) && messageArray[i] === "bechdel") || (validIMDb(messageArray[r]) && messageArray[i] === "imdb")) { //if valid rating number, both bechdel or IMDb
                              console.log("valiadtion worked for imdb or bechdel");
                              if (messageArray[i] === "bechdel") {
                                   bechdelScore_1 = messageArray[r];
                              }
                              if (messageArray[i] === "imdb") {
                                   IMDbScore_1 = messageArray[r];
                              }
                              break;
                         }
                    }
               }
               for (let r = i + 1; r < messageArray.length; ++r) { //forward search
                    if (messageArray[r] === currentOpponent) { break; }//stop searching fore more numbers that might be related to other rating System
                    if (isFinite(messageArray[r])) {//testing only numbers
                         console.log("rating is a number");
                         if (messageArray[i] === "bechdel") { bechdelCounter = bechdelCounter + 1; bechdelRatingPosition_2 = r;}
                         if (messageArray[i] === "imdb") { IMDbCounter = IMDbCounter + 1; IMDbRatingPosition_2 = r;}
                         if ((validBechdel(messageArray[r]) && messageArray[i] === "bechdel") || (validIMDb(messageArray[r]) && messageArray[i] === "imdb")) { //if valid rating number, both bechdel or IMDb
                              console.log("valiadtion worked for imdb or bechdel");
                              if (messageArray[i] === "bechdel") {
                                   bechdelScore_2 = messageArray[r];
                              }
                              if (messageArray[i] === "imdb") {
                                   IMDbScore_2 = messageArray[r];
                              }
                              break;
                         }
                    }
               }

               caseExist = true;
          }
     }

     console.log(" bechdelRatingPosition_1: " + bechdelRatingPosition_1 + " bechdelRatingPosition_2: " + bechdelRatingPosition_2 +
          " bechdelScore_1: " + bechdelScore_1 + " bechdelScore_2: " + bechdelScore_2 + " bechdelCounter: " + bechdelCounter);
     console.log(" imdbRatingPosition_1: " + IMDbRatingPosition_1 + " imdbRatingPosition_2: " + IMDbRatingPosition_2 +
          " IMDbScore_1: " + IMDbScore_1 + " IMDbScore_2: " + IMDbScore_2 + " IMDbCounter: " + IMDbCounter);

     if (caseExist) {
          if (bechdelCounter === 1 && IMDbCounter === 0) {//only bechdel was mentioned
               if (bechdelScore_1 != null) { userBechdel = bechdelScore_1 }
               else { userBechdel = bechdelScore_2 }
          }
          if (IMDbCounter === 1 && bechdelCounter === 0) {//only IMDb was mentioned
               if (IMDbScore_1 != null) { userIMDbRating = IMDbScore_1 }
               else { userIMDbRating = IMDbScore_2 }
          }

          if (bechdelCounter === 1 && IMDbCounter === 1) {//both imdb and bechdel was mentioned, but with no possible shared numbers
               if (bechdelScore_1 != null) { userBechdel = bechdelScore_1 }
               else { userBechdel = bechdelScore_2 }

               if (IMDbScore_1 != null) { userIMDbRating = IMDbScore_1 }
               else { userIMDbRating = IMDbScore_2 }
          }

          if (bechdelRatingPosition_1 === IMDbRatingPosition_2) {//...Imdb ... Bechdel
               if (IMDbCounter === 2 && bechdelCounter === 1) {
                    userIMDbRating = IMDbScore_1;
                    userBechdel = bechdelScore_1;
                    console.log("case 1");
               }
               else if (IMDbCounter === 1 && bechdelCounter === 2) {
                    userIMDbRating = IMDbScore_2;
                    userBechdel = bechdelScore_2;
                    console.log("case 2");
               }
          }
          if (bechdelRatingPosition_2 === IMDbRatingPosition_1) {//....bechdel...imdb...
               if (IMDbCounter === 1 && bechdelCounter === 2) {
                    userIMDbRating = IMDbScore_1;
                    userBechdel = bechdelScore_1;
                    console.log("case 3");
               }
               else if (IMDbCounter === 2 && bechdelCounter === 1) {
                    userIMDbRating = IMDbScore_2;
                    userBechdel = bechdelScore_2;
                    console.log("case 4");
               }
          }
          return "good"
     }; //bechdel or imdb mentioned 

     //if the word score or rating was mentioned, but the words bechdel or imdb was NOT mentioned
     for (let i = 0; i < messageArray.length; ++i) {
          if (messageArray[i] === "score" || messageArray[i] === "rating") {
               let measureWord = "";
               if (messageArray[i] === "score") { measureWord = "score" }
               if (messageArray[i] === "rating") { measureWord = "rating" }

               let returnMessage = "You mentioned the word " + measureWord + ". Did you mean bechdel " + measureWord + " or IMDB " + measureWord + "?";
               return returnMessage;
          }
     }
     //never mind, no rating related stuff where mentioned the by user
}


function validBechdel(number) {
     if (number < 4 && number > -1) {
          return true;
     }
     else return false;
}

function validIMDb(number) {
     if (number < 11 && number > -1) {
          return true;
     }
     else return false;
}
