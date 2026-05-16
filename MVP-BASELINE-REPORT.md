# Melany | Salón Privado - Línea base y MVP real

Fecha de corte: 2026-05-16  
Objetivo: evaluar honestamente el estado actual, las probabilidades reales de éxito y la ruta mínima para probar el negocio en producción sin inflar costos ni complejidad.

## 1. Resumen brutal

El proyecto ya tiene una base visual y técnica prometedora, pero todavía no es un negocio funcional. Hoy es una landing con dirección estética, un esquema de datos amplio, una primera capa de Mela/OpenClaw y un dashboard demo. Lo que falta no es "más diseño"; falta cerrar el circuito que convierte deseo en dinero: autenticación real, verificación de edad, compra de tokens, desbloqueo de contenido, control de acceso, entrega privada y analítica de conversión.

La oportunidad existe, pero no por tener una plataforma. Existe si Melany trae tráfico cualificado, si la oferta se siente íntima y creíble, y si el usuario entiende en menos de 20 segundos qué obtiene al pagar. Sin flujo de compra y sin contenido bloqueado real, la landing no valida nada. Con MVP bien recortado, sí se puede probar demanda en 2 a 4 semanas.

Mi recomendación dura: no construir todavía una plataforma de streaming completa. Primero validar drops, acceso privado, chat asistido y paquetes de tokens/manual checkout. El live debe ser un acelerador de deseo, no el corazón técnico inicial.

## 2. Línea base técnica verificada

Estado actual del build:

- `corepack pnpm build`: pasa correctamente.
- `corepack pnpm lint`: pasa sin errores ni warnings.
- `corepack pnpm exec prisma validate` con `DATABASE_URL` dummy: schema válido.
- `next build` muestra un aviso esperado cuando no existe `DATABASE_URL` real; el dashboard usa fallback, pero producción con datos reales necesita una base configurada.
- Prisma advierte que `package.json#prisma` será deprecado en Prisma 7; no bloquea el MVP, pero debe migrarse luego a `prisma.config.ts`.

Lo que ya existe:

- Landing pública con narrativa de salón privado, imágenes locales de Melany y sección Mela.
- Rutas principales: `/`, `/sign-in`, `/melany`.
- APIs internas para OpenClaw/Mela: brief, fan brief, reply draft, proposed action, alert, live brief.
- Preview interactivo de Mela para orientar intención.
- Dashboard de Melany con snapshot operativo y fallback cuando no hay DB.
- Prisma schema amplio para usuarios, tokens, transacciones, contenido, live, retiros, agente IA, auditoría y pagos.

Lo que aún no existe de forma productiva:

- Base de datos real con migraciones aplicadas.
- Auth real para clientes y Melany.
- Age gate verificable antes de contenido adulto.
- Checkout funcional con pagos reales.
- Ledger de tokens conectado a compras reales.
- Biblioteca privada con control de acceso efectivo.
- Upload/hosting privado de fotos y videos.
- Chat privado persistente con usuarios reales.
- Cumplimiento legal mínimo: términos, privacidad, consentimiento 18+, DMCA, política de reembolsos, consentimiento/model release.
- Analítica de funnel.
- Streaming productivo.

## 3. Evaluación de oportunidad real

Probabilidad de validar ingresos sin audiencia propia o sin tráfico dirigido: baja. Menor al 10%.

Probabilidad de validar ingresos con audiencia existente, mensajes directos, tráfico desde redes y oferta simple: media. Rango razonable: 20% a 35% en 30 días.

Probabilidad de construir un producto rentable y repetible con pagos, drops, retención, Mela asistida y contenido constante: posible pero exigente. Rango razonable: 40% a 55% para validar MVP, no para escalar automáticamente.

El negocio no falla por falta de tecnología. Falla si:

- El usuario no entiende qué compra.
- Los tokens no tienen usos deseables.
- El contenido se siente genérico.
- El pago es difícil o poco confiable.
- Melany no trae tráfico o no activa comunidad.
- La promesa visual no se sostiene con contenido real.
- La plataforma intenta hacer live, chat, IA, pagos y streaming perfecto antes de vender el primer paquete.

## 4. Qué debe vender el MVP

El MVP debe vender acceso privado, no "una app". Los tokens deben funcionar como una moneda de deseo dentro de un salón con recompensas claras.

Usos concretos de tokens para el MVP:

- Desbloquear drops de fotos/videos.
- Comprar replay o aftershow.
- Enviar propinas durante momentos especiales.
- Pedir prioridad en chat.
- Reservar videollamada/manual booking.
- Solicitar contenido personalizado.
- Activar metas de live en una fase posterior.

El usuario compra tokens porque cada token lo acerca a algo más íntimo, no porque quiera tener saldo guardado.

## 5. MVP recomendado para despliegue real

### Fase A - Producción básica y confianza

Duración estimada: 3 a 5 días.

Entregables:

- Configurar `DATABASE_URL` real.
- Ejecutar migraciones y seed.
- Auth real con roles: cliente y Melany.
- Age gate 18+ antes de registro y antes de cualquier contenido privado.
- Páginas legales mínimas.
- Variables de entorno listas para Netlify.
- Dashboard protegido.

Criterio de salida:

- Usuario puede registrarse, iniciar sesión y quedar marcado como mayor de edad.
- Melany puede entrar a dashboard.
- Build y deploy pasan.

### Fase B - Tokens y compra manual validable

Duración estimada: 5 a 7 días.

Entregables:

- Paquetes de tokens: 120, 385, 1040.
- Flujo manual Colombia y cripto: usuario sube comprobante o hash.
- Panel de Melany/admin para aprobar pago.
- Wallet y token ledger.
- Estado de orden: pendiente, aprobada, rechazada.
- Email/notificación básica de aprobación.

Criterio de salida:

- Se puede recibir dinero por fuera, aprobarlo dentro de la plataforma y acreditar tokens.
- No se depende todavía de CCBill/Segpay para probar demanda.

### Fase C - Drops privados y desbloqueo

Duración estimada: 5 a 8 días.

Entregables:

- Galería privada con 6 a 12 piezas iniciales.
- Drops bloqueados por tokens.
- Acceso concedido después de gasto de tokens.
- Registro de desbloqueos por usuario.
- Preview sensual, pero contenido real solo detrás de acceso.
- Descarga desactivada por defecto; primero streaming/visualización privada.

Criterio de salida:

- Usuario compra tokens, desbloquea contenido y puede volver a verlo.
- Melany ve qué contenido convierte.

### Fase D - Mela como concierge, no como robot autónomo

Duración estimada: 4 a 6 días.

Entregables:

- Mela pregunta intención y recomienda entrada.
- Mela genera draft de respuesta.
- Handoff para Melany cuando hay intención caliente.
- Memoria básica por usuario: preferencias, compras, último interés.
- Sin envíos automáticos sensibles al inicio.

Criterio de salida:

- Mela mejora conversión y reduce carga operativa sin tomar decisiones peligrosas.

### Fase E - Analítica y prueba controlada

Duración estimada: 2 a 4 días.

Entregables:

- Eventos de funnel: visita, click CTA, registro, checkout iniciado, pago pendiente, pago aprobado, desbloqueo, recompra.
- Métricas dashboard: ingresos, conversión, AOV, tokens comprados, tokens gastados, drops más vendidos.
- UTM para campañas desde redes.

Criterio de salida:

- Después de 30 días sabemos si hay negocio o solo curiosidad.

## 6. Streaming: decisión para MVP

No recomiendo construir streaming como primera función central. Es caro, sensible y operacionalmente pesado.

Ruta recomendada:

- MVP 1: drops + replays + chat/concierge + acceso privado.
- MVP 2: live puntual con OBS + SRS en VPS si ya hay compradores.
- MVP 3: LiveKit/Agora solo si el live demuestra ingreso suficiente y necesidad de baja latencia/interacción avanzada.

SRS es software libre y sirve como media server RTMP/WebRTC/HLS, pero no elimina costos: servidor, ancho de banda, monitoreo, almacenamiento, seguridad y operación. Para un primer test, el live debe ser evento puntual con cupos, metas y replay monetizable.

## 7. Arquitectura de despliegue propuesta

Opción MVP pragmática:

- Frontend/API: Netlify con Next.js.
- Base de datos: Postgres gestionado o Supabase solo para DB/Auth si se revisan términos y se evita almacenar contenido explícito directamente allí.
- Media privado: proveedor tolerante a contenido adulto o bucket propio detrás de URLs firmadas.
- Streaming posterior: SRS en VPS cuando haya demanda.
- IA/Mela: servicio interno con límites, logs y aprobación humana.
- OpenClaw: solo en modo operador interno, nunca expuesto públicamente y nunca con permisos de pago/retiro sin revisión humana.

Si se usa Hostinger:

- Puede servir para VPS/Cloud en contenido adulto según su soporte, pero conviene usarlo con monitoreo y backups externos.
- No lo usaría como única pieza crítica sin plan de recuperación.

## 8. Riesgos críticos antes de cobrar

- Cumplimiento adulto: edad, consentimiento, términos y manejo de material explícito.
- Procesadores high-risk: aprobación lenta, comisiones altas, chargebacks.
- Storage: no todos los proveedores toleran adulto explícito.
- Seguridad: contenido privado no puede estar en rutas públicas triviales.
- Reputación: una filtración de contenido o datos mata confianza.
- OpenClaw/IA: riesgo de acciones no deseadas si se le dan permisos amplios.
- Economía de tokens: si solo sirven para propina, no sostienen recompra.

## 9. Métricas para decidir si el MVP vive o muere

Prueba de 30 días:

- 1.000 a 2.000 visitas cualificadas desde redes/DM.
- 8% a 15% click en CTA principal.
- 3% a 6% inicio de compra o comprobante.
- 1% a 2.5% conversión paga inicial.
- Ticket promedio objetivo: US$25 a US$45.
- 15% o más de recompra en compradores.
- 30% o más de tokens gastados en los primeros 7 días.
- Reembolsos o reclamos bajo 3%.

Señal verde:

- Hay compradores repetidos y una categoría clara de contenido que se desbloquea más.

Señal amarilla:

- Mucho registro, poco pago. El problema puede ser confianza, precio o checkout.

Señal roja:

- Tráfico entra, mira y no toca CTA. La propuesta no está clara o el deseo no supera la fricción.

## 11. Actualización por audiencia real de Melany

Datos aportados para la línea base comercial:

- Facebook: aproximadamente 58.000 seguidores.
- Instagram: poco más de 24.000 seguidores.
- X/Twitter: alrededor de 1.550 seguidores antes del baneo.
- Presencia activa o histórica en Mileróticos y distintas.net.

No pude verificar directamente los perfiles de Facebook e Instagram desde el navegador actual porque Meta bloquea o exige sesión para esas páginas. Para la planeación tomo esos números como supuesto operativo aportado por el proyecto.

Esto cambia la evaluación: Melany no empieza desde cero. Tiene audiencia, reconocimiento y demanda latente. Pero seguidores no son compradores; son inventario de atención. El MVP debe probar cuánta de esa atención se convierte en pago privado.

Lectura brutal:

- 82.000 seguidores nominales no significan 82.000 prospectos. Con solapamiento, cuentas inactivas y alcance orgánico, el público realmente impactable puede estar mucho más cerca de 2.000 a 6.000 personas por campaña bien movida.
- Facebook e Instagram sirven para deseo, prueba social y tráfico suave, no para vender explícitamente contenido adulto. Meta restringe la oferta de servicios sexuales en sus normas de Instagram/Facebook, así que el lenguaje público debe ser elegante, indirecto y llevar a un age gate propio.
- Mileróticos y distintas.net tienen menos glamour, pero mucha más intención transaccional. Ahí la landing debe funcionar como filtro de marca: pasar de "anuncio" a "salón privado".
- El baneo en X confirma riesgo de plataforma. Hay que construir canal propio desde el día uno: email, lista privada, Telegram u otro canal consentido, sin depender de una red que puede cerrar la cuenta.

Escenarios de 30 días usando la audiencia actual:

- Conservador: 1.500 visitas cualificadas, 1.5% compra, 22 compradores, ticket promedio US$25 a US$35, ingreso bruto aproximado US$550 a US$770.
- Base realista: 3.000 visitas cualificadas, 2.5% compra, 75 compradores, ticket promedio US$35 a US$45, ingreso bruto aproximado US$2.625 a US$3.375.
- Fuerte: 6.000 visitas cualificadas, 3.5% compra, 210 compradores, ticket promedio US$40 a US$55, ingreso bruto aproximado US$8.400 a US$11.550.

Umbral honesto:

- Si con 82.000 seguidores nominales no se consiguen al menos 40 a 60 compradores en 30 días, el problema no será técnico. Será oferta, confianza, precio, tráfico mal dirigido o fricción de pago.
- Si se superan 100 compradores pagos en 30 días y hay recompra, la plataforma merece inversión en streaming, automatización y pagos internacionales.

Campaña MVP recomendada:

- Lanzar un primer drop con nombre propio: "En Medellín, hay una parte de mí que no dejo ver en público".
- Publicar teaser seguro en Facebook/Instagram sin desnudez explícita, sin precios públicos y sin lenguaje de venta sexual directa.
- Llevar a landing con age gate y CTA: "Solicitar acceso".
- Para clasificados, usar mensaje directo: perfil verificado, fotos reales, acceso privado y pago discreto.
- Medir cada canal con UTM: `facebook_bio`, `instagram_story`, `instagram_dm`, `mileroticos`, `distintas`.
- Ofrecer primer paquete claro: 120 tokens para desbloquear el primer drop.
- Mela debe recibir al usuario según origen: curioso social, comprador de clasificado, fan recurrente o VIP.

Próxima decisión de producto:

- La landing debe tener una variante de campaña para tráfico social y otra para clasificados. No hablan igual, no llegan con la misma intención y no compran por la misma razón.

## 12. Estrategia Stripchat + redes + Salón Privado

Dato nuevo:

- Melany puede transmitir en Stripchat.
- Chaturbate no es viable actualmente por baneo derivado de un mal manejo de una casa de streaming.

Lectura estratégica:

Stripchat cambia la arquitectura del MVP. Ya no tiene sentido construir streaming propio de inmediato. Stripchat puede resolver la transmisión, pagos internacionales, tokens de live, privados, ticket shows, goals, Lovense, recordings y descubrimiento interno. El Salón Privado debe resolver lo que Stripchat no le da a Melany: marca propia, relación directa, drops curados, memoria de fans, campañas, Mela, base de datos y recompra fuera del ruido de una plataforma cam masiva.

Regla de oro:

- Stripchat es escenario.
- Facebook/Instagram son deseo y tráfico suave.
- Mileróticos/distintas.net son intención caliente.
- Salón Privado es propiedad, retención y venta curada.

Lo que Stripchat abre:

- Validar live sin pagar infraestructura.
- Monetizar con tips, privados, ticket shows, group shows y goals.
- Usar Lovense/Kiiroo dentro de un entorno ya preparado.
- Vender contenido y recordings dentro de Stripchat.
- Capturar fans que ya tienen tokens y hábito de pago adulto.
- Programar lives como eventos, no como transmisión permanente.

Lo que Stripchat no debe hacer:

- No debe reemplazar la plataforma propia.
- No debe ser usado para mandar usuarios agresivamente a pagar por fuera.
- No debe mezclar sus tokens con los tokens internos de Melany.
- No debe depender de una casa/studio que no controle bien la cuenta.

Riesgo crítico de política:

Stripchat prohíbe usar la cuenta como gateway para sacar usuarios hacia otras plataformas, servicios de suscripción o pagos externos. También prohíbe usar métodos de pago distintos a los ofrecidos por Stripchat dentro de su plataforma. Por eso, durante el live, Melany debe monetizar dentro de Stripchat y no decir "págame por fuera" ni empujar explícitamente a comprar en el Salón Privado. El Salón Privado debe capturar tráfico desde redes, clasificados, bio, campañas y marca, no robarlo dentro del chat de Stripchat.

Flujo recomendado:

1. Facebook/Instagram publican teaser elegante y seguro: "Esta noche estoy en vivo. Si sabes entrar, sabes dónde encontrarme."
2. Link en bio lleva a la landing con age gate.
3. Landing muestra dos caminos: "Verme en vivo esta noche" y "Entrar al Salón Privado".
4. El live ocurre en Stripchat y monetiza con tokens de Stripchat.
5. Después del live, el Salón Privado vende drops, fotos, videos, aftershow, replays propios y solicitudes personalizadas.
6. Mela recibe al usuario que vuelve desde redes o clasificados y lo orienta hacia el producto correcto.

Economía separada:

- Stripchat tokens: solo para live, tips, privados y funciones dentro de Stripchat.
- Melany tokens: solo para drops, acceso privado, contenido desbloqueable, solicitudes, chat y reservas dentro del Salón Privado.

Fórmula simple de live:

- Ingreso estimado de Stripchat para Melany = tokens recibidos x US$0.05.
- 2.000 tokens en una noche = US$100.
- 10.000 tokens en una noche = US$500.
- 20.000 tokens en una noche = US$1.000.

No tomo esos números como promesa. Sirven como regla rápida para medir si el live está justificando tiempo, preparación y producción.

Experimento de 14 días:

- 6 a 8 transmisiones en Stripchat.
- Horario fijo anunciado desde redes.
- 1 meta principal por noche.
- Tip menu claro y elegante.
- Lovense configurado si Melany lo desea.
- CTA social sin vulgaridad ni venta explícita.
- Después de cada live, publicar un drop privado relacionado en el Salón Privado.
- Medir: viewers, favoritos, tokens, privados, duración, nuevos registros en landing, ventas de drops y recompra.

Decisión después del experimento:

- Si Stripchat genera tokens pero no aumenta registros/ventas del Salón, se mantiene como canal de caja, no como corazón del negocio.
- Si redes llevan usuarios al live pero no compran en Salón, hay que mejorar oferta post-live.
- Si Salón vende drops después de cada transmisión, ahí nace el modelo: live como evento de deseo, plataforma propia como monetización elegante y recurrente.

## 10. Próximo paso recomendado

El siguiente paso no es rediseñar más. Es convertir la plataforma en una prueba cobrable.

Orden exacto:

1. Configurar DB real y migraciones.
2. Proteger rutas con auth y roles.
3. Implementar compra manual de tokens.
4. Implementar wallet y ledger real.
5. Crear drops bloqueados.
6. Conectar Mela a intención y handoff.
7. Desplegar en Netlify con dominio temporal.
8. Lanzar beta privada con tráfico real de Melany.
9. Medir 30 días.

## Fuentes técnicas revisadas

- Netlify indica soporte para Next.js y App Router: https://www.netlify.com/with/nextjs/
- Supabase pricing y límites actuales: https://supabase.com/pricing
- Supabase self-hosting: https://supabase.com/docs/guides/self-hosting
- Hostinger indica que permite contenido adulto legal y recomienda Cloud/VPS: https://support.hostinger.com/es/articles/1583358-esta-permitido-el-contenido-para-adultos-en-hostinger
- SRS se presenta como media server open-source MIT para RTMP/WebRTC/HLS/HTTP-FLV/SRT: https://ossrs.io/lts/en-us/docs/v6/doc/introduction
- Instagram/Facebook advierten en sus normas comunitarias que no se permite ofrecer servicios sexuales: https://www.facebook.com/help/instagram/477434105621119
- Stripchat permite monetización por tips, goals, privados, ticket shows, contenido, Lovense/Kiiroo y Fan Clubs: https://support.stripchat.com/hc/en-us/articles/4410734356753-How-to-make-money-on-Stripchat-ways-to-earn
- Stripchat paga a modelos US$0.05 por token recibido: https://support.stripchat.com/hc/en-us/articles/4410734353553-How-much-is-a-Stripchat-token-price-value-and-cost-for-models
- Stripchat prohíbe usar métodos de pago externos y usar la cuenta como gateway para llevar usuarios fuera de la plataforma: https://support.stripchat.com/hc/en-us/articles/4410728017553-Stripchat-rules-for-model-guidelines-and-standards
