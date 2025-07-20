import React from "react";
import { Briefcase, Crown, Zap } from "lucide-react";

interface DashboardHeaderProps {
  userPlan: {
    type: "free" | "pro";
    applicationsUsed: number;
    applicationsLimit: number;
    resetDate: string;
  };
  remainingApplications: number;
  isLimitReached: boolean;
  handleCreateNew: () => void;
  handleUpgrade: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userPlan,
  remainingApplications,
  isLimitReached,
  handleCreateNew,
  handleUpgrade,
}) => (
  <div className="mb-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-blue-600" />
          Job Applications
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your AI-generated job applications
        </p>
      </div>
      <button
        onClick={handleCreateNew}
        disabled={isLimitReached && userPlan.type === "free"}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
          isLimitReached && userPlan.type === "free"
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        + New Application
      </button>
    </div>
    <div className="mt-4">
      <div
        className={`p-4 rounded-lg border ${
          userPlan.type === "pro"
            ? "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {userPlan.type === "pro" ? (
              <Crown className="h-6 w-6 text-purple-600" />
            ) : (
              <Zap className="h-6 w-6 text-blue-600" />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {userPlan.type === "pro" ? "Pro Plan" : "Free Plan"}
              </h3>
              <p className="text-sm text-gray-600">
                {userPlan.type === "pro"
                  ? "Unlimited applications"
                  : `${remainingApplications} of ${userPlan.applicationsLimit} applications remaining`}
              </p>
            </div>
          </div>
          {userPlan.type === "free" && (
            <div className="text-right">
              <button
                onClick={handleUpgrade}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Upgrade to Pro
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Resets{" "}
                {new Date(userPlan.resetDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
        {userPlan.type === "free" && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (userPlan.applicationsUsed / userPlan.applicationsLimit) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default DashboardHeader;
