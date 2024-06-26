import { transcribe } from ".";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const audio = body.get("audio") as File;
    const result = await transcribe(audio);
    return new Response(result);
  } catch (e: any) {
    console.error(e);
    return new Response(e.message);
  }
}
