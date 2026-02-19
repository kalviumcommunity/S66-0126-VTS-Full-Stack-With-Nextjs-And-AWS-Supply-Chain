# Route-Level Loading Skeletons & Error Boundaries

Complete implementation guide for Next.js 13+ App Router loading states and error handling using route-level special files.

---

## Overview

This implementation provides production-ready patterns for:

1. **Loading Skeletons** - Automatic UI during data fetching
2. **Error Boundaries** - Graceful error handling with retry functionality
3. **Responsive Design** - Works across all device sizes
4. **Dark Mode Support** - Consistent styling in both light/dark themes
5. **Accessibility** - WCAG-compliant with semantic HTML and ARIA

---

## Architecture

### File Structure

```
app/users/
├── page.tsx          # Main page component with data fetching
├── loading.tsx       # Loading skeleton (automatic UI while suspending)
├── error.tsx         # Error boundary (catches errors in route)
└── AddUser.tsx       # Nested client component (sub-route)
```

### How It Works

**Data Fetching → Loading State → Rendered Page**

```
1. User navigates to /users
   ↓
2. React Suspense boundary triggered
   ↓
3. loading.tsx UI shown immediately (skeleton)
   ↓
4. page.tsx completes fetching
   ↓
5. Skeleton replaced with actual page content
```

**Error Flow**

```
1. Error thrown in page.tsx or child components
   ↓
2. Error Boundary catches it (error.tsx)
   ↓
3. User-friendly error UI displayed
   ↓
4. Retry button triggers reset() → re-render
```

---

## 1. Loading Skeleton File

**Location:** `app/users/loading.tsx`

### Features

- **Automatic Display**: Shows while page is suspending/loading
- **Skeleton Layout**: Matches page structure for smooth transition
- **Tailwind animate-pulse**: Gentle pulsing animation
- **Dark Mode**: Full `dark:` variant support
- **Responsive**: Mobile-first design (p-4 → p-6 → p-8)
- **Accessible**: Screen reader friendly with `sr-only` status message

### Implementation

```tsx
export default function UsersLoading() {
  return (
    <main className="
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-8 sm:py-12 md:py-16 lg:py-20
    ">
      {/* Header Skeleton */}
      <div className="
        h-8 sm:h-9 md:h-10
        w-48 sm:w-56 md:w-64
        bg-gray-200 dark:bg-gray-800
        rounded-lg animate-pulse
      " aria-hidden="true" />

      {/* Table Row Skeleton (repeat 5x) */}
      <div className="
        bg-white dark:bg-gray-950
        rounded-lg shadow-sm
      ">
        <div className="p-4 sm:p-6 grid grid-cols-3 gap-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Accessibility */}
      <div className="sr-only" role="status" aria-live="polite">
        Loading users page...
      </div>
    </main>
  );
}
```

### Key Patterns

**Skeleton Matching**
- Skeleton layout mirrors actual page structure
- Same grid columns, spacing, rounded corners
- Ensures smooth visual transition

**Animation**
```tsx
// Gentle pulsing effect
className="bg-gray-200 dark:bg-gray-800 animate-pulse"

// Which applies: opacity: 1 → 0.5 → 1 over 2 seconds
```

**Accessibility**
```tsx
{/* Hide from visual users, but screen readers see status */}
<div className="sr-only" role="status" aria-live="polite">
  Loading users page...
</div>

{/* Semantic aria-hidden for decorative skeletons */}
<div aria-hidden="true" className="animate-pulse" />
```

---

## 2. Error Boundary File

**Location:** `app/users/error.tsx`

### Features

- **Client Component**: Must use `"use client"` directive
- **Error Catching**: Automatically catches errors from route segment
- **Error Context**: Identifies error type (network, timeout, validation)
- **Retry Button**: Uses `reset()` prop to re-render segment
- **Fallback Navigation**: Link to homepage or support
- **Development Info**: Shows error stack and digest in dev mode only
- **Logging**: Automatic error logging with context

### Implementation

```tsx
"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UsersError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to monitoring service
    console.error("[Users Route Error]", {
      message: error.message,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <article role="alert" className="
        w-full max-w-md
        bg-white dark:bg-gray-950
        border-2 border-red-200 dark:border-red-900
        rounded-lg p-6 sm:p-8
      ">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Something went wrong
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {error.message}
        </p>

        {/* Error Details (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded text-xs">
            <summary className="cursor-pointer font-semibold">
              Error Details
            </summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
          </details>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={reset}
            className="
              flex-1 px-4 py-2
              bg-red-600 hover:bg-red-700
              text-white font-semibold
              rounded-lg transition-colors
            "
          >
            Try Again
          </button>

          <a
            href="/"
            className="
              flex-1 px-4 py-2
              bg-gray-200 dark:bg-gray-800
              text-center rounded-lg
              transition-colors
            "
          >
            Go Home
          </a>
        </div>
      </article>
    </main>
  );
}
```

### Error Detection Patterns

```typescript
const isNetworkError = error.message.includes("fetch") ||
                       error.message.includes("network");
const isValidationError = error.message.includes("validation");
const isTimeoutError = error.message.includes("timeout");

// Use to show appropriate icon and message:
const getErrorTitle = () => {
  if (isNetworkError) return "Network Error";
  if (isValidationError) return "Validation Error";
  if (isTimeoutError) return "Request Timeout";
  return "Something went wrong";
};
```

### Reset Function

```typescript
// The reset() prop re-renders the error boundary's children
<button onClick={reset}>
  Try Again
</button>

// This calls:
// 1. error.tsx re-renders (clears error state)
// 2. page.tsx attempts to render again
// 3. If it succeeds, content is shown
// 4. If it fails again, error.tsx catches it
```

---

## 3. Page Component Updates

**Location:** `app/users/page.tsx`

### Features Added

- **Error Simulation**: Query parameter `?simulate=error` for testing
- **Artificial Delay**: Query parameter `?delay=3000` for demo
- **Error Throwing**: Throws error when simulation enabled (caught by error.tsx)
- **Responsive Tables**: Dark mode support, mobile-friendly
- **Better Styling**: Improved Tailwind classes with dark mode

### Error Throwing Pattern

```tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function UsersPage() {
  const searchParams = useSearchParams();
  const shouldSimulateError = searchParams.get("simulate") === "error";

  // This error is caught by error.tsx
  useEffect(() => {
    if (shouldSimulateError) {
      throw new Error("Simulated API error for testing");
    }
  }, [shouldSimulateError]);

  // Rest of component...
}
```

### Testing Patterns

```
/users                    → Normal load
/users?simulate=error     → Triggers error boundary
/users?delay=3000         → Adds 3 second delay to show skeleton
```

---

## 4. Best Practices

### Skeleton Design

✅ **Do**
- Mirror the final page structure exactly
- Use same grid columns and spacing
- Include header, content, and footer sections
- Add responsive sizing (`sm:`, `md:`, `lg:` variants)
- Make skeletons slightly darker than final content

❌ **Don't**
- Create generic loading spinners (not user-friendly)
- Use hardcoded widths instead of responsive classes
- Hide skeleton from screen readers completely
- Make skeleton animations too fast or too slow

### Error Boundaries

✅ **Do**
- Catch all route-level errors automatically
- Show user-friendly messages (not technical jargon)
- Provide clear retry action
- Log errors for monitoring
- Show dev details only in development mode

❌ **Don't**
- Let errors propagate without catching
- Show full stack traces to users
- Use generic "Error occurred" messages
- Forget to provide recovery options

### Performance

```typescript
// Good: Pre-built skeleton that renders instantly
export default function UsersLoading() {
  return <SkeletonUI />; // Returns immediately
}

// Avoid: Dynamic fetching in loading.tsx
export default function UsersLoading() {
  const data = await fetch(...); // Defeats purpose of skeleton
  return <SkeletonUI />;
}
```

---

## 5. Testing the Implementation

### Manual Testing

**Test Loading Skeleton:**
1. Navigate to `/users`
2. Observe skeleton UI displays immediately
3. Content replaces skeleton when loaded

**Test Error Boundary:**
1. Navigate to `/users?simulate=error`
2. See error boundary UI
3. Click "Try Again" - page resets and loads normally

**Test Retry Flow:**
1. Trigger error with `?simulate=error`
2. Click "Try Again"
3. Verify re-render attempts load new data

**Dark Mode Testing:**
1. Toggle dark mode with ThemeToggle button
2. Verify skeleton uses `dark:` variants
3. Verify error UI adapts to theme

### Automated Testing (Jest/Testing Library)

```typescript
import { render, screen } from "@testing-library/react";
import UsersLoading from "@/app/users/loading";

describe("Users Loading", () => {
  it("renders skeleton with correct aria-hidden", () => {
    render(<UsersLoading />);

    const skeletons = screen.queryAllByRole(undefined, { hidden: true });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("includes accessible status message", () => {
    render(<UsersLoading />);

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading");
  });
});

describe("Users Error Boundary", () => {
  it("displays error message", () => {
    const mockError = new Error("Test error");
    const mockReset = jest.fn();

    render(<UsersError error={mockError} reset={mockReset} />);

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("calls reset when retry clicked", () => {
    const mockReset = jest.fn();
    const mockError = new Error("Test");

    render(<UsersError error={mockError} reset={mockReset} />);

    const button = screen.getByText("Try Again");
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalled();
  });
});
```

---

## 6. Styling Reference

### Skeleton Animation

```css
/* Tailwind's built-in animate-pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

### Dark Mode Colors

```tsx
// Skeleton base colors
bg-gray-200 dark:bg-gray-800

// Content background
bg-white dark:bg-gray-950

// Text colors
text-gray-900 dark:text-white
text-gray-700 dark:text-gray-300
text-gray-600 dark:text-gray-400

// Borders
border-gray-200 dark:border-gray-800
border-gray-300 dark:border-gray-700
```

### Responsive Sizing

```tsx
// Padding scales with viewport
px-4 sm:px-6 lg:px-8
py-8 sm:py-12 md:py-16 lg:py-20

// Typography scales
text-sm sm:text-base md:text-lg

// Heights adapt
h-8 sm:h-9 md:h-10

// Grid columns change
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## 7. Common Scenarios

### Nested Loading States

When you have nested routes with their own loading:

```
app/
├── users/
│   ├── page.tsx
│   ├── loading.tsx (shows for entire users route)
│   └── [id]/
│       ├── page.tsx
│       └── loading.tsx (shows when viewing specific user)
```

### Combining Multiple Errors

For multiple error types in one route:

```tsx
const getErrorIcon = () => {
  switch (error.type) {
    case "NETWORK_ERROR":
      return "🌐";
    case "AUTH_ERROR":
      return "🔐";
    case "PERMISSION_ERROR":
      return "🚫";
    default:
      return "⚠️";
  }
};
```

### Partial Loading with Suspense

For sections of a page to load independently:

```tsx
<main>
  <Header />

  <Suspense fallback={<ContentSkeleton />}>
    <AsyncComments />
  </Suspense>

  <Footer />
</main>
```

---

## 8. Browser Support

- ✅ Chrome/Edge 96+
- ✅ Firefox 95+
- ✅ Safari 15.4+
- ✅ iOS Safari 15.4+
- ✅ Android Chrome

All uses standard Next.js App Router features with no polyfills needed.

---

## 9. Troubleshooting

### Issue: Loading skeleton doesn't appear

**Cause**: Component is already cached or renders too fast

**Solution:**
```typescript
// Add artificial delay for testing
useEffect(() => {
  new Promise(resolve => setTimeout(resolve, 2000));
}, []);
```

### Issue: Error boundary not catching errors

**Cause**: Error.tsx must be in same route segment

**Solution**: Place `error.tsx` in the same folder as `page.tsx`

```
❌ app/users/error.tsx  + app/error.tsx (duplicate)
✅ app/users/error.tsx  (specific to this route)
```

### Issue: Error not showing stack trace in dev

**Cause**: `NODE_ENV` not set to "development"

**Solution**: Ensure dev server is running (not production build)

---

## 10. Summary

### Files Created

| File | Purpose |
|------|---------|
| `app/users/loading.tsx` | Skeleton UI shown while page loads |
| `app/users/error.tsx` | Error boundary for route errors |
| `app/users/page.tsx` | Updated with error simulation + responsive design |

### Key Features

✅ Automatic loading skeleton during data fetch  
✅ Error boundary catches route-level errors  
✅ Retry functionality with reset()  
✅ Dark mode support throughout  
✅ Responsive design (mobile-first)  
✅ Production-ready accessibility (ARIA, semantic HTML)  
✅ Error logging and monitoring  
✅ Developer-friendly error details in dev mode  

### Test It Out

```bash
# Normal loading with skeleton
http://localhost:3000/users

# Test error boundary
http://localhost:3000/users?simulate=error

# Test retry flow
# Click "Try Again" on error page
```

---

For more information on Next.js special files, see [Next.js Docs - File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions).
