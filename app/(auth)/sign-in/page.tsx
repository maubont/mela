import { ShieldCheck, Users } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <main className="container px-4 py-16">
      <SectionHeading
        eyebrow="Entrada"
        title="Entrada privada"
        description="Desde aquí se abre el acceso para fans, Melany y operación interna, cada uno con su propio nivel de reserva y control."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="glass-panel border-white/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-5 w-5 text-primary" />
              Acceso de fans
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Registro, validación de edad, wallet de tokens y una entrada cuidada a la experiencia.
          </CardContent>
        </Card>
        <Card className="glass-panel border-white/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Suite privada
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Espacio reservado para Melany, operación, contenido, finanzas y control de Mela.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
