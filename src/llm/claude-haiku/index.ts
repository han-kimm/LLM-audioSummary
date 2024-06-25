import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
class HaikuLLM {
  private model;
  constructor(apiKey: string) {
    this.model = new ChatAnthropic({
      apiKey,
      model: "claude-3-haiku-20240307",
      temperature: 0,
      maxTokens: 300,
    });
  }

  async invoke({
    system_prompt,
    user_prompt,
  }: {
    system_prompt: string;
    user_prompt: string;
  }) {
    const prompts = [
      new SystemMessage(system_prompt),
      new HumanMessage(user_prompt),
    ];
    const { content, usage_metadata } = await this.model.invoke(prompts);
    console.log("=".repeat(80));
    console.log("응답:");
    console.log(content);
    console.log("=".repeat(80));
    const { input_tokens, output_tokens } = usage_metadata!;

    console.log("입력 토큰 수:", input_tokens);
    console.log("출력 토큰 수:", output_tokens);

    const pricing =
      (input_tokens * 25) / 100000 / 1000 +
      (output_tokens * 125) / 100000 / 1000;
    const won = pricing * 1400;
    console.log(`\nLLM 요청 비용(dollar): ${pricing}`);
    console.log(`LLM 요청 비용(won): ${won}`);

    return content;
  }
}

export const haikuLLM = new HaikuLLM(
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ?? ""
);
