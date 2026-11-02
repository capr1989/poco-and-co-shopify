# Plan de implementación Shopify · Fase 2
Base recomendada provisional: Dawn 16.1.1, commit e9ac9c0f0b289da643164f4080380bd11ed27519. Rama local phase2/theme-evaluation. No selección comercial definitiva ni conexión Shopify.

## Base preparada
theme/ contiene Dawn completo con su licencia, configuración y cambios acotados. upstream.json y docs/upstream-lock.json fijan origen. prototype/ sigue intacto como referencia de diseño, sin presentarse como Liquid ejecutado.
- layout/theme.liquid: favicon SVG original y hoja CSS propia pequeña.
- sections/header.liquid y snippets/poco-logo.liquid: original horizontal A con proporción 660×240; tamaño 200 px.
- sections/poco-search.liquid: campo visible que envía GET a routes.search_url, sin índice ni JS propios. La búsqueda predictiva nativa permanece disponible en cabecera.
- sections/header-group.json: menú nativo más búsqueda visible; sin barra promocional de demostración ni sticky por defecto.
- templates/index.json: colección destacada nativa, ocho productos, grilla 4/2, sin hero gigante, carrusel, imagen secundaria o quick-add opcionales.
- config/settings_data.json: colores A, Manrope n5/n7, animaciones de revelado desactivadas, carrito página. Las fuentes se sirven con el mecanismo nativo font_face/font_url de Dawn, no Google Fonts externo.
- templates/product.json y sections/main-product.liquid: inventario nativo sin cantidades exactas expuestas y bloque editable de entrega.
- snippets/poco-delivery.liquid: texto comercial verificado y vigente, escapado; fallback prudente si falta información.
- snippets/poco-cart-delivery.liquid: compara condiciones por línea y advierte ventanas distintas o pendientes.
- main-cart-items y cart-drawer: renderizan estos snippets dentro de regiones que el JS nativo actualiza. No se modifica cart.js, product-info.js ni el resto de JS nativo.
- locales/es.json y en.default.json: etiquetas propias traducidas.
- assets/poco.css: 686 bytes fuente, 334 gzip en esta revisión. Cero JS personalizado añadido al tema.

No se han vinculado colecciones, menús o archivos de tienda inexistentes. Los placeholders de un tema no configurado no son catálogo real. La fuente Manrope está en la biblioteca oficial; handles n5/n7 confirmados en su documentación. Tamaño y métricas de las descargas nativas aún sin medir. La TTF original del prototipo sigue como referencia, no se carga en theme/.

## Datos de entrega: definir, cargar y leer
MVP: condiciones iguales para todas las variantes de un producto. Si una variante requiere otro plazo, bloquear su publicación hasta ampliar el modelo y validar el refresco de información; no asumir que el texto de producto describe correctamente variantes diferentes.

1. **Crear definiciones merchant-owned**, owner PRODUCT, namespace custom, en Shopify Admin después de autorización. No hace falta una app ni app TOML para una tienda nativa.
| Clave | Tipo Shopify | Regla |
|---|---|---|
| delivery_group | single_line_text_field | Lista controlada local/external; clasificación interna, no promesa de entrega |
| delivery_message | multi_line_text_field | Texto público con plazo, cobertura y condiciones sustentados |
| delivery_verified | boolean | Publicar mensaje solo cuando sea true |
| delivery_verified_at | date_time | Fecha de la verificación, para auditoría editorial; no se muestra al cliente |
| delivery_valid_until | date_time | Caducidad obligatoria de esa verificación |

Configurar lectura storefront para campos necesarios y permisos editoriales de socios. Nunca guardar proveedor/costo privado en el texto público. No se crearon definiciones remotas.
2. **Escribir valores** por producto desde Admin únicamente tras validar proveedor, disponibilidad, cobertura y plazo. Guardar fecha de revisión/caducidad; datos ficticios solo en tienda de prueba claramente etiquetada. No hay valores comerciales reales cargados.
3. **Leer valores** con product.metafields.custom.<clave>.value en Liquid. El snippet requiere verificado, mensaje, grupo y caducidad futura. Sin eso muestra consulta previa y el carrito explicita pendientes. Un pedido mixto no recibe una fecha única.
El inventario sigue siendo Shopify, no un metafield ni línea de carrito editable por el comprador. No usar properties del carrito como fuente confiable del plazo. Los mensajes se recalculan al renderizar; validar en Shopify su actualización tras cantidad/eliminación y al navegar entre variantes.
El tema informa, no implementa una validación de checkout de stock o entrega. Proceso operativo pendiente: impedir publicación/compra de referencias sin condiciones comerciales verificadas mediante gestión editorial e inventario; no afirmar que el fallback bloquea checkout.

## Configuración que depende de Admin
Idioma español, moneda USD y mercado Panamá; revisar formato y traducciones en storefront. Catálogo/variantes, stock y políticas de sobreventa desde Admin. Colecciones y menú de jerarquía superficial, sin departamentos vacíos publicados.
Configurar filtros precio/disponibilidad con Search & Discovery si corresponde; no instalar app ni cambiar configuración remotamente durante esta fase.
Seleccionar colección destacada, configurar menús, políticas de devolución/privacidad/envío y atención. Validar que una socia pueda cambiar todo sin código.
Pagos, envíos, impuestos, términos y proveedores permanecen pendientes de investigación/decisión; no se contrata ni integra nada en esta fase.

## Orden de implementación y aprobación
1. Revisar este candidato y aceptar/reabrir la recomendación Dawn.
2. Autorizar expresamente una tienda de desarrollo identificada por dominio, acceso de colaborador/desarrollador y subida únicamente de temas no publicados. Usuario completa autenticación. No usar credenciales comerciales.
3. Antes de ejecutar, presentar comando exacto theme dev o push --unpublished, tienda y ficheros que enviaría; sin publish, sin allow-live. No ejecutar ahora.
4. Crear las definiciones y ocho productos ficticios autorizados, imágenes iguales, colecciones, menús y filtros; sin clientes/pagos/pedidos reales.
5. Configurar también Horizon con equivalencia visual/funcional. Medir home/colección/búsqueda/producto/carrito, móvil/escritorio, caché fría/caliente y CPU/red limitadas según performance.md.
6. Theme Check, accesibilidad automática y manual, navegación y carrito real; probar ventana vencida, desconocida, mismo grupo con plazos distintos y eliminación del externo. Confirmar foco/live regions.
7. Revisar resultados con socios. Mantener pendientes Shopify Basic, pagos/logística y decisiones legales antes de cualquier lanzamiento.

## Riesgos y límites
Sin backend propio, headless, checkout personalizado o segundo carrito. El theme check válido no acredita ejecución de Liquid en Shopify, Admin, checkout, stock ni envío. Las pruebas LiquidJS verifican casos de texto, no APIs Shopify.
Se conserva el núcleo nativo, pero actualizaciones de Dawn deben reaplicar un diff explícito y repetir pruebas. Condiciones de entrega caducan y necesitan un responsable editorial.
No conectar sin autorización. No publicar, abrir túneles, contratar servicios ni cargar datos reales. T001/T002 siguen PENDIENTES 0 %.
