# Fase 4: despliegue P1 y español adicional

Fecha: 2026-11-03. Rama phase4/visual-ux-validation. Propuesta revisada: commit 7512874; contenido fuente d60cc00. Estado: cinco archivos aceptados por Shopify, pero P1 contador NO resuelto en runtime. Español adicional operativo; principal sigue en.

## Despliegue y reversión

Se verificaron los cinco hashes candidatos del manifiesto y diferencias contra origen. Las versiones remotas coincidían con las fuentes: product.json únicamente añadía cuatro objetos settings vacíos generados por Shopify. Se guardaron cuerpos completos, MD5 y roles antes de escribir en work/p1-deployment-before.private.json. El respaldo es privado y excluido de Git; no confundir la publicación del informe con publicar el tema.

Shopify aceptó exclusivamente assets/product-form.js, layout/theme.liquid, locales/en.default.json, locales/es.json y templates/product.json, sin userErrors ni eliminaciones. Lectura posterior confirma contenido equivalente al candidato. Evidencia: p1-deployment-files.json. Dawn conserva UNPUBLISHED. Horizon conserva MAIN: 507/507 hashes iguales al respaldo, mismo updatedAt. Contraseña activa. No cambios de productos/inventario, pagos, pedidos, Shop u OAuth.

Reversión preparada: leer del respaldo privado los cuerpos originales de esos cinco archivos y enviarlos únicamente al mismo ID Dawn con themeFilesUpsert, previa nueva comprobación de roles. Para retirar solo el cambio JS se puede restaurar exclusivamente assets/product-form.js. No se ejecutó reversión ni se alteró otro tema. Corrección adicional pendiente de respuesta del usuario; no se subió por exceder los bytes de la propuesta revisada.

## Pruebas realmente ejecutadas

| Prueba | Resultado |
|---|---|
| Collar Dorado, cuatro unidades con cuatro disponibles | Adición normal y redirección nativa al carrito; contador cinco incluyendo organizador previo |
| Cambio a Plateado y adición de una unidad en español | Variante correcta en carrito; contador dos incluyendo organizador previo |
| Estuche: solicitar cuatro con stock tres, escritorio Chrome | Shopify añade tres; contador queda uno; aparece error del servidor y mensaje de recuperación. FALLÓ |
| Mismo límite en navegador integrado a 390 px, carrito inicialmente vacío | Shopify añade tres; burbuja sigue vacía; mensaje de recuperación en español con role=alert. FALLÓ |
| Stock cero, dispensador | Agotado y comprar deshabilitados; sin pedido |
| Búsqueda española collar | Un resultado; filtros Disponibilidad/Precio y orden en español; sin bloque poco-search duplicado |
| Carritos tras pruebas | Retiradas exclusivamente líneas de prueba añadidas: Chrome conserva organizador uno; integrado vacío como al iniciar |
| Fallos de red y datos/sección inválidos | Pruebas automatizadas simuladas, no corte de red real |

Nueve tests simulados del parche revisado pasan, pero no detectaron el fallo real: esto demuestra su límite. La corrección local de endpoint también pasa nueve tests, sin afirmar que funcione en Shopify. Solo hay un POST de adición en el código y en los tests; no se capturó una traza de red completa del navegador, por lo que no se presenta como medición de red real.

En el diagnóstico, la respuesta de la sección nativa mostró cuatro artículos correctos. La navegación a cart.js fue bloqueada por el cliente de navegador; cart.json permitió leer cantidades tres más uno. Eso apoya probar el endpoint JSON que ya usa resolveCartLinesUpdate en Dawn, pero NO demuestra por sí solo la causa exacta del catch. Propuesta mínima: proposals/p1-cart-endpoint-correction.patch (un GET .js → .json en product-form.js). No cambia el POST, HTML, carrito ni dependencias. Requiere aprobación y nueva prueba real. Se solicitó también la opción de revertir JS al respaldo.

Móvil real en navegador integrado: 320/360/390 px, español, sin overflow horizontal; campo y botón 48 px. Chrome no aplicó el override de viewport y mantuvo 1536 px: se descartaron esas lecturas para móvil. Capturas posteriores se identifican correctamente. No hubo mediciones Lighthouse, PSI, INP/LCP/CLS ni red limitada; no se afirma rendimiento optimizado.

## Theme Check e integridad

CLI Docker con aislamiento intacto: 2 errores y 9 advertencias. Los dos UnknownFilter por applicable_disclosures se reproducen en los snippets sin modificar del Dawn upstream bajo la misma ejecución actual. Cero issues nuevos frente a esa baseline contemporánea, sin ocultar los dos errores; no repetir la cifra anterior de cero como resultado actual. Informes p1-deployed-theme-check.json y p1-upstream-theme-check-current.json. Guard conserva todos los JS nativos y una excepción SHA256 exacta para el product-form.js revisado; comparación explícita con baseline actual pasa. El validador complementario de skill sigue bloqueado por @shopify/theme-check-common ausente; sin instalar dependencias host.

## Español: operaciones completadas

Se exportaron contenidos fuente/digests y traducciones API de 29 tipos de recursos, con paginación. Idiomas globales en/es y traducciones específicas de Panama: cero traducciones registradas encontradas; no es una exportación CSV de Admin. Archivos privados work/p1-translations-export.private.json y work/p1-market-translations-export.private.json. Se preservan también es/en de ambos temas en los respaldos de archivos. No hay garantía de incluir datos de apps externas o cambios posteriores.

Se detectó contenido fuente no ficticio: página Contact, blog News y plantilla de política de privacidad de Shopify. Se conservaron sin traducir ni borrar. Productos ficticios, colecciones, metacampos, configuraciones y los dos temas permanecen. La cobertura de claves españolas: Dawn 401 vs 389 inglesas; Horizon 318 vs 311, ninguna clave inglesa ausente. Cobertura no certifica calidad de traducción; cuenta/checkout/política requieren revisión específica.

Se ejecutó shopLocaleEnable(es), después shopLocaleUpdate(es,published:true) y asignación a la presencia web existente. Todas sin userErrors. Estado final: en principal/publicado, es secundario/publicado. Presencia existente: en predeterminado y es alternativo con ruta /es. No se creó dominio ni mercado. Pruebas reales en /es: portada, buscador, resultados, filtros visibles, precios, stock, entrega, variante y carrito en español. No se confirmó cambio de idioma principal ni idioma personal Admin.

## Única operación de idioma aún no autorizada

Cambiar el idioma predeterminado de la tienda de inglés a español en Settings → Languages → idioma actual → Change default → Spanish → Save. Antes de ese Save se debe releer el inventario de traducciones y la advertencia; conservar/reincorporar inglés secundario y asignarlo a la presencia existente si Shopify lo retira. No realizar confirmaciones destructivas adicionales sin el usuario.

Riesgo: Shopify advierte que el cambio elimina traducciones registradas del idioma de destino y no las convierte en contenido fuente. La consulta actual no encontró ninguna, pero se debe comprobar de nuevo al ejecutar. El contenido inglés fuente, incluida privacidad, no se traduce automáticamente. El predeterminado se comparte entre Dawn, Horizon y checkout: aunque los 507 archivos de Horizon sigan iguales, cambiaría su idioma renderizado. Respaldo y revisión de URLs necesarios; no prometer reversión completa con solo volver a inglés. [Guía oficial de idiomas](https://help.shopify.com/en/manual/international/languages/manage-languages).

La autorización de idioma pendiente es exclusivamente esta confirmación del predeterminado. Existe además una autorización técnica imprevista pendiente para corregir o revertir el JS debido al fallo real documentado; no se confunden ambas decisiones.

## Evidencias

- [Archivos](evidence/phase4/p1-deployment-files.json), [Horizon](evidence/phase4/p1-horizon-integrity.json), [pruebas reales](evidence/phase4/p1-runtime-results.json), [exportación](evidence/phase4/p1-translation-export-summary.json).
- [Portada móvil española](evidence/phase4/screenshots/p1-spanish-home-390.jpg), [escritorio](evidence/phase4/screenshots/p1-spanish-home-desktop.jpg), [fallo real móvil](evidence/phase4/screenshots/p1-stock-runtime-390.jpg).

T001/T002 PENDIENTES 0 %. Sin merge a main.
