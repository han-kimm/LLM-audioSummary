import { summarize } from ".";

export async function POST(request: Request) {
  const { systemPrompt, userPrompt, transcript } = await request.json();
  const summary = await summarize(systemPrompt, transcript + userPrompt);
  return new Response(JSON.stringify(summary));
}
