/**
 * Loader Spinner Component
 * 
 * Accessible animated loader that can be used as:
 * - Inline spinner (within content)
 * - Full-page overlay (during critical operations)
 * 
 * Why accessibility matters:
 * - role="status" indicates loading state to screen readers
 * - aria-live="polite" announces changes without interrupting
 * - aria-label provides context for users with screen readers
 */

interface LoaderProps {
  /** Whether to show full-page overlay or inline */
  isFullPage?: boolean;
  /** Custom message displayed below spinner */
  label?: string;
}

export default function Loader({ isFullPage = false, label = "Loading..." }: LoaderProps) {
  if (isFullPage) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <div
            role="status"
            aria-live="polite"
            aria-label={label}
            className="flex flex-col items-center"
          >
            {/* Animated spinner */}
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
            <p className="text-gray-700">{label}</p>
          </div>
        </div>
      </div>
    );
  }

  // Inline loader
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="flex items-center gap-2"
    >
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}
