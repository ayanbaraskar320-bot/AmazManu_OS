import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  // This is a placeholder check. In a real environment, the key would be set.
  // We proceed assuming it will be available at runtime.
  console.warn("API_KEY environment variable not set. The app will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const editImageWithGemini = async (
  prompt: string,
  base64Image: string,
  mimeType: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data found in the Gemini response.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    throw new Error("Failed to process image with Gemini. Please check your prompt and API key.");
  }
};
