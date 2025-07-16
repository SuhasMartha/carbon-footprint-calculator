export class VoiceInputManager {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private onResult: ((text: string) => void) | null = null;
  private onError: ((error: string) => void) | null = null;

  constructor() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      if (this.onResult) {
        this.onResult(result);
      }
    };

    this.recognition.onerror = (event) => {
      if (this.onError) {
        this.onError(event.error);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    onResult: (text: string) => void,
    onError: (error: string) => void,
    language = 'en-US'
  ) {
    if (!this.recognition || this.isListening) return;

    this.onResult = onResult;
    this.onError = onError;
    this.recognition.lang = language;
    
    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      onError('Failed to start voice recognition');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public setLanguage(language: string) {
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }
}

export const voiceManager = new VoiceInputManager();