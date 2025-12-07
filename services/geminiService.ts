import { GoogleGenAI, Type } from "@google/genai";
import { Player } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiHint = async (board: Player[], currentPlayer: Player): Promise<{ index: number; reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Play Tic-Tac-Toe.
      Board state (0-8): ${JSON.stringify(board)}. 
      Current player: ${currentPlayer}. 
      null means empty.
      
      Return a JSON object with:
      1. 'index': The best move index (0-8) to win or block.
      2. 'reasoning': A very short, strategic reason (max 10 words).
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            index: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
          },
          required: ["index", "reasoning"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Hint Error:", error);
    return {
      index: -1,
      reasoning: "AI is thinking too hard...",
    };
  }
};
