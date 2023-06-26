import openai from "../config/openai.ts";

import { ChatCompletionRequest } from "../types.ts";

async function createChatCompletion({
  messages,
  maxTokens = 500,
  userId,
}: ChatCompletionRequest) {
  const res = await openai.createChatCompletion({
    messages,
    model: "gpt-3.5-turbo",
    max_tokens: maxTokens,
    temperature: 0,
    user: userId,

    n: 1,
  });

  const data = await res.json();
  console.log(data);
  return data.choices[0].message as {
    content: string;
    role: string;
  };
}

export default createChatCompletion;
