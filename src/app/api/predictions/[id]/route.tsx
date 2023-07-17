import 'server-only'
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN!,
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN) {
    throw new Error(
      "The NEXT_PUBLIC_REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const prediction = await replicate.predictions.get(params.id);
  console.log(prediction);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 200 });
}