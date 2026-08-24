export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Logic Ten Electrical Pty Ltd. All rights reserved.</p>
        <p>
          Licence: <span className="text-amber-600 dark:text-amber-400 font-bold">497422C</span> | ABN: <span className="text-slate-700 dark:text-slate-300 font-bold">28 613 872 183</span>
        </p>
      </div>
    </footer>
  );
}