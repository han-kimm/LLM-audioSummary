import { transcribe } from ".";

export async function POST(request: Request) {
  const body = await request.formData();
  alert(body);
  const audio = body.get("audio") as File;
  alert(audio);
  const result = await transcribe(audio);
  return new Response(result);
}
