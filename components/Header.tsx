
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-8 border-b border-white/10 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
          <i className="fas fa-camera-retro text-white text-xl"></i>
        </div>
        <h1 className="text-2xl font-bold tracking-tighter">AI <span className="text-purple-400">STUDIO</span></h1>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#" className="hover:text-white transition-colors">홈</a>
        <a href="#" className="hover:text-white transition-colors">갤러리</a>
        <a href="#" className="hover:text-white transition-colors">가격</a>
        <a href="#" className="text-white">스튜디오 변환</a>
      </nav>
      <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
        로그인
      </button>
    </header>
  );
};

export default Header;
