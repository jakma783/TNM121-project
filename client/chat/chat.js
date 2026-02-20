const allGenres = ["action", "drama", "comedy"]; // make fetching function to extract all genre names
const dontWords = ["no", "dont", "don't", "hate", "Dont", "without", "remove", "disslike"];
const interruptingDontWords = ["although", "but", "however"];

const userGenre = [];
const userDisslikeGenres = [];

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
     return userMessage;
}



//main process function-------------------------------------------------------------------------------------------
function mainProcessMessage() {
     const messageArray = splitMessage(); // user message being split
     getGenre(messageArray);
     disslike(messageArray);
}




//split message functions-----------------------------------------------------------------------------------------
function splitMessage() {
     const fullString = document.getElementById('message-sent' + buttonCounter);
     const messageArray = fullString.innerText.split(" ");

     for (let i = 0; i < messageArray.length; ++i) {
          console.log("word " + i + ": " + messageArray[i]);
     }
     return messageArray;
}

//genre functions-------------------------------------------------------------------------------------------------
function getGenre(messageArray) {

     for (let i = 0; i < messageArray.length; ++i) {
          const thisWord = (isGenre(messageArray[i]));

          if (thisWord != null) {
               removeObject(userGenre, thisWord);
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

//(Dont's) functions ----------------------------------------------------------------------------------------------------------
function disslike(messageWords) { // void function - no return value - only removes objects if dont's occur

     for (let i = 0; i < messageWords.length; ++i) { //go through each word in message

          for (let j = 0; j < dontWords.length; ++j) { //check if it matches any of the "dont's" words

               if (messageWords[i] === dontWords[j]) {
                    console.log("DONT word occured: " + messageWords[i]);

                    for (let r = i + 1; r < messageWords.length; ++r) { //start from the dont word and remove all other categories after that
                         searchWord(messageWords[r]);
                    }

               }

          }
     }
}

function searchWord(potentialWord) { // one for loop for each user Category Array (top of document)

     for (let i = 0; i < userGenre.length; ++i) {
          if (potentialWord === userGenre[i]) {
               //remove that word from userGenre Array
               console.log("the word: " + potentialWord + ", will be removed from userGenre");
               removeObject(userGenre, potentialWord);

               //add the genre to userDisslikeGenres;
               removeObject(userDisslikeGenres, potentialWord);
               userDisslikeGenres.push(potentialWord);
               return true
          }
     }
     return false
}

function removeObject(userArray, theObject) {
     for (let i = 0; i < userArray.length; ++i) {
          if (theObject === userArray[i]) {
               userArray.splice(i, 1);
          }
     }
}

//function interruptingWord(theWord){}//****************************************************** */

//function to make sure disslikesgenres!=userGenre (if necesssary);

// remove object-------------------------------------------------------------------
function removeObject(userArray, theObject) {
     for (let i = 0; i < userArray.length; ++i) {
          if (theObject === userArray[i]) {
               userArray.splice(i, 1);
          }
     }
}


