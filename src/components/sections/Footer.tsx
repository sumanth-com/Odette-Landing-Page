export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-3">
      <div className="page-container">
        <p className="text-center text-[11px] text-taupe/80">
          &copy; {new Date().getFullYear()} iFranchise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
