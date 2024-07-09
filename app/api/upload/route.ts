import { getRequestContext } from "@cloudflare/next-on-pages";
import { readFile } from "fs/promises";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const nanoid = customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 32);
    const fileName = `${nanoid()}.png`;
    const file = await fetch("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s");

    await getRequestContext().env.R2.put(fileName, await file.blob());

    return NextResponse.json({
        file: fileName
    });
}