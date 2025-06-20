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

// Promise helper for timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Roast took too long. Please try again!")), ms)
    ),
  ]);
}

// Given a prompt, returns generated text (keeps to about 48 tokens for speed and relevance)
export async function browserRoast(input: string): Promise<string> {
  const generator = await getTextGenerator();

  const result = await withTimeout(
    generator(
      // Prompt as if a dad is roasting you, keep it gentle and classic "dad joke" style
      `You're a lovable, witty dad. Roast your kid in a way only a dad would: lovable, pun-filled, and gently embarrassing. Here's what your kid did: "${input}". Give a light-hearted dad-style roast, maximum 2 sentences.`,
      {
        max_new_tokens: 48, // Shorter output for speed
        temperature: 0.95,
        top_p: 0.85,
        do_sample: true,
        return_full_text: false,
      }
    ),
    9000 // 9 seconds timeout
  );

  // Result is an array with { generated_text: ... }
  if (result && Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text.trim();
  }
  throw new Error("No roast generated locally.");
}
