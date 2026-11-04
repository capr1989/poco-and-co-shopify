# Poco & Co. — Fase 6C: fidelidad visual de portada

## Recursos originales inspeccionados
- Se inspeccionó `poco-and-co-brand/concepts/concept-a/applications/shopify-desktop.svg` (1440×1080), `shopify-mobile.svg` (390×844), `product-card.svg`, `logo-primary.svg`, `logo-horizontal.svg`, `brand-guide.md` y el prototipo de `presentation/`.
- Los SVG desktop/mobile son composiciones monolíticas: contienen texto, controles y primitivas vectoriales mezcladas. No se identificó un grupo aislado y seguro de ilustración de producto que pudiera extraerse sin copiar interfaz; por eso no se añadió un SVG engañoso o estático.
- Se confirmó Manrope y la paleta `#192C46`, `#F1F4F2`, `#2855D9`, `#B8CEC7`.

## Cambios realizados
- Se mantuvieron y mejoraron `poco-topline.liquid` y `poco-home-hero.liquid`. El hero usa la imagen dinámica de colección/producto cuando existe y mantiene un panel neutro accesible si no existe un asset.
- `templates/index.json`: orden corregido a Hero → Productos destacados → Departamentos.
- Destacados corregidos a `products_to_show: 3` y `columns_desktop: 3`; título exacto “Tres formas de mejorar tu día”.
- No se reactivó el selector de idiomas ni se duplicaron búsqueda, carrito o navegación.

## Validación
- JSON válido mediante `ConvertFrom-Json`.
- `git diff --check` sin errores.
- Theme Check no disponible en la imagen Docker existente; documentado sin repetir instalaciones fallidas.
- No se ejecutó navegador ni Lighthouse; la fidelidad visual final queda pendiente de comparación manual.

## Archivos para despliegue posterior
- `theme/sections/poco-topline.liquid`
- `theme/sections/poco-home-hero.liquid`
- `theme/sections/header-group.json`
- `theme/templates/index.json`
- `theme/assets/poco.css`

## Reversión
Revertir el commit de esta rama o restaurar los archivos anteriores de `phase6/presentation-ready`. Shopify remoto no fue modificado.
