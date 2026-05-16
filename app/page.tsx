import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  Coins,
  CreditCard,
  Eye,
  Gem,
  MessageCircleHeart,
  Radio,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

import { MelaAvatar } from "@/components/mela-avatar";
import { Button } from "@/components/ui/button";

const audiencePaths = [
  {
    icon: Radio,
    step: "01",
    eyebrow: "Esta noche",
    title: "Si me viste aparecer, falta una puerta más.",
    description:
      "Lo insinuado puede seguir con más calma, lejos del ruido y mucho más cerca de mí.",
    cta: "Entrada de esta noche",
    href: "/sign-in?entrada=live",
    primary: true,
  },
  {
    icon: Eye,
    step: "02",
    eyebrow: "Curiosidad",
    title: "La parte que prefiero mostrar de cerca.",
    description:
      "Imágenes reservadas y conversación con intención desde el primer paso.",
    cta: "Pedir acceso",
    href: "/sign-in?entrada=redes",
    primary: false,
  },
  {
    icon: Gem,
    step: "03",
    eyebrow: "Antojo",
    title: "Elige tu entrada y acércate.",
    description:
      "Fotos, videos, chat y solicitudes privadas sin enfriar el momento.",
    cta: "Ver tokens",
    href: "/sign-in?entrada=tokens",
    primary: false,
  },
] as const;

const entryCards = [
  {
    icon: Sparkles,
    eyebrow: "Drops reservados",
    image: "/media/melany-experience-2.jpg",
    alt: "Melany en un espacio privado con lencería blanca de malla y mirada lateral",
    title: "Imágenes que no subo para cualquiera.",
    description:
      "Series íntimas, elegidas con calma, para que cada desbloqueo se sienta como una puerta que no estaba abierta para todos.",
  },
  {
    icon: MessageCircleHeart,
    eyebrow: "Chat privado",
    image: "/media/melany-experience-12.jpg",
    alt: "Melany en selfie de espejo con lencería clara y denim",
    title: "Un mensaje puede cambiar todo el ritmo.",
    description:
      "Aquí la conversación no se queda en saludos fríos. Entras, me cuentas por dónde vienes y dejamos que la noche tome otro tono.",
  },
  {
    icon: Video,
    eyebrow: "Momentos a medida",
    image: "/media/melany-experience-9.jpg",
    alt: "Melany en la playa con bikini rosa bajo palmeras y cielo abierto",
    title: "Cuando quieres algo pensado solo para ti.",
    description:
      "Videos, reservas y peticiones más personales para quienes prefieren acercarse con intención, no solo mirar desde lejos.",
  },
] as const;

const tokenPackages = [
  {
    name: "Primer antojo",
    tokens: "120",
    price: "US$14.99",
    idealFor: "Para abrir la primera puerta",
    description:
      "Suficiente para entrar, mirar con calma y probar si este salón te habla como esperabas.",
    bullets: ["primer drop reservado", "mensajes puntuales", "desbloqueos de entrada"],
    cta: "Entrar con 120",
    href: "/sign-in?entrada=tokens&plan=120",
    featured: false,
  },
  {
    name: "Noche reservada",
    tokens: "385",
    price: "US$39.99",
    idealFor: "La entrada que más sentido tiene",
    description:
      "Para quedarte después del primer vistazo: más contenido, más conversación y más margen para llevar la noche a tu ritmo.",
    bullets: ["series privadas", "chat más largo", "propinas y entradas reservadas"],
    cta: "Elegir 385",
    href: "/sign-in?entrada=tokens&plan=385",
    featured: true,
  },
  {
    name: "Sin mirar el reloj",
    tokens: "1040",
    price: "US$89.99",
    idealFor: "Para pedir algo más personal",
    description:
      "Cuando no vienes a probar sino a acercarte de verdad: reservas, solicitudes y momentos donde todo se siente más tuyo.",
    bullets: ["videollamadas", "peticiones íntimas", "prioridad y tiempo reservado"],
    cta: "Entrar sin freno",
    href: "/sign-in?entrada=tokens&plan=1040",
    featured: false,
  },
] as const;

const liveLoop = [
  {
    step: "01",
    title: "La noche empieza con una mirada",
    description:
      "A veces aparezco en vivo; otras dejo apenas una pista.",
  },
  {
    step: "02",
    title: "Lo que provoca merece otro lugar",
    description:
      "Hay imágenes y mensajes que prefiero guardar para quien entra.",
  },
  {
    step: "03",
    title: "Mela te acomoda",
    description:
      "Si llegas con ganas, Mela te lleva a la entrada correcta.",
  },
] as const;

const melaHighlights = [
  "Te recibe al instante",
  "Recuerda tu intención",
  "Te sugiere la entrada",
  "Me deja el contexto listo",
] as const;

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "18+ y acceso reservado",
    description: "Entrada adulta, cuidada y privada.",
  },
  {
    icon: CreditCard,
    title: "Pago discreto",
    description: "Tarjeta, USDT, BTC y opción local en Colombia.",
  },
  {
    icon: Coins,
    title: "Tokens con propósito",
    description: "Abres imágenes, mensajes y momentos más personales.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="overflow-x-clip pb-24">
      <section className="container px-4 pt-4 sm:pt-8">
        <div className="salon-hero relative overflow-hidden rounded-[2.15rem] px-5 py-5 text-white sm:rounded-[3.2rem] sm:px-8 sm:py-9 lg:px-12 lg:py-12">
          <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#f0b35f]/16 blur-3xl" />
          <div className="absolute right-[-8rem] top-[-5rem] h-[28rem] w-[28rem] rounded-full bg-[#ff2e38]/14 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-44 w-[70%] -translate-x-1/2 bg-gradient-to-t from-black/30 to-transparent blur-2xl" />

          <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/78 backdrop-blur-sm sm:px-4 sm:text-[0.68rem] sm:tracking-[0.24em]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
                Medellín · disponible esta noche
              </div>

              <p className="mt-5 text-[0.66rem] uppercase tracking-[0.32em] text-[#f0c878]/70 sm:mt-8 sm:text-[0.72rem] sm:tracking-[0.42em]">
                Salón privado
              </p>
              <h1 className="mt-3 max-w-[10ch] font-[family-name:var(--font-display)] text-[3rem] font-semibold leading-[0.9] tracking-[-0.065em] text-balance min-[390px]:text-[3.25rem] sm:mt-5 sm:text-[6.8rem] sm:leading-[0.84] lg:text-[7.7rem]">
                No todo de mí cabe en público.
              </h1>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-white/78 sm:mt-7 sm:text-xl sm:leading-10">
                En Medellín hay una parte de mí que no dejo ver en público. Entra si sabes mirar
                más cerca.
              </p>

              <div className="mt-7 hidden flex-col gap-3 min-[430px]:flex-row sm:mt-9 sm:flex sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full border border-[#f0c878]/36 bg-[#23050e] px-7 text-white shadow-[0_22px_46px_-28px_rgba(21,0,7,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2d0712]"
                >
                  <Link href="/sign-in">
                    Entrar a mi Salón Privado
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="hidden rounded-full border-white/24 px-7 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white min-[430px]:inline-flex"
                >
                  <Link href="#en-vivo">Seguir la noche</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[42rem]">
              <div className="rounded-[2rem] border border-white/12 bg-black/24 p-2 shadow-[0_60px_140px_-62px_rgba(0,0,0,0.95)] sm:rounded-[2.8rem] sm:p-3">
                <div className="relative aspect-[4/4.95] overflow-hidden rounded-[1.6rem] sm:aspect-[4/4.6] sm:rounded-[2.25rem]">
                  <Image
                    src="/media/melany-hero-1.jpg"
                    alt="Melany con lencería merlot en una pose editorial"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42rem"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150006]/72 via-black/5 to-transparent" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/28 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/84 backdrop-blur-md sm:left-5 sm:top-5 sm:text-[0.68rem] sm:tracking-[0.24em]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    En línea
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
                    <p className="hidden max-w-md font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:block">
                      Entra donde la noche se vuelve privada.
                    </p>
                    <p className="max-w-[18rem] text-sm leading-6 text-white/84 sm:mt-4 sm:max-w-sm sm:leading-7 sm:text-white/74">
                      Imágenes privadas, mensajes con intención y una versión de mí que pocos
                      conocen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:max-w-xl sm:gap-3 lg:max-w-none">
            {[
              ["80K+", "miradas"],
              ["18+", "adultos"],
              ["Tokens", "entrada"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.2rem] border border-white/10 bg-white/7 px-3 py-3 sm:rounded-[1.4rem] sm:px-4 sm:py-4">
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-none sm:text-3xl">
                  {value}
                </p>
                <p className="mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-white/48 sm:text-[0.68rem] sm:tracking-[0.18em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="en-vivo" className="container scroll-mt-28 px-4 pt-12 sm:pt-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {audiencePaths.map(({ icon: Icon, eyebrow, title, description, cta, href, primary, step }) => (
            <article
              key={title}
              className="salon-soft-card salon-hover-lift rounded-[2rem] p-5 sm:rounded-[2.2rem] sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.05em] text-primary/34">
                  {step}
                </span>
              </div>
              <p className="mt-5 text-[0.68rem] uppercase tracking-[0.24em] text-primary/70 sm:mt-7 sm:text-[0.72rem] sm:tracking-[0.28em]">
                {eyebrow}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:mt-4 sm:text-3xl">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:leading-8">{description}</p>
              <Link
                href={href as Route}
                className={[
                  "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 sm:mt-7",
                  primary
                    ? "bg-primary text-primary-foreground shadow-[0_18px_36px_-28px_rgba(181,17,68,0.7)] hover:bg-primary/92"
                    : "border border-primary/18 bg-white/58 text-primary hover:border-primary/35",
                ].join(" ")}
              >
                {cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="experiencias" className="container scroll-mt-28 px-4 pt-16 sm:pt-20">
        <div className="grid gap-7 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-primary sm:text-sm sm:tracking-[0.34em]">
              Dentro del salón
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[2.55rem] font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
              Lo que aparece cuando entras de verdad.
            </h2>
          </div>
          <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            No es un feed abierto. Son piezas reservadas para mirar, hablar y pedir algo más cerca.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {entryCards.map(({ icon: Icon, eyebrow, image, alt, title, description }) => (
            <article
              key={title}
              className="group salon-soft-card salon-hover-lift overflow-hidden rounded-[2.35rem]"
            >
              <div className="relative aspect-[4/4.8] overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 24rem"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0309]/72 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 inline-flex rounded-full border border-white/22 bg-black/24 p-3 text-white backdrop-blur-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="absolute bottom-5 left-5 text-[0.72rem] uppercase tracking-[0.32em] text-white/86">
                  {eyebrow}
                </p>
              </div>

              <div className="p-5 sm:p-7">
                <h3 className="font-[family-name:var(--font-display)] text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-[2rem]">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:leading-8">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container px-4 pt-16 sm:pt-20">
        <div className="velvet-panel rounded-[2.35rem] p-6 text-white sm:rounded-[3rem] sm:p-9 lg:p-11">
          <div className="grid gap-7 sm:gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#f0c878]/70 sm:text-sm sm:tracking-[0.34em]">
                Cuando la noche sube
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[2.45rem] font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
                Si algo te dejó pensando, aquí sabes cómo acercarte.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/72 sm:text-lg sm:leading-8">
                Hay miradas que piden más calma y entradas que solo tienen sentido cuando ya quieres
                mirar más cerca.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {liveLoop.map(({ step, title, description }) => (
                <article
                  key={step}
                  className="grid grid-cols-[3.25rem_1fr] gap-4 rounded-[1.7rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm md:block md:rounded-[2rem] md:p-5"
                >
                  <p className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.05em] text-[#f0c878]/70 md:text-[0.7rem] md:font-sans md:uppercase md:tracking-[0.24em]">
                    {step}
                  </p>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-[1.02] tracking-[-0.04em] md:mt-5 md:text-3xl">
                      {title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/64 md:mt-4 md:leading-7">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="acceso" className="container scroll-mt-28 px-4 pt-16 sm:pt-20">
        <div className="salon-soft-card rounded-[2.35rem] p-5 sm:rounded-[3rem] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-[0.72rem] uppercase tracking-[0.3em] text-primary sm:text-sm sm:tracking-[0.34em]">
                Tokens
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[2.55rem] font-semibold leading-[0.96] tracking-[-0.04em] sm:text-5xl">
                Compra una llave, no una suscripción fría.
              </h2>
            </div>

            <div className="space-y-4">
              <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Los tokens abren imágenes, mensajes, propinas y solicitudes sin amarrarte a una
                suscripción.
              </p>
              <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-white/84 px-4 py-2 text-xs text-muted-foreground sm:text-sm">
                <Coins className="h-4 w-4 text-primary" />
                Tarjeta, USDT, BTC y opción local en Colombia
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
            {tokenPackages.map((tier) => (
              <article
                key={tier.name}
                className={[
                  "rounded-[2rem] border p-5 transition duration-300 sm:rounded-[2.25rem] sm:p-7",
                  tier.featured
                    ? "salon-dark-card text-white shadow-[0_44px_100px_-50px_rgba(54,6,20,0.82)]"
                    : "salon-hover-lift border-black/8 bg-white/74 text-foreground",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={[
                        "text-[0.72rem] uppercase tracking-[0.3em]",
                        tier.featured ? "text-white/58" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {tier.name}
                    </p>
                    <p
                      className={[
                        "mt-2 text-xs leading-5",
                        tier.featured ? "text-white/58" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {tier.idealFor}
                    </p>
                  </div>
                  {tier.featured ? (
                    <div className="rounded-full border border-white/22 bg-white/14 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/88 sm:text-[0.68rem] sm:tracking-[0.22em]">
                      Más elegida
                    </div>
                  ) : null}
                </div>

                <div className="mt-7 flex items-end justify-between gap-4 sm:mt-10">
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tracking-[-0.05em] sm:text-[3.4rem]">
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
                  <p className="pb-1 text-xl font-semibold sm:text-2xl">{tier.price}</p>
                </div>
                <p
                  className={[
                    "mt-5 text-sm leading-7 sm:leading-8",
                    tier.featured ? "text-white/76" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {tier.description}
                </p>

                <div className="mt-6 space-y-2">
                  {tier.bullets.map((bullet) => (
                    <p
                      key={bullet}
                      className={[
                        "text-sm leading-6 sm:leading-7",
                        tier.featured ? "text-white/84" : "text-foreground/78",
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
                    "mt-7 w-full rounded-full",
                    tier.featured
                      ? "bg-white text-[#2a0711] hover:bg-white/92"
                      : "bg-primary text-primary-foreground hover:bg-primary/92",
                  ].join(" ")}
                >
                  <Link href={tier.href as Route}>
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mela" className="container scroll-mt-28 px-4 pt-16 sm:pt-20">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="salon-dark-card rounded-[2.35rem] p-6 text-white sm:rounded-[3rem] sm:p-10">
            <div className="flex items-center gap-3">
              <MelaAvatar className="h-14 w-14 rounded-[1.3rem]" />
              <div>
                <p className="text-sm uppercase tracking-[0.34em] text-[#f0c878]/72">Mela</p>
                <p className="mt-1 text-xs text-white/48">la que no deja enfriar la entrada</p>
              </div>
            </div>
            <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-[2.55rem] font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:mt-7 sm:text-5xl">
              Si llegas con ganas, Mela sabe por dónde recibirte.
            </h2>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-white/76 sm:text-lg sm:leading-8">
              No te explica la página como un robot. Te lee la intención, te propone la entrada y
              deja listo el contexto para que cuando yo aparezca, no empecemos desde cero.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
              {melaHighlights.map((trait) => (
                <div
                  key={trait}
                  className="rounded-[1.35rem] border border-white/12 bg-white/8 px-4 py-3 text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-white/72 sm:rounded-[1.75rem] sm:px-5 sm:py-4 sm:text-sm sm:normal-case sm:leading-7 sm:tracking-normal"
                >
                  {trait}
                </div>
              ))}
            </div>
          </div>

          <div className="salon-soft-card rounded-[2.35rem] p-5 sm:rounded-[3rem] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <MelaAvatar className="h-32 w-32 shrink-0 rounded-[2rem]" />
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-primary sm:text-sm">
                  Concierge privado
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2.35rem] font-semibold leading-[0.95] tracking-[-0.04em] text-balance sm:text-4xl">
                  Entras con deseo; Mela lo convierte en una ruta.
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  Si quieres fotos, chat o algo más personal, Mela te acerca al
                  siguiente paso sin hacerte sentir perdido.
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-[2rem] border border-black/8 bg-white px-4 py-4 shadow-[0_22px_46px_-36px_rgba(57,32,39,0.18)] sm:mt-8 sm:px-5 sm:py-5">
              <div className="ml-auto max-w-[20rem] rounded-[1.5rem] bg-primary px-4 py-3 text-sm leading-7 text-white">
                Quiero algo para esta noche. ¿Por dónde entro?
              </div>
              <div className="mt-3 max-w-[22rem] rounded-[1.5rem] border border-black/8 bg-[#fbf5ee] px-4 py-3 text-sm leading-7 text-muted-foreground">
                Empieza con la noche reservada. Te deja mirar más, hablar mejor y no quedarte a
                medias.
              </div>
            </div>

            <Button asChild size="lg" className="mt-7 w-full rounded-full px-7 sm:w-auto">
              <Link href="/sign-in?entrada=mela">
                Que Mela me reciba
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="confianza" className="container scroll-mt-28 px-4 pt-16 sm:pt-20">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="salon-soft-card rounded-[2.35rem] p-6 sm:rounded-[3rem] sm:p-8 lg:p-10">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-primary sm:text-sm sm:tracking-[0.34em]">
              Confianza
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[2.55rem] font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
              Lo íntimo también debe sentirse seguro.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Acceso adulto, pagos discretos y tokens claros antes de cruzar la puerta.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {trustSignals.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="salon-soft-card salon-hover-lift rounded-[1.8rem] p-5 sm:rounded-[2.1rem] sm:p-6"
              >
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-primary/70 sm:mt-6 sm:text-[0.72rem] sm:tracking-[0.28em]">
                  {title}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:leading-7">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 pt-20">
        <div className="salon-hero relative overflow-hidden rounded-[3rem] px-6 py-9 text-white sm:px-9 lg:px-11">
          <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-[#ff3440]/16 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.34em] text-[#f0c878]/70">Esta noche</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance sm:text-5xl">
                Si vas a mirar, entra donde la noche no se queda a medias.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/74 sm:text-lg">
                Yo pongo la intención. Tú eliges la entrada. Mela se encarga de que no pierdas el
                hilo cuando el deseo ya empezó.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-7 text-[#2a0711] hover:bg-white/92"
              >
                <Link href="/sign-in">
                  Solicitar acceso
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/24 px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#acceso">Ver tokens</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
