"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "./components/DashboardHeader";
import StatusFilters from "./components/StatusFilters";
import ApplicationsGrid from "./components/ApplicationsGrid";
import Pagination from "./components/Pagination";
import EmptyState from "./components/EmptyState";
import ApplicationModal from "./components/ApplicationModal";

import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar,
  X,
  CheckCircle,
  AlertTriangle,
  FileText,
  Sparkles,
  StickyNote,
  Loader,
  Save,
  Edit3,
  Trash2,
  Eye,
  Zap,
} from "lucide-react";

// Types
interface JobApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  dateCreated: string;
  status: "Draft" | "Submitted" | "Interview" | "Rejected" | "Hired";
  aiContent: {
    coverLetter: string;
    resumeHighlights: string;
    linkedinMessage: string;
  };
  notes: string;
}

interface UserPlan {
  type: "free" | "pro";
  applicationsUsed: number;
  applicationsLimit: number;
  resetDate: string;
}

// Dummy data
const dummyApplications: JobApplication[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    companyName: "TechCorp Inc.",
    dateCreated: "2024-07-18",
    status: "Interview",
    aiContent: {
      coverLetter: `Dear Hiring Manager,

I am excited to apply for the Senior Frontend Developer position at TechCorp Inc. With over 5 years of experience in React, TypeScript, and modern web technologies, I believe I would be a valuable addition to your team.

My expertise includes building scalable web applications, implementing responsive designs, and optimizing performance. At my current role, I led a team that increased user engagement by 40% through innovative UI/UX improvements.

I'm particularly drawn to TechCorp's commitment to cutting-edge technology and would love to contribute to your continued success.

Best regards,
[Your Name]`,
      resumeHighlights: `• 5+ years of Frontend Development experience
• Expert in React, TypeScript, Next.js, and Tailwind CSS
• Led development of 3 major web applications serving 100K+ users
• Improved application performance by 60% through code optimization
• Experience with agile methodologies and cross-functional collaboration
• Strong problem-solving skills and attention to detail`,
      linkedinMessage: `Hi [Name], I noticed you're hiring for a Senior Frontend Developer at TechCorp Inc. I'm very interested in this opportunity and believe my 5+ years of React/TypeScript experience would be a great fit. Would love to discuss how I can contribute to your team's success. Thanks!`,
    },
    notes:
      "Applied through company website. Follow up scheduled for next week. HR mentioned they are looking for someone with strong React skills.",
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    companyName: "StartupXYZ",
    dateCreated: "2024-07-17",
    status: "Submitted",
    aiContent: {
      coverLetter: `Dear StartupXYZ Team,

I am writing to express my strong interest in the Product Manager position. With 4 years of product management experience and a proven track record of launching successful products, I am excited about the opportunity to drive innovation at StartupXYZ.

In my previous role, I managed the product roadmap for a SaaS platform that grew from 10K to 100K users. I excel at translating user needs into actionable product features and working closely with engineering and design teams.

Your mission to revolutionize the industry aligns perfectly with my passion for creating products that make a real impact.

Looking forward to discussing this opportunity further.

Best regards,
[Your Name]`,
      resumeHighlights: `• 4+ years of Product Management experience
• Successfully launched 8 product features with 90%+ user adoption
• Managed cross-functional teams of 15+ engineers and designers
• Expert in user research, data analysis, and product strategy
• Experience with Agile/Scrum methodologies
• Strong analytical and communication skills`,
      linkedinMessage: `Hello [Name], I'm very interested in the Product Manager role at StartupXYZ. My experience launching successful products and managing cross-functional teams aligns well with your needs. I'd love to learn more about your product vision. Are you available for a brief chat?`,
    },
    notes:
      "Reached out to current PM on LinkedIn. Company is growing fast and looking for someone to own the mobile product line.",
  },
  {
    id: "3",
    jobTitle: "Full Stack Engineer",
    companyName: "DevSolutions Ltd",
    dateCreated: "2024-07-16",
    status: "Draft",
    aiContent: {
      coverLetter: `Dear DevSolutions Ltd Hiring Team,

I am excited to apply for the Full Stack Engineer position. As a versatile developer with experience in both frontend and backend technologies, I am confident I can contribute to your development team's success.

My technical expertise spans React, Node.js, Python, and cloud technologies. I have successfully built and deployed multiple full-stack applications, from conception to production.

I'm particularly interested in DevSolutions' focus on innovative web solutions and would welcome the opportunity to bring my skills to your team.

Thank you for your consideration.

Best regards,
[Your Name]`,
      resumeHighlights: `• 3+ years of Full Stack Development experience
• Proficient in React, Node.js, Python, and PostgreSQL
• Built and deployed 5+ full-stack applications
• Experience with AWS, Docker, and CI/CD pipelines
• Strong understanding of software architecture and design patterns
• Excellent problem-solving and debugging skills`,
      linkedinMessage: `Hi [Name], I'm interested in the Full Stack Engineer position at DevSolutions Ltd. My experience with modern web technologies and full-stack development would be valuable for your team. Would you be open to a conversation about this role?`,
    },
    notes:
      "Still working on tailoring the application. Need to research their tech stack more thoroughly.",
  },
  {
    id: "4",
    jobTitle: "UX Designer",
    companyName: "DesignPro Agency",
    dateCreated: "2024-07-15",
    status: "Rejected",
    aiContent: {
      coverLetter: "Sample cover letter content...",
      resumeHighlights: "Sample resume highlights...",
      linkedinMessage: "Sample LinkedIn message...",
    },
    notes: "Application was rejected. They went with an internal candidate.",
  },
  {
    id: "5",
    jobTitle: "Data Scientist",
    companyName: "AI Innovations",
    dateCreated: "2024-07-14",
    status: "Hired",
    aiContent: {
      coverLetter: "Sample cover letter content...",
      resumeHighlights: "Sample resume highlights...",
      linkedinMessage: "Sample LinkedIn message...",
    },
    notes: "Got the job! Starting next month.",
  },
  {
    id: "6",
    jobTitle: "Backend Developer",
    companyName: "CloudTech Solutions",
    dateCreated: "2024-07-13",
    status: "Submitted",
    aiContent: {
      coverLetter: "Sample cover letter content...",
      resumeHighlights: "Sample resume highlights...",
      linkedinMessage: "Sample LinkedIn message...",
    },
    notes: "Waiting to hear back from them.",
  },
];

const userPlan: UserPlan = {
  type: "free",
  applicationsUsed: 4,
  applicationsLimit: 5,
  resetDate: "2024-07-27",
};

const JobApplicationDashboard: React.FC = () => {
  const [applications, setApplications] =
    useState<JobApplication[]>(dummyApplications);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "ai-content" | "notes"
  >("details");

  // Edit form state
  const [editForm, setEditForm] = useState<JobApplication | null>(null);

  // AI Content Generator Modal state
  const [aiModalOpen, setAIModalOpen] = useState(false);
  const [aiGenerationsUsed, setAIGenerationsUsed] = useState(0);

  // Filter applications based on status
  const filteredApplications = useMemo(() => {
    if (selectedStatus === "all") return applications;
    return applications.filter(
      (app) => app.status.toLowerCase() === selectedStatus
    );
  }, [applications, selectedStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Status styling
  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      Draft: "bg-gray-100 text-gray-700 border-gray-200",
      Submitted: "bg-blue-100 text-blue-700 border-blue-200",
      Interview: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Rejected: "bg-red-100 text-red-700 border-red-200",
      Hired: "bg-green-100 text-green-700 border-green-200",
    };
    return styles[status] || "";
  };

  // Action handlers
  const handleEdit = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (app) {
      setSelectedApplication(app);
      setEditForm({ ...app });
      setModalMode("edit");
      setModalOpen(true);
      setActiveTab("details");
    }
  };

  const handleDelete = (id: string) => {
    setApplications((apps) => apps.filter((app) => app.id !== id));
  };

  const handleView = (id: string) => {
    const app = applications.find((a) => a.id === id);
    if (app) {
      setSelectedApplication(app);
      setModalMode("view");
      setModalOpen(true);
      setActiveTab("details");
    }
  };

  // Replace handleCreateNew to open the AI modal
  const handleCreateNew = () => {
    setAIModalOpen(true);
  };

  const handleUpgrade = () => {
    console.log("Upgrade to Pro");
  };

  // Modal handlers
  const closeModal = () => {
    setModalOpen(false);
    setSelectedApplication(null);
    setEditForm(null);
    setSaveStatus("idle");
    setShowDeleteConfirm(false);
    setActiveTab("details");
  };

  const switchToEditMode = () => {
    if (selectedApplication) {
      setEditForm({ ...selectedApplication });
      setModalMode("edit");
    }
  };

  const handleSave = async () => {
    if (!editForm) return;

    setIsLoading(true);
    setSaveStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update applications state
      setApplications((apps) =>
        apps.map((app) => (app.id === editForm.id ? editForm : app))
      );

      setSelectedApplication(editForm);
      setSaveStatus("success");
      setModalMode("view");

      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (selectedApplication) {
      setEditForm({ ...selectedApplication });
      setModalMode("view");
    }
  };

  const handleDeleteFromModal = async () => {
    if (!selectedApplication) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setApplications((apps) =>
        apps.filter((app) => app.id !== selectedApplication.id)
      );
      closeModal();
    } catch (error) {
      setSaveStatus("error");
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const regenerateAIContent = async (
    contentType: "coverLetter" | "resumeHighlights" | "linkedinMessage"
  ) => {
    if (!editForm) return;

    setIsLoading(true);

    try {
      // Simulate AI regeneration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newContent =
        `[Regenerated ${contentType}] ` + editForm.aiContent[contentType];

      setEditForm({
        ...editForm,
        aiContent: {
          ...editForm.aiContent,
          [contentType]: newContent,
        },
      });
    } catch (error) {
      setSaveStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock AI generation handler
  const handleAIGenerate = async (inputs: any) => {
    // Simulate API call delay
    await new Promise((res) => setTimeout(res, 1200));
    setAIGenerationsUsed((u) => u + 1);
    // Return mock AI content
    return {
      coverLetter: inputs.contentTypes.coverLetter
        ? `AI Cover Letter for ${inputs.jobTitle} at ${inputs.companyName}`
        : undefined,
      resumeHighlights: inputs.contentTypes.resumeHighlights
        ? `AI Resume Highlights for ${inputs.jobTitle}`
        : undefined,
      linkedinMessage: inputs.contentTypes.linkedinMessage
        ? `AI LinkedIn Message for ${inputs.companyName}`
        : undefined,
    };
  };

  // Business logic helpers
  const getAllowedStatusTransitions = (
    currentStatus: JobApplication["status"]
  ): JobApplication["status"][] => {
    const transitions: Record<
      JobApplication["status"],
      JobApplication["status"][]
    > = {
      Draft: ["Draft", "Submitted"],
      Submitted: ["Submitted", "Interview", "Rejected"],
      Interview: ["Interview", "Hired", "Rejected"],
      Rejected: ["Rejected"],
      Hired: ["Hired"],
    };
    return transitions[currentStatus] || [];
  };

  const canEditAIContent = () => {
    return (
      userPlan.type === "pro" ||
      userPlan.applicationsUsed < userPlan.applicationsLimit
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const remainingApplications =
    userPlan.applicationsLimit - userPlan.applicationsUsed;
  const isLimitReached = remainingApplications <= 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader
            userPlan={userPlan}
            remainingApplications={remainingApplications}
            isLimitReached={isLimitReached}
            handleCreateNew={handleCreateNew}
            handleUpgrade={handleUpgrade}
          />
          <StatusFilters
            selectedStatus={selectedStatus}
            setSelectedStatus={(status) => {
              setSelectedStatus(status);
              setCurrentPage(1);
            }}
            applications={applications}
          />
          <ApplicationsGrid
            paginatedApplications={paginatedApplications}
            getStatusStyle={getStatusStyle}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          {filteredApplications.length === 0 && (
            <EmptyState
              selectedStatus={selectedStatus}
              handleCreateNew={handleCreateNew}
              isLimitReached={isLimitReached}
              userPlan={userPlan}
              applications={applications}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <ApplicationModal
            modalOpen={modalOpen}
            selectedApplication={selectedApplication}
            modalMode={modalMode}
            editForm={editForm}
            isLoading={isLoading}
            saveStatus={saveStatus}
            showDeleteConfirm={showDeleteConfirm}
            activeTab={activeTab}
            closeModal={closeModal}
            switchToEditMode={switchToEditMode}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleDeleteFromModal={handleDeleteFromModal}
            regenerateAIContent={regenerateAIContent}
            setActiveTab={setActiveTab}
            setEditForm={setEditForm}
            setShowDeleteConfirm={setShowDeleteConfirm}
            canEditAIContent={canEditAIContent}
            getStatusStyle={getStatusStyle}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default JobApplicationDashboard;
