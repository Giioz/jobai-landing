"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  Linkedin,
  Briefcase,
  Loader2,
  Copy,
  CheckCircle,
} from "lucide-react";
import { log } from "console";
import ResultsSection from "./components/ResultsSection";

interface FormData {
  resumeFile: File | null;
  linkedinUrl: string;
  jobDescription: string;
  jobUrl: string;
}

interface Errors {
  resumeFile?: string;
  jobDescription?: string;
  jobUrl?: string;
}

export default function AIJobApplicationGenerator() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    resumeFile: null,
    linkedinUrl: "",
    jobDescription: "",
    jobUrl: "",
  });

  const [inputType, setInputType] = useState<"text" | "url">("text"); // 'text' or 'url' for job description
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  // Add state for shake effect
  const [shake, setShake] = useState<{ desc: boolean; url: boolean }>({
    desc: false,
    url: false,
  });

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resumeFile: "Only PDF or DOC/DOCX files are allowed",
        }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          resumeFile: "File size must be under 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFile: file }));
      setErrors((prev) => ({ ...prev, resumeFile: undefined }));
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== "linkedinUrl" && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Shake effect if max length reached
    if (field === "jobDescription" && value.length === 500) {
      setShake((prev) => ({ ...prev, desc: true }));
      setTimeout(() => setShake((prev) => ({ ...prev, desc: false })), 500);
    }
    if (field === "jobUrl" && value.length === 500) {
      setShake((prev) => ({ ...prev, url: true }));
      setTimeout(() => setShake((prev) => ({ ...prev, url: false })), 500);
    }
  };

  const minJobLength = 20;
  const maxJobLength = 4000;

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.resumeFile) {
      newErrors.resumeFile = "Please upload your resume";
    }
    if (inputType === "text") {
      const len = formData.jobDescription.trim().length;
      if (!formData.jobDescription.trim()) {
        newErrors.jobDescription = "Job description is required";
      } else if (len < minJobLength) {
        newErrors.jobDescription =
          "Please provide more details in the job description (at least 100 characters)";
      } else if (len > maxJobLength) {
        newErrors.jobDescription =
          "Job description too long. Please shorten it under 4000 characters.";
      }
    } else if (inputType === "url") {
      const len = formData.jobUrl.trim().length;
      if (!formData.jobUrl.trim()) {
        newErrors.jobUrl = "Job posting URL is required";
      } else if (len > maxJobLength) {
        newErrors.jobUrl =
          "Job posting URL too long. Please shorten it under 4000 characters.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // const resumeText = await formData.resumeFile?.text();

      // const payload = {
      //   resume: resumeText,
      //   jobDescription: inputType === "text" ? formData.jobDescription : "",
      //   jobUrl: inputType === "url" ? formData.jobUrl : "",
      //   linkedinUrl: formData.linkedinUrl,
      // };

      // const res = await fetch("/api/generate", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      const form = new FormData();
      form.append("resume", formData.resumeFile!);
      form.append("linkedinUrl", formData.linkedinUrl);
      form.append(
        "jobDescription",
        inputType === "text" ? formData.jobDescription : ""
      );
      form.append("jobUrl", inputType === "url" ? formData.jobUrl : "");

      const res = await fetch("/api/generate", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("ai-result", JSON.stringify(data.result));
        router.push("generator/results");
      } else {
        alert("AI generation failed. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen bg-gradient-to-br bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your resume and job details to generate personalized
              application materials powered by AI
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-8">
              {/* Resume Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Resume Upload *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      errors.resumeFile
                        ? "border-red-300 bg-red-50"
                        : formData.resumeFile
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      {formData.resumeFile ? (
                        <>
                          <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-sm font-medium text-green-700">
                            {formData.resumeFile.name}
                          </p>
                          <p className="text-xs text-green-600">
                            Click to change file
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">
                            Click to upload your resume
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, or DOCX files only
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                {errors.resumeFile && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.resumeFile}
                  </p>
                )}
              </div>

              {/* LinkedIn Profile URL */}
              <div>
                <label
                  htmlFor="linkedin-url"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  LinkedIn Profile URL *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </div>
                  <input
                    type="url"
                    id="linkedin-url"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={`block w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-gray-300 hover:border-gray-400`}
                  />
                </div>
              </div>

              {/* Job Description Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Job Information *
                </label>

                {/* Toggle Buttons */}
                <div className="flex rounded-lg bg-gray-100 p-1 mb-4 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setInputType("text")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      inputType === "text"
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Paste Text
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputType("url")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      inputType === "url"
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Job URL
                  </button>
                </div>

                {/* Conditional Input */}
                {inputType === "text" ? (
                  <div className="relative">
                    <textarea
                      value={formData.jobDescription}
                      onChange={(e) =>
                        handleInputChange("jobDescription", e.target.value)
                      }
                      placeholder="Paste the job description here, including requirements, responsibilities, and company information..."
                      rows={8}
                      minLength={100}
                      maxLength={4000}
                      className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                        errors.jobDescription
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      } ${shake.desc ? "animate-shake border-red-500" : ""}`}
                    />
                    <span
                      className={`absolute right-3 bottom-3 text-xs font-medium ${
                        formData.jobDescription.length >= 4000
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.jobDescription.length}/4000
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.jobUrl}
                      onChange={(e) =>
                        handleInputChange("jobUrl", e.target.value)
                      }
                      placeholder="https://company.com/careers/job-posting"
                      className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-gray-300 hover:border-gray-400`}
                    />
                  </div>
                )}

                {(errors.jobDescription || errors.jobUrl) && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 text-red-500 mr-1">⚠</span>
                    {errors.jobDescription || errors.jobUrl}
                  </p>
                )}
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin mr-3" />
                      Generating AI Content...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="text-lg">✨</span>
                      <span className="ml-2 text-lg">Generate AI Content</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Analyzing Your Application
                </h3>
                <p className="text-gray-600">
                  Our AI is crafting personalized content based on your resume
                  and job details...
                </p>
                <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
