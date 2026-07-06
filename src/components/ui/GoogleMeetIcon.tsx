/** Google Meet icon — monochrome for button use. */
export function GoogleMeetIcon({ className = "h-5 w-5 shrink-0 text-charcoal" }: { className?: string }) {
  return (
    <svg
      className={`block shrink-0 overflow-hidden ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 87.5 72"
      aria-hidden="true"
    >
      <path d="M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z" />
      <path d="M0 51.5V66c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z" />
      <path d="M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z" />
      <path d="M20.5 20.5H0v31h20.5z" />
      <path d="M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.135 4.85-2.37V11c0-2.535-2.945-3.925-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z" />
      <path d="M63.5 0h-43v20.5h29V36l20-16.57V6c0-3.315-2.685-6-6-6z" />
    </svg>
  );
}
