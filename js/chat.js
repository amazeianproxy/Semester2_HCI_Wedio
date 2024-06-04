// script.js

document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(type);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        scrollToBottom();  // buat scroll auto
    }

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'sent');
            messageInput.value = ''; 
            messageInput.focus();
        }
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    // Biar chat muncul dri bawah, kalo mau dri atas ilangin aja
    scrollToBottom();
});
