import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get("file");

    if (!fileName) {
        return new Response("File not provided");
    }

    const file = await getRequestContext().env.R2.get(fileName!);

    if (!file) {
        return new Response("File not found");
    }

    return new Response(await file?.blob(), {
        status: 200
    })
}