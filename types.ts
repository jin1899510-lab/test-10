
export interface StudioStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  previewImage: string;
}

export interface TransformationResult {
  originalUrl: string;
  generatedUrl: string;
  style: StudioStyle;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
