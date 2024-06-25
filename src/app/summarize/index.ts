import { haikuLLM } from "../../llm/claude-haiku";

export const summarize = async (system: string, user: string) => {
  return haikuLLM.invoke({
    system_prompt: system,
    user_prompt: user,
  });
};
