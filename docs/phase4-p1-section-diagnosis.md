# P1: diagnóstico y parche mínimo propuesto

Estado: parche mínimo desplegado únicamente en Dawn UNPUBLISHED; validación HTTP/UX real 4/3 todavía pendiente. Rama phase4/visual-ux-validation.

## Hallazgo

El GET de secciones del reconciliador envía Accept: application/json a /cart?sections=cart-icon-bubble. Dawn 16.1.1 advierte explícitamente en assets/standard-actions-override.js que esa cabecera hace que el servidor devuelva el JSON del carrito e ignore sections. El archivo local coincide byte por byte con el upstream conservado (SHA256 59664857f34e992be8a63e5386f7efba59f4f1c520ca6f474e347f052460dc19).

Fuente primaria: https://raw.githubusercontent.com/Shopify/dawn/e9ac9c0f0b289da643164f4080380bd11ed27519/assets/standard-actions-override.js

La secuencia que reproduce el fallo es:

1. Ambos GET responden satisfactoriamente y JSON.parse funciona.
2. La segunda respuesta tiene forma de carrito, no de mapa de secciones.
3. sections['cart-icon-bubble'] queda undefined y rendered queda null.
4. La validación lanza exactamente Error('Incomplete cart refresh').
5. El catch sustituye el aviso por el mensaje de recuperación. Nunca se ejecutan bubble.innerHTML ni publish(cartUpdate).

Esto encaja con el contador obsoleto y el aviso observados en la prueba real anterior. No se ha capturado aún la respuesta de ese segundo GET durante la adición parcial: la correspondencia exacta con la sesión sigue siendo una inferencia, no una nueva prueba Shopify completada.

## Qué queda descartado o sin demostrar

El usuario ejecutó fetch real en Chrome con carrito vacío: /cart.js, HTTP200, Content-Type text/javascript; charset=utf-8, items array y itemCount0. No es un escenario 4/3. En la inspección previa, la navegación directa a /es/cart.js también dio HTTP200 y JSON válido con cantidades numéricas. El bloqueo de navegación de la herramienta no prueba un fallo de Shopify. Se retira la recomendación de /cart.json.

Las rutas españolas renderizadas observadas fueron Shopify.routes.root = /es/ y routes.cart_url = /es/cart. Aunque el parche usa routes.cart_url, ambas construcciones producen /es/cart.js. No hay evidencia de un prefijo perdido.

En carrito de página, el código de envío no añade el campo sections: solo lo hace si existe cart-notification o cart-drawer. No se conserva una respuesta original del POST que permita afirmar que ya contenía HTML de la burbuja. No es necesario ampliar ese POST para corregir la cabecera del GET.

cartUpdate se publica después del renderizado en el código existente. Si rendered es null, nunca se publica. Un fallo síncrono del suscriptor también podría alcanzar el catch, pero sucedería después de asignar el HTML; no explica tan directamente una burbuja que permanece intacta. No se propone sustituir los eventos ni crear otro carrito.

Referencias oficiales: https://shopify.dev/docs/api/ajax/reference/cart y https://shopify.dev/docs/api/ajax/section-rendering . El contrato documentado de secciones es un mapa ID→HTML; HTTP200 por sí solo no asegura que se obtuvo el contenido esperado. La advertencia específica sobre Accept procede del código nativo citado, no se atribuye a esa página API.

## Cambio mínimo

Una línea en assets/product-form.js: retirar exclusivamente el objeto de opciones con Accept: application/json del GET ?sections=cart-icon-bubble. Conservar el GET oficial cart.js y su cabecera JSON, las rutas localizadas, el POST único, validaciones, aviso accesible y cartUpdate nativos. Cero dependencias nuevas.

Parche revisable: p1-section-accept-fix.patch. Fuente/candidato SHA256 en proposals/p1-section-accept-fix-manifest.json del repositorio local. El código operativo theme/ sigue intacto; el candidato está en work/p1-section-accept-candidate.js. La propuesta de endpoint .json queda rechazada y retirada.

## Pruebas locales ejecutadas

Siete pruebas nuevas del contrato de negociación: el código desplegado reproduce el fallback con JSON de carrito donde se esperaba una sección; el candidato actualiza los totales 4 y 3, informa variante3, maneja variante0 y conserva recuperación segura ante sección inválida, carrito inválido y fallo de red. Más nueve pruebas anteriores sobre el candidato, incluyendo un solo POST de adición y éxito nativo sin consultas adicionales. Total:16 aprobadas,0 fallidas. Son simulaciones con Response real de Node y DOM simulado; el servidor simulado sigue el contrato advertido por Dawn. No certifican el arreglo desplegado.

Theme Check del tema candidato local:2 errores upstream y9 advertencias;0 issues nuevos frente a baseline contemporánea. El validador complementario sigue bloqueado por @shopify/theme-check-common ausente. Docker conserva aislamiento; no se instaló ninguna dependencia.

## Confirmación real pendiente y siguiente autorización

Se solicitó comparar dos GET del mismo /cart?sections=cart-icon-bubble con y sin Accept JSON, imprimiendo solo estado, Content-Type, presencia de sección y forma de carrito. No requiere agregar productos ni revelar tokens. Resultado aún no recibido al preparar este informe.

Con la autorización recibida, se subió únicamente `assets/product-form.js` mediante `themeFilesUpsert` al tema 190052991089. La mutación devolvió `upsertedThemeFiles` para ese único archivo y `userErrors: []`. No se ejecutó ninguna publicación ni se modificó Horizon. La prueba real 4/3 en escritorio y móvil aún requiere una sesión QA navegable; no se inventan resultados.

Estado posterior leído por MCP: Dawn UNPUBLISHED (updatedAt 2026-11-04T14:47:51Z), Horizon MAIN (updatedAt 2026-11-03T13:31:00Z). La contraseña permanece activa. No pedidos, pagos, cambio de idioma principal ni cambios en otras tiendas. T001/T002 PENDIENTES0%.
