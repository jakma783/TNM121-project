//************************************Chat Response functions***********************************************************************
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------//


function sendResponseTextBubble(responseMessage){
     chatLine = chatLine + 2;
     const textBubble = document.createElement('div');
     textBubble.className = "chat-message";

     const chatText = document.createElement('p');
     chatText.textContent = responseMessage;
     chatText.id = "message-sent" + buttonCounter;

     textBubble.style.gridRow = chatLine;

     textBubble.appendChild(chatText);
     document.body.appendChild(textBubble);
}