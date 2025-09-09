
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from '../constants';
import { ScratchpadAction, ChatMessage } from '@/app/models/types';

if (!process.env.NEXT_PUBLIC_API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

export const sendMessageToAI = async (history: ChatMessage[], systemInstruction: string): Promise<string> => {
  try {
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};

export const performActionOnNotes = async (action: ScratchpadAction, notes: string): Promise<string> => {
  let prompt = '';
  switch (action) {
    case 'summarize':
      prompt = `Please summarize the following study notes in a few concise bullet points:\n\n---\n${notes}\n---`;
      break;
    case 'key-points':
      prompt = `Identify and list the key points from the following text. Format them as a numbered list:\n\n---\n${notes}\n---`;
      break;
    case 'proofread':
      prompt = `Proofread and correct any grammar or spelling mistakes in the following text. Return only the corrected text, without any additional comments:\n\n---\n${notes}\n---`;
      break;
    default:
      return "Invalid action.";
  }

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error performing action on notes:", error);
    return `An error occurred while trying to ${action} the notes.`;
  }
};