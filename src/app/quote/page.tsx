"use client";
import { useState } from "react";

// Quote of the day page
// Quote content
export interface IQuoteItem {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export default function Home() {
  let [quote, setQuote] = useState<IQuoteItem>();
  let [error, setError] = useState<any[]>([]);

  async function getQuote() {
    const quote = await fetch("/api/quotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const quoteJson = await quote.json();
    console.log(quoteJson);
    if (quote.status !== 200) {
      setError(quoteJson.detail);
      return;
    }
    setQuote(quoteJson[0]);
    console.log(quote);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Quote of the day</h1>
      <button onClick={getQuote}>Get quote</button>
      <p>{quote?.content}</p>
      <p>{quote?.author}</p>
      <p>{quote?.tags}</p>
      <p>{error}</p>
    </main>
  );
}
