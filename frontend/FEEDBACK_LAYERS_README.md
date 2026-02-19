# Interactive Feedback Layers Documentation

## Overview

This implementation provides a complete feedback system for user interactions, combining three key components:

1. **Toast Notifications** - Non-intrusive success/error/loading messages
2. **Modal Dialogs** - Accessible confirmation for critical actions
3. **Loaders** - Visual feedback for async operations

---

## Why Feedback Layers Matter for UX

### 1. **Toast Notifications**

Toasts provide lightweight, non-blocking feedback.

**Use Cases:**
- Form submission success/errors
- Confirmation after actions
- Loading states for quick operations
- Warning messages

**Benefits:**
- Don't block user interaction (non-modal)
- Auto-dismiss to avoid clutter
- Multiple can stack for compound confirmations
- Easy to implement across the app

**Implementation:**
```typescript
import toast from "react-hot-toast";

// Success toast
toast.success("Item saved!");

// Error toast
toast.error("Something went wrong");

// Loading toast (can be updated)
const toastId = toast.loading("Saving...");
// Later...
toast.success("Saved!", { id: toastId });
```

---

### 2. **Modal Dialogs (ConfirmModal)**

Modals prevent accidental destructive actions by requiring explicit confirmation.

**Why Modals for Deletions:**
- User must consciously refocus attention
- Title and description provide context
- Can't dismiss by accident (only ESC or button)
- Clear consequences displayed

**Key Features:**
- **Focus Trap** - Keeps focus within modal (accessibility)
- **ESC Close** - Standard keyboard behavior
- **Overlay** - Prevents background interaction
- **Accessible Attributes:**
  - `role="dialog"` - Screen reader announces it's a dialog
  - `aria-modal="true"` - Indicates modal behavior
  - `aria-labelledby` - Links title to dialog
  - Focus management - Initial focus on safe action

**Usage:**
```typescript
<ConfirmModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleDelete}
  title="Delete Item?"
  description="Are you sure? This cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  isDangerous // Red styling
/>
```

---

### 3. **Loaders (Loader Component)**

Loaders communicate that an async operation is in progress.

**Two Modes:**

**Inline Loader** - Within page content:
```typescript
<Loader label="Saving..." />
```

**Full-Page Overlay** - For critical operations:
```typescript
<Loader isFullPage label="Deleting..." />
```

**Accessibility:**
- `role="status"` - Announces loading state
- `aria-live="polite"` - Non-intrusive announcements
- `aria-label` - Describes what's loading

---

## Complete Flow Example

### Delete Action Flow (feedback-demo):

1. **User Action**
   ```
   Click "Delete" button
   ```

2. **Modal Confirmation**
   ```
   ConfirmModal opens → User sees consequences
   ```

3. **Loader Display**
   ```
   User confirms → Full-page loader (prevents accidental resubmit)
   ```

4. **Result Toast**
   ```
   After API call → Success or error toast
   ```

---

## Where Toasts Are Triggered

### Success Cases:
- Form submissions
- Item creation/updates
- File uploads
- Account changes

### Error Cases:
- Failed API calls
- Validation errors
- Network timeouts
- Permission denied

### Loading Cases:
- Async operations
- File processing
- Heavy computations

---

## Accessibility Implementation

### Toast Notifications
- Built into `react-hot-toast`
- Automatically announces to screen readers
- Configurable auto-dismiss (not too fast)

### Modal Dialogs
- **Focus Management:**
  - Initial focus on safe action (e.g., "Cancel")
  - Focus trap prevents tabbing outside
  - Focus returns to trigger button on close

- **Keyboard Support:**
  - ESC key closes modal
  - Tab/Shift+Tab navigate buttons
  - Enter activates focused button

- **Screen Reader Support:**
  - Semantic HTML (`role="dialog"`)
  - Descriptive title (`aria-labelledby`)
  - Context description (`aria-describedby`)

### Loaders
- Announced to screen readers
- Clear label describes operation
- Non-intrusive live region

---

## Scalability Considerations

### Adding New Toasts
```typescript
// Use consistently across app
toast.success("Profile updated!");
toast.error("Email already in use");
```

### Reusing Modal
```typescript
// Generic confirmation for any destructive action
<ConfirmModal
  title="Confirm Action"
  description={contextSpecificMessage}
  onConfirm={handleAction}
  isDangerous={isDestructive}
/>
```

### Extending Loader
```typescript
// Can be used in any async operation
<Loader isFullPage label="Processing..." />
```

---

## Configuration

### Toast Positioning
Edit `context/ToasterProvider.tsx` to change position:
```typescript
position="top-right" // or "top-left", "bottom-right", etc
```

### Toast Duration
```typescript
toastOptions={{
  duration: 4000, // 4 seconds
}}
```

### Styling
All components use Tailwind CSS for consistent theming. Modify classes to match your design system.

---

## Testing Checklist

- [ ] Toasts appear and auto-dismiss
- [ ] Modal can be closed with ESC key
- [ ] Modal focus is trapped
- [ ] Loader prevents interaction on full-page mode
- [ ] Success/error states show correctly
- [ ] Screen reader announces all elements
- [ ] Keyboard navigation works throughout
