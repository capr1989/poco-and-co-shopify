# Poco & Co. — Fase 5B: preparación local de LCP y accesibilidad

Rama: `phase5b/lcp-accessibility`  
Base: `phase5/static-audit`  
Estado: desplegada exclusivamente en Dawn no publicado

## Evidencia y causa técnica

### Imagen LCP

`theme/snippets/product-media-gallery.liquid` ya identifica la media destacada de la variante y la primera llamada a `product-thumbnail` pasa `lazy_load: false`. Las medias posteriores reciben `lazy_load: true`. En `theme/snippets/product-thumbnail.liquid`, sin embargo, esa distinción solo producía ausencia/presencia de `loading="lazy"`; no se enviaba `fetchpriority` a `image_tag`. Por ello la primera imagen podía competir con otros recursos aunque ya no fuera lazy.

El parche añade `fetchpriority="high"` únicamente cuando `lazy_load == false` y `auto` para las demás imágenes. No elimina lazy loading global, no añade JavaScript y también cubre el poster de media no imagen sin adelantarlo cuando es secundario.

La primera tarjeta de portada no se modifica: `card-product.liquid` conserva lazy loading por defecto. Esa imagen solo debe priorizarse si una medición posterior demuestra que es el LCP de la portada.

### Selector de cantidad

En `theme/sections/main-product.liquid`, el `label` visible usa `for="Quantity-{{ section.id }}"` y existe un texto dinámico oculto `quantity-label-{{ section.id }}`. El `input` tenía el `id` correcto, pero no declaraba el vínculo ARIA explícito con ese texto. Se añade `aria-labelledby` al propio input. Esto complementa, no duplica, la etiqueta HTML y no cambia el componente `quantity-input`, el teclado ni la lógica de cantidades.

El hallazgo Lighthouse se atribuye al markup renderizado de Dawn; no hay evidencia de que provenga de Horizon ni de JavaScript personalizado. La confirmación definitiva requiere repetir Lighthouse y una inspección con lector de pantalla.

## Archivos modificados

- `theme/snippets/product-thumbnail.liquid`
- `theme/sections/main-product.liquid`

No se modificaron assets JavaScript, carrito, variantes, navegación, branding, traducciones ni configuraciones Shopify.

## Pruebas locales

- Comparación contra `phase5/static-audit`: solo los dos archivos anteriores cambiaron.
- Se comprobó que la primera media recibe `lazy_load: false` y las posteriores `true` antes del parche.
- Se comprobó que `fetchpriority` ya es una opción usada por el tema en banners, slideshow e image-with-text; no se introdujo una API nueva.
- No se instalaron dependencias.
- Theme Check completo queda pendiente de ejecutar en el contenedor disponible; no se ha afirmado aquí que pase.

## Riesgos y regresiones posibles

- `fetchpriority="high"` debe quedar limitado a una sola media inicial; si una plantilla renderiza más de una llamada con `lazy_load: false`, habrá que revisar esa configuración antes de desplegar.
- El beneficio de LCP depende del waterfall real y del tamaño de la imagen; no se puede inferir una mejora de 4,1 s sin repetir Lighthouse.
- `aria-labelledby` puede cambiar el nombre accesible anunciado por algunos lectores de pantalla, por lo que debe verificarse que no duplique el texto visible de forma confusa.

## Validación requerida antes de desplegar

1. Ejecutar Theme Check y registrar errores/warnings comparados con la línea base.
2. Repetir Lighthouse móvil en la misma ficha y condiciones: Performance, Accessibility, FCP, LCP, TBT y CLS.
3. Inspeccionar el HTML final: una única imagen inicial con `fetchpriority="high"`, posteriores lazy, dimensiones y `srcset` intactos.
4. Probar teclado y lector de pantalla en selector de cantidad, incluyendo cambio de variante, mínimo/máximo y stock cero.
5. Repetir adición normal, stock parcial, carrito y navegación para confirmar que no hay regresiones.
6. Comparar Dawn no publicado con Horizon sin modificar Horizon.

## Recomendación

## Despliegue controlado

Se verificó mediante Shopify Admin GraphQL que la tienda es `poco-co-qa.myshopify.com`, Dawn `190052991089` conserva `UNPUBLISHED` y Horizon `190052663409` conserva `MAIN`.

Antes del cambio, Shopify devolvió estos checksums remotos:

- `sections/main-product.liquid`: `cbf664880b2ad94eb80018930ef68a91`, 102549 bytes.
- `snippets/product-thumbnail.liquid`: `822bb564d3f2000ed3ab89085ff81c65`, 7426 bytes.

La reversión queda respaldada por el commit anterior de esta rama (`e03ee45`) y por esos checksums/contenidos remotos registrados en la evidencia de la operación. Para revertir, se debe restaurar exactamente la versión anterior de esos dos archivos y ejecutar otro `themeFilesUpsert` dirigido al mismo ID, sin publicar.

Se subieron únicamente:

- `snippets/product-thumbnail.liquid` — checksum posterior `ea01f549f6e450d2eccf2ca7df47d68f`, 7592 bytes.
- `sections/main-product.liquid` — checksum posterior `ffe89d759f46d1efe26abc122ba55755`, 102628 bytes.

La mutación `themeFilesUpsert` terminó sin `userErrors`. La consulta posterior confirmó ambos archivos y el rol `UNPUBLISHED`. Horizon permaneció `MAIN`.

Theme Check Docker se ejecutó antes del despliegue: 2 errores y 9 warnings, idénticos a la línea base conocida; no aparecieron nuevos hallazgos en los dos archivos modificados. La comprobación HTTP sin navegador a `/` devolvió `403`, consistente con la protección por contraseña activa.

La medición Lighthouse, la inspección de lector de pantalla, teclado y las pruebas visuales siguen pendientes de ejecución manual. No se afirma aún una mejora real de LCP ni accesibilidad.
