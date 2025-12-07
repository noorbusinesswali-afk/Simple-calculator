import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSubtasks = async (goal: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user wants to: "${goal}". 
      Break this down into 3 to 5 short, actionable, specific to-do list items.
      Keep them concise (under 10 words each).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tasks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of actionable tasks"
            }
          },
          required: ["tasks"]
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const result = JSON.parse(text);
    return result.tasks || [];
  } catch (error) {
    console.error("Gemini Task Gen Error:", error);
    return ["Break it down manually (AI busy)", "Try again later"];
  }
};
