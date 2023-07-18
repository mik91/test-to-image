"use client";

import Image from "next/image";
import { useState } from "react";

const sleep = (ms: number | undefined) => new Promise((r) => setTimeout(r, ms));

export interface IPredictionItem {
  id: string;
  status: string;
  output: string[];
  error: string;
}
interface FormElements extends HTMLFormControlsCollection {
  prompt: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  let [prediction, setPrediction] = useState<IPredictionItem>();
  let [error, setError] = useState<any[]>([]);

  async function handleSubmit(e: React.FormEvent<FormElement>) {
    console.log(e.currentTarget.elements.prompt.value);
    console.log("submit");
    e.preventDefault();
    const prompt = e.currentTarget.elements.prompt.value;

    const res = await getPrompt(prompt);

    let prediction = await res.json();
    if (res.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (prediction.status !== "succeeded" &&
      prediction.status !== "failed") {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-4xl">Text to image AI</h1>
      </header>
      <div>
        {/* <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com"/> */}
        <div>
          {error && <div>{error}</div>}

          {prediction && (
            <>
              {prediction.output && (
                <div className="image-wrapper mt-5">
                  <img
                    src={prediction.output[prediction.output.length - 1]}
                    alt="output"
                  />
                </div>
              )}
              <p className="py-3 text-sm opacity-50">
                status: {prediction.status}
              </p>
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </>
          )}
          <p>Status</p>
          {/* <div           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"></div> */}
        </div>
      </div>
      <div>
        <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
          <label htmlFor="Prompt">
            Enter a prompt to transform to an Image:
          </label>
          <input
            type="text"
            name="prompt"
            id="prompt"
            placeholder="Enter a prompt..."
          />
          <div className="flex gap-1 justify-end">
            <button
              type="reset"
              className="bg-slate-900 border border-slate-900 rounded px-7"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-slate-900 border border-slate-900 rounded px-7"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );

}
