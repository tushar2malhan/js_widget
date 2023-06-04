(function() {
  // Create widget container element
  var container = document.getElementById('widget-container');

  // Create widget elements
  var widget = document.createElement('div');
  widget.className = 'widget';

  var messageDisplay = document.createElement('div');
  messageDisplay.id = 'message-display';

  var messageInput = document.createElement('input');
  messageInput.type = 'text';
  messageInput.placeholder = 'Type a message...';

  var sendButton = document.createElement('input');
  sendButton.type = 'submit';
  sendButton.value = 'Send';

  // Append elements to widget
  widget.appendChild(messageDisplay);
  widget.appendChild(messageInput);
  widget.appendChild(sendButton);

  // Append widget to container
  container.appendChild(widget);
})();
