
import { GoogleGenAI } from "@google/genai";

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    // Minimal request to check if key is valid and active
    await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'ping',
    });
    return true;
  } catch (error) {
    console.error("API Key Validation Failed:", error);
    return false;
  }
};

export const transformImage = async (
  apiKey: string,
  base64Image: string,
  stylePrompt: string,
  additionalInstructions: string = ""
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  // Clean base64 string
  const base64Data = base64Image.split(',')[1] || base64Image;
  const mimeType = base64Image.split(';')[0].split(':')[1] || 'image/jpeg';

  const fullPrompt = `
    Transform this image into a professional studio-quality shot. 
    Follow these style guidelines: ${stylePrompt}.
    Additional instructions from user: ${additionalInstructions}.
    Ensure high resolution, professional lighting, and realistic composition. 
    Maintain the core identity of the subject in the photo while significantly enhancing the background, lighting, and overall professional quality.
    If the subject is a person, keep their face recognizable but improve the studio environment.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
    });

    let generatedImageUrl = "";
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!generatedImageUrl) {
        throw new Error("이미지 생성에 실패했습니다. 사진 내용이나 스타일이 정책에 위배될 수 있습니다.");
    }

    return generatedImageUrl;
  } catch (error: any) {
    console.error("Gemini transformation error:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("API 키가 올바르지 않습니다.");
    }
    throw error;
  }
};
