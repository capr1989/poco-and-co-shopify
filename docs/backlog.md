# Backlog
| ID | Trabajo | Estado | Dependencia/aceptación |
|---|---|---|---|
| T001 | Tarea original reservada; definición no aportada | PENDIENTE 0 % | No cambiar automáticamente |
| T002 | Tarea original reservada; definición no aportada | PENDIENTE 0 % | No cambiar automáticamente |
| ENV-01 | Docker y Dev Container | Compose construido y ejecutado | npm run check y HTTP OK; apertura Dev Container en VS Code pendiente |
| ENV-02 | Docker Desktop/motor Linux | Verificado | Desktop 4.97.0; Engine 29.9.2 |
| BRAND-01 | Assets A y manifiesto | Implementado | Hashes originales verificables |
| UX-01 | Catálogo, filtros, ficha/variantes, carrito mixto | Implementado; QA visual pendiente | Datos ficticios, sin checkout |
| PERF-01 | Objetivos y presupuesto | Documentado | Confirmar contra baseline |
| PERF-02 | Lighthouse prototipo móvil/escritorio | Pendiente | Contenedor QA/navegador |
| THEME-01 | Fijar fuentes Dawn/Horizon | Completado análisis estático Fase 2 | Commits, licencias e inventario en upstream-lock y theme-comparison |
| THEME-02 | Configuración equivalente | Pendiente | Conexión tienda de desarrollo autorizada |
| PERF-03 | Lighthouse/waterfall por tema/ruta | Pendiente | THEME-02; tres corridas, evidencia |
| PERF-04 | PSI y p75 de campo | Pendiente | URL autorizada/muestra suficiente |
| QA-01 | Teclado, lectores, contraste, móvil | Pendiente | Manual más automatización |
| QA-02 | Theme Check y pruebas tema | Validación estática realizada; runtime pendiente | CLI 5.0.0: 0 errores/9 advertencias candidato; seis tests locales OK |
| OPS-01 | Pagos/costos/logística Panamá | Pendiente de investigación | Fuentes actuales y aprobación |
| DATA-01 | Catálogo real y condiciones | Pendiente | Stock/proveedor/plazos verificados |
| REVIEW-01 | Revisión fundadores | Pendiente | Prototipo, QA, riesgos y recomendación |
| STORE-01 | Implementación Shopify | Sin autorización | No avanzar automáticamente |

Cada cambio importante exige revisar funciones/accesibilidad y repetir mediciones. No convertir pendientes en resultados estimados.

## Fase 2 · avance del 2 de noviembre de 2026
Historial anterior íntegro en history/backlog-phase1.md. T001/T002 sin cambios.

| ID | Trabajo | Estado | Evidencia / siguiente paso |
|---|---|---|---|
| F2-01 | Auditoría técnica Dawn/Horizon | Realizada | docs/theme-comparison.md y evidence/theme-static-audit.json |
| F2-02 | Candidato Dawn en rama local | Preparado | theme/, licencia y upstream.json; recomendación provisional |
| F2-03 | Marca A y configuración inicial | Preparado | SVG originales, paleta y Manrope nativos; validar visual en Shopify |
| F2-04 | Datos de entrega y carrito nativo | Preparado, sin integración Shopify probada | Cinco tests de fixtures; definición/valores Admin pendientes |
| F2-05 | Herramientas contenidas | Construidas/verificadas | CLI 5.0.0 y lock; npm audit final 0 conocidas |
| F2-06 | QA local | Seis tests y guard sin regresiones aprobados | Theme Check 0 errores con advertencias; skill validator bloqueado por dependencia faltante |
| F2-07 | Navegador QA con sandbox | Pendiente | Chrome ausente; namespaces denegados bajo política actual; no relajar controles |
| F2-08 | Validación interactiva real/benchmark | Sin autorización de conexión | Dominio tienda de desarrollo, acceso y subida no publicada requieren aprobación |
| F2-09 | Revisión de socios/elección final | Pendiente | No declarar tema definitivo por análisis estático |
| F2-10 | Sincronización remota de la fase | No realizada | Repositorio actualmente público; cambios permanecen locales |

## Fase 3 · preparación e investigación
Historial íntegro anterior en history/backlog-phase2.md. Dawn 16.1.1 aprobado para continuar desarrollo/pruebas; no ganador de rendimiento demostrado. T001/T002 sin cambios.

| ID | Trabajo | Estado | Evidencia / dependencia |
|---|---|---|---|
| F3-01 | Integridad, empaquetado y revisión Dawn | Ejecutado localmente | Archivos upstream presentes, ZIP en /tmp y Theme Check actual |
| F3-02 | Ocho productos ficticios y PNG rotulados | Preparados y validados | data/fixtures/, sin cargas remotas |
| F3-03 | Fechas/grupos de entrega y controles operativos | Implementado/documentado | Liquid endurecido; revisión local distingue agotado de compra |
| F3-04 | QA local | 15 tests aprobados | Fixtures LiquidJS/reloj fijo, contraste y guard de integridad |
| F3-05 | Rendimiento válido | Diagnóstico HTTP local ejecutado; CWV no medidos | Tres corridas de 14 rutas enumeradas, no waterfall/browser |
| F3-06 | Navegador aislado Lighthouse/axe | Pendiente de aprobación/infraestructura | Política Docker conservada; lanzamiento nativo rechazado por auto-review |
| F3-07 | Auditoría MCP de tiendas | Una tienda consultada solo lectura | Trial y no partnerDevelopment; detalles privados en work/ |
| F3-08 | Dev store gratuita nueva | Creada tras autorización explícita | Poco Co QA, tipo dev, basic, PA, sin demo-data; dominio en registro privado y chat |
| F3-09 | Conectar CLI y subir Dawn no publicado | Reparado; borrador UNPUBLISHED | Reparación autorizada aceptada sin issues; Theme Check 0 errores/9 advertencias; docs/theme-upload-results.md |
| F3-10 | Configurar Admin y probar runtime real | Pendiente | Tema/productos/filtros/carrito/idioma y prueba humana |
| F3-11 | Commit y push de rama | Ejecutado y verificado | Implementación fef452f enviada a phase3/shopify-validation tras revisión de secretos; sin merge |

| F3-12 | Reparar dos archivos rechazados del nuevo borrador | Completado tras aprobación | Shopify success; Dawn unpublished, Horizon live; runtime pendiente |

## Fase 4 · validación visual y UX

| ID | Trabajo | Estado | Evidencia / dependencia |
|---|---|---|---|
| F4-01 | Confirmar conexión QA y roles de temas | Pendiente de reautenticación MCP | No escribir en tienda previa; docs/phase4-visual-ux.md |
| F4-02 | Ocho productos/nueve variantes/imágenes/stock ficticio | Autorizado, pendiente | Fixtures existentes; sin pedidos ni pagos |
| F4-03 | Cinco definiciones de entrega y valores | Autorizado, pendiente | Merchant-owned custom; comprobar lectura |
| F4-04 | Seis departamentos, menú, filtros y colección destacada | Autorizado, pendiente | Dawn no publicado; filtros según capacidad disponible |
| F4-05 | QA visual móvil/escritorio y funciones | Pendiente de catálogo y acceso | Capturas/pruebas reales; no inventar métricas |

T001/T002 permanecen pendientes al 0 %.
