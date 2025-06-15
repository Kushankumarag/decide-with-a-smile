
export async function fetchDeepSeekRoast({
  prompt,
  apiKey
}: { prompt: string; apiKey: string }) {
  const url = "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-0528";
  const body = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 80,
      temperature: 0.95,
      top_p: 0.85,
      do_sample: true,
      return_full_text: false
    }
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API Error: ${res.status} ${res.statusText}\n${errText}`);
  }
  const data = await res.json();
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }
  throw new Error("No roast received from DeepSeek AI");
}
