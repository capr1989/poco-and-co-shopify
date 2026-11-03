# Fase 4 — validación visual y UX

Rama: phase4/visual-ux-validation. Autorización: configurar exclusivamente la dev store QA y el borrador Dawn ya identificados por el usuario; no publicar el tema, quitar contraseña, crear pedidos ni configurar pagos. T001/T002 pendientes al 0 %.

## Estado inicial

La conexión MCP estaba seleccionada en otra tienda. Se invocó switch_shop y se solicitó reautenticación para seleccionar Poco Co QA. No se ejecutaron escrituras Shopify. No confundir la solicitud de reautenticación con una conexión QA confirmada.

## Secuencia de ejecución

1. Confirmar dominio QA, dev store, contraseña y roles Dawn unpublished/Horizon live. Registrar metadatos y archivos de Horizon cuando el acceso lo permita; no editar Horizon. Los cambios de catálogo/menú son globales de la dev store y pueden verse también en Horizon sin modificar sus archivos.
2. Consultar catálogo, ubicaciones, publicaciones, menús, colecciones y definiciones existentes. Reutilizar recursos de esta demo por identificador/handle; no sobrescribir datos ajenos ni duplicar tras una interrupción.
3. Crear primero las cinco definiciones merchant-owned custom de entrega, respetando tipos del fixture; escribir valores y leerlos para comprobarlos. No instalar una app propia para definirlos.
4. Crear/reutilizar ocho productos de data/fixtures/products.json, nueve variantes, imágenes PNG locales rotuladas FICTICIO y precios USD ficticios. Stock planificado: organizador 6, soporte teléfono 8, collar 4+4, bolsa 5, dispensador 0, soporte auto 7, bandeja 5, estuche 3. Tracking activo, DENY. Conservar escenarios pendiente/vencido y no convertir fechas simuladas en verificación comercial.
5. Activar disponibilidad solo en Online Store de QA para probar catálogo/carrito bajo contraseña. Sin otros canales ni pedidos. La activación sustituye únicamente para esta demo la política inicial Draft/cero stock del fixture histórico.
6. Crear seis colecciones: Hogar, Tecnología, Joyería, Viajes, Mascotas y Automóvil; más colección de demostración destacada. Menú sencillo enlazado a las seis, inicio y catálogo. Preferir menú propio de QA; asignarlo solamente al encabezado Dawn.
7. Inspeccionar filtros nativos existentes y habilitar los disponibles sin servicios pagados ni dependencias pesadas. Si requieren herramienta o permiso adicional, documentar el límite sin inventar filtros funcionales.
8. Configurar colección destacada en Dawn exclusivamente. Mantener identidad A y JS nativo. Theme Check después de cambios de tema.
9. Validar lectura del catálogo, metacampos, nueve variantes/inventario y publicaciones. En navegador: inicio, producto, búsqueda, filtros, variantes, agotado, carrito mixto, cantidades/eliminación y menú móvil. No checkout ni pedidos.
10. Revisar móvil y escritorio; capturas seguras sin contraseña, tokens o Admin. Medir Lighthouse/PSI solo con un entorno válido. Separar pruebas API, render real, interacción y métricas; una lectura Admin no demuestra UX.

## Evidencia y cierre

Guardar respuestas originales, IDs y enlaces operativos en work/ excluido de Git; publicar solo evidencia sanitizada. Documentar cada prueba ejecutada y pendiente. Confirmar Dawn unpublished, Horizon live y protección conservada. Push de la rama Fase 4, sin merge a main. El diseño queda sujeto a revisión del usuario.

Estado actual: pendiente de reautenticación MCP en la tienda QA; no hay productos cargados ni capturas nuevas.

## Configuración ejecutada — 2026-11-03

La reconexión MCP confirmó exclusivamente la dev store QA autorizada (Basic App Development). Preflight real: contraseña habilitada, Dawn unpublished, Horizon MAIN, catálogo vacío y ninguna definición custom. Se crearon los ocho productos/nueve variantes, ocho imágenes PNG ficticias, cinco definiciones merchant-owned y sus valores; siete colecciones (seis departamentos y destacados), y el menú propio poco-demo-menu.

Los ocho productos quedaron ACTIVE y disponibles únicamente en Online Store para navegar la demo bajo contraseña. Tracking activo, política DENY y stock ficticio 42 unidades en total: se conservó el dispensador agotado y los escenarios de entrega pendiente/vencida. Las fechas del fixture se conservaron como simulaciones, no como verificaciones comerciales. No se crearon pedidos ni se configuraron pagos.

Lectura Admin posterior: cada producto tiene una imagen, precios/SKUs/stock y metacampos esperados; collar con dos variantes. Las seis colecciones tienen 2/2/1/1/1/1 productos; destacados tiene ocho. Crear disponibilidad en Online Store no publica Dawn. El catálogo es compartido por los temas de la dev store; no es posible aislarlo por tema.

Se enviaron exclusivamente templates/index.json, sections/header-group.json y sections/footer-group.json a Dawn mediante themeFilesUpsert; Shopify aceptó los tres sin userErrors. Portada con texto, seis departamentos y colección destacada, todo con secciones nativas; menú propio asignado solo a Dawn; pie con aviso demo y sin suscripción a emails ni iconos de pagos. Sin JS personalizado, apps nuevas ni cambios de branding. Theme Check Docker posterior a edición: valid true, 0 errores/9 advertencias. Evidencia: evidence/phase4/theme-check.json.

Se paginaron todos los archivos de ambos temas antes y después. Horizon: 507 archivos, checksumMd5 idénticos, mismo role MAIN y updatedAt. Dawn: 354 archivos, role UNPUBLISHED, solo los tres JSON autorizados con hashes distintos, sin archivos eliminados. Contraseña habilitada después. Evidencia sanitizada: evidence/phase4/configuration-verification.json. Estado operativo/IDs/respuestas en work/phase4-*.private.json fuera de Git.

## Pruebas realizadas y pendientes

| Prueba | Resultado real |
|---|---|
| Dominio, contraseña, roles y archivos de temas | Verificados por Admin API; protección también observada en Chrome |
| Catálogo, imágenes, variantes, precios, stock y entrega | Lectura Admin posterior y aserciones comparadas con fixtures aprobadas |
| Seis departamentos y destacados | Membresía/publicación verificadas por Admin; presentación visual pendiente |
| Sintaxis/configuración del tema | Theme Check 0 errores/9 advertencias; servidor aceptó los tres JSON |
| Portada/producto visibles en Dawn | Pendiente de entrar en vista previa protegida |
| Búsqueda, filtros, cambio de variantes y carrito | Pendientes de interacción real; configuración no demuestra funcionamiento |
| Móvil/escritorio/capturas/accesibilidad | Pendientes de acceso; no hay capturas válidas del storefront |
| Lighthouse/PSI/CWV | No medidos; no afirmar optimización ni inventar puntuaciones |

Los filtros y la ordenación están habilitados en las plantillas nativas de colección/búsqueda, pero todavía no se observó qué filtros ofrece Shopify en el storefront. No se instaló Search & Discovery ni otra app. Si hace falta configuración adicional, evaluar primero las capacidades disponibles y el alcance autorizado.

Chrome abrió la vista previa y mostró la contraseña. Se solicitó al usuario entrar sin compartirla ni desactivarla. El editor autenticado mostró una vista de carga vacía; no se realizaron cambios por navegador. Estas son limitaciones de acceso, no pruebas de un defecto del tema.

## Revisión visual propuesta, aún sin aprobar

Evaluar en 390 px y escritorio: logo y búsqueda visibles, jerarquía de portada, tamaño de tarjetas, menú de departamentos, precios y estados de variantes/agotado, foco y áreas táctiles. Las ilustraciones rotuladas y títulos [PRUEBA FICTICIA] se conservan para identificar la demo; las fotos comerciales reales son una etapa futura. Revisar idioma de los controles nativos y legibilidad de títulos largos; no declarar problemas visuales confirmados sin observar la página.

Diseño definitivo pendiente de evaluación del usuario. T001/T002 siguen pendientes al 0 %. No publicación, pagos, pedidos, dominios ni eliminación de contraseña.

## Validación real de navegación y UX — 2026-11-03

Tras el acceso del usuario se abrió la vista previa de Dawn en Chrome existente. No se guardaron credenciales ni se modificó la protección. Se realizó una revisión de escritorio y una emulación de viewport 390×844, no una prueba en teléfono físico ni con CPU/red limitadas. La captura móvil de portada no mostró desbordamiento horizontal (innerWidth 390, documentWidth 375).

Resultados reales:

- Portada con identidad A, ocho productos y seis departamentos visibles.
- Búsqueda «collar»: un resultado, USD24.
- Filtro nativo de disponibilidad: siete disponibles/un agotado; seleccionar agotados muestra solo dispensador (1 de8); Reset devuelve8. Precio presente, sin probar aún su interacción ni ordenación.
- Collar: selección visible Plateado, URL de variante actualizada y variante correcta en carrito. El control automatizado de radio requirió pulsar la píldora visible; eso no demuestra un fallo para usuarios.
- Carrito: organizador original1×18 + collar Plateado1×24 =42; aumentar collar a2 produce66. Se eliminó collar.
- Carrito mixto: organizador2–3días + bolsa10–15días, total40, aviso de condiciones distintas visible. Retirar bolsa devuelve organizador1/total18 y elimina aviso. Se conservó el artículo original del usuario.
- Menú móvil abre los seis departamentos y navega a Mascotas. Dispensador muestra agotado y compra deshabilitada.

Problemas observados y recomendaciones: completar español en búsqueda, filtros, carrito, stock y aviso mixto; reducir altura de búsqueda/introducción móvil para mostrar departamentos antes; mejorar títulos de demostración largos manteniendo identificación inequívoca; aclarar la ventana de entrega que aún aparece junto a agotado; revisar compra acelerada/cuenta durante demo. No se aplicaron cambios de diseño en esta revisión ni se aprobó el diseño definitivo.

Evidencia: evidence/phase4/runtime-ux-verification.json y screenshots/ (portada escritorio/móvil, menú móvil, búsqueda y carrito mixto). La captura de ficha móvil completa no se obtuvo por tiempo de espera del navegador; no se presenta como realizada. Se restauró viewport normal y se dejó abierta la portada de Dawn. Las capturas se guardaron en el repositorio; la carpeta outputs de este chat no permitió crear archivos, sin cambiar controles de Windows.

Verificación final Admin: contraseña true, Dawn UNPUBLISHED, Horizon MAIN con updatedAt sin cambios. No hubo escrituras de tema/Admin/catálogo durante esta revisión; los hashes completos de Horizon se verificaron en la configuración anterior. Sin checkout, pedidos ni pagos. No hay mediciones nuevas de rendimiento.

Pendientes: rango de precios/ordenación; drawer de filtros móvil; entrega pendiente/vencida real; límites de stock/persistencia del carrito; auditoría completa de teclado/lector/axe; dispositivos reales; Lighthouse/PSI/CWV y CPU/red limitadas. T001/T002 pendientes al0%.

### Ajuste solicitado: altura de búsqueda

El usuario solicitó igualar botón y campo. Se modificó únicamente assets/poco.css en el borrador Dawn: input block con border-box/height48px y botón height48px/align-self:flex-end. El label permanece sobre el campo, sin estirar el botón. Shopify aceptó el único asset sin userErrors.

Verificación real por getBoundingClientRect: escritorio1536px, campo/botón48px, top179.325/bottom227.325; móvil390px, ambos48px, top141.3/bottom189.3. Capturas: screenshots/poco-search-height-desktop.jpg y poco-search-height-mobile.jpg. Se restauró viewport. Sin JS nuevo, publicación ni otros cambios Shopify.
