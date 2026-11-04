# Poco & Co. — Fase 6D: réplica visual de la maqueta

## Implementación
- Se reemplazó la combinación de header nativo + búsqueda separada por `poco-header.liquid`, un componente de dos filas alineado con la maqueta: logo, búsqueda, cuenta y carrito en la primera; departamentos en la segunda.
- Se conservan rutas y funciones reales: formulario GET de Shopify con `type=product`, enlaces de cuenta, `routes.cart_url`, contador del carrito y menú Shopify configurable.
- `header-group.json` mantiene la barra superior y sustituye exclusivamente su sección header por el componente Poco; se retiró la sección de búsqueda separada para evitar duplicación.
- El hero y los destacados conservan las correcciones de Fase 6C: columnas centradas, tres productos dinámicos y orden hero → destacados → departamentos.
- Se corrigió el icono de la sección de búsqueda antigua para usar el asset nativo de Dawn si esa sección se reutiliza en otro grupo.

## Dawn conservado/adaptado
- Conservado: rutas de búsqueda, carrito, cuenta, menú, objetos `cart`, `shop`, `routes`, imágenes/productos dinámicos y estilos de accesibilidad de Dawn.
- Adaptado: la composición visual del header, porque la estructura estándar de Dawn no permite una búsqueda funcional centrada en la misma fila sin separar visualmente la navegación.

## Diferencias pendientes
- Las ilustraciones de producto del SVG permanecen mezcladas con texto y controles de interfaz; no se reutilizan como recursos para no asociarlas engañosamente a productos dinámicos.
- Sin un render autorizado no se declara equivalencia píxel a píxel. Deben compararse escritorio y 320/360/390/768 px antes de desplegar.

## Validaciones
- JSON del tema validado con `ConvertFrom-Json`.
- `git diff --check` sin errores.
- Estructura Liquid revisada estáticamente: formularios, etiquetas, rutas y activos nativos presentes.
- Theme Check no se ejecuta porque la imagen Docker disponible no lo incluye; no se repitieron instalaciones fallidas.

## Despliegue reversible
1. Revisar el componente y renderizarlo en un entorno autorizado.
2. Subir solo `sections/poco-header.liquid`, `sections/header-group.json`, `assets/poco.css` y, si se desea conservar la corrección del icono, `sections/poco-search.liquid`, con `--nodelete`.
3. Revertir restaurando el `header-group.json` previo y eliminando `poco-header.liquid` únicamente con autorización; `poco.css` y `poco-search.liquid` se revierten desde el commit anterior.

## Restricciones cumplidas
No se modificó Shopify remoto, productos, colecciones, precios, inventario, idiomas, Markets, checkout, pagos, Horizon ni la contraseña. T001/T002 permanecen al 0%.
