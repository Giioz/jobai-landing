"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SuggestionSection {
  title: string;
  suggestions: string[];
}

const suggestionsData: SuggestionSection[] = [
  {
    title: "📌 Summary Section",
    suggestions: [
      "Make your summary more results-driven by mentioning specific achievements.",
      "Add keywords relevant to the job like “cross-functional leadership” and “agile development”.",
    ],
  },
  {
    title: "💼 Work Experience",
    suggestions: [
      "Quantify your achievements (e.g., “Increased conversion rate by 25%”).",
      "Tailor bullet points to the job requirements.",
    ],
  },
  {
    title: "🎓 Education",
    suggestions: [
      "Highlight any coursework relevant to the role.",
      "Consider adding GPA if it’s strong (e.g., 3.8+).",
    ],
  },
  {
    title: "🛠 Skills",
    suggestions: [
      "Add specific tools mentioned in job description: “PostgreSQL,” “Docker,” “TypeScript”.",
      "Remove generic terms like “hardworking,” “team player” unless backed by examples.",
    ],
  },
];

export default function ResumeImprovements() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-md"
    >
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Resume Improvement Suggestions
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Detailed, actionable tips tailored to boost your resume’s impact and
          relevance.
        </p>
      </header>

      <div className="space-y-6">
        {suggestionsData.map((section, index) => (
          <article
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              aria-expanded={openIndex === index}
            >
              <span className="text-lg font-medium text-gray-900">
                {section.title}
              </span>
              <span className="ml-4 text-blue-600">
                {openIndex === index ? (
                  <ChevronDown className="w-6 h-6" />
                ) : (
                  <ChevronRight className="w-6 h-6" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <ul className="px-8 pb-6 space-y-3 text-gray-700 text-base leading-relaxed list-disc">
                {section.suggestions.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </motion.section>
  );
}
