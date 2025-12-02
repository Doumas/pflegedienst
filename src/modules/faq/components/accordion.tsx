"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-all hover:text-primary focus:outline-none"
      >
        <span className={cn("text-lg font-medium text-slate-900", isOpen && "text-primary")}>
          {question}
        </span>
        <span
          className={cn(
            "ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white transition-all",
            isOpen ? "border-primary bg-primary text-white rotate-180" : "border-slate-200 text-slate-400"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQList({ items }: { items: FAQItemProps[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      {items.map((item, i) => (
        <FAQItem key={i} {...item} />
      ))}
    </div>
  );
}