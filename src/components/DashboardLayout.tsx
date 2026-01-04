export default function DashboardLayout({
  title,
  children,
  onLogout,
}: {
  title: string;
  children: React.ReactNode;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden
      bg-gradient-to-br from-[#050816] via-[#120b2f] to-[#0b051a] text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px]" />

      {/* HEADER */}
      <header className="relative z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LEFT: TITLE */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-fuchsia-500 rounded-full" />
            <h1 className="text-lg md:text-xl font-bold tracking-wide">
              {title}
            </h1>
          </div>

          {/* RIGHT: LOGOUT */}
          <button
            onClick={onLogout}
            className="
              px-5 py-2 rounded-xl font-semibold
              bg-gradient-to-r from-rose-500 via-pink-600 to-fuchsia-600
              hover:scale-105 transition-transform
              shadow-lg shadow-pink-600/30
            "
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 animate-fadeUp">
        {children}
      </main>
    </div>
  );
}
