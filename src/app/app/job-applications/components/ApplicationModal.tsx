import React from "react";
import {
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
  Zap,
} from "lucide-react";

const ApplicationModal = ({
  modalOpen,
  selectedApplication,
  modalMode,
  editForm,
  isLoading,
  saveStatus,
  showDeleteConfirm,
  activeTab,
  closeModal,
  switchToEditMode,
  handleSave,
  handleCancel,
  handleDeleteFromModal,
  regenerateAIContent,
  setActiveTab,
  setEditForm,
  setShowDeleteConfirm,
  canEditAIContent,
  getStatusStyle,
}: any) => {
  if (!modalOpen || !selectedApplication) return null;
  return (
    <>
      <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalMode === "edit" && editForm
                    ? editForm.jobTitle
                    : selectedApplication.jobTitle}
                </h2>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusStyle(
                    modalMode === "edit" && editForm
                      ? editForm.status
                      : selectedApplication.status
                  )}`}
                >
                  {modalMode === "edit" && editForm
                    ? editForm.status
                    : selectedApplication.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-4 w-4" />
                <span>
                  {modalMode === "edit" && editForm
                    ? editForm.companyName
                    : selectedApplication.companyName}
                </span>
                <span className="text-gray-400">•</span>
                <Calendar className="h-4 w-4" />
                <span>
                  Created{" "}
                  {new Date(selectedApplication.dateCreated).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Status Messages */}
          {saveStatus === "success" && (
            <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 text-sm">
                Changes saved successfully!
              </span>
            </div>
          )}
          {saveStatus === "error" && (
            <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 text-sm">
                Failed to save changes. Please try again.
              </span>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6">
              {[
                { id: "details", label: "Details", icon: FileText },
                { id: "ai-content", label: "AI Content", icon: Sparkles },
                { id: "notes", label: "Notes", icon: StickyNote },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    disabled={isLoading}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
            {activeTab === "details" && (
              <div className="space-y-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  {modalMode === "edit" && editForm ? (
                    <input
                      type="text"
                      value={editForm.jobTitle}
                      onChange={(e) =>
                        setEditForm({ ...editForm, jobTitle: e.target.value })
                      }
                      disabled={isLoading}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">
                      {selectedApplication.jobTitle}
                    </p>
                  )}
                </div>
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  {modalMode === "edit" && editForm ? (
                    <input
                      type="text"
                      value={editForm.companyName}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          companyName: e.target.value,
                        })
                      }
                      disabled={isLoading}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">
                      {selectedApplication.companyName}
                    </p>
                  )}
                </div>
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  {modalMode === "edit" && editForm ? (
                    <select
                      value={editForm.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        if (getStatusStyle(editForm.status)) {
                          setEditForm({ ...editForm, status: newStatus });
                        }
                      }}
                      disabled={isLoading}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {[
                        "Draft",
                        "Submitted",
                        "Interview",
                        "Rejected",
                        "Hired",
                      ].map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(
                        selectedApplication.status
                      )}`}
                    >
                      {selectedApplication.status}
                    </span>
                  )}
                </div>
              </div>
            )}
            {activeTab === "ai-content" && (
              <div className="space-y-6">
                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  {modalMode === "edit" && editForm ? (
                    <div className="relative">
                      <textarea
                        value={editForm.aiContent.coverLetter}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            aiContent: {
                              ...editForm.aiContent,
                              coverLetter: e.target.value,
                            },
                          })
                        }
                        disabled={isLoading || !canEditAIContent()}
                        rows={6}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          !canEditAIContent()
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      />
                      {canEditAIContent() && (
                        <button
                          onClick={() => regenerateAIContent("coverLetter")}
                          disabled={isLoading}
                          className="absolute top-2 right-2 inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                          type="button"
                        >
                          <Zap className="h-4 w-4" />
                          Regenerate
                        </button>
                      )}
                    </div>
                  ) : (
                    <pre className="mt-1 whitespace-pre-wrap text-gray-900">
                      {selectedApplication.aiContent.coverLetter}
                    </pre>
                  )}
                </div>
                {/* Resume Highlights */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Resume Highlights
                  </label>
                  {modalMode === "edit" && editForm ? (
                    <div className="relative">
                      <textarea
                        value={editForm.aiContent.resumeHighlights}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            aiContent: {
                              ...editForm.aiContent,
                              resumeHighlights: e.target.value,
                            },
                          })
                        }
                        disabled={isLoading || !canEditAIContent()}
                        rows={6}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          !canEditAIContent()
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      />
                      {canEditAIContent() && (
                        <button
                          onClick={() =>
                            regenerateAIContent("resumeHighlights")
                          }
                          disabled={isLoading}
                          className="absolute top-2 right-2 inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                          type="button"
                        >
                          <Zap className="h-4 w-4" />
                          Regenerate
                        </button>
                      )}
                    </div>
                  ) : (
                    <pre className="mt-1 whitespace-pre-wrap text-gray-900">
                      {selectedApplication.aiContent.resumeHighlights}
                    </pre>
                  )}
                </div>
                {/* LinkedIn Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn Message
                  </label>
                  {modalMode === "edit" && editForm ? (
                    <div className="relative">
                      <textarea
                        value={editForm.aiContent.linkedinMessage}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            aiContent: {
                              ...editForm.aiContent,
                              linkedinMessage: e.target.value,
                            },
                          })
                        }
                        disabled={isLoading || !canEditAIContent()}
                        rows={4}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                          !canEditAIContent()
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      />
                      {canEditAIContent() && (
                        <button
                          onClick={() => regenerateAIContent("linkedinMessage")}
                          disabled={isLoading}
                          className="absolute top-2 right-2 inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                          type="button"
                        >
                          <Zap className="h-4 w-4" />
                          Regenerate
                        </button>
                      )}
                    </div>
                  ) : (
                    <pre className="mt-1 whitespace-pre-wrap text-gray-900">
                      {selectedApplication.aiContent.linkedinMessage}
                    </pre>
                  )}
                </div>
              </div>
            )}
            {activeTab === "notes" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                {modalMode === "edit" && editForm ? (
                  <textarea
                    value={editForm.notes}
                    onChange={(e) =>
                      setEditForm({ ...editForm, notes: e.target.value })
                    }
                    disabled={isLoading}
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 whitespace-pre-wrap text-gray-900">
                    {selectedApplication.notes || "No notes yet."}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div>
              {modalMode === "view" && (
                <>
                  <button
                    onClick={switchToEditMode}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                </>
              )}
              {modalMode === "edit" && (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
            <div>
              {modalMode === "edit" && !isLoading && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this application? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFromModal}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationModal;
