import Link from "next/link";

import { navigation, siteConfig } from "@/lib/config/site";

import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(250,244,237,0.9)] shadow-[0_18px_44px_-36px_rgba(65,12,24,0.24)] backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-[family-name:var(--font-display)] text-[2rem] font-semibold tracking-[-0.04em] sm:text-3xl">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.34em]">
            Salón privado
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="h-11 rounded-full bg-primary px-5 text-sm text-primary-foreground hover:bg-primary/92 sm:h-12 sm:px-6 sm:text-base">
          <Link href="/sign-in">Solicitar acceso</Link>
        </Button>
      </div>
    </header>
  );
}
