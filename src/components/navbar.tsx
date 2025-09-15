import Link from "next/link";
import ThemeToggle from "../components/theme-toggle";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white/80 dark:bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="font-semibold">Limbus Info</Link>
          <Link href="/identities" className="hover:underline">인격</Link>
          <Link href="/egos" className="hover:underline">E.G.O</Link>
          <Link href="/tierdecks" className="hover:underline">티어덱</Link>
          <Link href="/stages" className="hover:underline">공략(예정)</Link>
          <Link href="/party" className="hover:underline">파티(예정)</Link>
          <Link href="/admin" className="hover:underline text-blue-600 dark:text-blue-400">관리</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}


