
import React from 'react';
import { STUDIO_STYLES } from '../constants';
import { StudioStyle } from '../types';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (style: StudioStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <i className="fas fa-magic text-purple-400"></i>
        스튜디오 스타일 선택
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {STUDIO_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style)}
            className={`group relative overflow-hidden rounded-xl border-2 transition-all aspect-[4/5] ${
              selectedStyleId === style.id 
                ? 'border-purple-500 ring-2 ring-purple-500/50 scale-[1.02]' 
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <img 
              src={style.previewImage} 
              alt={style.name} 
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 text-left transition-opacity ${selectedStyleId === style.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">Style</span>
              <span className="text-sm font-bold text-white leading-tight">{style.name}</span>
            </div>
            {selectedStyleId === style.id && (
              <div className="absolute top-2 right-2 bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                <i className="fas fa-check text-[10px]"></i>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
