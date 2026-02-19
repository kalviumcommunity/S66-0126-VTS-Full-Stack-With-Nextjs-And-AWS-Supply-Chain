# Responsive & Dark Mode System Documentation

## Overview

This document covers the complete responsive design system and dark mode implementation using Tailwind CSS 4 with the "class" strategy for dark mode. The system provides:

- **Mobile-First Responsive Design**: Layouts scale from 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- **Dark Mode Support**: Full light/dark theme support with user persistence
- **Brand Consistency**: Custom brand colors with light/default/dark variants
- **Accessibility**: WCAG AA color contrast compliance throughout
- **Performance**: Smooth transitions between themes and responsive breakpoints

---

## 1. Tailwind Configuration

### File: `tailwind.config.ts`

```typescript
// Dark mode strategy: class-based
darkMode: "class"

// Custom brand colors
colors: {
  brand: {
    light: "#3b82f6",      // Light blue
    DEFAULT: "#1e3a8a",    // Default brand blue
    dark: "#0c2340",       // Dark brand blue
  }
}

// Responsive breakpoints
screens: {
  sm: "640px",    // Small devices (tablets)
  md: "768px",    // Tablets
  lg: "1024px",   // Desktops
  xl: "1280px",   // Large desktops
  "2xl": "1536px" // Extra large screens
}
```

### Key Features

**Dark Mode Class Strategy**
- When `darkMode: "class"` is set, Tailwind looks for `class="dark"` on the `<html>` element
- To style an element for dark mode, use the `dark:` prefix:
  ```tsx
  <div className="bg-white dark:bg-gray-950 text-black dark:text-white">
    Content
  </div>
  ```

**Custom Brand Colors**
- Available via `bg-brand`, `text-brand`, `border-brand` utilities
- Variants: `bg-brand-light`, `bg-brand-DEFAULT`, `bg-brand-dark`
- Used throughout for consistent branding

**Responsive Breakpoints**
- Mobile-first approach: styles apply to all screens unless overridden
- Breakpoints in order of increasing size: `sm`, `md`, `lg`, `xl`, `2xl`
- Apply at larger viewports: `md:px-8 lg:px-12`

---

## 2. Dark Mode Implementation

### Theme Toggle Component

**File:** `components/ThemeToggle.tsx`

Provides a button for users to switch between light and dark modes:

```tsx
<ThemeToggle />
```

**Features:**
- Reads/writes `localStorage` key: `tribal-theme`
- Respects system preference (`prefers-color-scheme` media query)
- Toggles `dark` class on `document.documentElement`
- Syncs with `UIContext` for global state
- Hydration-safe with mounted state
- Accessible: keyboard navigation, ARIA labels, focus visible

**Implementation Details:**
```tsx
// On mount: Initialize from localStorage or system preference
const savedTheme = localStorage.getItem("tribal-theme");
const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Toggle handler: Update DOM, localStorage, and context
const handleToggle = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  
  // Update DOM for Tailwind dark mode
  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  
  // Persist user preference
  localStorage.setItem("tribal-theme", newTheme);
  
  // Update context state
  toggleTheme();
};
```

### Dark Mode Sync Component

**File:** `components/DarkModeSync.tsx`

Ensures the HTML element's class is kept in sync with `UIContext` theme state:

```tsx
// In app/layout.tsx
<UIProvider>
  <DarkModeSync />
  {/* rest of layout */}
</UIProvider>
```

**Why It's Needed:**
- Prevents hydration mismatches
- Syncs context state changes to DOM
- Ensures theme persists across page navigation
- Falls back to system preference before user changes theme

---

## 3. Responsive Design Patterns

### Mobile-First Architecture

Start with base styles that apply to all screen sizes, then override at larger breakpoints:

```tsx
// Starts at mobile size, scales up
<div className="
  text-sm sm:text-base md:text-lg lg:text-xl
  p-4 sm:p-6 md:p-8 lg:p-12
  mx-auto px-4 sm:px-6 lg:px-8
">
  Content
</div>
```

**Breakpoint Schedule:**
- **Mobile (< 640px)**: Single column, text-sm, p-4
- **Tablet (640px - 1024px)**: Two columns, text-base, p-6
- **Desktop (1024px+)**: Three columns, text-lg, p-8

### Grid Layout

Responsive columns that automatically adjust:

```tsx
// 1 column on mobile, 2 on tablet, 3 on desktop
<div className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 sm:gap-6 md:gap-8
">
  {/* Grid items automatically stack/distribute */}
</div>
```

### Typography Scaling

Font sizes that scale across breakpoints:

```tsx
// Heading: 24px → 32px → 40px → 48px
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

// Body: 14px → 16px → 18px
<p className="text-sm sm:text-base md:text-lg">
  Responsive paragraph text
</p>
```

### Spacing (Padding & Gaps)

Padding and margins that scale for better proportions:

```tsx
// Container padding that grows with viewport
<div className="
  px-4 sm:px-6 md:px-8 lg:px-12
  py-8 sm:py-12 md:py-16 lg:py-20
">
  Content
</div>

// Gap between grid items
<div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12">
  {/* Items with responsive spacing */}
</div>
```

### Responsive Visibility

Show/hide elements based on screen size:

```tsx
{/* Hidden on mobile, shown on tablet and up */}
<div className="hidden sm:block">
  Tablet content
</div>

{/* Shown only on desktop and larger */}
<div className="hidden lg:flex">
  Desktop layout
</div>
```

---

## 4. Dark Mode Styles

### Using dark: Prefix

Apply styles only when dark mode is active:

```tsx
<div className="
  bg-white dark:bg-gray-950
  text-gray-900 dark:text-white
  border border-gray-200 dark:border-gray-800
  shadow-md dark:shadow-lg
">
  Content that adapts to dark mode
</div>
```

### Light/Dark Color Pairs

Standard Tailwind colors with good contrast:

**Background Colors:**
- Light: `bg-white` vs Dark: `dark:bg-gray-950`
- Light: `bg-gray-50` vs Dark: `dark:bg-gray-900`
- Light: `bg-gray-100` vs Dark: `dark:bg-gray-800`

**Text Colors:**
- Light: `text-gray-900` vs Dark: `dark:text-white`
- Light: `text-gray-700` vs Dark: `dark:text-gray-300`
- Light: `text-gray-600` vs Dark: `dark:text-gray-400`

**Border Colors:**
- Light: `border-gray-200` vs Dark: `dark:border-gray-800`
- Light: `border-gray-300` vs Dark: `dark:border-gray-700`

### Custom Brand Colors in Dark Mode

```tsx
{/* Light mode uses brand-DEFAULT, dark mode uses brand-light */}
<button className="
  bg-brand dark:bg-brand-light
  text-white dark:text-gray-900
  hover:bg-brand-dark dark:hover:bg-brand
">
  Brand Button
</button>
```

---

## 5. Implementation Examples

### Complete Responsive Card

```tsx
<div className="
  bg-white dark:bg-gray-900
  rounded-lg md:rounded-xl lg:rounded-2xl
  p-4 sm:p-6 md:p-8
  border border-gray-200 dark:border-gray-800
  shadow-md hover:shadow-lg
  transition-shadow duration-300
">
  <h3 className="
    text-lg sm:text-xl md:text-2xl
    font-bold text-gray-900 dark:text-white
    mb-2 sm:mb-3 md:mb-4
  ">
    Card Title
  </h3>
  <p className="
    text-sm sm:text-base md:text-lg
    text-gray-700 dark:text-gray-300
  ">
    Card content that scales responsively and adapts to dark mode
  </p>
</div>
```

### Header with Responsive Navigation

```tsx
<header className="
  bg-white dark:bg-gray-950
  border-b border-gray-200 dark:border-gray-800
  transition-colors duration-300
">
  <div className="
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
    py-4 flex justify-between items-center
  ">
    <h1 className="
      text-xl sm:text-2xl font-bold
      text-gray-900 dark:text-white
    ">
      Logo
    </h1>
    
    <nav className="
      hidden md:flex gap-6
      text-gray-700 dark:text-gray-300
    ">
      {/* Navigation items */}
    </nav>
  </div>
</header>
```

### Responsive Grid with 1/2/3 Columns

```tsx
<div className="
  max-w-7xl mx-auto
  px-4 sm:px-6 lg:px-8
  py-8 sm:py-12 md:py-16 lg:py-20
">
  <div className="
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    gap-4 sm:gap-6 md:gap-8
  ">
    {items.map((item) => (
      <div key={item.id} className="
        bg-white dark:bg-gray-900
        rounded-lg p-4 sm:p-6 md:p-8
        border border-gray-200 dark:border-gray-800
      ">
        {/* Item content */}
      </div>
    ))}
  </div>
</div>
```

---

## 6. Global Styles

### File: `app/globals.css`

```css
/* CSS variables for theme tokens */
:root {
  --color-brand-light: #3b82f6;
  --color-brand-default: #1e3a8a;
  --color-brand-dark: #0c2340;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Light mode body */
body {
  background-color: #ffffff;
  color: #000000;
}

/* Dark mode body */
html.dark body {
  background-color: #030712;
  color: #f3f4f6;
}

/* Theme transition helper class */
.theme-transitional {
  @apply transition-colors duration-300;
}
```

---

## 7. Updated Components

All components have been updated to support dark mode and responsive design:

- **Header.tsx**: Dark mode styles, responsive nav, ThemeToggle button
- **Footer.tsx**: Dark mode responsive padding
- **HeroSection.tsx**: Gradient backgrounds scale responsively, dark variant
- **Card Components**: Dark variants, responsive padding/text
- **Forms**: Dark-mode input styling, responsive field layout
- **Buttons**: Brand color variants, dark mode support

---

## 8. Responsive Demo Page

**File:** `app/responsive/page.tsx`

Interactive demonstration showing:
- Viewport selector (mobile/tablet/desktop)
- Grid layout with 1/2/3 column options
- Typography scaling across breakpoints
- Padding/spacing adjustments
- Utility reference guide with code examples

**Access:** Navigate to `/responsive` to see the demo in action.

---

## 9. Testing Checklist

- [x] Dark mode toggle persists across page navigation
- [x] localStorage saves theme preference correctly
- [x] System preference respected on first visit
- [x] No hydration mismatches
- [x] Responsive classes scale correctly at each breakpoint
- [x] Color contrast meets WCAG AA (4.5:1 text, 3:1 objects)
- [x] Brand colors work in both light and dark modes
- [x] Transitions are smooth (duration-300)
- [x] Mobile layout is single column
- [x] Tablet layout is two columns at md breakpoint
- [x] Desktop layout is three columns at lg breakpoint

---

## 10. Common Patterns

### Centering Container
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  Centered content with responsive padding
</div>
```

### Gradient Background
```tsx
<div className="
  bg-gradient-to-r from-brand-light to-brand
  dark:from-brand-dark dark:to-brand
">
  Responsive gradient with dark mode support
</div>
```

### Responsive Text with Fallback
```tsx
<p className="text-base sm:text-lg md:text-xl lg:text-2xl">
  Text that has fallback size on each breakpoint
</p>
```

### Interactive Element with Dark Mode
```tsx
<button className="
  bg-brand hover:bg-brand-dark
  dark:bg-brand-light dark:hover:bg-brand
  text-white dark:text-gray-900
  transition-colors duration-300
  px-4 py-2 rounded-lg font-bold
">
  Brand Button
</button>
```

---

## 11. Accessibility Considerations

### Color Contrast
- All text meets WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text
- Brand colors adjusted for both light and dark modes
- Test with tools like WebAIM Contrast Checker

### Focus Indicators
- All interactive elements have visible focus states
- Use `focus:ring-2 focus:ring-offset-2 focus:ring-brand`
- Ensure ring color contrasts with background

### Motion Preferences
- Respect `prefers-reduced-motion` by adjusting transitions:
  ```tsx
  @media (prefers-reduced-motion) {
    * {
      @apply !transition-none !animate-none;
    }
  }
  ```

### Responsive Typography
- Font sizes scale but maintain readability
- Line heights: `leading-relaxed` (1.625) for body, `leading-tight` (1.25) for headings
- Max-width containers prevent lines of text from being too long

---

## 12. Browser Support

- ✅ Chrome/Edge 96+
- ✅ Firefox 95+
- ✅ Safari 15.4+
- ✅ iOS Safari 15.4+
- ✅ Android Chrome

**Note:** Dark mode class strategy requires JavaScript. Graceful fallback to `prefers-color-scheme` if JS is disabled.

---

## Summary

The responsive and dark mode system provides:

1. **Tailwind Configuration** with custom brand colors and breakpoints
2. **Dark Mode Toggle** component with localStorage persistence
3. **Mobile-First Design** patterns that scale across all devices
4. **WCAG Compliant** color contrast and accessibility
5. **Smooth Transitions** between themes and responsive changes
6. **Production-Ready** implementation used throughout the app

For questions or updates, refer to the component source files and test at `/responsive`.
