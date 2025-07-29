// import { NextRequest, NextResponse } from "next/server";
// import { load } from "cheerio";

// async function scrapeJobText(url: string, maxChars = 6000): Promise<string> {
//   try {
//     const res = await fetch(url, { cache: "no-store" });
//     if (!res.ok) return "";
//     const html = await res.text();
//     const $ = load(html);
//     $("script, style, noscript").remove();
//     const text = $("body").text().replace(/\s+/g, " ").trim();
//     return text.slice(0, maxChars);
//   } catch (err) {
//     console.error("Job scrape failed:", err);
//     return "";
//   }
// }

// export async function POST(req: NextRequest) {
//   const { resume, jobDescription, jobUrl, linkedinUrl } = await req.json();
//   const MAX_CHARS = 4000;
//   const safeResume = (resume ?? "").slice(0, MAX_CHARS);

//   let jobText = jobDescription;
//   if (!jobDescription && jobUrl) {
//     jobText = await scrapeJobText(jobUrl);
//   }
//   if (!jobText) jobText = "(Job description not available)";
//   console.log(safeResume, "REZIUMIIIIIIIIIIII");
  
//   const userPrompt = `You are a job application assistant.
// Generate only valid JSON with three keys: coverLetter, resumeTips, linkedinMessage.
// Do not include any markdown or extra text. Use the user's resume, job description, and LinkedIn profile.
// instead of [your name] format use fullname from resume
// RESUME:
// ${safeResume}

// JOB DESCRIPTION:
// ${jobText.slice(0, MAX_CHARS)}

// LINKEDIN: ${linkedinUrl || "(none provided)"}
// `;

//   try {
//     const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "https://yourdomain.com", // optional
//         "X-Title": "Job App Generator", // optional
//       },
//       body: JSON.stringify({
//         model: "tngtech/deepseek-r1t2-chimera:free",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You generate highly specific job-application content. Never use placeholders like [Your Name]. Always return valid JSON with keys: coverLetter, resumeTips, linkedinMessage. No markdown or extra commentary.",
//           },
//           { role: "user", content: userPrompt },
//         ],
//         temperature: 0.7,
//         max_tokens: 1500,
//       }),
//     });

//     const data = await aiRes.json();
//     const raw = data?.choices?.[0]?.message?.content?.trim();

//     if (!raw) {
//       throw new Error("No content from AI");
//     }

//     // Clean up and parse
//     const jsonStart = raw.indexOf("{");
//     const jsonEnd = raw.lastIndexOf("}");
//     if (jsonStart === -1 || jsonEnd === -1) throw new Error("No valid JSON braces");
//     const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));

//     const required = ["coverLetter", "resumeTips", "linkedinMessage"];
//     const missing = required.filter((key) => !(key in parsed));
//     if (missing.length > 0) {
//       throw new Error("Missing keys: " + missing.join(", "));
//     }

//     return NextResponse.json({ success: true, result: parsed });
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
//@ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse.js";


async function scrapeJobText(url: string, maxChars = 6000): Promise<string> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return "";
    const html = await res.text();
    const $ = load(html);
    $("script, style, noscript").remove();
    const text = $("body").text().replace(/\s+/g, " ").trim();
    return text.slice(0, maxChars);
  } catch (err) {
    console.error("Job scrape failed:", err);
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription")?.toString() || "";
    const jobUrl = formData.get("jobUrl")?.toString() || "";
    const linkedinUrl = formData.get("linkedinUrl")?.toString() || "";
    const MAX_CHARS = 4000;

    if (!file) {
      return NextResponse.json({ success: false, error: "Resume file missing" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let safeResume = "";

    try {
      const parsed = await pdfParse(buffer); // Only handles PDF
      safeResume = parsed.text.slice(0, MAX_CHARS);
    } catch (err) {
      console.error("PDF parsing error:", err);
      return NextResponse.json({ success: false, error: "Resume parsing failed" }, { status: 500 });
    }

    let jobText = jobDescription;
    if (!jobText && jobUrl) {
      jobText = await scrapeJobText(jobUrl);
    }
    if (!jobText) jobText = "(Job description not available)";

    const userPrompt = `You are a job application assistant.
Generate only valid JSON with three keys: coverLetter, resumeTips, linkedinMessage.
Do not include any markdown or extra text. Use the user's resume, job description, and LinkedIn profile.
Instead of [your name], use the full name from the resume.
RESUME:
${safeResume}

JOB DESCRIPTION:
${jobText.slice(0, MAX_CHARS)}

LINKEDIN: ${linkedinUrl || "(none provided)"}
`;

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourdomain.com", // optional
        "X-Title": "Job App Generator", // optional
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
          {
            role: "system",
            content:
              "You generate highly specific job-application content. Never use placeholders like [Your Name]. Always return valid JSON with keys: coverLetter, resumeTips, linkedinMessage. No markdown or extra commentary.",
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await aiRes.json();
    const raw = data?.choices?.[0]?.message?.content?.trim();

    if (!raw) {
      throw new Error("No content from AI");
    }

    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No valid JSON braces");

    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));

    const required = ["coverLetter", "resumeTips", "linkedinMessage"];
    const missing = required.filter((key) => !(key in parsed));
    if (missing.length > 0) {
      throw new Error("Missing keys: " + missing.join(", "));
    }

    return NextResponse.json({ success: true, result: parsed });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
