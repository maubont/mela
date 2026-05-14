import { BarChart3, Bot, CircleDollarSign, Clapperboard, MessageSquareText } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dashboardModules = [
  {
    icon: BarChart3,
    title: "Inteligencia de ingresos",
    description: "KPIs de ingresos, conversión, retención, ARPPU y desglose por rail de pago.",
  },
  {
    icon: CircleDollarSign,
    title: "Operación de retiros",
    description: "Retiros a Paxum, cripto o banco local con estado, fees e historial de settlement.",
  },
  {
    icon: Clapperboard,
    title: "Operación de contenido",
    description: "Gestión de drops, bundles, previews, encargos personalizados y programación.",
  },
  {
    icon: MessageSquareText,
    title: "Chat privado",
    description: "Conversaciones, mensajes PPV, unlock flows, tipping y preferencias del fan.",
  },
  {
    icon: Bot,
    title: "Suite Mela",
    description: "Reglas, memoria, borradores automáticos, handoff y observabilidad del agente IA.",
  },
];

export default function CreatorDashboardPage() {
  return (
    <main className="container px-4 py-16">
      <SectionHeading
        eyebrow="Suite privada"
        title="La suite privada de Melany"
        description="Operación, contenido, ingresos, conversaciones y orquestación de Mela reunidos en una sola capa de control."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {dashboardModules.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="glass-panel border-white/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <span className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
