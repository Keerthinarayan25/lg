"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Truck } from "lucide-react";

export default function SidebarFilter() {
  const [sections, setSections] = useState({
    getItFast: true,
    offers: true,
    features: true,
    rating: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 bg-[#f3efe6] p-4 text-sm border border-[#CBC8C2] rounded-md">
      {/* Shipping Section */}
      <div className="flex items-center gap-2 font-medium mb-2">
        <Truck className="w-4 h-4" />
        <span>Shipping to 90210</span>
      </div>

      {/* On-Sale and In-Stock Toggles */}
      <div className="space-y-4 border-b border-[#CBC8C2] pb-4">
        <Toggle label="On-Sale" />
        <Toggle label="In-Stock" />
      </div>

      {/* Collapsible Sections */}
      <Collapsible
        title="Get it Fast"
        open={sections.getItFast}
        onToggle={() => toggleSection("getItFast")}
      >
        <Checkbox label="Next Day Delivery" />
      </Collapsible>

      <Collapsible
        title="Offers"
        open={sections.offers}
        onToggle={() => toggleSection("offers")}
      >
        <Checkbox label="Trade-in Credits and Free Haul Away" />
        <Checkbox label="Air Purifier & AC Pair - Save 10%" />
      </Collapsible>

      <Collapsible
        title="Features"
        open={sections.features}
        onToggle={() => toggleSection("features")}
      >
        <Checkbox label="ThinQ® Smart Technology" />
      </Collapsible>

      <Collapsible
        title="Rating"
        open={sections.rating}
        onToggle={() => toggleSection("rating")}
      >
        <RatingFilter stars={5} label="5" />
        <RatingFilter stars={4} label="4 & Up" />
        <RatingFilter stars={3} label="3 & Up" />
        <RatingFilter stars={2} label="2 & Up" />
        <RatingFilter stars={1} label="1 & Up" />
      </Collapsible>

      {/* Clear Filters */}
      <div className="border-t border-[#CBC8C2] mt-4 pt-3">
        <p className="text-blue-700 cursor-pointer hover:underline">
          Clear Filters
        </p>
      </div>
    </aside>
  );
}

/* ✅ Reusable Components */

interface ToggleProps {
  label: string;
}

function Toggle({ label }: ToggleProps) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-5 rounded-full transition-colors duration-300 ${
          on ? "bg-green-600" : "bg-gray-400"
        } relative`}
      >
        <span
          className={`absolute top-[2px] left-[2px] h-4 w-4 bg-white rounded-full transition-transform duration-300 ${
            on ? "translate-x-5" : ""
          }`}
        ></span>
      </button>
    </div>
  );
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}

function Collapsible({ title, children, open, onToggle }: CollapsibleProps) {
  return (
    <div className="border-b border-[#CBC8C2] py-3">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full font-medium"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

interface CheckboxProps {
  label: string;
}

function Checkbox({ label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 border border-gray-400 rounded"
      />
      <span>{label}</span>
    </label>
  );
}

interface RatingFilterProps {
  stars: number;
  label: string;
}

function RatingFilter({ stars, label }: RatingFilterProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" className="w-4 h-4 border border-gray-400 rounded" />
      <span>
        {"★".repeat(stars)}
        {"☆".repeat(5 - stars)} <span>{label}</span>
      </span>
    </label>
  );
}
