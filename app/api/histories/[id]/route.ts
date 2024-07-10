import { NextResponse, type NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    const db = getRequestContext().env.DB; 
    const history = await db.prepare('SELECT * FROM history WHERE id = ?1')
        .bind(id)
        .first();

    const promptId = history?.image as string;
    const response = await getRequestContext().env.R2.get(promptId)

    if (response === null) {
        return new Response('Object Not Found', { status: 404 });
    }

    return new Response(response.body, {
        headers: {
          "content-type": "image/png",
        },
      });
    
}
