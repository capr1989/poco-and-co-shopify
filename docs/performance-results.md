# Resultados de rendimiento · Fase 3
## Qué se midió realmente
No existe todavía una tienda de desarrollo elegida/aprobada con Dawn cargado. No hay puntuaciones Lighthouse, LCP, CLS, INP o TBT de Shopify en esta fase.
Los objetivos siguen siendo LCP ≤2.5 s, INP ≤200 ms y CLS ≤0.1 al p75 real cuando exista muestra suficiente, y Lighthouse móvil ≥90 como objetivo de laboratorio. No son resultados obtenidos.

### Diagnóstico HTTP del prototipo
Node 22 en el contenedor existente, loopback 127.0.0.1:8080; sin navegador, sin TLS, sin throttling de red/CPU ni emulación móvil.
Se enumeraron deliberadamente 14 rutas (HTML, JS, CSS, fuente, logo, favicon y ocho SVG). Se solicitaron tres veces con Accept-Encoding: identity y todos devolvieron HTTP 200.
| Corrida | Solicitudes explícitas | Bytes de cuerpo recibidos |
|---|---:|---:|
| 1 | 14 | 186566 |
| 2 | 14 | 186566 |
| 3 | 14 | 186566 |

Esto **no es un waterfall ni transferencia inicial de un navegador**: incluye recursos elegidos por el script, no lo que el navegador decidió cargar. Los tiempos por solicitud son diagnósticos locales sin valor para afirmar velocidad en Panamá. Evidencia completa: evidence/phase3/local-http.json; script scripts/measure-local-http.mjs.
La TTF del prototipo aporta 164700 de 186566 bytes enumerados (88.3 %). Es el principal recurso de este diagnóstico y supera el presupuesto de fuente de 100 KiB. El prototipo se conserva como referencia; el tema usa Manrope mediante biblioteca Shopify, cuya descarga real aún no está medida.
JS propio del prototipo: 2155 bytes gzip; CSS: 1148. El tema candidato agrega cero JS propio y 334 bytes gzip de CSS. Estas cifras son compresión estática, no transferencia medida del storefront.

### Imágenes ficticias preparadas
Ocho PNG de 600×600 rotulados FICTICIO, derivados de SVG de muestra, no fotografías comerciales. Total de archivo: 83456 bytes; mayor: 13591 bytes. No están cargados en Shopify y no demuestran el LCP de fotos finales. Logo/favicon A se mantienen SVG originales.
Image-manifest.json conserva hashes y renderer resvg 2.6.2. No se modificó branding.

## Infraestructura y bloqueos
- Lighthouse 13.5.0/Playwright/axe están versionados dentro de Docker. Chrome compatible no está instalado en el contenedor restringido.
- La prueba de user namespaces bajo esa política falla EPERM; no se cambia seccomp, capacidades o no-new-privileges ni se utiliza --no-sandbox.
- La revisión automática rechazó el lanzamiento del Chrome Windows instalado con perfil de pruebas separado: blocked by policy. No se ejecutó ni se probó la misma acción por otra vía.
- Se propone VM desechable con navegador oficial, usuario normal, sandbox activo y sin montajes personales. Requiere aprobar su preparación; ver browser-test-infrastructure.md.
- PSI no puede evaluar localhost como si fuera público. Una dev store protegida tampoco es comparable a una tienda pública sin autenticar. No quitar contraseñas ni abrir túneles para medir.
- Sin datos CrUX/RUM de usuarios: p75 real no disponible, no inferido del laboratorio.

## Matriz de medición posterior
Home, colección, búsqueda, producto con variantes, agotado y carrito. Tres corridas comparables por ruta, dispositivo y estado de caché cuando el entorno lo permita; registrar versiones y parámetros exactos.
Móvil y escritorio separados. Mantener el protocolo de performance.md (móvil 390×844, estrés 1.6 Mbps/750 Kbps/150 ms y CPU4×; desktop 1440×900). Es escenario reproducible, no estadística de conexiones de Panamá.
Guardar score, LCP/elemento y fases, CLS/elementos, TBT, FCP, bytes/solicitudes, JS/CSS, fuentes, imágenes, terceros y recursos bloqueantes. TBT nunca se etiqueta como INP. INP de interacción en laboratorio no es p75 real.
A11y: axe más foco/teclado/lector y pruebas humanas WCAG 2.2 AA. El contraste de cuatro pares ya calculado no sustituye auditoría DOM.
Dawn permanece base aprobada. Reabrir Horizon únicamente si hay ventaja material o un problema de Dawn que justifique una comparación equivalente; no desarrollar dos tiendas completas.

## Otros resultados técnicos
Theme Check en Docker con documentación pública actualizada: 0 errores, 9 advertencias. No es medición de rendimiento ni prueba de renderizado Shopify.
15 tests locales aprobados en la revisión actual; LiquidJS con fixtures y reloj fijo donde corresponde. No prueban APIs Shopify.
