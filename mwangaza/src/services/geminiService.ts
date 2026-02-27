/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { Project } from "../data";

let ai: GoogleGenAI | null = null;

function getGoogleAI(): GoogleGenAI {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set. Please add it to your environment variables.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

export async function generateProjectGuide(project: Project): Promise<string> {
  const model = 'gemini-3-flash-preview';
  const prompt = `You are a direct and helpful AI tutor for the Kenyan Competency-Based Education (CBE) curriculum. Your name is Mwangaza.

  A student needs a guide for the following project:
  - Title: ${project.title}
  - Description: ${project.description}
  - Tasks: ${project.tasks.join(', ')}

  Your task is to provide a simple, clear, and direct step-by-step guide to complete this project.
  - Focus on actionable steps.
  - Be concise and get straight to the point.
  - Avoid conversational filler or overly encouraging language.
  - The output must be in Markdown format.
  `;

  try {
    const genAI = getGoogleAI();
    const response = await genAI.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error generating project guide:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
        return "The AI guide feature is not configured correctly. Please ensure your Gemini API key is set up.";
    }
    return "I'm sorry, I was unable to generate a guide for this project at the moment. Please try again later.";
  }
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export async function generateQuiz(topicName: string, subTopicName?: string): Promise<QuizQuestion[]> {
  const model = 'gemini-3-flash-preview';
  const prompt = `You are Mwangaza, an AI learning assistant for the Kenyan CBE curriculum.
  Generate a multiple-choice quiz for junior secondary school students.
  Topic: ${topicName}
  ${subTopicName ? `Sub-topic: ${subTopicName}` : ''}
  
  Generate ${subTopicName ? '5' : '10'} questions.
  Return ONLY a valid JSON array of objects, with no markdown formatting or backticks.
  Each object must have:
  - "question": string
  - "options": array of 4 strings
  - "correctAnswerIndex": number (0-3)
  - "explanation": string (brief explanation of why the answer is correct)
  `;

  try {
    const genAI = getGoogleAI();
    const response = await genAI.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating quiz:", error);
    return [];
  }
}

export async function generateFlashcards(topicName: string, subTopicName: string): Promise<Flashcard[]> {
  const model = 'gemini-3-flash-preview';
  const prompt = `You are Mwangaza, an AI learning assistant for the Kenyan CBE curriculum.
  Generate 5 flashcards for junior secondary school students to help them study.
  Topic: ${topicName}
  Sub-topic: ${subTopicName}
  
  Return ONLY a valid JSON array of objects, with no markdown formatting or backticks.
  Each object must have:
  - "front": string (a concept, term, or question)
  - "back": string (the definition, explanation, or answer)
  `;

  try {
    const genAI = getGoogleAI();
    const response = await genAI.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
}

export async function generateSubTopicExplanation(subTopicName: string, topicName: string): Promise<string> {
  const model = 'gemini-3-flash-preview';
  const prompt = `You are Mwangaza, an AI learning assistant for the Kenyan CBE curriculum.
  Provide a brief, encouraging, and clear explanation (2-3 sentences) of the sub-topic "${subTopicName}" which is part of the topic "${topicName}".
  Focus on why this is important for the student to learn and what they will master.
  Keep it simple and suitable for a junior secondary school student.
  `;

  try {
    const genAI = getGoogleAI();
    const response = await genAI.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error generating sub-topic explanation:", error);
    return "This sub-topic covers essential concepts to help you master your curriculum. Let's dive in!";
  }
}
