
import { pipeline, env } from "@huggingface/transformers";

// Always use the latest models from Hugging Face Hub, not browser cache
env.allowLocalModels = false;
env.useBrowserCache = false;

let generatorPromise: Promise<any> | null = null;

// We'll use distilGPT2 for compatibility and speed. It provides ONNX for browser.
// See model card: https://huggingface.co/Xenova/distilGPT2
export async function getTextGenerator() {
  if (!generatorPromise) {
    generatorPromise = pipeline(
      "text-generation",
      "Xenova/distilGPT2", // Small, ONNX-compatible, loads quickly in browser
      { device: "webgpu" }
    );
  }
  return generatorPromise;
}

// Given a prompt, returns generated text (keeps to about 80 tokens for speed and relevance)
export async function browserRoast(input: string): Promise<string> {
  const generator = await getTextGenerator();

  const result = await generator(
    `You're an internet comedian roasting people for fun. Craft a clever, light-hearted roast for: "${input}". Keep it under 3 sentences.`,
    {
      max_new_tokens: 80,
      temperature: 0.95,
      top_p: 0.85,
      do_sample: true,
      return_full_text: false,
    }
  );

  // Result is an array with { generated_text: ... }
  if (result && Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text.trim();
  }
  throw new Error("No roast generated locally.");
}

