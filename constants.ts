
import { StudioStyle } from './types';

export const STUDIO_STYLES: StudioStyle[] = [
  {
    id: 'prof-portrait',
    name: '프로페셔널 인물 사진',
    description: '부드러운 키 라이트와 세련된 배경의 정통 스튜디오 포트레이트',
    prompt: 'Professional high-end studio portrait photography. Soft Rembrandt lighting, subtle bokeh background, high resolution, sharp focus on the subject, neutral grey studio backdrop, 8k quality.',
    previewImage: 'https://picsum.photos/seed/port1/400/500'
  },
  {
    id: 'cinematic-studio',
    name: '시네마틱 무드',
    description: '강렬한 대비와 분위기 있는 조명을 사용한 영화 같은 연출',
    prompt: 'Cinematic studio lighting, dramatic shadows, moody atmosphere, teal and orange color grading, professional photography, high contrast, anamorphic lens flares, rich textures.',
    previewImage: 'https://picsum.photos/seed/cine/400/500'
  },
  {
    id: 'minimalist-clean',
    name: '미니멀 클린',
    description: '밝고 깨끗한 화이트 톤의 현대적인 스튜디오 스타일',
    prompt: 'Minimalist clean studio setup, bright high-key lighting, pure white background, soft shadows, airy atmosphere, modern aesthetic, professional editorial photography.',
    previewImage: 'https://picsum.photos/seed/clean/400/500'
  },
  {
    id: 'luxury-product',
    name: '럭셔리 제품/브랜드',
    description: '고급 소품과 텍스처를 활용한 브랜드 화보 느낌',
    prompt: 'Luxury editorial photography, marble and gold props, elegant composition, professional studio product lighting, sharp details, premium feel, vogue style.',
    previewImage: 'https://picsum.photos/seed/lux/400/500'
  },
  {
    id: 'vintage-film',
    name: '빈티지 필름',
    description: '아날로그 감성의 따뜻하고 포근한 필름 사진 스타일',
    prompt: 'Vintage film photography, warm grain, Kodak Portra 400 aesthetic, soft natural studio light, nostalgic mood, authentic film textures, gentle colors.',
    previewImage: 'https://picsum.photos/seed/film/400/500'
  }
];
