# Guía prevista de Shopify Admin · sin ejecutar cambios
Solo proceder en la tienda exacta y con las operaciones aprobadas. Dawn 16.1.1 es la base de pruebas/desarrollo; Horizon no se recrea por completo.
El catálogo ficticio está en data/fixtures/products.json y los PNG 600×600, todos rotulados FICTICIO, en data/fixtures/images/. image-manifest.json registra origen/hashes; no se han subido imágenes. No hace falta programar para administrarlos.

## Preparación y conservación
Confirmar tipo dev y plan de capacidades Basic; idioma español, USD y mercado Panamá. Revisar zona horaria explícitamente (la tienda auditada informa EST; no inferir su configuración a partir del país). Mantener contraseña y pagos reales desactivados.
Inventariar temas, menús, páginas, colecciones y ajustes existentes. No renombrar, sobrescribir o borrar elementos de otro proyecto; añadir recursos de prueba con prefijo PRUEBA cuando se autorice.
No tocar facturación, planes, dominios o cuentas de clientes. La cuenta del operador recibe solo permisos necesarios.

## Definiciones → valores → lectura
Crear primero estas cinco definiciones merchant-owned de Producto en Configuración / Datos personalizados o Metacampos (los nombres exactos del menú pueden variar):
| Namespace/key | Tipo | Uso |
|---|---|---|
| custom.delivery_group | single_line_text_field | Elección local/external, clasificación interna |
| custom.delivery_message | multi_line_text_field | Texto público de plazo y condiciones |
| custom.delivery_verified | boolean | Revisión comercial completada |
| custom.delivery_verified_at | date_time | Momento real de verificación, no futuro |
| custom.delivery_valid_until | date_time | Caducidad obligatoria |

Permitir lectura storefront de los cinco campos porque Liquid los consulta, aunque verified_at no se muestra visualmente. No guardar datos privados en esos campos. Aplicar validación de opciones al grupo y fijar/pinear los campos en el editor de producto si está disponible.
Escribir después los valores ficticios en borradores. Fechas ISO 8601 con zona; booleanos reales, no texto true/false. No interpretar las fechas de muestra como condiciones comerciales actuales.
Finalmente comprobar lectura con product.metafields.custom.<clave>.value en las fichas y con item.product en carrito. El código escapa mensajes y exige verificación vigente, grupo permitido y fechas coherentes.
[Tipos oficiales](https://shopify.dev/docs/apps/build/metafields/list-of-data-types), [lectura Liquid](https://shopify.dev/docs/api/liquid/objects/metafield).

## Catálogo y variantes
Crear ocho Draft, nueve variantes totales (collar Dorado/Plateado), seis departamentos; precios USD y descripciones con etiqueta FICTICIO. Subir los PNG desde Admin después de permiso, conservar alt explícito. No usar rutas locales como URLs remotas ni alojarlas públicamente para facilitar la carga.
Inventario rastreado, no vender sin stock, cero en todas las ubicaciones inicialmente. Las planned_test_quantity del JSON se aplican solo a los casos aprobados después de revisión; no son stock real. Pendiente/vencido permanecen en HOLD; agotado válido puede ser visible sin compra tras autorización.
Editar precios, fotografías, variantes y stock desde Productos/Inventario; nunca modificando JavaScript del tema.

## Colecciones, navegación y filtros
Crear colecciones de prueba solo con productos autorizados para el canal. Configurar menú principal y pie desde Contenido/Menús; jerarquía superficial, solo departamentos con productos publicados visibles. No basta contar Draft para habilitar un departamento.
Shopify Search & Discovery, si se aprueba su instalación/configuración, para filtros de precio/disponibilidad y búsqueda; no instalar apps de pago. Validar que los filtros aparezcan con datos reales de la tienda; no construir un índice propio.
El campo visible usa routes.search_url, y la búsqueda predictiva original permanece en cabecera.

## Editor de Dawn sin publicar
Seleccionar el tema QA no publicado, configurar colección destacada, menú, colores A y fuentes Manrope n5/n7. Logo/favicon SVG provienen del manifiesto original. Mantener grilla 4/2, sin hero gigante, sliders, autoplay o revelado pesado. Se puede cambiar contenido/promociones desde el editor.
La sección de búsqueda y el bloque de entrega están disponibles en el candidato. No cambiar de tema publicado para probarlos. Verificar vista móvil, español, inventario y textos caducados en preview.
Carrito página como inicio; drawer sigue compatible en código, pendiente de pruebas reales si se activa.

## Gestión cotidiana y prueba humana
Una socia no técnica debe demostrar: alta Draft, cambio de precio/foto, variantes, inventario, departamento, mensaje y caducidad de entrega, ocultar/publicar después de revisión. Registrar si requiere ayuda y dónde se confundió.
Solo desarrollador: actualizar Dawn, tocar snippets/hoja CSS, cambiar modelo de datos, ampliar entrega por variante, reparar errores de código o preparar infraestructura QA. No panel administrativo propio.
Pagos, transportistas, tarifas, cobertura, política de devoluciones, costos y proveedores reales siguen pendientes; no inventar esos datos para hacer que un test pase.
