
import React, { useState, useEffect } from 'react';
import { obfuscate, deobfuscate } from '../services/encryption';
import { validateApiKey } from '../services/geminiService';

interface ApiKeyManagerProps {
  onKeyValid: (key: string) => void;
  isValidated: boolean;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeyValid, isValidated }) => {
  const [inputKey, setInputKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManager, setShowManager] = useState(!isValidated);

  useEffect(() => {
    const savedKey = localStorage.getItem('studio_transformer_v2_key');
    if (savedKey) {
      const decoded = deobfuscate(savedKey);
      if (decoded) {
        setInputKey(decoded);
        handleValidate(decoded);
      }
    }
  }, []);

  const handleValidate = async (keyToValidate: string) => {
    const key = keyToValidate || inputKey;
    if (!key) return;

    setLoading(true);
    setError(null);
    try {
      const isValid = await validateApiKey(key);
      if (isValid) {
        localStorage.setItem('studio_transformer_v2_key', obfuscate(key));
        onKeyValid(key);
        setShowManager(false);
      } else {
        setError("유효하지 않은 API 키입니다. 다시 확인해주세요.");
      }
    } catch (err) {
      setError("연결 테스트 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!showManager && isValidated) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium text-green-400">Gemini API 연결됨 (Google AI Studio Free Tier 지원)</span>
        </div>
        <button 
          onClick={() => setShowManager(true)}
          className="text-xs text-gray-400 hover:text-white underline underline-offset-4"
        >
          API 키 변경
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
      <div className="bg-[#121212] border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-key text-2xl text-purple-400"></i>
          </div>
          <h2 className="text-2xl font-bold">Gemini API 키 설정</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            서비스를 이용하려면 Google Gemini API 키가 필요합니다. <br/>
            키는 브라우저에 암호화되어 안전하게 저장됩니다.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AI Studio에서 발급받은 API 키 입력"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </p>
          )}

          <button 
            onClick={() => handleValidate('')}
            disabled={loading || !inputKey}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              loading || !inputKey 
                ? 'bg-gray-800 text-gray-500' 
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {loading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-plug"></i>}
            연결 테스트 및 저장
          </button>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-3">
          <p className="text-[11px] text-gray-500 text-center uppercase tracking-wider font-bold">도움말</p>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Google AI Studio에서 무료 API 키 발급받기
            <i className="fas fa-external-link-alt text-[10px]"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
