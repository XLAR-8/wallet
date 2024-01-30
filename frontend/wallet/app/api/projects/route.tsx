import { db } from "@/lib/db";
import { getToolList } from "@/lib/data";
import { NextResponse } from "next/server";

import * as z from "zod";

export async function GET(request: Request) {
    const tools = await getToolList()
    return NextResponse.json(tools);
}