"use client";

import Link from "next/link";
import type { Route } from "next";
import { startTransition, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { MelaAvatar } from "@/components/mela-avatar";
import { Button } from "@/components/ui/button";

const promptOptions = [
  {
    intent: "wants-private-more-intimate",
    label: "Quiero algo más íntimo",
  },
  {
    intent: "asks-live-status",
    label: "¿Melany está en vivo?",
  },
  {
    intent: "wants-replay",
    label: "Quiero ver replay",
  },
  {
    intent: "wants-drop",
    label: "Muéstrame algo nuevo",
  },
] as const;

interface ConciergeState {
  chips: string[];
  cta: {
    href: string;
    label: string;
  };
  mela: string;
  reply: string;
  stageName: string;
}

const initialState: ConciergeState = {
  chips: ["Pago discreto", "Tokens desde el inicio", "Atención privada"],
  cta: {
    href: "/sign-in#elige-tu-entrada",
    label: "Elegir mi entrada",
  },
  mela: "Mela",
  reply:
    "Dime por dónde quieres entrar y te acomodo la entrada correcta para que no pierdas tiempo dando vueltas.",
  stageName: "Melany",
};

export function MelaConciergePreview() {
  const [isPending, setIsPending] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [state, setState] = useState<ConciergeState>(initialState);

  const handlePrompt = (label: string, intent: string) => {
    setActivePrompt(label);
    setIsPending(true);

    startTransition(async () => {
      try {
        const response = await fetch("/api/mela/concierge", {
          body: JSON.stringify({
            intent,
            message: label,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Mela concierge request failed");
        }

        const result = (await response.json()) as ConciergeState & { ok: boolean };

        setState({
          chips: result.chips,
          cta: result.cta,
          mela: result.mela,
          reply: result.reply,
          stageName: result.stageName,
        });
      } catch {
        setState(initialState);
      } finally {
        setIsPending(false);
      }
    });
  };

  return (
    <div className="salon-soft-card rounded-[2rem] p-5 text-foreground sm:p-6">
      <div className="flex items-start gap-4">
        <MelaAvatar className="h-14 w-14 rounded-[1.2rem]" />
        <div className="min-w-0">
          <p className="text-[0.72rem] uppercase tracking-[0.26em] text-primary/74">
            {state.mela}
          </p>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">
            Pregúntame por dónde quieres entrar y te oriento sin enfriar el momento.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {promptOptions.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={() => handlePrompt(prompt.label, prompt.intent)}
            className={[
              "rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition duration-300",
              activePrompt === prompt.label
                ? "border-primary bg-primary text-white"
                : "border-black/8 bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground",
            ].join(" ")}
          >
            {prompt.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-[1.6rem] border border-black/8 bg-white px-4 py-4 shadow-[0_18px_30px_-24px_rgba(57,32,39,0.14)]">
        <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-primary/68">
          {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          Respuesta de {state.mela}
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{state.reply}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {state.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-black/8 bg-white px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-7 text-muted-foreground">
          {state.stageName} se reserva la parte intensa. {state.mela} te acomoda la entrada.
        </p>
        <Button asChild size="sm" className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/92">
          <Link href={state.cta.href as Route}>
            {state.cta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
