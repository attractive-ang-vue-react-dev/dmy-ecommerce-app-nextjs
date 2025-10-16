"use client";
import React, { useState } from "react";

export interface TabItem {
  label: string;
  content: React.ReactNode;
  key?: string | number;
}

export default function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: TabItem[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  return (
    <div>
      <div className="flex mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.key ?? idx}
            className={`px-4 py-2 -mb-px border-b-2 transition-colors duration-150 font-medium focus:outline-none ${
              active === idx
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActive(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}
