
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import StyleSelector from './components/StyleSelector';
import ResultView from './components/ResultView';
import ApiKeyManager from './components/ApiKeyManager';
import { STUDIO_STYLES } from './constants';
import { AppStatus, StudioStyle } from './types';
import { transformImage } from './services/geminiService';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StudioStyle>(STUDIO_STYLES[0]);
  const [error, setError] = useState<string | null>(null);
  const [additionalPrompt, setAdditionalPrompt] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyValid = (key: string) => {
    setApiKey(key);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setStatus(AppStatus.IDLE);
        setTransformedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTransform = async () => {
    if (!originalImage || !apiKey) return;
    
    setStatus(AppStatus.LOADING);
    setError(null);
    
    try {
      const result = await transformImage(
        apiKey,
        originalImage, 
        selectedStyle.prompt,
        additionalPrompt
      );
      setTransformedImage(result);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "변환 중 오류가 발생했습니다.");
      setStatus(AppStatus.ERROR);
    }
  };

  const resetApp = () => {
    setOriginalImage(null);
    setTransformedImage(null);
    setStatus(AppStatus.IDLE);
    setError(null);
    setAdditionalPrompt("");
  };

  const loadingMessages = [
    "사진을 스튜디오로 옮기는 중...",
    "조명을 조절하고 있습니다...",
    "배경을 세련되게 꾸미는 중...",
    "화질을 개선하고 있습니다...",
    "소품을 배치하는 중..."
  ];
  
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);

  useEffect(() => {
    let interval: any;
    if (status === AppStatus.LOADING) {
      interval = setInterval(() => {
        setLoadingMessageIdx(prev => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl">
        {/* API Key Management */}
        <ApiKeyManager onKeyValid={handleKeyValid} isValidated={!!apiKey} />

        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            당신의 일상을 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">화보</span>로 만드세요
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            전문 스튜디오의 조명, 구도, 소품을 AI가 완벽하게 재현합니다. 
            Google Gemini 무료 API 키로 지금 바로 시작하세요.
          </p>
        </div>

        {status === AppStatus.SUCCESS && transformedImage && originalImage ? (
          <ResultView 
            original={originalImage} 
            transformed={transformedImage} 
            onReset={resetApp} 
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Upload and Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div 
                className={`relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-dashed transition-all flex flex-col items-center justify-center bg-white/5 ${
                  originalImage ? 'border-purple-500/50' : 'border-white/10 hover:border-purple-500/30'
                }`}
              >
                {originalImage ? (
                  <img src={originalImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="p-10 text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-cloud-upload-alt text-3xl text-gray-500"></i>
                    </div>
                    <div>
                      <p className="font-bold text-lg">사진을 업로드하세요</p>
                      <p className="text-sm text-gray-500">또는 드래그 앤 드롭</p>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform"
                    >
                      파일 선택하기
                    </button>
                  </div>
                )}
                
                {originalImage && status !== AppStatus.LOADING && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md hover:bg-black/80 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all border border-white/10"
                  >
                    이미지 교체
                  </button>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            {/* Right Column: Configuration */}
            <div className="lg:col-span-7 space-y-8">
              <StyleSelector 
                selectedStyleId={selectedStyle.id} 
                onSelect={setSelectedStyle} 
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <i className="fas fa-sliders-h text-purple-400"></i>
                  세부 요청사항 (선택)
                </h3>
                <textarea 
                  value={additionalPrompt}
                  onChange={(e) => setAdditionalPrompt(e.target.value)}
                  placeholder="예: 배경에 꽃을 추가해줘, 조명을 더 따뜻하게 해줘, 파란색 배경으로 바꿔줘..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none min-h-[100px]"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm flex gap-3 items-center animate-in fade-in zoom-in-95 duration-300">
                  <i className="fas fa-exclamation-circle text-lg"></i>
                  {error}
                </div>
              )}

              <button 
                onClick={handleTransform}
                disabled={!originalImage || !apiKey || status === AppStatus.LOADING}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                  !originalImage || !apiKey || status === AppStatus.LOADING
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.01] active:scale-[0.99] shadow-purple-900/20'
                }`}
              >
                {status === AppStatus.LOADING ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>{loadingMessages[loadingMessageIdx]}</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-wand-magic-sparkles"></i>
                    AI 스튜디오 변환 시작
                  </>
                )}
              </button>
              
              {!apiKey && (
                <p className="text-center text-xs text-yellow-500/70">
                  <i className="fas fa-info-circle mr-1"></i> API 키 설정이 완료되어야 시작할 수 있습니다.
                </p>
              )}
              
              <p className="text-center text-xs text-gray-500">
                변환에는 약 5-10초가 소요됩니다. 고품질 스튜디오 결과물을 기대해 주세요.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2024 AI Studio Transformer. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-gray-400 transition-colors">이용약관</a>
          <a href="#" className="hover:text-gray-400 transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-gray-400 transition-colors">커뮤니티 가이드</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
