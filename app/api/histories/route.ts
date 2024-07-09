import { NextResponse, type NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ?? 10;
    const offset = searchParams.get('offset') ?? 0;
  
    const db = getRequestContext().env.DB;

    const histories = await db.prepare("SELECT * FROM history LIMIT ?1 OFFSET ?2")
        .bind(limit, offset)
        .all();

    return NextResponse.json(histories.results);
}
