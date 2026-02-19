"use client";

/**
 * Feedback Demo Page
 * 
 * Demonstrates the complete feedback loop:
 * 1. User clicks "Delete Item" button
 * 2. Modal opens asking for confirmation
 * 3. User confirms → modal closes + loader shows
 * 4. After timeout (simulating API call) → success/error toast
 * 
 * This flow is important for UX because:
 * - Modal prevents accidental deletions
 * - Loader provides visual feedback during async operation
 * - Toast confirms completion
 */

import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Loader from "@/components/ui/Loader";

interface Item {
  id: number;
  name: string;
}

export default function FeedbackDemoPage() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" },
  ]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Handle delete confirmation
  const handleDeleteClick = (item: Item) => {
    setSelectedItem(item);
    setIsConfirmOpen(true);
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    setIsDeleting(true);

    // Show loading toast
    const toastId = toast.loading("Deleting item...");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Remove item from list
      setItems((prev) => prev.filter((item) => item.id !== selectedItem.id));

      // Update loading toast to success
      toast.success("Item deleted successfully!", { id: toastId });

      console.log("[Demo] Item deleted:", selectedItem.name);
    } catch (error) {
      // Show error toast
      toast.error("Failed to delete item", { id: toastId });
      console.error("[Demo] Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle cancel
  const handleCancelDelete = () => {
    toast("Deletion cancelled", {
      icon: "❌",
    });
  };

  // Show full-page loader while deleting
  if (isDeleting) {
    return (
      <>
        <Loader isFullPage label="Deleting item..." />
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Feedback Layers Demo
          </h1>
          <p className="text-gray-600">
            Interactive demonstration of toast notifications, modal dialogs, and loaders.
          </p>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Items</h2>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No items. All items have been deleted!
            </p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="text-gray-900 font-medium">{item.name}</span>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Demo Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
            <li>Click the "Delete" button on any item</li>
            <li>A modal will appear asking for confirmation</li>
            <li>Click "Confirm" to proceed with deletion</li>
            <li>A full-page loader will show during the "API call"</li>
            <li>After 2 seconds, a success toast will appear</li>
            <li>Try clicking "Cancel" to see a cancel toast</li>
            <li>Try pressing Escape to close the modal</li>
          </ol>
        </div>

        {/* Accessibility Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-green-900 mb-2">Accessibility Features:</h3>
          <ul className="space-y-1 text-green-800 text-sm list-disc list-inside">
            <li>Modal has proper ARIA roles and labels</li>
            <li>Focus is trapped within modal</li>
            <li>Escape key closes modal</li>
            <li>Toasts include accessible announcements</li>
            <li>Loader has role="status" for screen readers</li>
            <li>All interactive elements are keyboard navigable</li>
          </ul>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          handleCancelDelete();
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Item?"
        description={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Keep It"
        isDangerous
      />
    </div>
  );
}
