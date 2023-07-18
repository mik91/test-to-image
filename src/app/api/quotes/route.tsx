import { NextResponse } from "next/server";

export async function GET() {
    // API = https://api.quotable.io

    const res = await fetch("https://api.quotable.io/quotes/random");
    const quote = await res.json();

    return NextResponse.json(quote, { status: 200 });
}