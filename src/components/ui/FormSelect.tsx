"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface FormSelectOption {
  value: string;
  label: string;
  title?: string;
}

interface FormSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: FormSelectOption[];
  placeholder: string;
  disabled?: boolean;
  fieldClassName?: string;
}

const LIST_MAX_HEIGHT = 176;

export function FormSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  fieldClassName = "",
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, openUp: false });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);
  const displayLabel = selected?.label ?? placeholder;

  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const gutter = 12;
    const width = Math.min(rect.width, window.innerWidth - gutter * 2);
    const left = Math.min(Math.max(gutter, rect.left), window.innerWidth - width - gutter);
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < LIST_MAX_HEIGHT + 12 && rect.top > LIST_MAX_HEIGHT + 12;
    const top = openUp ? rect.top - LIST_MAX_HEIGHT - 4 : rect.bottom + 4;

    setCoords({ top, left, width, openUp });
  }, []);

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const openList = () => {
    if (disabled) return;
    updatePosition();
    setOpen(true);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={selected?.title ?? selected?.label ?? placeholder}
        onClick={() => (open ? setOpen(false) : openList())}
        className={`${fieldClassName} flex w-full items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:bg-[#f7f5f2] disabled:text-charcoal/45 ${
          !value ? "text-charcoal/50" : "text-charcoal"
        }`}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-charcoal/65 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={listRef}
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
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  title={option.title ?? option.label}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full truncate px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-cta/15 font-medium text-charcoal"
                      : "text-charcoal hover:bg-cta/10"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
