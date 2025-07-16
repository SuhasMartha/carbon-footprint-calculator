import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { voiceManager } from '../utils/voiceInput';
import { useTranslation } from '../contexts/AppContext';

interface VoiceInputProps {
  onResult: (text: string) => void;
  placeholder?: string;
  className?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, placeholder, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { language } = useTranslation();

  useEffect(() => {
    setIsSupported(voiceManager.isSupported());
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      voiceManager.stopListening();
      setIsListening(false);
    } else {
      const languageMap: Record<string, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        te: 'te-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
      };

      voiceManager.startListening(
        (text) => {
          onResult(text);
          setIsListening(false);
        },
        (error) => {
          console.error('Voice input error:', error);
          setIsListening(false);
        },
        languageMap[language] || 'en-US'
      );
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleVoiceInput}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isListening
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      title={placeholder || 'Voice input'}
    >
      {isListening ? (
        <MicOff className="h-4 w-4 animate-pulse" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </button>
  );
};

export default VoiceInput;