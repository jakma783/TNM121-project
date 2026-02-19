const allGenres = ["action", "drama", "comedy"]; // make fetching function to extract all genre names

const userGenre = [];

let chatLine = 1;
let userLine = 2;

function sendTextBubble(userMessage) {
     userLine = userLine + 1;
     const textBubble = document.createElement('div');
     textBubble.className = "user-message";

     const userText = document.createElement('p');
     userText.textContent = userMessage;
     userText.id = "message-sent";
     
     textBubble.style.gridRow = userLine;
     
     textBubble.appendChild(userText);
     document.body.appendChild(textBubble);

     console.log("User complete message was: " + userMessage);

}




//send button-----------------------------------------------------------------------------------------------------
function sendPrompt() {
     console.log("Sending-button was clicked");
     const userMessage = document.getElementById('user-writer-bar').value;
     sendTextBubble(userMessage);
     mainProcessMessage();
     console.log("User genre is: " + userGenre);
     return userMessage;
}



//main process function--------------------------------------------------------------------------------
function mainProcessMessage() {
     const messageArray = splitMessage(); // user message being split

     return getGenre(messageArray);
}




//text reader functions-----------------------------------------------------------------------------------------
function splitMessage() {
     const fullString = document.getElementById('message-sent');
     const messageArray = fullString.innerText.split(" ");

     for (let i = 0; i < messageArray.length; ++i) {
          console.log("word " + i + ": " + messageArray[i]);
     }
     return messageArray;
}


function getGenre(messageArray) {

     for (let i = 0; i < messageArray.length; ++i) {
          const thisWord = (isGenre(messageArray[i]));

          if (thisWord != null) {
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
     console.log("the word: " + word + "  - is not a genre");
     return null;
}





