import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Replicate from "replicate";

console.log("dada", process.env.REPLICATE_API_TOKEN);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});


export async function POST(req: Request) {
  const res = await req.json()

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  console.log("oooo", req);
  console.log("body", res.prompt);

  const prediction = await replicate.predictions.create({
    version: "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    input: { prompt: res.prompt },
  });

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
}