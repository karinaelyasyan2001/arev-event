export default function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      {/* Logo */}
      <a
        href="/"
        className="text-2xl font-bold tracking-tight"
      >
        ☀️ ԱՐԵՎ ԻՎԵՆԹ
      </a>

      {/* Navigation */}
      <nav className="hidden items-center gap-8 md:flex">
        <a
          href="#events"
          className="transition hover:text-[#f28c28]"
        >
          Միջոցառումներ
        </a>

        <a
          href="#services"
          className="transition hover:text-[#f28c28]"
        >
          Ծառայություններ
        </a>

        <a
          href="#partners"
          className="transition hover:text-[#f28c28]"
        >
          Մասնագետներ
        </a>

        <a
          href="#tools"
          className="transition hover:text-[#f28c28]"
        >
          Գործիքներ
        </a>

        <a
          href="#knowledge"
          className="transition hover:text-[#f28c28]"
        >
          Գիտելիք
        </a>
      </nav>

      {/* Login */}
      <a
        href="/login"
        className="rounded-full border border-[#252525]/15 px-5 py-2.5 text-sm font-medium transition hover:bg-[#252525] hover:text-white"
      >
        Մուտք
      </a>
    </header>
  );
}