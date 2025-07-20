import React from "react";
import { Briefcase } from "lucide-react";

interface EmptyStateProps {
  selectedStatus: string;
  handleCreateNew: () => void;
  isLimitReached: boolean;
  userPlan: { type: "free" | "pro" };
  applications: any[];
}

const EmptyState: React.FC<EmptyStateProps> = ({
  selectedStatus,
  handleCreateNew,
  isLimitReached,
  userPlan,
  applications,
}) => (
  <div className="text-center py-12">
    <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {selectedStatus === "all"
        ? "No applications yet"
        : `No ${selectedStatus} applications`}
    </h3>
    <p className="text-gray-600 mb-6">
      {selectedStatus === "all"
        ? "Get started by creating your first AI-generated job application"
        : `You don't have any applications with ${selectedStatus} status`}
    </p>
    {selectedStatus === "all" && (
      <button
        onClick={handleCreateNew}
        disabled={isLimitReached && userPlan.type === "free"}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
          isLimitReached && userPlan.type === "free"
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Create Your First Application
      </button>
    )}
  </div>
);

export default EmptyState;
