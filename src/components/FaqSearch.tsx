"use client";

import { useMemo, useState, useId } from "react";
import { IconSearch, IconChevron } from "@/components/icons";
import { faqCategories, faqIndex } from "@/content/faq";

/**
 * Searchable FAQ.
 *
 * Renders every question in the DOM up front so the content is fully
 * crawlable and works with JavaScript disabled; the search only filters what
 * is already there.
 */
export function FaqSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const searchId = useId();

  const normalised = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalised) return null;
    const terms = normalised.split(/\s+/).filter(Boolean);
    return faqIndex.filter((item) => {
      const haystack = `${item.q} ${item.a} ${item.category}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [normalised]);

  return (
    <div>
      {/* Search */}
      <div className="relative mx-auto max-w-2xl">
        <label htmlFor={searchId} className="sr-only">
          Search the FAQ
        </label>
        <IconSearch className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search — refunds, licence, access, printing…"
          className="w-full border border-ivory-200 bg-white py-4 pl-14 pr-5 text-[0.95rem] text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
        />
      </div>

      {/* Category jump links */}
      {!normalised ? (
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {faqCategories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="inline-block border border-navy/15 px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-navy transition-colors hover:border-gold hover:text-goldink sm:py-2"
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Results */}
      {normalised ? (
        <div className="mx-auto mt-10 max-w-3xl" aria-live="polite">
          <p className="mb-6 text-sm text-charcoal/60">
            {matches!.length === 0
              ? "No answers matched your search."
              : `${matches!.length} ${matches!.length === 1 ? "answer" : "answers"} for “${query.trim()}”`}
          </p>

          {matches!.length === 0 ? (
            <div className="border-l-2 border-gold bg-white p-6">
              <p className="text-[0.95rem] leading-relaxed text-charcoal/80">
                We could not find that. Try a different word, or{" "}
                <a href="/contact" className="text-goldink underline underline-offset-2">
                  send us a message
                </a>{" "}
                and we will answer directly.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-ivory-200 border-y border-ivory-200">
              {matches!.map((item) => (
                <li key={item.id}>
                  <Item
                    id={item.id}
                    question={item.q}
                    answer={item.a}
                    meta={item.category}
                    open={open === item.id}
                    onToggle={() => setOpen(open === item.id ? null : item.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-14 max-w-3xl space-y-14">
          {faqCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              style={{ scrollMarginTop: "7rem" }}
            >
              <h2 className="font-heading text-2xl text-navy">{category.title}</h2>
              <p className="mt-2 text-sm text-charcoal/60">{category.blurb}</p>
              <ul className="mt-6 divide-y divide-ivory-200 border-y border-ivory-200">
                {category.items.map((item, index) => {
                  const id = `${category.id}-${index}`;
                  return (
                    <li key={id}>
                      <Item
                        id={id}
                        question={item.q}
                        answer={item.a}
                        open={open === id}
                        onToggle={() => setOpen(open === id ? null : id)}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function Item({
  id,
  question,
  answer,
  meta,
  open,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  meta?: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`answer-${id}`}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span>
          {meta ? (
            <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-goldink">
              {meta}
            </span>
          ) : null}
          <span className="text-[0.98rem] font-medium leading-snug text-navy">
            {question}
          </span>
        </span>
        <IconChevron
          className={`mt-2 shrink-0 text-goldink transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`answer-${id}`}
        hidden={!open}
        className="pb-6 pr-10 text-[0.93rem] leading-relaxed text-charcoal/75"
      >
        {answer}
      </div>
    </>
  );
}
