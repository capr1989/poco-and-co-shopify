# Subida inicial del tema — 2026-11-03

Resultado: **subida parcial**, con un tema nuevo UNPUBLISHED. No es una integración funcional aprobada.

Origen: Dawn 16.1.1; upstream e9ac9c0f0b289da643164f4080380bd11ed27519. Commit enviado: 5ed12f52d0cad002e30ff8c9c7c53b9eb032bb2f. Shopify CLI 5.0.0, Docker aislado, credenciales efímeras fuera de Git.

El listado previo contenía únicamente Horizon publicado. El posterior conserva ese mismo objeto (ID, nombre, role y processing idénticos) y añade un ID distinto unpublished. No se compararon hashes de archivos del tema publicado. IDs, dominio, enlace de vista previa y respuestas originales: work/theme-upload-verification.private.json, excluido del repositorio público.

Shopify rechazó sections/main-product.liquid: el nombre del bloque poco_delivery tenía 28 caracteres y el máximo indicado por el servidor es 25. También rechazó templates/product.json por faltar esa sección. Aunque la transferencia llegó al 100 %, el resultado JSON fue partial.

Corrección SOLO local: nombre «Poco: entrega» (13 caracteres), más guard para nombres literales de bloques de hasta 25 caracteres. Theme Check: 0 errores, 9 advertencias; guard de integridad aprobado. Theme Check no detectó originalmente el límite; la validación del servidor sigue siendo necesaria. Evidencias: evidence/phase3/theme-check-label-fix.json, theme-integrity-label-fix.json y theme-upload-sanitized.json.

## Reparación pendiente de aprobación

La autorización de crear un tema nuevo se consumió. La condición 10 del usuario exige detenerse antes de modificar un tema existente. No se reintentó la subida. Propuesta: reenviar únicamente los dos archivos rechazados al nuevo borrador, preservando los demás:

```sh
shopify theme list --store <DOMINIO_QA_AUTORIZADO> --json
shopify theme push --store <DOMINIO_QA_AUTORIZADO> --path /workspace/theme --theme <ID_NUEVO_BORRADOR> --only sections/main-product.liquid --only templates/product.json --nodelete --json
shopify theme list --store <DOMINIO_QA_AUTORIZADO> --json
```

Antes: comprobar que el ID sigue siendo unpublished y que el publicado conserva su ID. Si cambia el rol, detenerse. Después: verificar resultado completo y unpublished, sin publicar.

No se cargaron productos, clientes, pedidos ni datos comerciales; no se cambiaron configuraciones Admin, contraseña, pagos, dominios ni planes. No se probó navegación ni carrito en Shopify. No hay métricas Lighthouse/PSI/CWV nuevas. T001/T002 pendientes al 0 %. Detenerse antes de catálogo o cambios Admin.

## Reparación autorizada y completada — 2026-11-03

Tras autorización explícita, se comprobó el borrador unpublished y Horizon live. Se ejecutó exactamente la reparación limitada a sections/main-product.liquid y templates/product.json con --nodelete, desde el commit 54ea5fa72feee83d0563d2af25aaa8d81224d9f7, dentro de Docker. Shopify devolvió status success, changed true e issues vacío: ambos archivos del alcance autorizado aceptados, sin nuevos rechazos.

El listado posterior confirma Dawn unpublished y el mismo objeto de metadatos de Horizon live. No se compararon hashes del tema publicado. Theme Check posterior: valid true, 0 errores y 9 advertencias. Evidencia pública: evidence/phase3/theme-repair-sanitized.json y theme-check-after-repair.json; respuestas originales privadas en work/theme-repair-*.private.json.

La reparación remota está completa; la sección anterior se conserva como historial de la aprobación requerida. No se cargaron productos ni se modificaron configuraciones Admin. Navegación, búsqueda, filtros, carrito y métricas reales siguen pendientes. T001/T002 al 0 %. No hay autorización para catálogo ni publicación.
