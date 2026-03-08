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

     return messageArray;
}



//(Dont's) functions ----------------------------------------------------------------------------------------------------------
const dontWords = ["no", "dont", "don't", "hate", "Dont", "without", "remove", "disslike"];
const interruptingDontWords = ["although", "but", "however"];

function disslike(messageWords) { // checks if something is to be dissllike by user

     for (let i = 0; i < messageWords.length; ++i) { //go through each word in message

          for (let j = 0; j < dontWords.length; ++j) { //check if it matches any of the "dont's" words

               if (messageWords[i] === dontWords[j]) {
                    for (let r = i + 1; r < messageWords.length; ++r) { //start from the dont word and remove all other categories after that
                         if (interruptedDontSentence(messageWords[r])) { console.log("an interruption in dont sentence occured"); break; } //if sentence got interrupted e.g "i hate action but i do like comedy"
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
     for (let i = 0; i < userCatgrArray.length; ++i) {
          if (PWord === userCatgrArray[i]) {
               //remove that word from userGenre Array
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
               break;
          }
     }

}
