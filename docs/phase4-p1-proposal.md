# Propuesta P1: español y contador de stock

Estado: SOLO LOCAL. Ninguna operación de idioma ni ninguno de los cinco archivos de este parche fue subido. La autorización consumida cubría únicamente los cuatro archivos UX. Fuente: d60cc00bc09e6bdf3e4e6ee802f3b410ec5cafa2.

## P1: español principal

Lectura real: únicamente en habilitado, principal y publicado. Mercado Panama activo; la consulta no devolvió webPresences personalizadas. Dawn tiene 387 claves inglesas y 399 españolas; Horizon 311 y 318 respectivamente. No faltan claves inglesas en los JSON españoles de ninguno de los dos temas. Esto no certifica la calidad de cada traducción. Persisten dos textos literales ingleses en product.json: Share y You may also like; el parche local propone Compartir y También te puede interesar. Productos, políticas, avisos, cuenta de cliente y checkout requieren revisión real posterior.

El idioma predeterminado se comparte entre temas y checkout: cambiarlo alteraría el texto renderizado de Horizon aunque sus archivos no se editen. Shopify advierte que cambiar el predeterminado elimina traducciones registradas del idioma de destino; se deben exportar antes. El idioma predeterminado anterior se retira de la lista y habría que volver a añadir inglés si se quiere conservar como secundario. Esto es distinto de los archivos es.json del tema. No se promete reversión completa solo seleccionando inglés de nuevo. [Documentación oficial](https://help.shopify.com/en/manual/international/languages/manage-languages).

Operaciones propuestas, pendientes de autorización separada:

1. Exportar traducciones registradas y registrar idiomas, mercado, URLs y roles de temas antes de tocar configuración.
2. Habilitar es mediante shopLocaleEnable; inicialmente queda sin publicar. Publicarlo mediante shopLocaleUpdate con published:true cuando corresponda al flujo aprobado. [API oficial](https://shopify.dev/docs/apps/build/markets/manage-translated-content).
3. En Admin: Settings → Languages → idioma predeterminado → Change default → Spanish → Save; inspeccionar las advertencias antes de confirmar. El esquema consultado de ShopLocaleInput permite published/marketWebPresenceIds, no primary: no se propone una mutación inventada.
4. Conservar o volver a habilitar inglés secundario si se aprueba; revisar selección de mercado/URLs sin contratar dominios. Comprobar español principal/publicado, navegación, búsqueda, carrito, entrega y checkout sin comprar, tanto Dawn como Horizon. No cambiar el idioma personal de la interfaz Admin.

Los borradores GraphQL están en proposals/phase4-spanish-operations.graphql. Se revisó el esquema; la herramienta de validación difirió la validación a ejecución, por lo que NO se declara validación ejecutable completa ni permisos confirmados. No se necesita una app pagada para la propuesta nativa.

## P1: contador tras adición parcial

Causa: product-form.js trata la respuesta de error antes de publicar cartUpdate/renderizar el carrito. Shopify puede añadir el máximo disponible y devolver 422 cuando la cantidad solicitada excede stock; la respuesta de error no implica que el carrito no haya cambiado. [Cart Ajax API](https://shopify.dev/docs/api/ajax/reference/cart).

La configuración actual usa carrito de página. La propuesta conserva el POST nativo y, exclusivamente ante 422 en ese modo, consulta el carrito real y la sección cart-icon-bubble. Renderiza el HTML de Shopify en la burbuja existente, informa la cantidad actual de esa variante y publica el evento nativo cartUpdate. No reintenta añadir, no calcula un total supuesto ni crea otro carrito. Con errores de red/HTML/datos conserva el error y pide abrir el carrito para verificar. El éxito normal conserva la redirección nativa; notification/drawer quedan fuera de esta intervención. Se usa la [Section Rendering API](https://shopify.dev/docs/api/ajax/section-rendering).

Mensaje español propuesto: “Carrito actualizado. Ahora tienes [quantity] unidades de esta variante en el carrito. Revisa la cantidad antes de continuar.” Describe la cantidad actual, no afirma cuántas se añadieron en esa operación. Mientras la tienda siga en inglés se utilizarán las cadenas inglesas; las dos propuestas deben coordinarse para obtener la experiencia española.

Parche revisable: proposals/phase4-p1-stock-and-spanish.patch. Cinco archivos: assets/product-form.js, layout/theme.liquid, locales/en.default.json, locales/es.json y templates/product.json. theme/ no contiene todavía estos cambios. Manifiesto con hashes fuente/candidato y scripts reproducibles en proposals/README.md. El guard principal de JS nativo sigue intacto; una futura integración necesitará una excepción explícita y acotada para product-form.js, nunca desactivar el control completo.

## Pruebas locales y límites

Nueve pruebas automatizadas ejecutadas en Docker sobre el código candidato: adición parcial con un solo POST, varias líneas de variante, stock cero, fallo de red, sección/datos inválidos, éxito normal, error no422, notification intacto y caché sin cadenas nuevas. Nueve aprobadas, cero fallidas. Theme Check candidato: cero errores/nueve advertencias. Integridad: exactamente cinco archivos distintos, sin añadidos/eliminaciones. Evidencias en docs/evidence/phase4/p1-*.

El validador complementario de la skill no pudo correr por dependencia @shopify/theme-check-common ausente; no se instalaron dependencias en host. El Theme Check de CLI sí se ejecutó. Las pruebas de carrito son automatizadas con respuestas simuladas, no una prueba del parche en Shopify. La reproducción real previa explica el problema; el arreglo remoto sigue pendiente de autorización y validación real.

Presupuesto: product-form.js añade 679 bytes gzip (2013 → 2692) en el candidato. Cero dependencias y cero consultas extra en éxito normal. La reconciliación dispara dos GET directos solo ante 422; el suscriptor nativo cartUpdate puede generar consultas adicionales de reglas de cantidad. No se ha medido latencia ni Core Web Vitals del candidato. Tras aprobación: aplicar exclusivamente los cinco archivos revisados al Dawn no publicado, repetir stock3/solicitud4, verificar cantidad real inmediata, mensaje español y comportamiento con red limitada; preservar Horizon, contraseña y ausencia de pedidos.

T001/T002 pendientes al 0 %.
