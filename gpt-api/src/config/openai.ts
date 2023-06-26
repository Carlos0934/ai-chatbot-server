import { OpenAIApi } from "openai";
import { Configuration } from "openai";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
if (!OPENAI_API_KEY) {
  throw new Error("API_KEY is not defined");
}

const config = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
