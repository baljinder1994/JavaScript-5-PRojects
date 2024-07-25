const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
    console.log('WebSocket connection opened');
};

ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};

ws.onclose = function() {
    console.log('WebSocket connection closed');
};

ws.onmessage = function(event) {
    let message;
    if (event.data instanceof Blob) {
        // Handle Blob data
        const reader = new FileReader();
        reader.onload = function() {
            message = reader.result;
            displayMessage(message, false); // false for received messages
        };
        reader.readAsText(event.data);
    } else {
        // Handle text data
        message = event.data;
        displayMessage(message, false); // false for received messages
    }
};

function displayMessage(message, isSender) {
    console.log('Displaying message:', message);
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = isSender ? 'sent' : 'received'; // Different styles for sender/receiver
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

sendButton.addEventListener('click', function() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        console.log('Sending message:', message);
        ws.send(message);
        messageInput.value = '';
        displayMessage(message, true); // true for sender messages
    }
});

// Optional: Handle Enter key for sending messages
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
