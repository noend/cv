import { OpenRouterOptions } from "../types/index";

/**
 * Calls the OpenRouter API and returns exactly one answer.
 * @param options { systemInput, data, creativity }
 * @returns The answer string from the model
 */
export async function getOpenRouterAnswer({
  systemInput,
  data,
  creativity = 0.2
}: OpenRouterOptions): Promise<string> {
  const apiKey = process.env.OPENROUTER_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4.1-nano";
  if (!apiKey) throw new Error("OPENROUTER_KEY is not set in environment");

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemInput },
          { role: "user", content: data }
        ],
        max_tokens: 512,
        temperature: creativity,
        n: 1
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const result = await response.json();
  // Return exactly one answer
  return result.choices?.[0]?.message?.content?.trim() || "";
}
