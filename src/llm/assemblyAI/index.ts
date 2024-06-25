import { AssemblyAI } from "assemblyai";

export class AssemblyAILLM {
  private client;
  private config: {
    audio: string | ArrayBuffer | Blob;
    speaker_labels: boolean;
  } = {
    audio: "",
    speaker_labels: true,
  };

  constructor(apiKey: string) {
    this.client = new AssemblyAI({
      apiKey,
    });
  }

  async transcribe(pathOrUrl: string | ArrayBuffer | Blob) {
    this.config.audio = pathOrUrl;
    const transcript = await this.client.transcripts.transcribe(this.config);
    console.log("=".repeat(50));
    console.log(transcript.text);
    console.log("=".repeat(50));

    return transcript.text;
  }
}

export const assemblyAILLM = new AssemblyAILLM(
  process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY ?? ""
);
