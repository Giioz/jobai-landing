import React from "react";
import { Building2, Calendar, Eye, Edit3, Trash2 } from "lucide-react";

interface ApplicationCardProps {
  application: any;
  getStatusStyle: (status: string) => string;
  handleView: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  getStatusStyle,
  handleView,
  handleEdit,
  handleDelete,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {application.jobTitle}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 mt-1">
            <Building2 className="h-4 w-4" />
            <span className="text-sm truncate">{application.companyName}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusStyle(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>
      <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
        <Calendar className="h-4 w-4" />
        <span>
          Created{" "}
          {new Date(application.dateCreated).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleView(application.id)}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Eye className="h-4 w-4" />
          View
        </button>
        <button
          onClick={() => handleEdit(application.id)}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={() => handleDelete(application.id)}
          className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ApplicationCard;
