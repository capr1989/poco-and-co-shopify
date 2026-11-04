# Poco & Co. — Fase 5A: auditoría estática de rendimiento y accesibilidad

Fecha: 2026-11-04  
Rama: `phase5/static-audit`  
Base: `15247dd` (`phase4/visual-ux-validation`)

## 1. Resumen ejecutivo

La implementación actual utiliza Dawn nativo, sin framework JavaScript ni dependencias de aplicaciones identificadas en el código del tema. La base es razonable para el objetivo de velocidad: scripts propios con `defer`, imágenes responsivas y carga diferida para contenido secundario, animaciones de revelado desactivadas y controles de búsqueda de 48 px con foco visible.

Los principales riesgos que deben comprobarse antes de optimizar son: el peso real de fuentes Manrope, el tamaño de recursos de primer render, la imagen principal de producto marcada como `lazy`, las solicitudes inyectadas por `content_for_header` y el impacto real del módulo nativo de Standard Events. No se ejecutaron Lighthouse, navegador, PageSpeed ni pruebas RUM; por tanto no se declaran valores de LCP, INP, CLS ni puntuaciones.

## 2. Alcance y método

- Revisión estática de `theme/` y reutilización de `docs/performance.md`.
- No se modificó código funcional, Shopify Admin, Dawn remoto ni Horizon.
- No se instalaron herramientas ni dependencias.
- Inventario de fuente: 262 archivos; 36 JavaScript y 66 CSS. Suma de fuentes: 238.018 bytes JS y 388.175 bytes CSS. Son tamaños de código fuente, no bytes transferidos ni comprimidos.
- Se mantienen los presupuestos previos: JS propio inicial ≤20 KiB gzip, JS total ≤150 KiB comprimido, CSS total ≤60 KiB, CSS propio ≤15 KiB gzip, imagen LCP móvil ≤150 KiB, fuentes iniciales ≤100 KiB, transferencia inicial total ≤800 KiB y cero orígenes externos adicionales por defecto.

## 3. Hallazgos confirmados

### Rendimiento

1. `theme/layout/theme.liquid:33-52` importa `https://cdn.shopify.com/storefront/standard-events.js` y registra eventos nativos. No es una app externa, pero sí una solicitud/origen que debe medirse en el waterfall.
2. `theme/layout/theme.liquid:54-66` carga los scripts base con `defer`; `animations.js` solo se incluye si `settings.animations_reveal_on_scroll` está activo. En `theme/config/settings_data.json:70-71` las animaciones de revelado y hover están desactivadas.
3. `theme/layout/theme.liquid:76-81` declara cinco caras de fuente y `:16-18` añade preconexión a `fonts.shopifycdn.com`. La configuración usa Manrope 500 y 700 (`theme/config/settings_data.json:62-65`). El número de declaraciones no prueba el peso transferido; debe verificarse con waterfall y caché fría.
4. `theme/snippets/card-product.liquid:68-87` usa `srcset`, `sizes`, dimensiones explícitas y `loading="lazy"` para tarjetas. Es adecuado para contenido secundario y reduce trabajo inicial.
5. `theme/snippets/product-media.liquid:13-32` usa `srcset`, `sizes`, dimensiones y `loading="lazy"` incluso para la imagen de media de producto. Es una oportunidad de riesgo para LCP si esa imagen es la primera visible; requiere confirmar el contexto renderizado antes de cambiarla.
6. `theme/snippets/poco-logo.liquid:4` define `width`, `height`, `alt` y `loading="eager"` para el SVG de marca. `header.liquid` utiliza `image_tag` con `preload: true` en sus variantes de logo. No se observa lazy loading aplicado al logo principal.
7. El recurso más grande del árbol estático es `theme/assets/sparkle.gif` (179.349 bytes), seguido por `base.css` (85.082) y `global.js` (52.927). Su presencia en el repositorio no demuestra que se carguen en el primer viewport; debe comprobarse por ruta.
8. `{{ content_for_header }}` (`theme/layout/theme.liquid:68`) puede inyectar recursos de Shopify o aplicaciones. El inventario estático no puede conocer su cantidad, peso ni bloqueo.

### Accesibilidad y UX móvil

1. `theme/sections/poco-search.liquid:1-12` usa `section`, `form role="search"`, `label` asociado al `input`, método GET y filtro de tipo producto. El bloque se omite explícitamente en `request.page_type == 'search'`, evitando duplicar ese buscador en la plantilla de resultados; la visibilidad final debe confirmarse en navegador.
2. `theme/assets/poco.css:1` fija input y botón de búsqueda a 4,8 rem (48 px), mantiene `min-width:0` y define `:focus-visible` con contorno de 2 px y offset de 3 px. El botón tiene la misma altura que el campo.
3. `theme/assets/base.css:728-743` define foco global con `:focus-visible` y fallback `.focused`; `:587-591` respeta `prefers-reduced-motion`.
4. `theme/snippets/poco-logo.liquid:4` tiene texto alternativo y dimensiones explícitas. Dawn incluye etiquetas, `aria-label`, estados vivos y controles de foco en búsqueda, filtros, variantes y carrito; son fortalezas estáticas, no sustituyen una prueba de teclado.
5. `theme/config/settings_data.json:8-59` contiene esquemas de color con valores de texto, fondo y botón. La accesibilidad de contraste no puede darse por confirmada solo con esta inspección; se necesita contraste calculado sobre el DOM renderizado y estados hover/focus.

## 4. Problemas potenciales pendientes de validación

- **P1 — LCP de producto:** determinar si la primera imagen visible de `product-media.liquid` recibe `loading="lazy"` en la ficha real. Si es el elemento LCP, la corrección mínima sería hacer eager/prioritaria solo esa primera imagen.
- **P1 — Presupuesto inicial:** medir en frío el peso de Manrope, `base.css`, `global.js`, `content_for_header` y Standard Events en home, colección, búsqueda, producto y carrito. No eliminar scripts nativos sin cobertura funcional.
- **P2 — Recursos condicionales:** verificar si `sparkle.gif`, hojas de estilo de quick order/facets o scripts de búsqueda se descargan en rutas donde no se usan.
- **P2 — Imágenes y alt:** revisar en DOM que productos sin `media.alt` no produzcan imágenes informativas sin alternativa útil y que la imagen LCP tenga `sizes` adecuado.
- **P2 — Controles móviles:** medir en 320/360/390 px menú, filtros, variantes, cantidad y carrito. El buscador personalizado ya tiene 48 px; otros controles requieren prueba real.
- **P2 — Teclado y diálogos:** confirmar orden de foco, retorno de foco y ausencia de trampas en menú móvil, predictive search, filtros y cart drawer.
- **P3 — Animaciones:** comprobar que no se habiliten por configuración de una sección y que `prefers-reduced-motion` cubra cualquier transición adicional.

## 5. Prioridades y recomendaciones

| Prioridad | Recomendación | Impacto esperado | Complejidad |
|---|---|---|---|
| P1 | Medir waterfall y presupuesto por ruta antes de editar bundles o scripts. | Evita optimizaciones regresivas y localiza el coste real del primer render. | Baja |
| P1 | Validar la primera media de producto; eliminar `lazy` solo si es el LCP real. | Mejora potencial de LCP sin aumentar solicitudes innecesarias. | Baja |
| P1 | Medir fuentes Manrope en caché fría y limitar caras no usadas. | Reduce bloqueo/bytes iniciales manteniendo identidad visual. | Media |
| P2 | Confirmar qué CSS/JS condicional se descarga por plantilla. | Reduce solicitudes y trabajo en rutas simples. | Media |
| P2 | Auditar contraste, foco, touch targets y alt en DOM real. | Mejora accesibilidad y conversión móvil. | Baja |
| P3 | Revisar `sparkle.gif` y animaciones solo si aparecen en primer viewport. | Posible reducción de bytes sin alterar la experiencia principal. | Media |

No se recomienda añadir frameworks, un segundo sistema de carrito, redirecciones JavaScript ni aplicaciones de optimización.

## 6. Etapa B: verificaciones que sí requieren navegador/Lighthouse

1. Lighthouse móvil y escritorio en condiciones equivalentes, con CPU moderada y conexión móvil limitada; guardar JSON/HTML.
2. Tres ejecuciones frías por ruta: portada, colección, búsqueda, producto (variante y sin stock) y carrito.
3. Registrar LCP, INP, CLS, TTFB, peso transferido, solicitudes, long tasks y elemento LCP. Separar laboratorio de CrUX/RUM p75.
4. Comparar Dawn no publicado y Horizon publicado sin cambiar configuraciones.
5. Confirmar visualmente la ruta de búsqueda sin buscador duplicado, filtros, variantes, carrito y mensaje de stock parcial.
6. Prueba de teclado y lector de foco en header, menú móvil, búsqueda predictiva, filtros, selector de variantes y cart drawer.
7. Contraste computado para esquemas claros/oscuros, estados de foco y botones.
8. Revisar 320/360/390 px y escritorio 1440 px; verificar CLS al cargar fuentes, imágenes y drawer.
9. Comprobar requests de `content_for_header`, Standard Events, fuentes y cualquier app inyectada.
10. Repetir mediciones después de cada cambio importante; no usar métricas inventadas.

## Estado y restricciones

Esta etapa no cambió Shopify, no subió archivos, no publicó Dawn, no modificó Horizon, no ejecutó Computer Use, navegador, Lighthouse ni PageSpeed, y no cambió idiomas, productos, pagos o pedidos. T001 y T002 permanecen pendientes al 0 %.
