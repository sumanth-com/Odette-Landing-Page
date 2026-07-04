import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ivory py-10 md:py-12">
      <div className="page-container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="font-display text-2xl tracking-wide text-charcoal">iFranchise</span>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-taupe">
              Franchise Consulting
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="tel:+919129130303"
              className="flex items-center gap-2 text-sm text-taupe transition-colors duration-300 hover:text-gold"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              +91 91291 30303
            </a>
            <a
              href="mailto:contact@ifranchise.in"
              className="flex items-center gap-2 text-sm text-taupe transition-colors duration-300 hover:text-gold"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              contact@ifranchise.in
            </a>
            <a
              href="https://www.ifranchise.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-taupe transition-colors duration-300 hover:text-gold"
            >
              www.ifranchise.in
            </a>
          </div>
        </div>

        <div className="divider-line mt-10" aria-hidden="true" />

        <p className="mt-8 text-center text-xs text-taupe/80">
          &copy; {new Date().getFullYear()} iFranchise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
