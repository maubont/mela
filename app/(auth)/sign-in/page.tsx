import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Users,
} from "lucide-react";

import { MelaConciergePreview } from "@/components/mela-concierge-preview";
import { Button } from "@/components/ui/button";

const accessLayers = [
  {
    icon: Users,
    eyebrow: "Acceso fan",
    title: "Aquí entras si vienes a mirar más, hablar mejor y quedarte un poco más cerca.",
    description:
      "Primero validas tu entrada, eliges tokens y desde ahí se abre el acceso a imágenes, mensajes privados, propinas y experiencias más personales.",
    bullets: ["validación 18+", "wallet de tokens", "chat privado y desbloqueos"],
    cta: "Entrar como fan",
    href: "#elige-tu-entrada",
    featured: true,
  },
  {
    icon: ShieldCheck,
    eyebrow: "Suite privada",
    title: "Aquí entro yo para cuidar contenido, ingresos, mensajes y la manera en que Mela te recibe.",
    description:
      "Es la capa reservada para Melany: contenido, conversación, control de cobros, retiros y todo lo que mantiene la experiencia afinada.",
    bullets: ["contenido y drops", "retiros y finanzas", "control de Mela"],
    cta: "Ir a la suite privada",
    href: "/melany",
    featured: false,
  },
] as const;

const entryBundles = [
  {
    name: "Entrada privada",
    tokens: "120",
    price: "US$14.99",
    description: "Para tantear el tono, abrir las primeras piezas y empezar a escribirme.",
    featured: false,
  },
  {
    name: "Selección reservada",
    tokens: "385",
    price: "US$39.99",
    description: "La más cómoda para quedarte un rato más y abrir bastante sin medir cada paso.",
    featured: true,
  },
  {
    name: "Noche a medida",
    tokens: "1040",
    price: "US$89.99",
    description: "Pensada para videollamadas, peticiones más íntimas y tiempo mucho más tuyo.",
    featured: false,
  },
] as const;

const accessFlow = [
  {
    step: "01",
    title: "Solicitas acceso",
    description: "Entras por aquí, validas edad y eliges con qué tono quieres empezar.",
  },
  {
    step: "02",
    title: "Eliges tus tokens",
    description: "Compras la entrada que mejor se parece a lo que quieres mirar, hablar o pedir.",
  },
  {
    step: "03",
    title: "Se abre lo privado",
    description: "Desde ahí ya puedes desbloquear imágenes, entrar al chat y acercarte mucho más.",
  },
] as const;

export default function SignInPage() {
  return (
    <main className="overflow-x-clip pb-24 pt-6 sm:pt-8">
      <section className="container px-4">
        <div className="salon-hero relative overflow-hidden rounded-[3rem] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[rgba(214,171,104,0.14)] blur-3xl" />
          <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-[rgba(149,34,62,0.18)] blur-3xl" />

          <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div className="relative z-10 max-w-xl">
              <div className="salon-pill text-white/84">Entrada privada · acceso 18+</div>
              <p className="mt-8 text-[0.72rem] uppercase tracking-[0.42em] text-white/54">
                Solicitud de acceso
              </p>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
                Aquí se abre la parte de Melany que no se deja suelta por ahí.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:text-lg sm:leading-9">
                Si vienes a entrar, este es el punto donde eliges tu acceso, tu ritmo y la forma en
                que quieres empezar a acercarte.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[rgba(245,238,229,1)] px-6 text-[#26151a] transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,248,240,1)]"
                >
                  <Link href="#elige-tu-entrada">
                    Elegir mi entrada
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/24 px-6 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/">Volver al salón</Link>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {["Pago discreto", "Tokens desde el inicio", "Atención privada"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/74"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[2.7rem] border border-white/10 bg-black/18 p-3 shadow-[0_44px_120px_-50px_rgba(15,6,10,0.88)]">
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2.2rem]">
                  <Image
                    src="/media/melany-experience-12.jpg"
                    alt="Melany en una selfie íntima de acceso privado"
                    fill
                    sizes="(max-width: 1024px) 100vw, 36rem"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/16 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/76">
                      La entrada cambia el tono
                    </p>
                    <p className="mt-4 max-w-sm font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                      Una vez entras, ya no miras desde afuera.
                    </p>
                  </div>
                </div>
              </div>

              <MelaConciergePreview />
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pt-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {accessLayers.map(({ icon: Icon, eyebrow, title, description, bullets, cta, href, featured }) => (
            <article
              key={title}
              className={[
                "rounded-[2.4rem] border p-7 sm:p-8",
                featured
                  ? "salon-dark-card text-white"
                  : "salon-soft-card text-foreground",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "rounded-2xl p-3",
                    featured ? "bg-white/10 text-white" : "bg-primary/10 text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p
                  className={[
                    "text-[0.72rem] uppercase tracking-[0.28em]",
                    featured ? "text-white/58" : "text-primary/74",
                  ].join(" ")}
                >
                  {eyebrow}
                </p>
              </div>

              <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-balance">
                {title}
              </h2>
              <p
                className={[
                  "mt-5 text-sm leading-8 sm:text-base",
                  featured ? "text-white/76" : "text-muted-foreground",
                ].join(" ")}
              >
                {description}
              </p>

              <div className="mt-6 space-y-2">
                {bullets.map((bullet) => (
                  <p
                    key={bullet}
                    className={[
                      "text-sm leading-7",
                      featured ? "text-white/82" : "text-foreground/78",
                    ].join(" ")}
                  >
                    + {bullet}
                  </p>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className={[
                  "mt-8 rounded-full px-6",
                  featured
                    ? "bg-white text-[#26151a] hover:bg-white/92"
                    : "bg-primary text-primary-foreground hover:bg-primary/92",
                ].join(" ")}
              >
                <Link href={href}>
                  {cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section id="elige-tu-entrada" className="container scroll-mt-28 px-4 pt-20">
        <div className="salon-soft-card rounded-[2.8rem] p-7 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.34em] text-primary">Tu primera entrada</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
                Así empiezas sin dar vueltas raras
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Todo entra por tokens: así decides si vienes a probar el tono, a quedarte más rato o
              a pedir algo mucho más íntimo.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {entryBundles.map(({ name, tokens, price, description, featured }) => (
              <article
                key={name}
                className={[
                  "rounded-[2.1rem] border p-6",
                  featured
                    ? "salon-dark-card text-white shadow-[0_36px_90px_-46px_rgba(45,16,23,0.82)]"
                    : "border-black/8 bg-white/76",
                ].join(" ")}
              >
                <p
                  className={[
                    "text-[0.72rem] uppercase tracking-[0.28em]",
                    featured ? "text-white/58" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {name}
                </p>
                <p className="mt-8 font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tracking-[-0.05em]">
                  {tokens}
                </p>
                <p
                  className={[
                    "mt-2 text-sm",
                    featured ? "text-white/70" : "text-muted-foreground",
                  ].join(" ")}
                >
                  tokens
                </p>
                <p className="mt-8 text-2xl font-semibold">{price}</p>
                <p
                  className={[
                    "mt-4 text-sm leading-8",
                    featured ? "text-white/78" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 pt-20">
        <div className="salon-soft-card rounded-[2.8rem] p-7 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.34em] text-primary">Cómo se abre</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
                Tres pasos y ya cambió el tono
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              La idea es simple: entrar sin fricción, elegir bien y llegar rápido a la parte que no
              se deja abierta para cualquiera.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {accessFlow.map(({ step, title, description }) => (
              <article
                key={step}
                className="salon-hover-lift rounded-[2rem] border border-black/8 bg-white/78 p-6 shadow-[0_24px_54px_-42px_rgba(60,35,42,0.34)] transition duration-300"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-primary/74">{step}</p>
                <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.04em]">
                  {title}
                </p>
                <p className="mt-4 text-sm leading-8 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 pt-20">
        <div className="salon-dark-card rounded-[2.8rem] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.34em] text-white/56">Acceso listo</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
                Si ya viniste hasta aquí, lo demás solo es elegir por dónde empezar.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/74 sm:text-lg">
                Tú decides si entras por curiosidad, por conversación o por algo bastante más
                personal.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-6 text-[#26151a] hover:bg-white/92"
              >
                <Link href="#elige-tu-entrada">
                  Elegir acceso
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/24 px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/">Volver al salón</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
