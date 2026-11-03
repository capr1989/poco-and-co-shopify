# Matriz funcional · Fase 3
Estados: **local aprobado** = evidencia ejecutada; **preparado** = código/datos presentes, sin demostrar runtime Shopify; **pendiente Shopify** = requiere tienda/acciones aprobadas. Las simulaciones LiquidJS usan reloj fijo del fixture, no son Liquid del servidor Shopify.

| ID | Escenario / resultado esperado | Resultado de esta fase | Evidencia / siguiente prueba |
|---|---|---|---|
| TH-01 | Estructura y archivos completos | Local aprobado | Guard compara presencia del upstream y JS nativo; ZIP de CLI local |
| LIQ-01 | Sintaxis Liquid y referencias | Local aprobado con advertencias | Theme Check 0 errores/9 advertencias; render real pendiente |
| BR-01 | Marca y favicon originales | Local aprobado | Hashes exactos; visual real Shopify pendiente |
| DAT-01 | Ocho productos/nueve variantes/seis departamentos ficticios | Local aprobado | JSON + PNG FICTICIO; ninguna carga |
| DAT-02 | Estado inicial Draft/no publicado/cero stock/DENY | Local aprobado como fixture | No prueba inventario remoto |
| DEL-01 | Mensaje verificado, fechas coherentes y vigente | Local aprobado con fixtures | Ver ficha real tras definir metacampos |
| DEL-02 | No verificado o sin fecha/mensaje/grupo | Local aprobado con fixtures | Fallback; se conserva HOLD |
| DEL-03 | Vencimiento y fecha de verificación futura/inválida | Local aprobado con fixtures | No se muestra promesa; expiración en tienda pendiente |
| DEL-04 | Carrito local + externo | Local aprobado con fixtures | Aviso mixto; AJAX real pendiente |
| DEL-05 | Mismo grupo, ventanas distintas | Local aprobado con fixtures | Aviso mixto conservado |
| DEL-06 | Aumentar cantidad / retirar externo / vaciar | Local aprobado con fixtures | No borra aviso por cantidad; lo retira al quitar externo; no prueba cart.js en servidor |
| VAR-01 | Collar Dorado/Plateado con plazo común | Fixture aprobado; runtime pendiente | Cambiar variante real, URL, stock, precio y agregar al carrito |
| STK-01 | Agotado visible sin compra | Preparado | Fixture cero y DENY; verificar botón, carrito previo y validación Shopify |
| STK-02 | Pendiente/vencido no vendible | Control operativo documentado | Draft/sin canales/cero stock; no afirmar bloqueo por Liquid |
| SRCH-01 | Campo visible / consulta con resultados | Preparado | Usa routes.search_url; búsqueda Shopify pendiente |
| SRCH-02 | Sin coincidencias / limpiar | Pendiente Shopify | Mensaje comprensible, sin errores ni página en blanco |
| FIL-01 | Precio y disponibilidad | Pendiente Shopify | Configurar filtros nativos y comprobar conteos/restablecimiento |
| NAV-01 | Menú móvil, foco, Escape, volver | Pendiente Shopify | Teclado/táctil en tema QA |
| COL-01 | No hay departamentos publicados vacíos | Procedimiento preparado | Validar productos visibles por canal, no solo Draft en Admin |
| CART-01 | Carrito nativo, totales y validación de stock | Pendiente Shopify | No reemplazar por la simulación del prototipo |
| CART-02 | Secciones del carrito se actualizan sin aviso obsoleto | Integración estática revisada; runtime pendiente | Aumentar, eliminar y reabrir; verificar página y drawer si se usa |
| LOC-01 | Español completo | Traducciones preparadas/Theme Check | Inspeccionar errores, moneda USD y estados en storefront |
| A11Y-01 | Contraste de cuatro pares de marca | Local aprobado | 12.73, 6.19, 8.52 y 14.09:1; no evalúa toda la UI |
| A11Y-02 | Labels/foco/diálogos/lector/errores | Pendiente navegador compatible + Shopify | WCAG 2.2 AA; axe y revisión humana separados |
| PERF-01 | HTTP local | Diagnóstico ejecutado, no CWV | 3×14 solicitudes enumeradas; sin navegador/throttling |
| PERF-02 | Lighthouse móvil/escritorio y rutas reales | Bloqueado | Infraestructura de navegador + autorización de tienda |
| ADM-01 | Socia administra sin código | Guía preparada, no prueba humana | Alta, precio/foto, variantes, stock, menú y fecha de entrega |
| CHECKOUT-01 | Checkout nativo | Pendiente Shopify | Sin pagos reales ni creación de pedidos por esta fase |

## Ejecución repetible local
~~~powershell
docker compose -f compose.tools.yaml run --rm tools node --test tests/delivery.test.mjs tests/contrast.test.mjs tests/phase3.test.mjs
docker compose -f compose.tools.yaml run --rm tools node scripts/catalog-readiness.mjs
docker compose -f compose.tools.yaml run --rm tools node scripts/check-theme.mjs docs/evidence/phase3/theme-check.json
docker compose -f compose.tools.yaml run --rm tools node scripts/package-theme.mjs
~~~
Theme Check actual usa red solo para documentación pública (comando exacto en tooling.md con imagen phase3); no acceder a tienda. Guard consume reporte actual: no confundir un JSON guardado con una nueva ejecución de Theme Check.
Registrar por prueba fecha/commit/versión, estado, pasos, resultado y evidencia sanitizada. No subir datos de clientes, sesiones, contraseña o respuestas privadas de la tienda al repositorio público.
