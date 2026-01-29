
import React, { useState } from 'react';

interface ResultViewProps {
  original: string;
  transformed: string;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ original, transformed, onReset }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = transformed;
    link.download = `studio-transformation-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="relative group w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img 
            src={showOriginal ? original : transformed} 
            alt="Result" 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
            {showOriginal ? '원본 사진' : 'AI 스튜디오 변환 결과'}
          </div>

          <button 
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 border border-white/30"
            title="원본 보기 (길게 누르기)"
          >
            <i className="fas fa-layer-group"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto">
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20"
          >
            <i className="fas fa-download"></i>
            고화질 이미지 저장
          </button>
          
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all"
          >
            <i className="fas fa-undo"></i>
            새로 만들기
          </button>
          
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3 max-w-sm">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Studio Info</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              AI가 원본의 특징을 유지하면서 조명, 화질, 배경을 스튜디오급으로 재구성했습니다.
            </p>
            <div className="flex gap-2">
              <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-1 rounded border border-purple-500/30 font-mono">4K UPSCALED</span>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/30 font-mono">STUDIO LIGHTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
