// Speech & Phonetic Audio Service for Indian Restaurant Dishes
class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  speak(text, lang = 'hi-IN') {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to pick Indian English or Hindi voice
    const indianVoice = this.voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN' || v.name.includes('India'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.rate = 0.9; // Slightly slower for clear cultural pronunciation
    utterance.pitch = 1.0;
    this.synth.speak(utterance);
  }
}

window.speechService = new SpeechService();
