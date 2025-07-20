import React from "react";

interface StatusFiltersProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  applications: any[];
}

const statuses = [
  "all",
  "draft",
  "submitted",
  "interview",
  "rejected",
  "hired",
];

const StatusFilters: React.FC<StatusFiltersProps> = ({
  selectedStatus,
  setSelectedStatus,
  applications,
}) => (
  <div className="mb-6">
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setSelectedStatus(status)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
            selectedStatus === status
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {status} (
          {status === "all"
            ? applications.length
            : applications.filter((app) => app.status.toLowerCase() === status)
                .length}
          )
        </button>
      ))}
    </div>
  </div>
);

export default StatusFilters;
