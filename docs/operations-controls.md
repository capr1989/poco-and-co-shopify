# Controles operativos de disponibilidad y entrega
Un mensaje Liquid no bloquea checkout. Esta política se aplica en **Shopify Admin, publicación e inventario**; no hay segundo carrito, backend o checkout propio.

## Estados y responsables
Operador comercial verifica condiciones/proveedor, precio, cobertura, plazo y stock. Revisor confirma alta/publicación o congelación; una persona puede cumplir ambos roles dejando registro, sin programar.
- BORRADOR/HOLD: DRAFT, sin publicación en ningún canal, inventario rastreado, sobreventa desactivada y cantidad disponible cero en todas las variantes/ubicaciones relevantes.
- LISTO PARA REVISIÓN: grupo local/external válido, mensaje sustentado, verified=true, verified_at real no futuro y valid_until posterior a ambas fechas; variantes comparten plazo de producto; fotos/precios/stock revisados.
- COMPRABLE: solo tras aprobación, cantidad comprobada, estado Active y canal previsto habilitado. Un tag o booleano no sustituye verificación humana.
- AGOTADO VERIFICADO: puede mostrarse como agotado con cantidad cero y sobreventa desactivada si las condiciones están vigentes y se aprueba su visualización. No es elegible para una prueba de compra.
- CADUCADO/PENDIENTE: retirar de canales y volver a Draft; quantity=0 en todas las ubicaciones/variantes y mantener inventario rastreado con política DENY. Nunca marcar Active con stock positivo solo para probar un aviso.

## Alta segura
1. Crear siempre en Draft; no añadir a canales. Crear variantes con tracking y no continuar vendiendo sin stock.
2. Cargar datos verificados y fecha de revisión/caducidad. Si una variante tiene plazos diferentes, detener publicación: MVP solo admite plazo común por producto.
3. Revisar con la ficha, precio, contenido, políticas y origen de la información. No exponer proveedores/costos privados en el mensaje público.
4. Registrar aprobación y asignar cantidades por ubicación. Publicar únicamente el producto aprobado en el canal aprobado.
5. Probar agotado, carrito existente y navegación; comprobar que Shopify impide comprar sin inventario. No declarar este resultado hasta ejecutarlo en la tienda.

## Vencimientos e incidencias
Revisión diaria antes de atender ventas y al recibir cambios de proveedor/stock; revisión anticipada antes de valid_until. Asignar un responsable y una fecha de congelación anterior a la expiración para no depender de actuar en el último segundo.
Si falta verificación o se aproxima caducidad sin renovación: poner disponible cero, quitar de canales, pasar a Draft, retirar enlaces/colecciones si procede y revisar pedidos ya existentes por separado. No borrar productos, pedidos o clientes. Mantener trazabilidad del motivo y nueva revisión.
La caducidad del metacampo **no cambia automáticamente** estado, publicaciones o inventario. Sin automatización aprobada estos controles son manuales y pueden fallar si no se ejecutan; no existe bloqueo continuo demostrado. El fallback Liquid solo informa.
Si se requiere una garantía automática de cierre al vencimiento, es una decisión de alcance futura; no se añade app, Flow o servicio de pago por defecto.

## Carritos existentes y pruebas negativas
Verificar en Shopify qué ocurre al caducar/retirar un producto que ya estaba en carrito: actualización de secciones, stock, aviso y validación antes de compra. Nunca completar pagos/pedidos reales para probar.
Los productos pendientes/vencidos del fixture se quedan Draft/no publicados/cero stock. Sus fallbacks se prueban localmente con LiquidJS y, tras permiso, mediante vista previa/control de datos de una tienda aislada. No saltar el control de publicación para simular disponibilidad.
Cantidades y eliminación deben usar cart.js y Section Rendering nativos; el snippet vive dentro de la región actualizada. Ningún valor editable de la línea de carrito es fuente confiable del plazo.

## Herramienta local de revisión
scripts/catalog-readiness.mjs revisa el fixture con una fecha explícita y genera motivos de HOLD. Distingue revisión de compra de visualización de agotados. No llama Shopify, no escribe inventario y no actúa como vigilancia de producción.
El reloj del fixture es fijo para reproducibilidad; al revisar un catálogo en una fecha distinta, pasar esa fecha real de revisión. No reusar la aprobación sintética como autorización comercial.

Referencias: [estados y disponibilidad](https://help.shopify.com/en/manual/products/product-status), [venta sin stock](https://help.shopify.com/en/manual/inventory-and-locations/setup/selling-when-out-of-stock). Aplicación real pendiente de permisos Admin y pruebas de checkout nativo.
