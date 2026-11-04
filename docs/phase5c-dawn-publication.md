# Poco & Co. — Fase 5C: publicación controlada de Dawn

Fecha: 2026-11-04  
Rama: `phase5b/lcp-accessibility`  
Tienda: `poco-co-qa.myshopify.com`

## Estado antes de publicar

Shopify GraphQL confirmó:

- Dawn `190052991089` — `UNPUBLISHED`.
- Horizon `190052663409` — `MAIN`.
- Los dos archivos corregidos estaban presentes en Dawn con checksums `ffe89d759f46d1efe26abc122ba55755` y `ea01f549f6e450d2eccf2ca7df47d68f`.
- Dominio primario: `poco-co-qa.myshopify.com`.
- Web presence: español publicado en la raíz y inglés publicado en `/en/`.
- Mercado Panamá (`pa`): `ACTIVE`.

La protección se comprobó por HTTP sin sesión: `/` y `/en/` devolvieron `403`. No se cambió ninguna configuración de contraseña.

## Operación ejecutada

Se utilizó Shopify CLI dentro de Docker con:

```text
shopify theme publish --store poco-co-qa.myshopify.com --theme 190052991089 --force --json
```

Shopify devolvió `status: success`, `changed: true`, tema `Poco Co QA - Dawn 16.1.1`, ID `190052991089`, rol `live` y `processing: false`.

No se subieron archivos durante esta operación, no se ejecutó `theme push`, no se modificaron productos, inventario, pagos, mercados, idiomas, dominios ni traducciones, y no se instaló ninguna aplicación.

## Estado después de publicar

La consulta posterior confirmó:

- Dawn `190052991089` — `MAIN`.
- Horizon `190052663409` — `UNPUBLISHED`.
- Ambos temas siguen disponibles y sin procesamiento pendiente.
- Los checksums de los dos archivos desplegados permanecen sin cambios.
- Panamá permanece `ACTIVE`.
- Español sigue siendo el locale predeterminado del dominio (`/`); inglés continúa publicado en `/en/`.
- HTTP devuelve `403` tanto en `/` como en `/en/`, consistente con la contraseña activa.

## Reversión

Si Dawn presenta una regresión crítica, la reversión segura es publicar Horizon `190052663409` mediante Shopify CLI o Admin, sin modificar archivos ni contraseña. El estado previo y los IDs quedaron registrados arriba. No se ejecutó reversión porque no se observó incidente de seguridad.

## Pruebas manuales pendientes

- Navegación real, búsqueda, filtros, variantes y carrito con Dawn publicado.
- Lighthouse móvil/escritorio y medición de LCP, INP, CLS, FCP y TBT.
- Prueba de teclado y lector de pantalla del selector de cantidad.
- Confirmación visual del branding y del contenido servido por Dawn en una sesión autorizada.

T001 y T002 permanecen pendientes al 0 %. No se utilizó Computer Use, navegador personal ni Lighthouse.
