import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  Clapperboard,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { MelaAvatar } from "@/components/mela-avatar";
import { Button } from "@/components/ui/button";
import { getMelaDashboardSnapshot } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Bogota",
});

const fallbackSnapshot = {
  alerts: [
    "Aún no hay datos conectados. Mela puede arrancar con briefs, handoffs y alertas en cuanto la base tenga actividad.",
  ],
  contentPipeline: [
    {
      id: "draft-1",
      releaseAt: null,
      title: "Drop rojo de Medellín",
      type: "PHOTOSET",
      visibility: "DRAFT",
    },
  ],
  focus: [
    {
      description:
        "Conecta pagos, live y mensajes para que Mela deje de ser solo presencia y empiece a coordinar el día completo.",
      title: "Cerrar integración operativa",
    },
  ],
  handoffQueue: [
    {
      conversationId: "sample-1",
      displayName: "Fan privado",
      fanId: "sample-fan",
      intent: "wants-private-more-intimate",
      intentLabel: "Más íntimo",
      lastMessage:
        "Quiero algo más íntimo esta noche, pero no sé por dónde empezar sin perder tiempo.",
      lastMessageAt: new Date().toISOString(),
      recommendation: "Empujar a aftershow o entrada íntima.",
      tier: "returning-buyer",
      totalSpentUsd: 0,
    },
  ],
  mela: "Mela",
  notifications: [
    {
      body: "Configura OPENCLAW_INTERNAL_TOKEN y una base activa para que esta suite se alimente sola.",
      createdAt: new Date(),
      id: "notice-1",
      title: "Suite operativa lista",
      type: "SYSTEM",
    },
  ],
  stageName: "Melany",
  summary: {
    alerts: [],
    date: new Date().toISOString(),
    fansNeedingFollowup: 0,
    live: {
      replayPending: false,
      startsAt: null,
      status: "offline",
      title: null,
    },
    mela: "Mela",
    sales: {
      grossUsd: 0,
      tipTokens: 0,
      tipsCount: 0,
      tokenPacks: 0,
    },
    stageName: "Melany",
    summaryFlags: {
      draftDrops: 1,
      pendingPayments: 0,
      replayPending: false,
    },
  },
};

function formatDate(value: string | Date | null) {
  if (!value) {
    return "Sin hora definida";
  }

  return dateFormatter.format(new Date(value));
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function getLiveLine(snapshot: {
  summary: {
    live: {
      startsAt: string | null;
      status: string;
    };
  };
}) {
  if (snapshot.summary.live.status === "live") {
    return "Melany está en vivo ahora mismo.";
  }

  if (snapshot.summary.live.status === "scheduled" && snapshot.summary.live.startsAt) {
    return `Hay live programado para ${formatDate(snapshot.summary.live.startsAt)}.`;
  }

  return "Hoy no hay live activo en este momento.";
}

export default async function CreatorDashboardPage() {
  const snapshot = await getMelaDashboardSnapshot().catch(() => fallbackSnapshot);

  const metrics = [
    {
      icon: CircleDollarSign,
      label: "Ingreso del día",
      value: formatCurrency(snapshot.summary.sales.grossUsd),
    },
    {
      icon: Wallet,
      label: "Packs vendidos",
      value: `${snapshot.summary.sales.tokenPacks}`,
    },
    {
      icon: MessageSquareHeart,
      label: "Fans por seguir",
      value: `${snapshot.summary.fansNeedingFollowup}`,
    },
    {
      icon: Sparkles,
      label: "Tips en tokens",
      value: `${snapshot.summary.sales.tipTokens}`,
    },
  ] as const;

  return (
    <main className="overflow-x-clip pb-24 pt-6 sm:pt-8">
      <section className="container px-4">
        <div className="salon-hero relative overflow-hidden rounded-[3rem] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[rgba(214,171,104,0.14)] blur-3xl" />
          <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-[rgba(149,34,62,0.18)] blur-3xl" />

          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-4">
                <MelaAvatar className="h-14 w-14 rounded-[1.3rem]" />
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.3em] text-white/56">
                    Suite privada
                  </p>
                  <p className="mt-1 text-sm text-white/72">
                    {snapshot.mela} coordina el ritmo. {snapshot.stageName} decide la intensidad.
                  </p>
                </div>
              </div>

              <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-balance sm:text-6xl">
                Esta es la capa donde Mela deja de recibir y empieza a operar.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 sm:text-lg sm:leading-9">
                Brief del día, handoffs calientes, live, pagos y la siguiente jugada comercial en
                una sola vista.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[rgba(245,238,229,1)] px-6 text-[#26151a] hover:bg-[rgba(255,248,240,1)]"
                >
                  <Link href="#handoffs">
                    Revisar handoffs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/24 px-6 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="#pipeline">Ver pipeline</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="salon-glass-card rounded-[2rem] p-5">
                <div className="flex items-center gap-3 text-white/84">
                  <CalendarClock className="h-4 w-4 text-[rgba(233,192,119,1)]" />
                  <p className="text-[0.72rem] uppercase tracking-[0.26em]">Estado del día</p>
                </div>
                <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.02] tracking-[-0.04em]">
                  {getLiveLine(snapshot)}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  {snapshot.summary.sales.tipsCount} tips registrados hoy,{" "}
                  {snapshot.summary.summaryFlags.pendingPayments} pagos por revisar y{" "}
                  {snapshot.summary.summaryFlags.draftDrops} piezas todavía en borrador.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-[1.8rem] border border-white/12 bg-white/8 px-5 py-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 text-white/84">
                      <Icon className="h-4 w-4 text-[rgba(233,192,119,1)]" />
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/60">
                        {label}
                      </p>
                    </div>
                    <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.04em]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div id="handoffs" className="salon-soft-card rounded-[2.6rem] p-7 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.34em] text-primary">Handoffs</p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance">
                  Lo que hoy sí merece tu voz
                </h2>
              </div>
              <div className="rounded-full border border-black/8 bg-white px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {snapshot.handoffQueue.length} activos
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {snapshot.handoffQueue.map((handoff) => (
                <article
                  key={handoff.conversationId}
                  className="rounded-[2rem] border border-black/8 bg-white/84 p-5 shadow-[0_20px_44px_-34px_rgba(60,35,42,0.22)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.04em]">
                        {handoff.displayName}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {handoff.totalSpentUsd > 0
                          ? `Gastó ${formatCurrency(handoff.totalSpentUsd)}`
                          : "Aún sin gasto registrado"}{" "}
                        · {formatDate(handoff.lastMessageAt)}
                      </p>
                    </div>

                    <div className="rounded-full border border-primary/18 bg-primary/6 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                      {handoff.intentLabel}
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-foreground/82">{handoff.lastMessage}</p>
                  <div className="mt-5 rounded-[1.5rem] border border-black/8 bg-[#fbf7f2] px-4 py-3 text-sm leading-7 text-muted-foreground">
                    {handoff.recommendation}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="salon-soft-card rounded-[2.2rem] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-primary">
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.28em]">Alertas y pendientes</p>
              </div>
              <div className="mt-5 space-y-3">
                {snapshot.alerts.map((alert) => (
                  <div
                    key={alert}
                    className="rounded-[1.6rem] border border-black/8 bg-white px-4 py-4 text-sm leading-7 text-muted-foreground"
                  >
                    {alert}
                  </div>
                ))}
              </div>
            </div>

            <div className="salon-soft-card rounded-[2.2rem] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.28em]">Foco de Mela</p>
              </div>
              <div className="mt-5 space-y-3">
                {snapshot.focus.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.6rem] border border-black/8 bg-white px-4 py-4"
                  >
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div id="pipeline" className="salon-soft-card rounded-[2.6rem] p-7 sm:p-8">
            <div className="flex items-center gap-3 text-primary">
              <Clapperboard className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.28em]">Pipeline</p>
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance">
              Lo que todavía no está publicado pero ya puede vender
            </h2>

            <div className="mt-8 space-y-4">
              {snapshot.contentPipeline.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[2rem] border border-black/8 bg-white/84 p-5 shadow-[0_20px_44px_-34px_rgba(60,35,42,0.22)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-none tracking-[-0.04em]">
                      {item.title}
                    </p>
                    <div className="rounded-full border border-black/8 bg-[#fbf7f2] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.visibility.toLowerCase()}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.type.toLowerCase()} · {formatDate(item.releaseAt)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="salon-dark-card rounded-[2.2rem] p-6 text-white sm:p-7">
              <p className="text-sm uppercase tracking-[0.28em] text-white/56">Notas de Mela</p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.04] tracking-[-0.04em]">
                Cuando el día está claro, Mela deja de responder por reflejo y empieza a empujar la
                mejor compra.
              </p>
            </div>

            <div className="salon-soft-card rounded-[2.2rem] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.28em]">Notificaciones</p>
              </div>
              <div className="mt-5 space-y-3">
                {snapshot.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="rounded-[1.6rem] border border-black/8 bg-white px-4 py-4"
                  >
                    <p className="font-semibold text-foreground">{notification.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {notification.body}
                    </p>
                    <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-primary/70">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
