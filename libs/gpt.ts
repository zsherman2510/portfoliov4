import axios from "axios";
import { generateBusinessAnalysisPrompt } from "./prompts";

// Define the types for the OpenAI request parameters
interface OpenAiRequestParams {
  data: any;
  promptType?: "userStories" | "businessAnalysis";
}

// Function to send a request to OpenAI
export const sendOpenAi = async ({
  data,
  promptType = "businessAnalysis",
}: OpenAiRequestParams): Promise<string | null> => {
  const url = "https://api.openai.com/v1/chat/completions";

  let prompt;

  console.log("Prompt Type: ", promptType);
  switch (promptType) {
    case "businessAnalysis":
      prompt = generateBusinessAnalysisPrompt(data);
      break;
    default:
      throw new Error("Invalid promptType");
  }

  const body = JSON.stringify({
    model: "gpt-4o", // Correct model name for GPT-4o
    messages: [{ role: "user", content: prompt }],
    max_tokens: 4096,
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(url, body, options);
    const answer = res.data.choices[0].message.content;

    return answer;
  } catch (e: any) {
    console.error("GPT Error: " + e);
    console.error("GPT Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
};
