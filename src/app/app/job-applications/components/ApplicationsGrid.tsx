import React from "react";
import ApplicationCard from "./ApplicationCard";

interface ApplicationsGridProps {
  paginatedApplications: any[];
  getStatusStyle: (status: string) => string;
  handleView: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const ApplicationsGrid: React.FC<ApplicationsGridProps> = ({
  paginatedApplications,
  getStatusStyle,
  handleView,
  handleEdit,
  handleDelete,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {paginatedApplications.map((application) => (
      <ApplicationCard
        key={application.id}
        application={application}
        getStatusStyle={getStatusStyle}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ))}
  </div>
);

export default ApplicationsGrid;
