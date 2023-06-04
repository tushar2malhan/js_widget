// Connect to the WebSocket server
var socket = io();

// DOM elements
var messageDisplay = document.getElementById('message-display');
var messageInput = document.querySelector('.widget input[type="text"]');
var sendButton = document.querySelector('.widget input[type="submit"]');

// User
var user = prompt('Enter your name:');

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Function to send a message
function sendMessage() {
  var message = messageInput.value.trim();
  if (message !== '') {
    if (user === null) {
      user = prompt('Enter your name:');
      if (user !== null) {
        var chatMessage = {
          user: user,
          message: message
        };
        socket.emit('chatMessage', chatMessage);
        messageInput.value = '';
      }
    } else {
      var chatMessage = {
        user: user,
        message: message
      };
      socket.emit('chatMessage', chatMessage);
      messageInput.value = '';
    }
  }
}

// Function to display a message
function displayMessage(chatMessage) {
  var messageElement = document.createElement('p');
  messageElement.textContent = chatMessage.user + ': ' + chatMessage.message;
  messageDisplay.appendChild(messageElement);
  messageDisplay.scrollTop = messageDisplay.scrollHeight;

  console.log(chatMessage.user + ': ' + chatMessage.message);
}

// Static response array
var staticResponses = [
  'Hello!',
  'How are you?',
  'Nice to meet you!',
  'Welcome to the chat!'
];

// Initialize counter for static responses
var staticResponseIndex = 0;
var isFirstInteraction = true; // Flag for first interaction

// Listen for incoming messages
socket.on('chatMessage', function(chatMessage) {
  if (chatMessage.user === user) {
    // Display user message
    displayMessage(chatMessage);

    // Send a static response after receiving a message
    var staticResponse = {
      user: 'Bot',
      message: isFirstInteraction ? 'Hello ' + user + '!' : getStaticResponse()
    };
    socket.emit('chatMessage', staticResponse);

    // Update the static response index
    staticResponseIndex = (staticResponseIndex + 1) % staticResponses.length;

    // Update first interaction flag
    isFirstInteraction = false;
  } else if (chatMessage.user === 'Bot') {
    // Display bot message
    displayMessage(chatMessage);
  }
});

// Function to get the next static response in order
function getStaticResponse() {
  var staticResponse = staticResponses[staticResponseIndex];
  return staticResponse;
}
