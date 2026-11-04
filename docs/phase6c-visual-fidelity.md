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


## Despliegue controlado a Dawn — 4 de noviembre de 2026

- Tienda verificada: `poco-co-qa.myshopify.com`. Dawn `190052991089` permaneció `MAIN`; Horizon `190052663409` permaneció `UNPUBLISHED`.
- Checksums remotos previos registrados para reversión: `assets/poco.css` `565193748cf3b16a6c24c32e336f2af8`, `sections/header-group.json` `74aafe647daadc6bc319c8c49a08caf6`, `templates/index.json` `e29e05751825e4a5bf0a609e58a1bf80`; los dos archivos Liquid no existían en el tema remoto.
- JSON local validado y `git diff --check` sin errores. Theme Check no estaba disponible en la imagen Docker existente.
- Se subieron únicamente `sections/poco-topline.liquid`, `sections/poco-home-hero.liquid`, `sections/header-group.json`, `templates/index.json` y `assets/poco.css` con Shopify CLI Docker, `--nodelete` y sin cambiar Horizon.
- El primer intento rechazó temporalmente `templates/index.json` porque conservaba un bloque `intro` fuera de `order`; se corrigió localmente eliminando ese bloque no utilizado y se subió de nuevo solo `templates/index.json`. Resultado final exitoso.
- Verificación remota: barra superior, hero, orden hero → destacados → departamentos, 3 productos/3 columnas y selector de idiomas desactivado están presentes en los archivos remotos.
- Panamá continúa `ACTIVE`; el dominio principal sigue siendo `poco-co-qa.myshopify.com`. Las rutas `/` y `/en/` devolvieron HTTP 403 sin sesión, consistente con la protección por contraseña activa.
- No se modificaron productos, inventario, idiomas, Markets, pagos, políticas ni Horizon. La apariencia idéntica a la maqueta queda pendiente de revisión manual en navegador.

### Reversión
Restaurar los tres archivos existentes con los checksums previos y eliminar los dos archivos nuevos mediante una operación aprobada separadamente; no se ejecutó ninguna eliminación durante el despliegue.
