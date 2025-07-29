"use client";

import React, { useEffect, useState } from "react";
import { FileText, Briefcase, Linkedin, Copy, CheckCircle } from "lucide-react";

interface ResultsSectionProps {
  coverLetter: string;
  resumeTips: string;
  linkedinMessage: string;
  copyToClipboard: (text: string, type: string) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  coverLetter,
  resumeTips,
  linkedinMessage,
  copyToClipboard,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Your AI-Generated Content is Ready!
        </h2>
      </div>

      {/* Cover Letter */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Cover Letter
          </h3>
          <button
            onClick={() => copyToClipboard(coverLetter, "cover-letter")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 whitespace-pre-wrap">
          <p className="text-gray-700">
            {coverLetter ||
              "Your personalized cover letter will appear here after generation..."}
          </p>
        </div>
      </div>

      {/* Resume Tips */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-green-600" />
            Resume Optimization Tips
          </h3>
          <button
            onClick={() => copyToClipboard(resumeTips, "resume-tips")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 whitespace-pre-wrap">
          {resumeTips ? (
            typeof resumeTips === "string" ? (
              <p className="text-gray-700">{resumeTips}</p>
            ) : (
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {Object.entries(resumeTips).map(([key, value]) => (
                  <li key={key}>
                    <strong className="capitalize">{key}:</strong>{" "}
                    {typeof value === "string" || typeof value === "number"
                      ? value
                      : JSON.stringify(value)}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <p className="text-gray-500 italic">
              Your resume optimization tips will appear here after generation.
            </p>
          )}
        </div>
      </div>

      {/* LinkedIn Message */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Linkedin className="w-5 h-5 mr-2 text-blue-600" />
            LinkedIn Connection Message
          </h3>
          <button
            onClick={() => copyToClipboard(linkedinMessage, "linkedin-message")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 whitespace-pre-wrap">
          <p className="text-gray-700">
            {linkedinMessage ||
              "Your LinkedIn connection message will appear here after generation."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
