# Arquitectura y decisiones
ADR-01: tema Shopify convencional sobre Basic. Catálogo, inventario, pedidos, descuentos, checkout y administración nativos. Sin backend propio. Tema pendiente entre Dawn y Horizon.
ADR-02: prototipo HTML/CSS/JS mínimo para revisar UX, no implementación Shopify. Reutilizar assets, tokens, contenido y criterios; no construir motor comercial duplicado. Catálogo final renderizado por Liquid.
ADR-03: ocho productos ficticios en memoria, sin dependencias npm. SVG simples para ilustrar productos; no equivalen a fotos reales ni predicen LCP final.
ADR-04: marca A verificada localmente; SVG y Manrope originales con OFL, manifiesto de commit y hashes. Favicon corregido #192C46. Branding permanece intacto.
ADR-05: presupuestos y medición en performance.md son condición de revisión. Reservar espacio para imágenes, banners y componentes de apps. Sin animaciones de entrada del contenido principal.
ADR-06: preferir Search & Discovery y funciones del tema; confirmar compatibilidad/condiciones antes de instalar. WhatsApp como enlace simple futuro, sin widget remoto por defecto.
Precio, stock, imágenes, colecciones, contenido y pedidos administrables en Shopify Admin/editor. No panel propio. Colecciones visibles solo con productos publicados.
Entrega por producto y línea de carrito; advertencia si hay ventanas distintas, nunca fecha única ficticia. Definir campos y validación editorial antes de generar Liquid.
Nombre, pagos, proveedores, plazos, tarifas, políticas y obligaciones Panamá requieren verificación antes del lanzamiento.
