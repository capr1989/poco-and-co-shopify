# Dawn frente a Horizon · Fase 2
Fecha de inspección: 2 de noviembre de 2026. Recomendación provisional: **Dawn 16.1.1** como base del MVP. No se declara ganador de rendimiento móvil: faltan mediciones equivalentes sobre Shopify y aprobación de los fundadores.
Historial de la evaluación inicial en history/theme-comparison-phase1.md.

## Versiones reproducibles y licencias
| Tema | Referencia examinada | Commit | Observación |
|---|---|---|---|
| Dawn | release estable v16.1.1 | e9ac9c0f0b289da643164f4080380bd11ed27519 | Release publicada el 2/11/2026; no prerelease |
| Horizon | snapshot main; schema 4.3.0 | dfad90d87be2408de52636315069fc998da28c9e | Commit 13/10/2026; repositorio sin releases ni tags, no se inventa una release estable |

Fuentes oficiales: [Dawn 16.1.1](https://github.com/Shopify/dawn/releases/tag/v16.1.1), [Horizon fijado](https://github.com/Shopify/horizon/tree/dfad90d87be2408de52636315069fc998da28c9e). upstream-lock.json registra fuentes. scripts/prepare-upstream.ps1 descarga exactamente esos commits a work/ sin ejecutar scripts del tema.
Se leyeron README, release-notes y LICENSE.md de ambos. No hay package.json ni instalación de dependencias de storefront en estos snapshots. Se conserva LICENSE.md de Dawn en theme/. Uso previsto: tienda propia Shopify; no convertirlo en producto para redistribución. Horizon incluye restricciones adicionales de distribución de derivados: consultar su licencia antes de cualquier reutilización fuera de esta tienda.

## Arquitectura y capacidad comercial
| Área | Dawn | Horizon | Resultado para Poco & Co. |
|---|---|---|---|
| Liquid/editor | 48 secciones, 39 snippets; bloques definidos en schema de sección, sin directorio de theme blocks | 42 secciones, 95 theme blocks, 144 snippets; content_for y bloques anidables | Dawn es suficiente para diseño contenido; Horizon da más composición editorial |
| JavaScript | Scripts defer por componente; global.js, pubsub y componentes de producto/carrito | Módulos ES, importmap, component.js, morph.js, section-renderer e hidratación | Sin React/Next/Hydrogen en ninguno; no añadir framework |
| Búsqueda | header-search, predictive-search y main-search | search-modal, predictive-search y search-results | Nativa en ambos; Dawn requiere una sección pequeña para campo permanentemente visible |
| Filtros | snippets/facets.liquid y assets/facets.js | blocks/filters.liquid, price-filter/list-filter y facets.js | Precio/disponibilidad configurados en Admin/Search & Discovery; sin motor propio |
| Navegación móvil | header-drawer y foco/teclado en global.js | theme-drawer, dialog y focus.js | Conservar componentes; probar foco/Escape en tienda |
| Producto/variantes | main-product, product-info/product-form, variant picker | bloques reutilizables, variant-picker y variant-resolution | Stock y compra nativos; sin duplicar inventario |
| Carrito | Página, notificación y drawer; Section Rendering para cantidades | Página/drawer, componentes ES y actualizaciones parciales | Se usa carrito nativo. Candidato inicia en modo página por claridad y menos comportamiento opcional |
| Entregas distintas | Sin modelo empresarial validado de Poco | Igual | Ambos necesitan datos comerciales y presentación por línea/aviso mixto; no checkout propio |
| Imágenes | image_url/image_tag; galería principal sin lazy; primera fila de tarjetas eager | product-media y componentes con tamaños/prioridades | No añadir lazy al LCP. Validar composición final y fotos reales |
| Accesibilidad | Foco, live regions, controles nativos | Foco/dialog y live regions | Código presente no equivale a conformidad WCAG completa |
| Administración | Opciones de sección más acotadas | Mayor granularidad de bloques anidados | Ventaja provisional Dawn para operadores sin experiencia; prueba humana pendiente |
| Actualizaciones | Diff pequeño sobre release identificable | Snapshot reproducible sin canal releases en GitHub | Registrar parches en ambos, sin reemplazar ficheros enteros en futuras actualizaciones |

Ambos son temas nativos: el plan es Online Store/Basic, sin capacidades Plus ni checkout extensible como dependencia. No se han verificado contrato, precio regional ni configuración real de una tienda Basic.

## Inventario estático medido
Bytes de fuente normalizados a LF. Gzip calculado archivo a archivo. **No son bytes iniciales de red ni métricas de carga**.
| Inventario | Dawn | Horizon |
|---|---:|---:|
| Archivos JS | 36 | 81 |
| Fuente JS, bytes | 229446 | 766580 |
| Suma gzip JS, bytes | 61609 | 214380 |
| Archivos CSS separados | 65 | 3 |
| Fuente CSS separada, bytes | 370693 | 50315 |
| CSS en tags stylesheet Liquid, bytes | 0 | 510474 |

Horizon concentra CSS en Liquid, así que comparar solo archivos .css sería engañoso. El inventario de tags stylesheet no incluye todo el style inline o Liquid generado de ninguno. Tampoco se mide aquí el grafo de imports por ruta.
Principales recursos a perfilar: Dawn global.js/base.css, facets.js y product-info.js; Horizon utilities/component/morph, product-form, facets y slideshow. Un QR generator grande existe en Horizon pero no se presupone que se cargue en home. Revisar waterfalls reales antes de retirar componentes.

## Verificaciones reales
Shopify CLI 5.0.0 en Docker:
| Tema | Errores Theme Check | Advertencias | Resultado |
|---|---:|---:|---|
| Dawn original | 0 | 9 | Válido con advertencias |
| Horizon original | 0 | 6 | Válido con advertencias |
| Poco sobre Dawn | 0 | 9 | Válido con advertencias |

Sin nuevos diagnósticos frente a Dawn. Los primeros intentos sin red reportaron dos UnknownFilter por applicable_disclosures en ambos temas. Con documentación pública actualizada desaparecen; el filtro está [documentado oficialmente](https://shopify.dev/docs/api/liquid/filters/applicable_disclosures). Se conservan reportes offline y actuales, sin desactivar reglas.
Seis pruebas locales pasaron: cinco de entregas con fixtures LiquidJS y una de contraste. LiquidJS no prueba ejecución de Shopify Liquid ni APIs de carrito.
Lighthouse 13.5.0 instalado; ejecución bloqueada por Chrome ausente. Bajo la política actual, unshare de usuario también devuelve Operation not permitted; no se desactivó sandbox ni seccomp. PSI y CWV reales sin datos. No se compararon demos públicas.

## Justificación y límites de la recomendación
Dawn permite cubrir navegación, filtros, variantes y carrito con sus componentes existentes y tres snippets/una sección propios para marca y entrega, sin JS añadido. Su superficie de fuente JS y el modelo de secciones son más acotados para este MVP. Horizon ofrece más flexibilidad, pero no hay un requisito aprobado que necesite esos bloques adicionales.
Esta es una decisión de mantenibilidad y ajuste funcional, apoyada en análisis de código; **no demuestra que Dawn tenga mejor LCP/INP**. En ambos hacen falta cambios equivalentes de identidad, entrega y búsqueda visible. No se inventan horas de esfuerzo ni puntuaciones.
Riesgos: parches en header/producto/carrito requieren revisión al actualizar; reglas de entrega deben ser mantenidas por socios; baseline conserva advertencias upstream; actualizaciones del validador/documentación pueden cambiar diagnósticos.
La recomendación se reabre si pruebas móviles equivalentes o pruebas de administración muestran una ventaja material de Horizon. Metodología y presupuestos en performance.md; plan concreto en shopify-implementation-plan.md.
