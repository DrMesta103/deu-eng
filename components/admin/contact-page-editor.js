"use client";

import { useActionState, useDeferredValue, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveContactPageAction } from "@/app/admin/(panel)/pages/contact/actions";

const initialState = { success: false, message: null };

const elementLibrary = [
  {
    type: "hero",
    label: "Hero Banner",
    icon: "fa-regular fa-window-maximize",
    category: "intro",
    description: "Headline, intro copy, CTA chips, and status strip for the first fold.",
  },
  {
    type: "details",
    label: "Contact Details",
    icon: "fa-solid fa-location-dot",
    category: "content",
    description: "Structured cards for address, phone, email, schedule, and support notes.",
  },
  {
    type: "form",
    label: "Dynamic Form",
    icon: "fa-regular fa-rectangle-list",
    category: "conversion",
    description: "Build custom lead forms with configurable fields, widths, and requirements.",
  },
  {
    type: "faq",
    label: "FAQ Stack",
    icon: "fa-regular fa-circle-question",
    category: "content",
    description: "Answer common questions with expandable-style rows and side notes.",
  },
  {
    type: "map",
    label: "Location Panel",
    icon: "fa-regular fa-map",
    category: "content",
    description: "Map preview, arrival notes, transport options, and office timing.",
  },
];

const fieldTypeOptions = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
];

function uid(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function getDefaultData(type) {
  if (type === "hero") {
    return {
      badge: "Admissions Desk",
      title: "Contact DeutschAkademie Engel",
      subtitle: "Questions about levels, visas, class formats, or schedules? Reach out and the academy team will respond quickly.",
      highlight: "Average response time: less than one business day",
      ctaPrimary: "Start your request",
      ctaSecondary: "Call the academy",
      stats: [
        { id: uid("stat"), label: "Languages", value: "DE | EN" },
        { id: uid("stat"), label: "Support Hours", value: "08:00 - 18:00" },
        { id: uid("stat"), label: "Avg. Reply", value: "< 24h" },
      ],
    };
  }

  if (type === "details") {
    return {
      eyebrow: "Reach Us",
      title: "Academy Details",
      subtitle: "Everything a learner needs before arriving at the campus.",
      items: [
        { id: uid("detail"), label: "Address", value: "Mariahilfer Strasse 123, 1060 Vienna" },
        { id: uid("detail"), label: "Phone", value: "+43 1 234 5678" },
        { id: uid("detail"), label: "Email", value: "info@engel-akademie.at" },
        { id: uid("detail"), label: "Office Hours", value: "Mon - Fri | 08:00 - 18:00" },
      ],
      asideTitle: "Fast Support",
      asideBody: "Visa letters, level questions, and intake guidance are handled by the admissions team.",
    };
  }

  if (type === "form") {
    return {
      eyebrow: "Lead Capture",
      title: "Contact Form",
      subtitle: "Collect structured enquiries from students and partners.",
      submitLabel: "Send Message",
      successHint: "Your message goes directly to the admissions inbox.",
      fields: [
        { id: uid("field"), type: "text", label: "Full name", placeholder: "Your full name", required: true, width: "half" },
        { id: uid("field"), type: "email", label: "Email", placeholder: "name@example.com", required: true, width: "half" },
        { id: uid("field"), type: "tel", label: "Phone", placeholder: "+43 ...", required: false, width: "half" },
        { id: uid("field"), type: "select", label: "Need help with", placeholder: "Choose a topic", required: true, width: "half", options: ["Course advice", "Visa support", "Placement test", "Pricing"] },
        { id: uid("field"), type: "textarea", label: "Message", placeholder: "Tell us what you need", required: true, width: "full" },
      ],
    };
  }

  if (type === "faq") {
    return {
      eyebrow: "Questions",
      title: "Frequently Asked Questions",
      subtitle: "Keep high-intent answers close to the form.",
      items: [
        { id: uid("faq"), question: "How fast do you reply?", answer: "Most enquiries receive a response within one business day." },
        { id: uid("faq"), question: "Can I ask about visa documents?", answer: "Yes. Mention your intake date and we will guide you through the required paperwork." },
        { id: uid("faq"), question: "Do you support placement tests?", answer: "Yes. The team can schedule your level assessment before enrolment." },
      ],
    };
  }

  return {
    eyebrow: "Visit the Campus",
    title: "Location & Arrival",
    subtitle: "Help students understand where to go before they submit the form.",
    mapLabel: "Vienna Campus Map",
    address: "Mariahilfer Strasse 123, 1060 Vienna",
    directions: "U3 Neubaugasse, 4-minute walk",
    note: "The entrance is next to the bookstore. Reception is on the second floor.",
  };
}

function normalizeBlock(block, index) {
  const fallbackType = elementLibrary.some((item) => item.type === block?.type) ? block.type : "details";
  const defaults = getDefaultData(fallbackType);

  return {
    id: block?.id ?? `${fallbackType}-${index + 1}`,
    type: fallbackType,
    ...defaults,
    ...block,
    stats: Array.isArray(block?.stats) && block.stats.length ? block.stats : defaults.stats,
    items: Array.isArray(block?.items) && block.items.length ? block.items : defaults.items,
    fields: Array.isArray(block?.fields) && block.fields.length ? block.fields : defaults.fields,
  };
}

function createBlock(type) {
  return {
    id: uid(type),
    type,
    ...getDefaultData(type),
  };
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-[#f55b2a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df4b1d] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : "Save contact page"}
    </button>
  );
}

function SectionHeader({ eyebrow, title, detail, action }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#f55b2a]">{eyebrow}</p>
        <h2 className="mt-2 text-lg font-extrabold tracking-tight text-slate-950">{title}</h2>
        {detail ? <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p> : null}
      </div>
      {action}
    </div>
  );
}

function InspectorInput({ label, value, onChange, textarea = false, placeholder }) {
  const Component = textarea ? "textarea" : "input";

  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <Component
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#f55b2a] focus:bg-white ${textarea ? "min-h-28 resize-y" : ""}`}
      />
    </label>
  );
}

function PreviewHero({ block, selected, onSelect }) {
  return (
    <section
      onClick={onSelect}
      className={`cursor-pointer rounded-[2rem] border p-8 transition ${selected ? "border-[#f55b2a] shadow-[0_0_0_4px_rgba(245,91,42,0.14)]" : "border-slate-200"} bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_42%,#eef4ff_100%)]`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-[#f55b2a]/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f55b2a]">
          {block.badge}
        </span>
        <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white">{block.highlight}</span>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{block.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{block.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="rounded-full bg-[#f55b2a] px-5 py-3 text-sm font-bold text-white">
              {block.ctaPrimary}
            </button>
            <button type="button" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700">
              {block.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="grid gap-3 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-lg shadow-slate-900/5">
          {(block.stats ?? []).map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-xl font-black text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewDetails({ block, selected, onSelect }) {
  return (
    <section
      onClick={onSelect}
      className={`cursor-pointer rounded-[2rem] border bg-white p-8 transition ${selected ? "border-[#f55b2a] shadow-[0_0_0_4px_rgba(245,91,42,0.14)]" : "border-slate-200"}`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">{block.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{block.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{block.subtitle}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {(block.items ?? []).map((item) => (
              <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">Service Note</p>
          <h3 className="mt-4 text-2xl font-black">{block.asideTitle}</h3>
          <p className="mt-4 text-sm leading-7 text-white/75">{block.asideBody}</p>
        </aside>
      </div>
    </section>
  );
}

function PreviewForm({ block, selected, onSelect }) {
  return (
    <section
      onClick={onSelect}
      className={`cursor-pointer rounded-[2rem] border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-8 transition ${selected ? "border-[#f55b2a] shadow-[0_0_0_4px_rgba(245,91,42,0.14)]" : "border-slate-200"}`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">{block.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{block.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{block.subtitle}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {(block.fields ?? []).map((field) => {
              const wide = field.width === "full" || field.type === "textarea";

              return (
                <div key={field.id} className={wide ? "md:col-span-2" : ""}>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span>{field.label}</span>
                    {field.required ? <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-rose-600">Required</span> : null}
                  </div>
                  {field.type === "textarea" ? (
                    <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" placeholder={field.placeholder} />
                  ) : field.type === "select" ? (
                    <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
                      <option>{field.placeholder || "Select one"}</option>
                      {(field.options ?? []).map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" placeholder={field.placeholder} type={field.type} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              {block.submitLabel}
            </button>
            <p className="text-sm text-slate-500">{block.successHint}</p>
          </div>
        </div>
        <aside className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-2xl bg-emerald-50 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Form Logic</p>
            <p className="mt-2 text-sm leading-6 text-emerald-900">{(block.fields ?? []).filter((field) => field.required).length} required fields configured</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Layout</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">Mix half-width and full-width inputs to control rhythm.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function PreviewFaq({ block, selected, onSelect }) {
  return (
    <section
      onClick={onSelect}
      className={`cursor-pointer rounded-[2rem] border bg-white p-8 transition ${selected ? "border-[#f55b2a] shadow-[0_0_0_4px_rgba(245,91,42,0.14)]" : "border-slate-200"}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">{block.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{block.title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{block.subtitle}</p>
      <div className="mt-8 grid gap-4">
        {(block.items ?? []).map((item, index) => (
          <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Question {index + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{item.question}</h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500">
                <i className="fa-solid fa-plus" />
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PreviewMap({ block, selected, onSelect }) {
  return (
    <section
      onClick={onSelect}
      className={`cursor-pointer rounded-[2rem] border bg-white p-8 transition ${selected ? "border-[#f55b2a] shadow-[0_0_0_4px_rgba(245,91,42,0.14)]" : "border-slate-200"}`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">{block.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{block.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{block.subtitle}</p>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_48%,#f8fafc_100%)]">
            <div className="flex h-72 items-center justify-center border-b border-slate-200 bg-[radial-gradient(circle_at_20%_20%,rgba(245,91,42,0.16),transparent_25%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.18),transparent_24%)]">
              <div className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-lg shadow-slate-900/10">{block.mapLabel}</div>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Address</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-800">{block.address}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Transit</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-800">{block.directions}</p>
              </div>
            </div>
          </div>
        </div>
        <aside className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Arrival Note</p>
          <p className="mt-4 text-sm leading-7 text-white/80">{block.note}</p>
        </aside>
      </div>
    </section>
  );
}

function PreviewBlock({ block, selected, onSelect }) {
  if (block.type === "hero") return <PreviewHero block={block} selected={selected} onSelect={onSelect} />;
  if (block.type === "details") return <PreviewDetails block={block} selected={selected} onSelect={onSelect} />;
  if (block.type === "form") return <PreviewForm block={block} selected={selected} onSelect={onSelect} />;
  if (block.type === "faq") return <PreviewFaq block={block} selected={selected} onSelect={onSelect} />;
  return <PreviewMap block={block} selected={selected} onSelect={onSelect} />;
}

function ListEditor({ items, onAdd, onMove, onRemove, renderItem, emptyLabel }) {
  return (
    <div className="grid gap-3">
      {items?.length ? (
        items.map((item, index) => (
          <div key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Item {index + 1}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => onMove(index, index - 1)} disabled={index === 0} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 disabled:opacity-40">
                  Up
                </button>
                <button type="button" onClick={() => onMove(index, index + 1)} disabled={index === items.length - 1} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 disabled:opacity-40">
                  Down
                </button>
                <button type="button" onClick={() => onRemove(index)} className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
                  Remove
                </button>
              </div>
            </div>
            {renderItem(item, index)}
          </div>
        ))
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">{emptyLabel}</div>
      )}
      <button type="button" onClick={onAdd} className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#f55b2a] hover:bg-[#fff7f3]">
        Add item
      </button>
    </div>
  );
}

export function ContactPageEditor({ initialBlocks }) {
  const [blocks, setBlocks] = useState(() =>
    initialBlocks?.length
      ? initialBlocks.map(normalizeBlock)
      : [normalizeBlock(createBlock("hero"), 0), normalizeBlock(createBlock("details"), 1), normalizeBlock(createBlock("form"), 2)]
  );
  const [selectedId, setSelectedId] = useState(initialBlocks?.[0]?.id ?? null);
  const [dragState, setDragState] = useState(null);
  const [query, setQuery] = useState("");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [state, formAction] = useActionState(saveContactPageAction, initialState);
  const deferredQuery = useDeferredValue(query);

  const selectedBlock = useMemo(
    () => blocks.find((block) => block.id === selectedId) ?? blocks[0] ?? null,
    [blocks, selectedId]
  );

  const filteredElements = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    if (!needle) return elementLibrary;
    return elementLibrary.filter((item) => [item.label, item.description, item.category, item.type].some((value) => value.toLowerCase().includes(needle)));
  }, [deferredQuery]);

  function updateSelected(patch) {
    if (!selectedBlock) return;
    setBlocks((prev) => prev.map((block) => (block.id === selectedBlock.id ? { ...block, ...patch } : block)));
  }

  function updateSelectedCollection(key, updater) {
    if (!selectedBlock) return;
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== selectedBlock.id) return block;
        return { ...block, [key]: updater(Array.isArray(block[key]) ? block[key] : []) };
      })
    );
  }

  function insertPreparedBlock(block, targetIndex = blocks.length) {
    setBlocks((prev) => {
      const copy = [...prev];
      copy.splice(targetIndex, 0, block);
      return copy;
    });
    setSelectedId(block.id);
  }

  function addBlock(type, targetIndex = blocks.length) {
    insertPreparedBlock(normalizeBlock(createBlock(type), blocks.length), targetIndex);
  }

  function duplicateSelected() {
    if (!selectedBlock) return;

    const clone = {
      ...JSON.parse(JSON.stringify(selectedBlock)),
      id: uid(selectedBlock.type),
      fields: Array.isArray(selectedBlock.fields) ? selectedBlock.fields.map((field) => ({ ...field, id: uid("field") })) : selectedBlock.fields,
      items: Array.isArray(selectedBlock.items) ? selectedBlock.items.map((item) => ({ ...item, id: uid("item") })) : selectedBlock.items,
      stats: Array.isArray(selectedBlock.stats) ? selectedBlock.stats.map((item) => ({ ...item, id: uid("stat") })) : selectedBlock.stats,
    };

    const selectedIndex = blocks.findIndex((block) => block.id === selectedBlock.id);
    insertPreparedBlock(clone, selectedIndex + 1);
  }

  function removeSelected() {
    if (!selectedBlock) return;
    const nextBlocks = blocks.filter((block) => block.id !== selectedBlock.id);
    setBlocks(nextBlocks);
    setSelectedId(nextBlocks[0]?.id ?? null);
  }

  function moveBlock(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || toIndex >= blocks.length) return;
    setBlocks((prev) => {
      const next = [...prev];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      return next;
    });
  }

  function handleDrop(targetIndex) {
    if (!dragState) return;
    if (dragState.kind === "library") addBlock(dragState.type, targetIndex);
    if (dragState.kind === "outline") moveBlock(dragState.index, targetIndex);
    setDragState(null);
  }

  const previewWidth = previewMode === "mobile" ? "mx-auto w-[390px]" : "w-full";

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
      <aside className="space-y-6">
        <section className="rounded-[2rem] border border-black/6 bg-white p-5 shadow-sm">
          <SectionHeader eyebrow="Elements" title="Library" detail="Search, drag, or click to insert advanced contact-page building blocks." />
          <label className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <i className="fa-solid fa-magnifying-glass text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search elements..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
            />
          </label>
          <div className="mt-5 grid gap-3">
            {filteredElements.map((item) => (
              <button
                key={item.type}
                type="button"
                draggable
                onDragStart={() => setDragState({ kind: "library", type: item.type })}
                onClick={() => addBlock(item.type)}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-[#f55b2a] hover:bg-[#fff7f3]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#f55b2a] shadow-sm">
                    <i className={item.icon} />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{item.category}</span>
                </div>
                <h3 className="mt-4 text-base font-extrabold text-slate-900">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
              </button>
            ))}
            {!filteredElements.length ? <div className="rounded-[1.5rem] border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-500">No matching elements found.</div> : null}
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/6 bg-white p-5 shadow-sm">
          <SectionHeader eyebrow="Structure" title="Page Outline" detail="Use the outline to reorder sections without changing the public page styling." />
          <div className="mt-5 space-y-3">
            {blocks.map((block, index) => {
              const active = block.id === selectedId;
              return (
                <div key={block.id}>
                  <div onDragOver={(event) => event.preventDefault()} onDrop={() => handleDrop(index)} className="h-2 rounded-full bg-transparent hover:bg-[#f55b2a]/15" />
                  <button
                    type="button"
                    draggable
                    onDragStart={() => setDragState({ kind: "outline", index })}
                    onClick={() => setSelectedId(block.id)}
                    className={`flex w-full items-center gap-3 rounded-[1.5rem] border px-4 py-4 text-left transition ${
                      active ? "border-[#f55b2a] bg-[#fff5f1] shadow-lg shadow-[#f55b2a]/10" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                      <i className={elementLibrary.find((item) => item.type === block.type)?.icon ?? "fa-regular fa-square"} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold text-slate-900">{block.title}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-slate-400">{block.type}</span>
                    </span>
                    <i className="fa-solid fa-grip-lines text-slate-300" />
                  </button>
                </div>
              );
            })}
            <div onDragOver={(event) => event.preventDefault()} onDrop={() => handleDrop(blocks.length)} className="h-2 rounded-full bg-transparent hover:bg-[#f55b2a]/15" />
          </div>
        </section>
      </aside>

      <section className="rounded-[2rem] border border-black/6 bg-[#eef2f7] p-4 shadow-sm">
        <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeader eyebrow="Preview" title="Live Page View" detail="A full-page preview inside the editor. Click any section to edit it." />
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-full bg-slate-100 p-1">
                {["desktop", "mobile"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPreviewMode(mode)}
                    className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${previewMode === mode ? "bg-slate-950 text-white" : "text-slate-600"}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {blocks.length} sections
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#dbe3ef]">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="ml-4 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-500">/contact</div>
            </div>
            <div className="max-h-[calc(100vh-18rem)] overflow-y-auto p-4">
              <div className={`${previewWidth} transition-all duration-300`}>
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8fafc] shadow-2xl shadow-slate-900/8">
                  <div className="border-b border-slate-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">DeutschAkademie Engel</p>
                        <p className="mt-1 text-sm font-bold text-slate-900">Contact Page Preview</p>
                      </div>
                      <div className="rounded-full bg-[#fff1eb] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f55b2a]">Editor Preview</div>
                    </div>
                  </div>
                  <div className="grid gap-6 p-6">
                    {blocks.map((block) => (
                      <PreviewBlock key={block.id} block={block} selected={block.id === selectedId} onSelect={() => setSelectedId(block.id)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form action={formAction} className="mt-4 rounded-[1.75rem] border border-white/80 bg-white p-5 shadow-sm">
          <input type="hidden" name="blocks" value={JSON.stringify(blocks)} readOnly />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">Publish Controls</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Only the editor experience changes here. The existing public Connect Us page styling remains untouched.</p>
            </div>
            <SaveButton />
          </div>
          {state.message ? (
            <div className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {state.message}
            </div>
          ) : null}
        </form>
      </section>

      <aside className="rounded-[2rem] border border-black/6 bg-white p-5 shadow-sm">
        <SectionHeader
          eyebrow="Inspector"
          title={selectedBlock ? selectedBlock.title : "No selection"}
          detail={selectedBlock ? `Edit the ${selectedBlock.type} block configuration.` : "Select a section from the preview or outline."}
          action={
            selectedBlock ? (
              <div className="flex items-center gap-2">
                <button type="button" onClick={duplicateSelected} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">
                  Duplicate
                </button>
                <button type="button" onClick={removeSelected} className="rounded-full bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
                  Remove
                </button>
              </div>
            ) : null
          }
        />

        {selectedBlock ? (
          <div className="mt-6 max-h-[calc(100vh-13rem)] space-y-5 overflow-y-auto pr-1">
            {selectedBlock.type !== "hero" ? (
              <InspectorInput label="Eyebrow" value={selectedBlock.eyebrow} onChange={(value) => updateSelected({ eyebrow: value })} />
            ) : (
              <InspectorInput label="Badge" value={selectedBlock.badge} onChange={(value) => updateSelected({ badge: value })} />
            )}

            <InspectorInput label="Title" value={selectedBlock.title} onChange={(value) => updateSelected({ title: value })} />
            <InspectorInput label="Supporting Text" value={selectedBlock.subtitle} onChange={(value) => updateSelected({ subtitle: value })} textarea />

            {selectedBlock.type === "hero" ? (
              <>
                <InspectorInput label="Highlight Pill" value={selectedBlock.highlight} onChange={(value) => updateSelected({ highlight: value })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <InspectorInput label="Primary CTA" value={selectedBlock.ctaPrimary} onChange={(value) => updateSelected({ ctaPrimary: value })} />
                  <InspectorInput label="Secondary CTA" value={selectedBlock.ctaSecondary} onChange={(value) => updateSelected({ ctaSecondary: value })} />
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">Hero Stats</h3>
                    <button
                      type="button"
                      onClick={() => updateSelectedCollection("stats", (items) => [...items, { id: uid("stat"), label: "New Stat", value: "Value" }])}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700"
                    >
                      Add stat
                    </button>
                  </div>
                  <ListEditor
                    items={selectedBlock.stats}
                    emptyLabel="No stats configured."
                    onAdd={() => updateSelectedCollection("stats", (items) => [...items, { id: uid("stat"), label: "New Stat", value: "Value" }])}
                    onMove={(from, to) =>
                      updateSelectedCollection("stats", (items) => {
                        if (to < 0 || to >= items.length) return items;
                        const next = [...items];
                        const [item] = next.splice(from, 1);
                        next.splice(to, 0, item);
                        return next;
                      })
                    }
                    onRemove={(index) => updateSelectedCollection("stats", (items) => items.filter((_, itemIndex) => itemIndex !== index))}
                    renderItem={(item, index) => (
                      <div className="grid gap-3">
                        <InspectorInput
                          label="Label"
                          value={item.label}
                          onChange={(value) =>
                            updateSelectedCollection("stats", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, label: value } : current)))
                          }
                        />
                        <InspectorInput
                          label="Value"
                          value={item.value}
                          onChange={(value) =>
                            updateSelectedCollection("stats", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, value } : current)))
                          }
                        />
                      </div>
                    )}
                  />
                </div>
              </>
            ) : null}

            {selectedBlock.type === "details" ? (
              <>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">Detail Cards</h3>
                  </div>
                  <ListEditor
                    items={selectedBlock.items}
                    emptyLabel="No detail cards configured."
                    onAdd={() => updateSelectedCollection("items", (items) => [...items, { id: uid("detail"), label: "Label", value: "Value" }])}
                    onMove={(from, to) =>
                      updateSelectedCollection("items", (items) => {
                        if (to < 0 || to >= items.length) return items;
                        const next = [...items];
                        const [item] = next.splice(from, 1);
                        next.splice(to, 0, item);
                        return next;
                      })
                    }
                    onRemove={(index) => updateSelectedCollection("items", (items) => items.filter((_, itemIndex) => itemIndex !== index))}
                    renderItem={(item, index) => (
                      <div className="grid gap-3">
                        <InspectorInput
                          label="Label"
                          value={item.label}
                          onChange={(value) => updateSelectedCollection("items", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, label: value } : current)))}
                        />
                        <InspectorInput
                          label="Value"
                          value={item.value}
                          onChange={(value) => updateSelectedCollection("items", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, value } : current)))}
                        />
                      </div>
                    )}
                  />
                </div>
                <InspectorInput label="Aside Title" value={selectedBlock.asideTitle} onChange={(value) => updateSelected({ asideTitle: value })} />
                <InspectorInput label="Aside Body" value={selectedBlock.asideBody} onChange={(value) => updateSelected({ asideBody: value })} textarea />
              </>
            ) : null}

            {selectedBlock.type === "form" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InspectorInput label="Submit Label" value={selectedBlock.submitLabel} onChange={(value) => updateSelected({ submitLabel: value })} />
                  <InspectorInput label="Success Hint" value={selectedBlock.successHint} onChange={(value) => updateSelected({ successHint: value })} />
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800">Dynamic Fields</h3>
                    <button
                      type="button"
                      onClick={() =>
                        updateSelectedCollection("fields", (items) => [
                          ...items,
                          { id: uid("field"), type: "text", label: "New field", placeholder: "Type here", required: false, width: "half" },
                        ])
                      }
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700"
                    >
                      Add field
                    </button>
                  </div>
                  <ListEditor
                    items={selectedBlock.fields}
                    emptyLabel="No fields configured."
                    onAdd={() =>
                      updateSelectedCollection("fields", (items) => [
                        ...items,
                        { id: uid("field"), type: "text", label: "New field", placeholder: "Type here", required: false, width: "half" },
                      ])
                    }
                    onMove={(from, to) =>
                      updateSelectedCollection("fields", (items) => {
                        if (to < 0 || to >= items.length) return items;
                        const next = [...items];
                        const [item] = next.splice(from, 1);
                        next.splice(to, 0, item);
                        return next;
                      })
                    }
                    onRemove={(index) => updateSelectedCollection("fields", (items) => items.filter((_, itemIndex) => itemIndex !== index))}
                    renderItem={(item, index) => (
                      <div className="grid gap-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <InspectorInput
                            label="Label"
                            value={item.label}
                            onChange={(value) => updateSelectedCollection("fields", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, label: value } : current)))}
                          />
                          <InspectorInput
                            label="Placeholder"
                            value={item.placeholder}
                            onChange={(value) => updateSelectedCollection("fields", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, placeholder: value } : current)))}
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-slate-700">Field Type</span>
                            <select
                              value={item.type}
                              onChange={(event) =>
                                updateSelectedCollection("fields", (items) =>
                                  items.map((current, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...current,
                                          type: event.target.value,
                                          width: event.target.value === "textarea" ? "full" : current.width ?? "half",
                                        }
                                      : current
                                  )
                                )
                              }
                              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#f55b2a] focus:bg-white"
                            >
                              {fieldTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-slate-700">Width</span>
                            <select
                              value={item.width ?? "half"}
                              onChange={(event) =>
                                updateSelectedCollection("fields", (items) =>
                                  items.map((current, itemIndex) => (itemIndex === index ? { ...current, width: event.target.value } : current))
                                )
                              }
                              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#f55b2a] focus:bg-white"
                            >
                              <option value="half">Half width</option>
                              <option value="full">Full width</option>
                            </select>
                          </label>
                        </div>
                        {item.type === "select" ? (
                          <InspectorInput
                            label="Options"
                            value={(item.options ?? []).join(", ")}
                            onChange={(value) =>
                              updateSelectedCollection("fields", (items) =>
                                items.map((current, itemIndex) =>
                                  itemIndex === index
                                    ? { ...current, options: value.split(",").map((option) => option.trim()).filter(Boolean) }
                                    : current
                                )
                              )
                            }
                            placeholder="Option A, Option B, Option C"
                          />
                        ) : null}
                        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                          <input
                            type="checkbox"
                            checked={Boolean(item.required)}
                            onChange={(event) =>
                              updateSelectedCollection("fields", (items) =>
                                items.map((current, itemIndex) => (itemIndex === index ? { ...current, required: event.target.checked } : current))
                              )
                            }
                          />
                          <span className="text-sm font-semibold text-slate-700">Required field</span>
                        </label>
                      </div>
                    )}
                  />
                </div>
              </>
            ) : null}

            {selectedBlock.type === "faq" ? (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">FAQ Items</h3>
                </div>
                <ListEditor
                  items={selectedBlock.items}
                  emptyLabel="No FAQ items configured."
                  onAdd={() => updateSelectedCollection("items", (items) => [...items, { id: uid("faq"), question: "New question", answer: "New answer" }])}
                  onMove={(from, to) =>
                    updateSelectedCollection("items", (items) => {
                      if (to < 0 || to >= items.length) return items;
                      const next = [...items];
                      const [item] = next.splice(from, 1);
                      next.splice(to, 0, item);
                      return next;
                    })
                  }
                  onRemove={(index) => updateSelectedCollection("items", (items) => items.filter((_, itemIndex) => itemIndex !== index))}
                  renderItem={(item, index) => (
                    <div className="grid gap-3">
                      <InspectorInput
                        label="Question"
                        value={item.question}
                        onChange={(value) => updateSelectedCollection("items", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, question: value } : current)))}
                      />
                      <InspectorInput
                        label="Answer"
                        value={item.answer}
                        onChange={(value) => updateSelectedCollection("items", (items) => items.map((current, itemIndex) => (itemIndex === index ? { ...current, answer: value } : current)))}
                        textarea
                      />
                    </div>
                  )}
                />
              </div>
            ) : null}

            {selectedBlock.type === "map" ? (
              <>
                <InspectorInput label="Map Label" value={selectedBlock.mapLabel} onChange={(value) => updateSelected({ mapLabel: value })} />
                <InspectorInput label="Address" value={selectedBlock.address} onChange={(value) => updateSelected({ address: value })} textarea />
                <InspectorInput label="Directions" value={selectedBlock.directions} onChange={(value) => updateSelected({ directions: value })} />
                <InspectorInput label="Arrival Note" value={selectedBlock.note} onChange={(value) => updateSelected({ note: value })} textarea />
              </>
            ) : null}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-6 text-slate-500">
            Select a section from the preview or the page outline to start editing.
          </div>
        )}
      </aside>
    </div>
  );
}
