import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coins, Lock, MessageCircleHeart, Shield, Sparkles, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

const experienceCards = [
  {
    icon: Sparkles,
    title: "Fotos y videos privados",
    description:
      "Sets exclusivos, drops especiales y contenido reservado para quienes quieren ver más.",
  },
  {
    icon: MessageCircleHeart,
    title: "Mensajes directos",
    description:
      "Chat privado, respuestas cercanas y una conversación mucho más personal que en redes abiertas.",
  },
  {
    icon: Video,
    title: "Encuentros a medida",
    description:
      "Videollamadas, solicitudes personalizadas y experiencias privadas según disponibilidad.",
  },
];

const flowSteps = [
  {
    step: "01",
    title: "Compra tokens",
    description: "Entra con tarjeta internacional, USDT, BTC o pago local en Colombia.",
  },
  {
    step: "02",
    title: "Desbloquea contenido",
    description: "Usa tus tokens para abrir fotos, videos, mensajes privados y propinas.",
  },
  {
    step: "03",
    title: "Reserva experiencias",
    description: "Cuando quieras ir más allá, puedes pedir atención privada o videollamadas.",
  },
];

const accessTiers = [
  {
    name: "Entrada privada",
    tokens: "120",
    price: "US$14.99",
    note: "Ideal para primeros accesos, mensajes y desbloqueos puntuales.",
  },
  {
    name: "Selección reservada",
    tokens: "385",
    price: "US$39.99",
    note: "La opción más equilibrada para contenido, mensajes privados y propinas.",
    featured: true,
  },
  {
    name: "Noche a medida",
    tokens: "1040",
    price: "US$89.99",
    note: "Pensada para videollamadas, solicitudes personalizadas y sesiones más privadas.",
  },
];

const melaTraits = [
  "Te responde cuando Melany no está libre en ese momento.",
  "Recuerda tus gustos y señales de interés.",
  "Te guía hacia el contenido o experiencia que buscas.",
  "Mantiene la conversación viva sin perder cercanía.",
];

const trustCards = [
  {
    icon: Lock,
    title: "Privacidad y control",
    description:
      "Verificación, acceso por niveles y reglas privadas para cuidar la experiencia de principio a fin.",
  },
  {
    icon: Shield,
    title: "Pago discreto",
    description:
      "CCBill, Segpay, USDT, BTC y flujo local en Colombia integrados en una compra más discreta.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-x-clip pb-24">
      <section className="container px-4 pt-6 sm:pt-8">
        <div className="salon-hero relative overflow-hidden rounded-[2.9rem] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[rgba(206,166,101,0.12)] blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[rgba(145,38,63,0.18)] blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
            <div className="relative z-10 max-w-xl space-y-8">
              <div className="salon-pill">Bogotá · disponible esta noche</div>

              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.34em] text-white/56">Acceso privado</p>
                <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
                  {siteConfig.name}
                </h1>
                <p className="text-base leading-8 text-white/76 sm:text-lg">
                  Fotos exclusivas, videos privados, chat directo, propinas, videollamadas y una
                  experiencia mucho más cercana para quienes quieren entrar más allá de lo público.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white px-6 text-foreground hover:bg-white/90"
                >
                  <Link href="/sign-in">
                    Entrar al acceso privado
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/28 px-6 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="#experiencias">Ver experiencias</Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="salon-glass-card rounded-[1.6rem] p-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/52">
                    Fotos
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/82">Sets y contenido exclusivo.</p>
                </div>
                <div className="salon-glass-card rounded-[1.6rem] p-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/52">Chat</p>
                  <p className="mt-3 text-sm leading-7 text-white/82">Mensajes privados y propinas.</p>
                </div>
                <div className="salon-glass-card rounded-[1.6rem] p-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/52">Live</p>
                  <p className="mt-3 text-sm leading-7 text-white/82">Videollamadas y acceso cercano.</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[37rem]">
              <div className="rounded-[2.6rem] border border-white/12 bg-black/14 p-3 shadow-[0_42px_110px_-46px_rgba(0,0,0,0.86)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image
                    src="/media/melany_hero.png"
                    alt="Retrato de Melany"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-black/8 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/24 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/82">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      En línea
                    </div>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-white/74">
                      Entra para descubrir contenido exclusivo, conversar y reservar experiencias privadas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="salon-soft-card rounded-[1.8rem] p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-primary/72">
                    Disponible esta noche
                  </p>
                  <p className="mt-3 text-sm leading-7 text-foreground/80">
                    Nuevos sets, mensajes directos y acceso privado para quienes quieran entrar más cerca.
                  </p>
                </div>
                <div className="salon-soft-card rounded-[1.8rem] p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-primary/72">Mela</p>
                  <p className="mt-3 text-sm leading-7 text-foreground/80">
                    Atiende, recuerda tus preferencias y te ayuda a llegar más rápido a lo que quieres ver o reservar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencias" className="container scroll-mt-28 px-4 pt-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.34em] text-primary">Experiencias</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-balance sm:text-5xl">
              Lo que encontrarás al entrar
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Contenido exclusivo, conversación directa y opciones privadas para fans que buscan más
            cercanía que la que ofrece una red abierta.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {experienceCards.map(({ icon: Icon, title, description }) => (
            <div key={title} className="salon-soft-card rounded-[2rem] p-6">
              <div className="inline-flex rounded-full border border-black/8 bg-white/86 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.04em]">
                {title}
              </h3>
              <p className="mt-5 text-sm leading-8 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container px-4 pt-16">
        <div className="salon-soft-card rounded-[2.6rem] p-7 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.34em] text-primary">Cómo funciona</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-balance sm:text-5xl">
                Entra, desbloquea y acércate más
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {flowSteps.map(({ step, title, description }) => (
                <div key={step} className="rounded-[1.8rem] border border-black/8 bg-white/76 p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.3em] text-primary/74">{step}</p>
                  <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.04em]">
                    {title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="acceso" className="container scroll-mt-28 px-4 pt-16">
        <div className="salon-soft-card rounded-[2.6rem] p-7 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.34em] text-primary">Acceso</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
                Elige cómo quieres entrar
              </h2>
            </div>

            <div className="space-y-4">
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Compra tokens y úsalos para desbloquear fotos, videos, mensajes privados, propinas
                y videollamadas según el tipo de experiencia que quieras.
              </p>
              <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/84 px-4 py-2 text-sm text-muted-foreground">
                <Coins className="h-4 w-4 text-primary" />
                Tarjeta internacional, USDT, BTC y pago local en Colombia
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {accessTiers.map((tier) => (
              <div
                key={tier.name}
                className={[
                  "rounded-[2rem] border p-7",
                  tier.featured
                    ? "salon-dark-card text-white shadow-[0_36px_90px_-44px_rgba(42,17,22,0.82)]"
                    : "border-black/8 bg-white/74 text-foreground",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={[
                      "text-[0.72rem] uppercase tracking-[0.3em]",
                      tier.featured ? "text-white/56" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {tier.name}
                  </p>
                  {tier.featured ? (
                    <div className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/82">
                      Más elegida
                    </div>
                  ) : null}
                </div>

                <div className="mt-12">
                  <p className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tracking-[-0.05em]">
                    {tier.tokens}
                  </p>
                  <p
                    className={[
                      "mt-2 text-sm",
                      tier.featured ? "text-white/70" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    tokens
                  </p>
                </div>

                <p className="mt-10 text-2xl font-semibold">{tier.price}</p>
                <p
                  className={[
                    "mt-5 text-sm leading-8",
                    tier.featured ? "text-white/74" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {tier.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mela" className="container scroll-mt-28 px-4 pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="salon-dark-card rounded-[2.6rem] p-8 text-white sm:p-10">
            <p className="text-sm uppercase tracking-[0.34em] text-white/56">Mela</p>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
              Mela te acompaña dentro del salón
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
              Si Melany no está respondiendo en ese momento, Mela mantiene la conversación,
              recuerda tus preferencias y te acerca al contenido o experiencia que estás buscando.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {melaTraits.map((trait) => (
                <div
                  key={trait}
                  className="salon-glass-card rounded-[1.6rem] p-5 text-sm leading-7 text-white/76"
                >
                  {trait}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {trustCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="salon-soft-card rounded-[2.2rem] p-6 sm:p-8">
                <div className="flex items-center gap-3 text-primary">
                  <Icon className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.28em]">{title}</span>
                </div>
                <p className="mt-5 text-sm leading-8 text-muted-foreground sm:text-base">
                  {description}
                </p>
              </div>
            ))}

            <div className="salon-soft-card rounded-[2.2rem] p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-primary">Dentro</p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.04] tracking-[-0.04em]">
                Cada fan elige hasta dónde quiere entrar
              </p>
              <p className="mt-5 text-sm leading-8 text-muted-foreground sm:text-base">
                Puedes mirar, desbloquear, conversar, dejar propina o reservar un encuentro
                privado según lo que busques dentro de la experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pt-16">
        <div className="salon-dark-card rounded-[2.6rem] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.34em] text-white/56">Entrada</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
                Entra y descubre el acceso privado
              </h2>
              <p className="mt-5 text-base leading-8 text-white/74 sm:text-lg">
                Fotos exclusivas, videos privados, chat directo, videollamadas y una experiencia
                reservada pensada para quienes quieren más cercanía.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-6 text-foreground hover:bg-white/90"
              >
                <Link href="/sign-in">
                  Entrar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/28 px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#acceso">Explorar acceso</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
