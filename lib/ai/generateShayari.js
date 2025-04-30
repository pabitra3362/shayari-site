// generate response from goolge gemini api

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const categories = [
  "Love",
  "Birthday",
  "Breakup",
  "Cute",
  "Diwali",
  "Dosti",
  "Friendship",
  "Funny",
  "Good Night",
  "Miss You",
  "Romantic",
  "Sad",
  "Sorry",
  "Anniversary",
];
export async function generateShayari() {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `generate shayari about 4 lines as in array of 30 objects with contains category,content,title in it and use this categories ${categories} also use emojies in it and the title and content should be in hindi to say but written in english and only give array not talk even a single word beside that`,
  });

  const rawText = response.text;
  

  const shayariStartIndex = rawText.indexOf("[");
  const shayariStopIndex = rawText.indexOf("]") + 1;
  const arrayString = rawText.slice(shayariStartIndex, shayariStopIndex);

  let content = [];
  try {
    content = eval(arrayString);
  } catch (error) {
    console.log("error while text formatting: ", error.message);
    return [];
  }

  

  return content;
}
