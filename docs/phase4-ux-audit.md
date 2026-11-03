# Informe UX y funcional — Fase 4

Fecha: 2026-11-03. Rama: phase4/visual-ux-validation. Tema remoto auditado: Dawn 16.1.1, fuente be34756abeff05f14a55e06bac99e2d043eddb72. Este informe distingue pruebas del tema remoto de la propuesta local posterior, que NO se subió.

## Resultado ejecutivo

La demo es navegable y los mecanismos nativos principales responden: búsqueda, precios, disponibilidad, variantes y carrito. Todavía no está lista para aprobar diseño definitivo ni para ventas. Las prioridades son español coherente y claridad del carrito cuando Shopify ajusta una cantidad por falta de stock. Después conviene compactar la portada y reducir controles duplicados.

Solo hubo consultas Admin y acciones reversibles del carrito de demostración. Se conservaron ocho productos, sus colecciones/metacampos y el artículo original del carrito. Sign in with Shop no se modificó. Google OAuth pospuesto. No se publicaron temas ni se cambiaron pagos, pedidos o contraseña. T001/T002 PENDIENTES 0 %.

## Entorno y límites

Chrome existente mediante computer-use; escritorio 1536 px y viewports 390×844, 360×800 y 320×800. Se restauró el viewport al terminar. No son dispositivos físicos ni pruebas con CPU/red limitadas. No se recogieron Lighthouse, PSI, LCP, INP o CLS nuevos. Los tiempos de la automatización no equivalen a tiempos de interacción del sitio.

La lectura Admin al inicio y al cierre fue idéntica en los campos consultados: contraseña habilitada; Dawn UNPUBLISHED; Horizon MAIN y mismo updatedAt; ocho productos y cantidades de inventario sin cambios. No se escribieron archivos remotos. En esta revisión se compararon metadatos, no se repitió el hash de los 507 archivos Horizon; esa verificación completa está en la evidencia anterior de Fase 4.

## Pruebas realmente ejecutadas en esta revisión

| Escenario | Resultado y evidencia observada |
|---|---|
| Portada/branding escritorio | Manrope, cuerpo16px/line-height28.8px; título40px; fondo #F1F4F2; títulos #192C46; botón #2855D9/blanco; logo SVG200×72.7px. |
| Reflujo móvil | Sin overflow horizontal en portada320/360/390px ni en ficha de collar/filtros390px. Logo125×45.45px a360px; campo/botón de búsqueda48px. |
| Búsqueda sin resultados y recuperación | zzpocoausente: cero resultados con instrucción de recuperación; collar: un resultado24USD. |
| Precio máximo18USD, escritorio | Cinco de ocho productos: organizador18, soporte15, dispensador12, bandeja16 y estuche14. |
| Orden ascendente, escritorio | La lista quedó12,14,15,16,18USD. |
| Filtros móviles combinados | Drawer abrió disponibilidad; con precio≤18 y disponibles mostró cuatro de ocho,14/15/16/18USD. Aplicación/conteo, cierre y restablecimiento a ocho verificados. La barra de preview interfirió con clics; se aplicó mediante teclado y se ocultó solo esa barra de herramientas. |
| Variante por teclado, móvil | ArrowRight en Dorado seleccionó Plateado; URL/selección y precio24USD correctos. Imagen principal sin atributo lazy. |
| Añadir variante, móvil | Plateado1 + organizador original1 =42USD. Se retiró Plateado y volvió a18USD. |
| Entrega pendiente | Bandeja sin verificación muestra confirmación, sin prometer fecha. |
| Entrega vencida | Estuche muestra confirmación, sin la ventana5–7días vencida. |
| Límite de stock | Solicitud de4 estuches con stock3: Shopify añadió3 y mostró «Only 3 items were added to your cart due to availability.» El contador permaneció1 hasta abrir carrito; allí mostró4 unidades y60USD. |
| Aviso pendiente en carrito | Estuche3 + organizador1: aviso de confirmación y mensaje de línea. Retirar estuche devuelve organizador1/18USD y elimina aviso. |
| Persistencia | Recargar carrito mantuvo organizador1/18USD. No se verificó un perfil nuevo ni una sesión independiente. |
| Idioma de tienda, Admin | Solo en, primary true, published true. El español existe en archivos de tema, pero no está publicado en la tienda. |

Las pruebas anteriores de Fase4 —aviso mixto local/externo, cantidades42→66USD, agotado con compra deshabilitada y menú de seis departamentos— conservan su evidencia en runtime-ux-verification.json. No se presentan como pruebas nuevamente ejecutadas en esta revisión.

## Problemas clasificados

P1 = impacto alto que debe resolverse antes de aprobar una experiencia comercial; P2 = mejora importante de comprensión/presentación; P3 = detalle o investigación adicional. No se observó un fallo crítico que expusiera la tienda protegida.

| ID | Impacto | Problema, consecuencia y recomendación |
|---|---|---|
| UX-A01 | P1 | Interfaz mixta español/inglés: búsqueda, filtros, carrito, stock, errores y avisos. Causa confirmada: solo inglés publicado. Proponer habilitar/publicar español y elegirlo como principal mediante cambio Admin separado, con autorización; comprobar traducciones completas después. No sustituir artificialmente en.default por español. |
| UX-A02 | P1 | Ajuste parcial por stock añade3 aunque se pidieron4 y deja contador desactualizado hasta navegar. Genera incertidumbre sobre qué se agregó. Reproducido en tema remoto; requiere investigar/reconciliar respuesta de Shopify con notificación/contador del carrito. No afirmar que el servidor rechazó toda la solicitud; no se preparó un parche JS improvisado. |
| UX-A03 | P2 | Dos buscadores visibles en resultados: el de cabecera y el nativo de la plantilla. Propuesta local: conservar solo el nativo en esa ruta y mantener búsqueda visible en las demás. |
| UX-A04 | P2 | Portada móvil consume mucho alto antes de departamentos: a360px el título de departamentos comienza en y652.25. Compactar padding, manteniendo logo, lectura y objetivos táctiles. Propuesta local lista; efecto visual aún no validado remotamente. |
| UX-A05 | P2 | Prefijo largo [PRUEBA FICTICIA] domina títulos y tarjetas. Conservar identificación inequívoca; valorar una insignia demo separada y títulos cortos en iteración futura, sin modificar ahora el catálogo. |
| UX-A06 | P2 | En revisión previa, el agotado todavía mostraba ventana de entrega junto a compra deshabilitada. Separar disponibilidad actual de plazos; no prometer entrega de un artículo no disponible. Pendiente parche/reprueba específica. |
| UX-A07 | P3 | Contador móvil «1 products» y textos nativos sin localizar. Revalidar tras activar español. |
| UX-A08 | P3 | Las ilustraciones y el rótulo FICTICIO sirven para QA, pero no permiten juzgar fotografía/calidad comercial definitiva. Mantenerlas para demo; requerir fotos reales coherentes antes del lanzamiento. |

No propongo alterar Sign in with Shop ni añadir Google OAuth. La presencia de Buy it now no se probó en checkout y no se usó para crear pedidos. Su conveniencia comercial puede revisarse después.

## Evaluación visual y recomendaciones concretas

El logo original SVG es nítido y proporcional; no hay motivo demostrado para redibujarlo ni aumentar arbitrariamente su ancho móvil. La paleta azul/marfil y Manrope son coherentes. La jerarquía ganaría con menos espacio vertical arriba y más protagonismo de los productos. Conservar seis departamentos, estructura nativa, tarjetas sin efectos, preciosUSD visibles y aviso demo.

Los cuatro pares de colores de marca pasan el test de contraste existente, ejecutado en Docker. Esto no certifica toda la interfaz: faltan contraste de estados/errores, foco, teclado completo, lector y axe. La prueba de variantes con teclado es un control puntual, no una auditoría WCAG.

La imagen principal de producto observada no usa lazy loading; las imágenes secundarias de departamentos se difieren. No se identificó el elemento LCP mediante traza, por lo que no se recomienda precargar indiscriminadamente imágenes o fuentes. Mantener el presupuesto existente de docs/performance.md y medir antes de añadir dependencias.

## Propuesta de código LOCAL pendiente de aprobación

| Archivo | Cambio preparado |
|---|---|
| assets/poco.css | Padding vertical del buscador16→12px; conserva altura48px en campo y botón, colores y foco. |
| sections/header-group.json | Padding superior/inferior20→12px; conserva logo, menú y controles de cuenta. |
| templates/index.json | Padding de introducción48→32; el tema adapta sus valores a móvil. Sin retirar aviso demo. |
| sections/poco-search.liquid | No renderizar buscador de cabecera en request.page_type search; permanece el buscador nativo de resultados. |

Sin JS, imágenes, fuentes, apps ni dependencias nuevas. JS nativo y hashes de marca intactos. CSS propio362bytes gzip según guard local; no es el peso total transferido de la tienda. Validación final local: Theme Check0errores/9advertencias, guard de integridad aprobado, test de contraste aprobado. El validador del skill no arrancó por dependencia faltante @shopify/theme-check-common; no se instaló nada en Windows. Shopify CLI Theme Check dentro de Docker sí se ejecutó correctamente.

Los cuatro archivos están en el checkout, pero NO en Shopify. No ejecutar theme push ni themeFilesUpsert sin la siguiente aprobación. Antes de subir: volver a confirmar tienda QA, Dawn UNPUBLISHED y Horizon MAIN. Alcance propuesto: únicamente esos cuatro archivos, sin eliminaciones, publicación o cambios Admin. Tras aprobar: repetir búsqueda, alturas y capturas en móvil/escritorio. La configuración de idioma y el arreglo de carrito son trabajos separados.

## Evidencia y pendientes

Evidencia anterior: runtime-ux-verification.json. Evidencia ampliada sanitizada: extended-ux-audit.json. Capturas actuales en evidence/phase4/screenshots/phase4-*.jpg. Datos originales privados en work/phase4-extended-audit.private.json y phase4-readonly-audit-state.private.json, excluidos de Git.

Pendientes: flujo de teclado/foco/Escape completo, lector/axe, sesiones independientes, teléfonos físicos iOS/Android, Lighthouse/PSI y throttling. Investigación segura de rendimiento: lighthouse-safe-validation.md. Diseño definitivo pendiente de revisión del usuario. T001/T002 PENDIENTES0%.
