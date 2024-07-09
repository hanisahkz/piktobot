import { NextResponse, type NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prompt = searchParams.get('prompt');

  if (!prompt) {
    return new Response("No prompt provided", {
      status: 400,
    })
  }

  const response = await getRequestContext().env.AI.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    {
      prompt,
    }
  );

  return new Response(response, {
    headers: {
      "content-type": "image/png",
    },
  });
}


export async function POST(request: NextRequest) {
  const { prompt } = await request.json<{ prompt: string }>();

  const response = await getRequestContext().env.AI.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    {
      prompt,
    }
  ) as any as ReadableStream;

  console.log('response - ', JSON.stringify(await response.getReader().read()));

  const nanoid = customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 32);
  const fileName = `${nanoid()}.png`;
  // const fileBlob = new Blob([await response.getReader().read()], { type: "image/png" });
  // await getRequestContext().env.R2.put(fileName, fileBlob);

  return NextResponse.json({
    file: fileName,
    // fileBlob,
  });
}