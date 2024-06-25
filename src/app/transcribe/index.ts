import { assemblyAILLM } from "@/llm/assemblyAI";

export const transcribe = async (filePath: string | ArrayBuffer | Blob) => {
  return assemblyAILLM.transcribe(filePath);
};
