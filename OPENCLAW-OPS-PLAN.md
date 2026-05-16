# OpenClaw Ops Plan

Fecha: 2026-05-15

## Objetivo

Usar `OpenClaw` como capa operativa para `Mela` y para la autogestion de la plataforma sin poner en riesgo la parte critica del negocio.

Regla central:

- `OpenClaw` ayuda a operar, resumir, clasificar, proponer y alertar.
- El `core backend` sigue siendo la unica fuente de verdad para tokens, accesos, pagos, live y contenido.

## Rol de OpenClaw

### Si

- concierge interno de `Mela`
- resumen diario del negocio
- seguimiento de fans calientes
- propuestas de respuesta
- alerta de incidentes y pendientes
- coordinacion de drops, replays y lives
- acceso multi-canal para el operador

### No

- no guarda el ledger oficial
- no decide saldos
- no liquida pagos
- no crea retiros
- no publica acciones irreversibles sin aprobacion
- no se expone como frontera multi-tenant hostil

## 1. Matriz de permisos exacta

### Servicios

| Servicio | Lectura | Escritura | Notas |
|---|---|---|---|
| `Fan profile brief` | Si | No | Resumen de gustos, ultimo gasto, ultimo live, ultimos drops abiertos |
| `Conversation summaries` | Si | Si, solo drafts | Puede leer y proponer respuesta, no enviar directo sin gate |
| `Live status` | Si | No | Estado de live, replay pendiente, viewers, meta actual |
| `Catalog and drops` | Si | Si, solo draft | Puede proponer copy y programacion, no publicar |
| `Wallet balance` | Si, resumido | No | Solo balance visible y ultimas 3 operaciones resumidas |
| `Token ledger` | No directo | No | Solo el backend consulta y resume |
| `Payments` | Si, estados altos | No | Ejemplo: paid, pending review, failed |
| `Withdrawals` | No | No | Fuera del alcance |
| `Admin dashboards` | Si, limitado | No | Solo lectura |
| `Notifications` | Si | Si | Puede disparar alertas al operador |
| `Incident runbooks` | Si | Si, checklist | Puede crear tareas o checklist de respuesta |

### Acciones permitidas

| Accion | Permitida | Condicion |
|---|---|---|
| resumir actividad del dia | Si | segura |
| clasificar fan por intencion | Si | segura |
| redactar mensaje sugerido | Si | segura |
| sugerir siguiente oferta | Si | segura |
| avisar que el live cayo | Si | segura |
| avisar que falta replay | Si | segura |
| crear draft de drop | Si | segura |
| programar recordatorio interno | Si | segura |
| enviar mensaje real al fan | Si, con gate | requiere aprobacion o policy estrecha |
| cambiar precio | No | humano |
| regalar tokens | No | humano |
| mover saldo | No | humano |
| abrir acceso premium | No | humano/backend |
| cambiar stream key | No | humano |
| borrar contenido | No | humano |

### Gateways recomendados

| Gateway | Uso | Permisos |
|---|---|---|
| `ops-telegram` | operador | resumanes, alertas, aprobaciones |
| `ops-whatsapp` | operador | resumen corto, alertas criticas |
| `support-webchat` | fans | respuestas sugeridas y clasificacion, nunca finanzas |
| `research-browser` | interno | lectura de paneles y referencias |

## 2. Diseno de APIs internas para OpenClaw

OpenClaw no debe hablar directo con la DB ni con secretos maestros. Debe hablar con una capa de APIs internas reducidas.

### Principios

- service token propio para `OpenClaw`
- IP allowlist o private network
- scopes por endpoint
- datos minimizados
- auditoria de cada llamada
- respuestas ya filtradas para no exponer informacion cruda

### Endpoints recomendados

#### `GET /internal/openclaw/brief`

Devuelve un brief del dia para el operador.

Respuesta:

```json
{
  "date": "2026-05-15",
  "live": {
    "status": "scheduled",
    "startsAt": "2026-05-15T21:00:00-05:00",
    "replayPending": false
  },
  "sales": {
    "grossUsd": 420.5,
    "tokenPacks": 9,
    "tipsCount": 18
  },
  "fansNeedingFollowup": 5,
  "pendingPayments": 1,
  "draftDrops": 2,
  "alerts": [
    "Falta portada para replay de anoche"
  ]
}
```

#### `GET /internal/openclaw/fans/:fanId/brief`

Devuelve el contexto minimo util del fan.

Respuesta:

```json
{
  "fanId": "fan_123",
  "displayName": "Carlos",
  "tier": "returning-buyer",
  "interests": ["drops", "aftershow", "chat"],
  "lastSeenAt": "2026-05-14T22:11:00-05:00",
  "lastPurchase": {
    "type": "token-pack",
    "usd": 39.99,
    "date": "2026-05-14T21:00:00-05:00"
  },
  "lastUnlock": "Replay Medellin Roja",
  "conversationMood": "warm"
}
```

#### `POST /internal/openclaw/reply-draft`

Recibe intencion y contexto; devuelve draft sugerido.

Entrada:

```json
{
  "fanId": "fan_123",
  "channel": "support-webchat",
  "intent": "wants-private-more-intimate",
  "message": "Quiero algo mas privado esta noche"
}
```

Respuesta:

```json
{
  "draft": "Si quieres algo mas cercano esta noche, puedo guiarte primero por lo que acaba de quedar abierto para ti y luego dejarte lista la entrada correcta para cuando Melany aparezca.",
  "recommendedOffer": {
    "type": "aftershow",
    "tokenCost": 120
  },
  "requiresHumanApproval": true
}
```

#### `POST /internal/openclaw/proposed-action`

OpenClaw propone una accion, pero no la ejecuta.

Entrada:

```json
{
  "type": "send-followup",
  "target": "fan_123",
  "payload": {
    "reason": "opened replay but did not buy aftershow",
    "messageDraft": "Te deje una entrada mejor pensada por si vuelves esta noche."
  }
}
```

Respuesta:

```json
{
  "proposalId": "prop_001",
  "status": "pending-review"
}
```

#### `POST /internal/openclaw/alert`

Para avisos operativos.

Entrada:

```json
{
  "severity": "high",
  "code": "LIVE_STREAM_OFFLINE",
  "summary": "El live programado no esta entregando video",
  "context": {
    "liveSessionId": "live_123"
  }
}
```

#### `GET /internal/openclaw/live/:sessionId`

Devuelve estado simplificado del live.

Respuesta:

```json
{
  "sessionId": "live_123",
  "status": "live",
  "viewerCount": 42,
  "tipsTotalTokens": 380,
  "goalProgress": 0.64,
  "replayReady": false
}
```

### Endpoints que OpenClaw no debe tener

- `POST /wallet/credit`
- `POST /withdrawals`
- `POST /content/publish-live-now`
- `PATCH /stream-key`
- acceso SQL directo

## 3. Flujo de Mela + OpenClaw

### Flujo base de fan

1. El fan entra al chat o escribe por un canal externo.
2. `Mela app-native` recibe el mensaje.
3. `Mela` consulta al backend por:
   - perfil del fan
   - saldo visible
   - ultimo unlock
   - estado del live o drop actual
4. Si hace falta contexto operativo, `Mela` pide a `OpenClaw`:
   - resumen del fan
   - clasificacion de intencion
   - draft de respuesta
   - siguiente oferta recomendada
5. `Mela` decide:
   - responder directo con un template seguro
   - pedir aprobacion humana
   - escalar a Melany
6. Si el fan compra, desbloquea o reserva algo, eso lo registra solo el backend.
7. `OpenClaw` recibe despues un resumen del evento para memoria operativa.

### Flujo de operador

1. A las 9 a. m. OpenClaw manda brief a Telegram.
2. Resume:
   - ventas
   - fans calientes
   - replay pendiente
   - live del dia
   - drop sugerido
3. El operador responde:
   - `prepara mensaje para quienes compraron replay ayer`
4. OpenClaw genera 3 drafts segmentados.
5. El operador aprueba uno.
6. El backend o el modulo de mensajes ejecuta el envio.

### Flujo de incidente

1. SRS o el backend detecta que el live no esta arriba.
2. Se crea alerta interna.
3. OpenClaw recibe `LIVE_STREAM_OFFLINE`.
4. OpenClaw manda:
   - resumen corto a Telegram
   - checklist de respuesta
   - enlace rapido al dashboard
5. El operador corrige.
6. OpenClaw marca el incidente como resuelto y deja log.

## 4. Checklist de instalacion segura en VPS

### Host y red

- usar `VPS separado` para OpenClaw
- no correr OpenClaw en el mismo host del DB primario
- firewall con puertos minimos
- acceso SSH por llave, no password
- fail2ban o equivalente
- actualizaciones de seguridad activas

### Sistema

- crear usuario de sistema dedicado, por ejemplo `openclaw`
- no usar root para correr el proceso
- separar directorios de:
  - configs
  - logs
  - browser profiles
  - sesiones
- backups cifrados de configuracion minima

### Secrets

- un service token especifico para OpenClaw
- rotacion de secrets
- variables separadas por ambiente
- nunca meter llaves maestras de DB o pagos
- no compartir tokens entre gateway ops y gateway support

### Browser y tools

- usar navegador dedicado solo para OpenClaw
- perfil separado del navegador humano
- sin sesiones personales mezcladas
- allowlist de dominios internos
- desactivar tools innecesarias
- sandbox para tareas experimentales

### App y APIs

- todas las APIs internas con autenticacion de servicio
- scopes por endpoint
- rate limit
- auditoria de request/response
- sanitizacion de prompts y respuestas
- logs redactados si tocan PII

### Politica operativa

- cualquier accion financiera requiere humano
- cualquier accion de acceso premium requiere backend y reglas
- cualquier campana masiva requiere aprobacion
- cualquier cambio de precio requiere humano
- revisar logs semanalmente

## Roadmap de implementacion

### Fase 1

- `ops-telegram`
- `GET /internal/openclaw/brief`
- alertas de live y replay
- drafts de follow-up

### Fase 2

- brief por fan
- clasificacion de intencion
- draft de respuesta para Mela
- propuestas de oferta

### Fase 3

- automatizacion de drops
- playbooks de incidentes
- checklist de post-live
- monitoreo continuo

## Decision recomendada

Si se implementa `OpenClaw` en `Melany`, debe entrar primero como:

- `operador asistido`
- `Mela backstage`
- `capa de resumen y coordinacion`

No como:

- autoridad de negocio
- capa de pagos
- sistema de permisos
- motor de tokens
