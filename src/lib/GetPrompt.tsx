export async function getPrompt(prompt: string) {
  return await fetch("/api/predictions/stability", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
}
