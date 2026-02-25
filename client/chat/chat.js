const allGenres = ["action", "drama", "comedy", "horror"]; // make fetching function to extract all genre names
const runtimeUnits = ["min", "minutes", "minute", "h", "hours", "hour"];
const allStars = ["Will Smith", "Eddie Murphy", "Jackie Chan", "Tom Cruise"];
const allDirectors = ["Chris Nolan", "James Cameron", "Steven Spielberg"];

//users Categories 
let userGenre = [];
let userDisslikeGenres = [];
let userRuntimeMax = null;
let userStars = [];
let userDirectors = [];
let userYearMax = null;
let userYearMin = null;
let userYearOne = null;



const dontWords = ["no", "dont", "don't", "hate", "Dont", "without", "remove", "disslike"];
const interruptingDontWords = ["although", "but", "however"];
let buttonCounter = 0;
let chatLine = 1;
let userLine = 2;

//send textbubble functions-------------------------------------------------------------------------------------------
function sendTextBubble(userMessage) {
     userLine = userLine + 1;
     const textBubble = document.createElement('div');
     textBubble.className = "user-message";

     const userText = document.createElement('p');
     userText.textContent = userMessage;
     userText.id = "message-sent" + buttonCounter;

     textBubble.style.gridRow = userLine;

     textBubble.appendChild(userText);
     document.body.appendChild(textBubble);

     console.log("User complete message was: " + userMessage);
}


//send button-----------------------------------------------------------------------------------------------------
function sendPrompt() {
     buttonCounter = buttonCounter + 1;
     console.log("SEND - button was clicked");
     const userMessage = document.getElementById('user-writer-bar').value;
     sendTextBubble(userMessage);
     mainProcessMessage();
     console.log("User genre is: " + userGenre);
     console.log("Dissliked genres are: " + userDisslikeGenres);
     console.log("user Runtime max= " + userRuntimeMax);
     console.log("user Stars are/is= " + userStars);
     console.log("user Diretors are/is= " + userDirectors);
     console.log("user year max: " + userYearMax);
     console.log("user year min: " + userYearMin);
     console.log("user ONE year only: " + userYearOne);
     return userMessage;
}



//main process function------------------------------------------------------------------------*********************
function mainProcessMessage() {
     const messageArray = convertMessage(); // user message being split
     getGenre(messageArray);
     disslike(messageArray);
     getRuntime(messageArray);
     getName(messageArray, allStars, userStars); //actors
     getName(messageArray, allDirectors, userDirectors); //Directors
     getYear(messageArray);
}




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
               console.log("currently, userGenre is: " + userGenre);
          }
     }

     return userGenre;
}

function isGenre(word) {
     for (let i = 0; i < allGenres.length; ++i) {
          if (allGenres[i] === word) {
               console.log("The word: " + word + " is a genre!");
               console.log("your genre is: " + allGenres[i]);
               return allGenres[i];
          }
     }
     // console.log("the word: " + word + "  - is not a genre");
     return null;
}


//runtime----------------------------------------------------------------------------------------------------------
function getRuntime(messageArray) {
     for (let i = 0; i < messageArray.length; ++i) {
          messageArray[i] = messageArray[i].replace(",", "."); // replacing any "," with "."  to fix number

          if (isFinite(messageArray[i])) {

               for (let r = i + 1; r < messageArray.length; ++r) {

                    for (let s = 0; s < runtimeUnits.length; ++s) {
                         if (messageArray[r] === runtimeUnits[s]) {

                              if (messageArray[r].startsWith("m") || messageArray[r].startsWith("M")) {
                                   userRuntimeMax = userRuntimeMax + parseFloat(messageArray[i]);
                              }
                              if (messageArray[r].startsWith("h") || messageArray[r].startsWith("H")) {
                                   userRuntimeMax = userRuntimeMax + 60 * (parseFloat(messageArray[i])); // converting hours to min
                              }
                         }
                    }
                    break;
               }
          }
     }
}


//Stars or actors, movie names ect----------------------------------------------------------------------------------------------------------------

function getName(messageArray, allNames, userNames) {
     for (let i = 0; i < messageArray.length; ++i) {
          if (i != messageArray.length - 1) { //if it's not the last word message, or else no last name
               let possibleFullName = messageArray[i] + " " + messageArray[i + 1];

               for (let s = 0; s < allNames.length; ++s) {
                    if (possibleFullName === allNames[s].toLowerCase()) {
                         userNames.push(allNames[s]);
                         console.log("name added as star");
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
               console.log("undefined year appeared");
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


















//************************************Sentence basedfunctions***********************************************************************
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//


//convert message functions-----------------------------------------------------------------------------------------
function convertMessage() {
     const fullString = document.getElementById('message-sent' + buttonCounter);

     let messageArray = fullString.innerText; // take whole string
     messageArray.replace("?", "");
     messageArray = messageArray.split(" ");

     for (let i = 0; i < messageArray.length; ++i) {
          messageArray[i] = messageArray[i].toLowerCase();
     }



     for (let i = 0; i < messageArray.length; ++i) {
          console.log("word " + i + ": " + messageArray[i]);
     }
     return messageArray;
}



//(Dont's) functions ----------------------------------------------------------------------------------------------------------
function disslike(messageWords) { // checks if something is to be dissllike by user

     for (let i = 0; i < messageWords.length; ++i) { //go through each word in message

          for (let j = 0; j < dontWords.length; ++j) { //check if it matches any of the "dont's" words

               if (messageWords[i] === dontWords[j]) {
                    console.log("DONT word occured: " + messageWords[i]);

                    for (let r = i + 1; r < messageWords.length; ++r) { //start from the dont word and remove all other categories after that
                         if (interruptedDontSentence(messageWords[r])) { console.log("an interruption in dont sentence occured"); break } //if sentence got interrupted e.g "i hate action but i do like comedy"
                         else if (!interruptedDontSentence(messageWords[r])) { searchToDelete(messageWords[r]); }
                    }
               }

          }
     }
}

function searchToDelete(potentialWord) { // one call(incl. for-loop) for each user Category Array (top of document)
     searchDeleteMini(potentialWord, userGenre, userDisslikeGenres); //genre
     searchDeleteMini(potentialWord, userStars, null);
}

function searchDeleteMini(PWord, userCatgrArray, dissliked) {
     console.log("deleted artist: " + PWord);
     for (let i = 0; i < userCatgrArray.length; ++i) {
          if (PWord === userCatgrArray[i]) {
               //remove that word from userGenre Array
               console.log("the word: " + PWord + ", will be removed from userGenre");
               removeObject(userCatgrArray, PWord);

               //add the genre to userDisslikeGenres;
               removeObject(dissliked, PWord);
               dissliked.push(PWord);
               return true
          }
     }
     return false
}

function interruptedDontSentence(theWord) {
     for (let i = 0; i < interruptingDontWords.length; ++i) {
          if (theWord === interruptingDontWords[i]) {
               console.log("INTERRUPT HAPPENING function");
               console.log(theWord);
               return true
          }
     }
     return false
}


// remove object--------------------------------------------------------------------------------------------------------------
function removeObject(userArray, theObject) {
     for (let i = 0; i < userArray.length; ++i) {
          if (theObject === userArray[i]) {
               userArray.splice(i, 1);
          }
     }
}
