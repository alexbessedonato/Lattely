import { useId, useRef, useState } from "react";
import type { SearchPickerProps } from "@/features/discover-cafes/types/search-picker-props";

export function SearchPicker({
  label,
  value,
  options,
  searchable = false,
  onChange,
}: SearchPickerProps) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState("");
  const selected = options.find((option) => option.value === value);
  const matchingOptions = options.filter((option) =>
    option.label
      .toLocaleLowerCase()
      .includes(filter.trim().toLocaleLowerCase()),
  );

  return (
    <div className="search-field">
      <span id={`${id}-label`} className="search-field-label">
        {label}
      </span>
      <button
        type="button"
        className="search-picker-trigger"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="dialog"
        aria-controls={`${id}-dialog`}
        onClick={() => {
          setFilter("");
          dialog.current?.showModal();
        }}
      >
        <span id={`${id}-value`}>{selected?.label}</span>
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <dialog
        ref={dialog}
        id={`${id}-dialog`}
        className="search-picker-dialog"
        aria-labelledby={`${id}-title`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="search-picker-panel">
          <div className="search-picker-heading">
            <h2 id={`${id}-title`}>
              {label === "HOW FAR?" ? "How far?" : "Choose a search center"}
            </h2>
            <button
              type="button"
              aria-label="Close picker"
              onClick={() => dialog.current?.close()}
            >
              ✕
            </button>
          </div>
          {searchable && (
            <input
              className="search-picker-filter"
              aria-label="Filter search centers"
              placeholder="Find a barri…"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          )}
          <div
            className="search-picker-options"
            onKeyDown={(event) => {
              if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
                return;
              const buttons = Array.from(
                event.currentTarget.querySelectorAll("button"),
              );
              const current = buttons.indexOf(
                event.target as HTMLButtonElement,
              );
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? buttons.length - 1
                    : (current +
                        (event.key === "ArrowDown" ? 1 : -1) +
                        buttons.length) %
                      buttons.length;
              event.preventDefault();
              buttons[next]?.focus();
            }}
          >
            {matchingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  dialog.current?.close();
                }}
              >
                <span>{option.label}</span>
                {option.value === value && <span aria-hidden="true">✓</span>}
              </button>
            ))}
            {matchingOptions.length === 0 && (
              <p role="status">No matching centers. Try another name.</p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
