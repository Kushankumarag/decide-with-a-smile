
import { useLocalStorage } from "./useLocalStorage";

export function useHuggingFaceApiKey() {
  const [apiKey, setApiKey] = useLocalStorage<string | null>("huggingface_api_key", null);

  return { apiKey, setApiKey };
}
