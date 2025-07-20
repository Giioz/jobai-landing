import { NextRequest, NextResponse } from "next/server";
import JSON5 from "json5";


export async function POST(req: NextRequest) {
  const { resume, jobDescription, jobUrl, linkedinUrl } = await req.json();
  const MAX_CHARS = 4000;
  const safeResume =
    resume.length > MAX_CHARS ? resume.slice(0, MAX_CHARS) + "..." : resume;

  const safeJobDesc =
    jobDescription && jobDescription.length > MAX_CHARS
      ? jobDescription.slice(0, MAX_CHARS) + "..."
      : jobDescription;

      const prompt = `
      You are a job application assistant.
      
      Based on the resume and job information below, generate a JSON object with exactly these keys: "coverLetter", "resumeTips", and "linkedinMessage".
      
      Use a professional tone.
      
      Return only the JSON object.  
      All line breaks inside string values must be escaped as \\n.  
      Use double quotes for strings.  
      Do NOT include any explanation or extra text.
      
      Input:
      RESUME:
      ${safeResume}
      
      ${safeJobDesc ? `JOB DESCRIPTION:\n${safeJobDesc}` : `JOB POSTING URL:\n${jobUrl}`}
      
      LINKEDIN URL:
      ${linkedinUrl}
      `;
      

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Update in prod
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI job application assistant.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("Invalid AI response from OpenRouter:", data);
      return NextResponse.json(
        { success: false, error: "OpenRouter did not return choices." },
        { status: 500 }
      );
    }

    const rawContent = data.choices[0].message.content;

    // Try parsing AI response as JSON
    let parsedResult;
try {
  // Use JSON5 to parse more forgivingly
  parsedResult = JSON5.parse(rawContent);
} catch (e) {
  console.error("Failed to parse AI JSON:", e, rawContent);
  return NextResponse.json(
    { success: false, error: "AI response JSON parse error" },
    { status: 500 }
  );
}


    return NextResponse.json({
      success: true,
      result: parsedResult, // Return parsed JSON object here
    });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
