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


## Tema de prueba no publicado — 4 de noviembre de 2026

- Se duplicó Dawn MAIN `190052991089` mediante Shopify CLI sin tocarlo. Nuevo tema: `POCO QA — Phase 6D Visual`, ID `190120132721`, rol `UNPUBLISHED`.
- Dawn permanece `MAIN`; Horizon `190052663409` permanece `UNPUBLISHED`; ninguno está procesando.
- Se subieron exclusivamente a la copia: `sections/poco-header.liquid`, `sections/header-group.json` y `assets/poco.css`, usando `--nodelete`. `poco-search.liquid` no era dependencia del nuevo header y no se subió.
- Shopify aceptó los tres archivos y la consulta API posterior confirmó su contenido, incluidos el formulario funcional, rutas reales, selector de idiomas desactivado y reglas visuales de Poco.
- La solicitud HTTP de preview respondió 200 con marcador de contraseña, por lo que la protección continúa activa.
- Vista previa real: `https://poco-co-qa.myshopify.com?preview_theme_id=190120132721`.
- No se realizó comparación visual, búsqueda, carrito o navegación en navegador por restricción de no usar Computer Use/Cloud Browser. Esas comprobaciones quedan para revisión manual del propietario.

### Reversión
La copia se puede conservar para pruebas. Para devolverla a su estado duplicado basta restaurar los tres archivos anteriores del tema MAIN en la copia; no se requiere modificar Dawn MAIN ni Horizon.
