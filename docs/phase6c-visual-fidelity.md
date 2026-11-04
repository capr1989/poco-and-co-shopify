# Poco & Co. — Fase 6C: fidelidad visual de portada

## Recursos encontrados
- Se encontró el prototipo original en `capr1989/poco-and-co-brand/presentation/`, con `index.html`, `styles.css`, `script.js` y `data.js`.
- La referencia confirma Manrope, `#192C46`, `#F1F4F2`, `#2855D9` y la composición editorial de la captura.
- No se encontraron ilustraciones de productos reutilizables en el repositorio de marca. Se mantiene un espacio visual seguro que usa la imagen de colección/producto de Shopify cuando existe y un panel neutro cuando no.

## Cambios locales
- `theme/sections/poco-topline.liquid`: barra superior con “UNA SELECCIÓN PARA TU DÍA A DÍA”.
- `theme/sections/poco-home-hero.liquid`: hero responsive de dos columnas, copy aprobado, enlace nativo a colección y prioridad eager solo para la imagen principal.
- `theme/sections/header-group.json`: incorpora la barra superior antes del header existente; no duplica búsqueda, carrito ni menú.
- `theme/templates/index.json`: coloca el hero y cambia el encabezado de la colección destacada a “Tres formas de mejorar tu día”.
- `theme/assets/poco.css`: estilos de tinta, marfil, azul grisáceo, espaciado, botón y adaptación móvil.

## Diferencias conocidas
- La captura usa ilustraciones editoriales específicas que no están disponibles como assets originales; no se inventaron ni descargaron imágenes de terceros.
- El logo, búsqueda, cuenta, carrito y menú siguen siendo los componentes nativos de Dawn.
- La fidelidad visual final requiere comparación en navegador; esta etapa no despliega ni ejecuta Computer Use/Lighthouse.

## Validación local
- JSON de todos los archivos del tema: válido mediante `ConvertFrom-Json`.
- `git diff --check`: sin errores.
- Theme Check no pudo ejecutarse porque la imagen Docker disponible no incluye el binario `shopify`/`theme-check`; debe repetirse en el entorno de herramientas habitual.
- No se modificaron productos, inventario, idiomas, Markets, Horizon ni Shopify Admin.

## Plan mínimo de despliegue
1. Revisar la rama y aprobar los archivos modificados.
2. Ejecutar Theme Check en el entorno habitual.
3. Subir solo los archivos de esta rama a Dawn `190052991089` con `--nodelete`, sin publicar ni tocar Horizon.
4. Validar manualmente escritorio y 320/360/390 px con la contraseña activa.

## Reversión
Revertir el commit de esta rama o restaurar individualmente los cinco archivos modificados desde `phase6/presentation-ready`.

