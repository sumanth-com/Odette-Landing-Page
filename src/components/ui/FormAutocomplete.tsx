"use client";

import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

export interface FormAutocompleteOption {
  value: string;
  label: string;
  title?: string;
}

interface FormAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: FormAutocompleteOption[];
  placeholder: string;
  disabled?: boolean;
  fieldClassName?: string;
  inputClassName?: string;
  allowCustom?: boolean;
  maxSuggestions?: number;
  emptyMessage?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

const LIST_MAX_HEIGHT = 200;

function filterOptions(
  options: FormAutocompleteOption[],
  query: string,
  maxSuggestions: number
): FormAutocompleteOption[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return options.slice(0, maxSuggestions);
  }

  const startsWith: FormAutocompleteOption[] = [];
  const includes: FormAutocompleteOption[] = [];

  for (const option of options) {
    const label = option.label.toLowerCase();
    const value = option.value.toLowerCase();
    if (label.startsWith(normalized) || value.startsWith(normalized)) {
      startsWith.push(option);
    } else if (label.includes(normalized) || value.includes(normalized)) {
      includes.push(option);
    }
  }

  return [...startsWith, ...includes].slice(0, maxSuggestions);
}

export function FormAutocomplete({
  id,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  fieldClassName = "",
  inputClassName = "",
  allowCustom = true,
  maxSuggestions = 12,
  emptyMessage = "No matches — keep typing your own",
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: FormAutocompleteProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const suggestions = useMemo(
    () => filterOptions(options, query, maxSuggestions),
    [options, query, maxSuggestions]
  );

  const updatePosition = useCallback(() => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;

    const gutter = 12;
    const width = Math.min(Math.max(rect.width, 160), window.innerWidth - gutter * 2);
    const left = Math.min(Math.max(gutter, rect.left), window.innerWidth - width - gutter);
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < LIST_MAX_HEIGHT + 12 && rect.top > LIST_MAX_HEIGHT + 12;
    const top = openUp ? rect.top - LIST_MAX_HEIGHT - 4 : rect.bottom + 4;

    setCoords({ top, left, width });
  }, []);

  useEffect(() => {
    if (!open) return;

    updatePosition();
    setHighlightIndex(0);

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, updatePosition, suggestions.length]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || listRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
      if (!allowCustom && value) {
        setQuery(value);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, allowCustom, value]);

  const commitValue = (next: string) => {
    onChange(next);
    setQuery(next);
    setOpen(false);
  };

  const handleSelect = (option: FormAutocompleteOption) => {
    commitValue(option.value);
  };

  const handleInputChange = (next: string) => {
    setQuery(next);
    onChange(next);
    setOpen(true);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setOpen(true);
      return;
    }

    if (!open) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((index) =>
        suggestions.length ? (index + 1) % suggestions.length : 0
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((index) =>
        suggestions.length ? (index - 1 + suggestions.length) % suggestions.length : 0
      );
      return;
    }

    if (event.key === "Enter" && suggestions[highlightIndex]) {
      event.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    }
  };

  return (
    <>
      <div ref={rootRef} className={`relative min-w-0 ${fieldClassName}`}>
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          value={query}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (disabled) return;
            updatePosition();
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`h-full w-full min-w-0 bg-transparent text-left outline-none disabled:cursor-not-allowed ${inputClassName}`}
        />
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label="Show suggestions"
          onClick={() => {
            if (disabled) return;
            if (open) {
              setOpen(false);
              return;
            }
            updatePosition();
            setOpen(true);
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 right-2 flex items-center text-charcoal/65 disabled:cursor-not-allowed"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>
      </div>

      {open &&
        !disabled &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            className="luxury-shadow-lg fixed z-[200] overflow-y-auto rounded-xl border border-border bg-white py-1"
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
              maxHeight: LIST_MAX_HEIGHT,
            }}
          >
            {suggestions.length === 0 ? (
              <p className="px-3 py-2 text-xs text-charcoal/55">{emptyMessage}</p>
            ) : (
              suggestions.map((option, index) => {
                const isSelected = option.value === value;
                const isHighlighted = index === highlightIndex;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    title={option.title ?? option.label}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => handleSelect(option)}
                    className={`w-full truncate px-3 py-2 text-left text-sm transition-colors duration-150 ${
                      isHighlighted || isSelected
                        ? "bg-cta/15 font-medium text-charcoal"
                        : "text-charcoal hover:bg-cta/10"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })
            )}
          </div>,
          document.body
        )}
    </>
  );
}
