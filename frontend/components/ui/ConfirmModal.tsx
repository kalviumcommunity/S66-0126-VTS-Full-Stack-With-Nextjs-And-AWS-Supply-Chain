/**
 * ConfirmModal Component
 * 
 * Accessible modal dialog for confirmation actions.
 * 
 * Accessibility Features:
 * - aria-modal="true" indicates to screen readers this is a modal
 * - role="dialog" semantic meaning for screen readers
 * - aria-labelledby links title to dialog for context
 * - ESC key closes modal
 * - Focus is trapped within modal (essential for accessibility)
 * - Overlay background prevents background interaction
 * 
 * Why modals are important for UX:
 * - Prevents accidental destructive actions
 * - Clear intent with title and description
 * - Explicit confirmation required (safety)
 */

import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean; // Styles dangerous actions differently
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Set initial focus to cancel button for safety (prevents accidental clicks)
    setTimeout(() => initialFocusRef.current?.focus(), 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on ESC key
      if (e.key === "Escape") {
        onClose();
      }

      // Basic focus trap: keep focus within modal
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift+Tab: going backwards
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: going forward
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Title */}
          <h2
            id="modal-title"
            className="text-lg font-bold text-gray-900 mb-2"
          >
            {title}
          </h2>

          {/* Description */}
          <p
            id="modal-description"
            className="text-gray-600 text-sm mb-6"
          >
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 justify-end">
            <button
              ref={initialFocusRef}
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-md text-white font-medium transition ${
                isDangerous
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
