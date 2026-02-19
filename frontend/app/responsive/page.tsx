"use client";

import { useState } from "react";

interface Card {
  id: number;
  title: string;
  description: string;
  color: string;
}

export default function ResponsivePage() {
  const cards: Card[] = [
    {
      id: 1,
      title: "Mobile First",
      description:
        "Responsive design starts with mobile layouts (1 column) and scales up to tablet (2 columns) and desktop (3 columns).",
      color: "brand",
    },
    {
      id: 2,
      title: "Tailwind Breakpoints",
      description:
        "Use Tailwind's mobile-first approach: base styles apply to all screens, then override with sm: md: lg: xl: 2xl: modifiers.",
      color: "blue",
    },
    {
      id: 3,
      title: "Flexible Grid",
      description:
        "Grid automatically stacks on mobile and distributes columns as space increases. No media query writes needed!",
      color: "purple",
    },
    {
      id: 4,
      title: "Responsive Typography",
      description:
        "Font sizes scale naturally: text-lg on mobile becomes text-2xl on desktop using responsive utilities.",
      color: "green",
    },
    {
      id: 5,
      title: "Spacing Scales",
      description:
        "Padding and margins adjust automatically: p-4 on mobile, p-6 on tablet md:p-8, and p-12 lg:p-12 on desktop.",
      color: "yellow",
    },
    {
      id: 6,
      title: "Dark Mode Support",
      description:
        "Use dark: prefix to style for dark mode. Tailwind handles light/dark variants seamlessly with class strategy.",
      color: "red",
    },
  ];

  const [selectedView, setSelectedView] = useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");

  const getViewportInfo = () => {
    switch (selectedView) {
      case "mobile":
        return {
          label: "Mobile (1 Column)",
          example: "< 640px",
          class: "max-w-sm",
        };
      case "tablet":
        return {
          label: "Tablet (2 Columns)",
          example: "640px - 1024px",
          class: "max-w-3xl",
        };
      case "desktop":
        return {
          label: "Desktop (3 Columns)",
          example: "> 1024px",
          class: "max-w-7xl",
        };
    }
  };

  const viewport = getViewportInfo();

  return (
    <main>
      {/* Hero Section */}
      <section className="
        bg-gradient-to-r from-brand-light to-brand
        dark:from-brand-dark dark:to-brand
        text-white
        py-8 sm:py-12 md:py-16 lg:py-20
        transition-colors duration-300
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-bold mb-4
            transition-all duration-300
          ">
            Responsive & Dark Mode Demo
          </h1>
          <p className="
            text-lg sm:text-xl md:text-2xl
            opacity-90 max-w-2xl
            transition-all duration-300
          ">
            Watch how this layout adapts from 1 column on mobile → 2 on tablet →
            3 on desktop, with full dark mode support.
          </p>
        </div>
      </section>

      {/* Viewport Selector */}
      <section className="
        bg-gray-50 dark:bg-gray-900
        border-b border-gray-200 dark:border-gray-800
        py-6 sm:py-8
        transition-colors duration-300
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="
            flex flex-col sm:flex-row gap-4
            items-start sm:items-center justify-between
          ">
            <div>
              <h2 className="
                text-lg sm:text-xl font-bold
                text-gray-900 dark:text-white mb-2
              ">
                Preview Responsive Breakpoints:
              </h2>
              <p className="
                text-sm text-gray-600 dark:text-gray-400
              ">
                Current View: <span className="font-semibold">{viewport.label}</span> ({viewport.example})
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {["mobile", "tablet", "desktop"].map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view as typeof selectedView)}
                  className={`
                    px-4 py-2 rounded-lg font-semibold
                    capitalize text-sm transition-all duration-300
                    ${
                      selectedView === view
                        ? "bg-brand text-white dark:bg-brand-light dark:text-gray-900"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="
        bg-white dark:bg-gray-950
        py-8 sm:py-12 md:py-16 lg:py-20
        transition-colors duration-300
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
          <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4 sm:gap-6 md:gap-8
          ">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  bg-gradient-to-br
                  from-${card.color}-50 to-${card.color}-100
                  dark:from-${card.color}-900 dark:to-${card.color}-950
                  p-4 sm:p-6 md:p-8
                  rounded-xl md:rounded-2xl
                  border border-${card.color}-200 dark:border-${card.color}-800
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                  transform hover:-translate-y-1
                `}
                style={{
                  background:
                    card.color === "brand"
                      ? "linear-gradient(135deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)"
                      : card.color === "blue"
                        ? "linear-gradient(135deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)"
                        : card.color === "purple"
                          ? "linear-gradient(135deg, rgb(243, 232, 255) 0%, rgb(230, 204, 255) 100%)"
                          : card.color === "green"
                            ? "linear-gradient(135deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)"
                            : card.color === "yellow"
                              ? "linear-gradient(135deg, rgb(254, 252, 232) 0%, rgb(254, 243, 199) 100%)"
                              : "linear-gradient(135deg, rgb(254, 226, 226) 0%, rgb(254, 202, 202) 100%)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12
                      rounded-lg flex items-center justify-center
                      text-white font-bold
                      text-sm sm:text-base
                      flex-shrink-0
                      bg-${card.color}-500
                    `}
                    style={{
                      backgroundColor:
                        card.color === "brand"
                          ? "#1e3a8a"
                          : card.color === "blue"
                            ? "#1e40af"
                            : card.color === "purple"
                              ? "#7c3aed"
                              : card.color === "green"
                                ? "#059669"
                                : card.color === "yellow"
                                  ? "#d97706"
                                  : "#dc2626",
                    }}
                  >
                    {card.id}
                  </div>
                  <h3 className="
                    text-lg sm:text-xl font-bold
                    text-gray-900 dark:text-white
                    pt-1
                  ">
                    {card.title}
                  </h3>
                </div>
                <p className="
                  text-sm sm:text-base
                  text-gray-700 dark:text-gray-300
                  leading-relaxed
                ">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Scaling Demo */}
      <section className="
        bg-gray-50 dark:bg-gray-900
        py-8 sm:py-12 md:py-16 lg:py-20
        border-t border-gray-200 dark:border-gray-800
        transition-colors duration-300
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold mb-8 text-gray-900 dark:text-white
          ">
            Responsive Typography
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Font Size Scaling */}
            <div className="
              bg-white dark:bg-gray-950
              p-6 md:p-8 rounded-xl md:rounded-2xl
              border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                text-xl sm:text-2xl font-bold
                text-gray-900 dark:text-white mb-4
              ">
                Font Size Scaling
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                    text-sm → text-base → text-lg
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-900 dark:text-white">
                    This text scales responsively across breakpoints
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                    text-lg → text-xl → text-2xl
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-brand dark:text-brand-light font-semibold">
                    Larger heading text
                  </p>
                </div>
              </div>
            </div>

            {/* Spacing Scaling */}
            <div className="
              bg-white dark:bg-gray-950
              p-6 md:p-8 rounded-xl md:rounded-2xl
              border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                text-xl sm:text-2xl font-bold
                text-gray-900 dark:text-white mb-4
              ">
                Padding Scaling
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                    p-4 → p-6 → p-8
                  </p>
                  <div className="
                    p-4 sm:p-6 md:p-8
                    bg-blue-100 dark:bg-blue-900
                    rounded-lg border-2 border-blue-300 dark:border-blue-700
                    text-sm text-gray-700 dark:text-gray-300
                  ">
                    This box's padding increases on larger screens
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                    gap-2 → gap-4 → gap-6
                  </p>
                  <div className="flex gap-2 sm:gap-4 md:gap-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="
                          h-12 w-12 rounded-lg
                          bg-brand dark:bg-brand-light
                          flex items-center justify-center
                          text-white dark:text-gray-900 font-bold
                          flex-shrink-0
                        "
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="
        bg-white dark:bg-gray-950
        py-8 sm:py-12 md:py-16 lg:py-20
        border-t border-gray-200 dark:border-gray-800
        transition-colors duration-300
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold mb-8 text-gray-900 dark:text-white
          ">
            Responsive Utilities Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Grid Layout */}
            <div className="
              bg-gray-50 dark:bg-gray-900
              p-6 rounded-xl border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                font-bold text-lg sm:text-xl
                text-gray-900 dark:text-white mb-3
              ">
                Grid Layout
              </h3>
              <code className="
                text-xs sm:text-sm text-gray-700 dark:text-gray-300
                bg-gray-900 dark:bg-gray-800 p-3 rounded block
                overflow-x-auto font-mono
              ">
                {`grid grid-cols-1
md:grid-cols-2
lg:grid-cols-3`}
              </code>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                1 column mobile → 2 tablet → 3 desktop
              </p>
            </div>

            {/* Typography Scaling */}
            <div className="
              bg-gray-50 dark:bg-gray-900
              p-6 rounded-xl border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                font-bold text-lg sm:text-xl
                text-gray-900 dark:text-white mb-3
              ">
                Typography Scaling
              </h3>
              <code className="
                text-xs sm:text-sm text-gray-700 dark:text-gray-300
                bg-gray-900 dark:bg-gray-800 p-3 rounded block
                overflow-x-auto font-mono
              ">
                {`text-lg sm:text-xl
md:text-2xl
lg:text-3xl`}
              </code>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                Automatically scales across breakpoints
              </p>
            </div>

            {/* Spacing Utilities */}
            <div className="
              bg-gray-50 dark:bg-gray-900
              p-6 rounded-xl border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                font-bold text-lg sm:text-xl
                text-gray-900 dark:text-white mb-3
              ">
                Responsive Spacing
              </h3>
              <code className="
                text-xs sm:text-sm text-gray-700 dark:text-gray-300
                bg-gray-900 dark:bg-gray-800 p-3 rounded block
                overflow-x-auto font-mono
              ">
                {`p-4 sm:p-6
md:p-8 lg:p-12
gap-4 md:gap-8`}
              </code>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                Padding and gaps scale automatically
              </p>
            </div>

            {/* Hidden/Visible */}
            <div className="
              bg-gray-50 dark:bg-gray-900
              p-6 rounded-xl border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                font-bold text-lg sm:text-xl
                text-gray-900 dark:text-white mb-3
              ">
                Responsive Visibility
              </h3>
              <code className="
                text-xs sm:text-sm text-gray-700 dark:text-gray-300
                bg-gray-900 dark:bg-gray-800 p-3 rounded block
                overflow-x-auto font-mono
              ">
                {`hidden sm:block
md:hidden lg:block`}
              </code>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                Show/hide content by breakpoint
              </p>
            </div>

            {/* Dark Mode */}
            <div className="
              bg-gray-50 dark:bg-gray-900
              p-6 rounded-xl border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                font-bold text-lg sm:text-xl
                text-gray-900 dark:text-white mb-3
              ">
                Dark Mode Support
              </h3>
              <code className="
                text-xs sm:text-sm text-gray-700 dark:text-gray-300
                bg-gray-900 dark:bg-gray-800 p-3 rounded block
                overflow-x-auto font-mono
              ">
                {`bg-white
dark:bg-gray-950
text-gray-900
dark:text-white`}
              </code>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                Use dark: prefix for dark mode styles
              </p>
            </div>

            {/* Margins & Transforms */}
            <div className="
              bg-gray-50 dark:bg-gray-900
              p-6 rounded-xl border border-gray-200 dark:border-gray-800
            ">
              <h3 className="
                font-bold text-lg sm:text-xl
                text-gray-900 dark:text-white mb-3
              ">
                Margin & Transforms
              </h3>
              <code className="
                text-xs sm:text-sm text-gray-700 dark:text-gray-300
                bg-gray-900 dark:bg-gray-800 p-3 rounded block
                overflow-x-auto font-mono
              ">
                {`mx-auto px-4
sm:px-6 lg:px-8
hover:scale-110`}
              </code>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3">
                Centering and responsive padding
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
