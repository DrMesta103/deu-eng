"use client";

import { useState } from "react";

export function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(items.findIndex((item) => item.open));

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <button
            key={item.question}
            type="button"
            onClick={() => setOpenIndex(isOpen ? -1 : index)}
            className={`block w-full rounded-xl p-6 text-left transition ${
              isOpen
                ? "border border-brand-purple shadow-md"
                : "cursor-pointer border border-gray-200 hover:border-brand-purple"
            }`}
          >
            <span className={`flex items-center justify-between gap-6 text-lg font-bold ${isOpen ? "text-brand-purple" : ""}`}>
              {item.question}
              <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-brand-purple`} />
            </span>
            <p className={`mt-4 text-gray-600 ${isOpen ? "" : "hidden"}`}>{item.answer}</p>
          </button>
        );
      })}
    </div>
  );
}
