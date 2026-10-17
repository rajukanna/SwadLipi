// Maharaj AI Agent Client Controller
class MaharajAgent {
  constructor() {
    this.messagesContainer = document.getElementById('aiChatMessages');
    this.inputField = document.getElementById('aiChatInput');
    this.sendBtn = document.getElementById('aiChatSendBtn');
    this.history = [];
    this.currentInspectedDish = null;

    this.initEvents();
  }

  setCurrentDish(dish) {
    this.currentInspectedDish = dish;
  }

  initEvents() {
    if (this.sendBtn && this.inputField) {
      this.sendBtn.addEventListener('click', () => this.handleSendMessage());
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleSendMessage();
      });
    }

    // Quick prompts
    document.querySelectorAll('.chat-quick-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptText = btn.dataset.prompt || btn.innerText;
        if (this.inputField) {
          this.inputField.value = promptText;
          this.handleSendMessage();
        }
      });
    });
  }

  appendMessage(text, role = 'bot') {
    if (!this.messagesContainer) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    
    // Format basic markdown like bold and bullets
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n• /g, '<br>• ')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    bubble.innerHTML = formatted;
    this.messagesContainer.appendChild(bubble);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  async handleSendMessage() {
    const text = this.inputField.value.trim();
    if (!text) return;

    this.appendMessage(text, 'user');
    this.inputField.value = '';

    // Show typing state
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = '<em>Maharaj AI is thinking... 🍛</em>';
    this.messagesContainer.appendChild(typingIndicator);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: this.history,
          currentDish: this.currentInspectedDish,
          userPreferences: window.appState ? window.appState.userPreferences : {}
        })
      });

      const data = await response.json();
      const indicator = document.getElementById('typingIndicator');
      if (indicator) indicator.remove();

      if (data.success && data.reply) {
        this.appendMessage(data.reply, 'bot');
        this.history.push({ role: 'user', content: text });
        this.history.push({ role: 'assistant', content: data.reply });
      } else {
        this.appendMessage("I couldn't fetch a reply just now. Please try again or check the dish explorer!", 'bot');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const indicator = document.getElementById('typingIndicator');
      if (indicator) indicator.remove();
      this.appendMessage("Offline mode: Maharaj AI recommends pairing rich curries with garlic naan and soothing cucumber raita!", 'bot');
    }
  }
}

window.MaharajAgent = MaharajAgent;
