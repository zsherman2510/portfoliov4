import { NextResponse, NextRequest } from "next/server";
import { sendOpenAi } from "@/libs/gpt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    try {
      const openAiResponse = await sendOpenAi({
        data: body.url,
        promptType: "businessAnalysis",
      });

      if (!openAiResponse) {
        return NextResponse.json(
          { error: "Error with OpenAI response" },
          { status: 500 }
        );
      }

      const jsonResponse = JSON.parse(openAiResponse);
      console.log("OpenAI Response:", jsonResponse);

      return NextResponse.json({ insights: jsonResponse });
    } catch (error) {
      console.error("Error scraping website:", error);
      return NextResponse.json(
        { error: "Failed to scrape website" },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("Error in POST handler:", e);
    return NextResponse.json(
      { error: e?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
