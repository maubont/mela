import Link from "next/link";

import { navigation, siteConfig } from "@/lib/config/site";

import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(247,241,233,0.96)] shadow-[0_18px_40px_-34px_rgba(46,26,31,0.28)] backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.04em]">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground">
            Salón privado
          </span>
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="rounded-full px-6">
          <Link href="/sign-in">Entrar</Link>
        </Button>
      </div>
    </header>
  );
}
