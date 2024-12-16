export default function Footer() {
  return (
    <footer className="border-t border-black/[.1] dark:border-white/[.1] py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Your App. All rights reserved.
      </div>
    </footer>
  );
}