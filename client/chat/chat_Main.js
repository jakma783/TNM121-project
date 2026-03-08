//************************************Chat Main Processer***********************************************************************
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//


const allGenres = ["action", "drama", "comedy", "horror"]; // make fetching function to extract all genre names
const runtimeUnits = ["min", "minutes", "minute", "h", "hours", "hour"];
const allStars = ["Will Smith", "Eddie Murphy", "Jackie Chan", "Tom Cruise"];
const allDirectors = ["Chris Nolan", "James Cameron", "Steven Spielberg"];

//users Categories 
let userMessage = [];

let userGenre = [];
let userDisslikeGenres = [];
let userRuntimeMax = null;
let userStars = [];
let userDirectors = [];
let userYearMax = null;
let userYearMin = null;
let userYearOne = null;
let userBechdel = null;
let userIMDbRating = null;


let buttonCounter = 0;
let chatLine = 1;
let userLine = 2;

//send textbubble functions-------------------------------------------------------------------------------------------
function sendUserTextBubble(InputUserMessage) {
     const textBubble = document.createElement('div');
     textBubble.className = "user-message";

     const userText = document.createElement('p');
     userText.textContent = InputUserMessage;
     userText.id = "message-sent" + buttonCounter;

     textBubble.style.gridRow = userLine;
     userLine = userLine + 2;

     textBubble.appendChild(userText);
     document.body.appendChild(textBubble);

     console.log("User complete message was: " + InputUserMessage);
}

//send button-----------------------------------------------------------------------------------------------------
function sendPrompt() {
     userMessage = []; //cleaning up previous recieved userMessage promt
     buttonCounter = buttonCounter + 1;
     const recievedUserMessage = document.getElementById('user-writer-bar').value;
     sendUserTextBubble(recievedUserMessage);
     document.getElementById('user-writer-bar').value = " "; //emptying the user Writer bar after sending a promt
     mainProcessMessage();/*
     console.log("*User liked genre is: " + userGenre);
     console.log("*Dissliked genres are: " + userDisslikeGenres);
     console.log("*user Runtime max= " + userRuntimeMax);
     console.log("*user Stars are/is= " + userStars);
     console.log("*user Diretors are/is= " + userDirectors);
     console.log("*user year max: " + userYearMax);
     console.log("*user year min: " + userYearMin);
     console.log("*user ONE year only: " + userYearOne);*/
     console.log("user Bechdel score: " + userBechdel);
     console.log("user IMDB rating: " + userIMDbRating);
     return recievedUserMessage;
}



//main process function------------------------------------------------------------------------*********************
function mainProcessMessage() {
     userMessage = convertMessage(); // user message being split
     getGenre(userMessage);
     disslike(userMessage);
     getRuntime(userMessage);
     getName(userMessage, allStars, userStars); //actors
     getName(userMessage, allDirectors, userDirectors); //Directors
     getYear(userMessage);
     getRatings(userMessage);
     sendResponseTextBubble("hello I am chat");
}



