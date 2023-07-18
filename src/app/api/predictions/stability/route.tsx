import 'server-only'
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN!,
});


export async function POST(req: Request) {
  const res = await req.json()

  if (!process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  console.log("oooo", req);
  console.log("body", res.prompt);

  const prediction = await replicate.predictions.create({
    version: "ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
    input: { prompt: res.prompt },
  });

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
}