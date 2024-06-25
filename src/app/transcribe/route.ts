import { transcribe } from ".";

export async function POST(request: Request) {
  const body = await request.formData();
  const audio = body.get("audio") as File;
  const result = await transcribe(audio);
  return new Response(result);
}
