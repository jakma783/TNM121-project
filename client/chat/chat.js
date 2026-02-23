const allGenres = ["action", "drama", "comedy"]; // make fetching function to extract all genre names

const dontWords = ["no", "dont", "don't", "hate", "Dont", "without", "remove", "disslike"];
const interruptingDontWords = ["although", "but", "however"];
//const runtimeWords = ["longer", "shorter", "runtime"];
const runtimeUnits = ["min", "Min", "minutes", "Minutes", "minute", "Minute", "h", "H", "hours", "Hours", "hour", "Hour"];

const userGenre = [];
const userDisslikeGenres = [];
let userRuntimeMax = 0;

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
    return userMessage;
}



//main process function------------------------------------------------------------------------*********************
function mainProcessMessage() {
    const messageArray = splitMessage(); // user message being split
    getGenre(messageArray);
    disslike(messageArray);
    getRuntime(messageArray);
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
                            userRuntimeMax = userRuntimeMax +  parseFloat(messageArray[i]);
                        }
                        if (messageArray[r].startsWith("h") || messageArray[r].startsWith("H")) {
                            userRuntimeMax = userRuntimeMax +  60*(parseFloat(messageArray[i])); // converting hours to min
                        }
                    }
                }
                break;
            }
        }
    }
}

//



















//************************************Sentence basedfunctions***********************************************************************
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//


//split message functions-----------------------------------------------------------------------------------------
function splitMessage() {
    const fullString = document.getElementById('message-sent' + buttonCounter);
    const messageArray = fullString.innerText.split(" ");

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

}

function searchDeleteMini(PWord, userCatgrArray, dissliked) {
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

