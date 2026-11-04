# Fase 4 — alternativa nativa para español por defecto

Fecha: 2026-11-04. Investigación de solo lectura; no se modificó Shopify.

## Estado comprobado

- Tienda: `poco-co-qa.myshopify.com`, Basic App Development, Panamá.
- Dawn `190052991089`: `UNPUBLISHED`; Horizon `190052663409`: `MAIN`.
- Idioma principal global: inglés, publicado.
- Español: publicado y asignado a la misma presencia web.
- Presencia existente `52417593457`: dominio `poco-co-qa.myshopify.com`, inglés predeterminado, español alternativo; rutas actuales `/` (en) y `/es/` (es).
- Mercado Panamá: `ACTIVE`, tipo `REGION`. No tiene una presencia web específica propia; hereda la presencia existente del dominio.
- Auditoría actual de traducciones específicas de Panamá: 0, con paginación completa. La auditoría global inmediatamente anterior conserva 9,458 traducciones registradas de español.

## Recomendación

Usar la función nativa **Set as domain default** para establecer español como idioma predeterminado de `poco-co-qa.myshopify.com`; no cambiar el idioma principal global de la tienda.

La operación se realiza desde **Settings > Languages > Español > Set as domain default**, eligiendo el dominio existente. No requiere crear un mercado, dominio, aplicación ni redirección JavaScript.

Resultado esperado según Shopify: la raíz `/` servirá español; inglés continuará publicado como idioma alternativo y deberá resolverse en `/en/`. Shopify mantiene automáticamente URL alternativas y etiquetas `hreflang`.

## Redirección y checkout

La redirección de idioma es opcional y se configura de forma nativa en **Online Store > Preferences > Automatic redirection > Language**. Si está activa, un navegador que prefiera inglés puede recibir `/en/`; si no, el visitante inicial verá la configuración predeterminada del dominio, español. La selección manual de idioma prevalece y Shopify la conserva para visitas posteriores.

El idioma predeterminado global sigue siendo inglés, por lo que no se debe afirmar que el checkout se convierta globalmente a español por esta sola operación. La experiencia de checkout también depende del mercado que Shopify resuelve, de la dirección de envío y de las capacidades de localización disponibles. Debe probarse sin completar un pedido después de cualquier cambio autorizado.

## Conservación y límites

Esta alternativa evita la acción de **Change default language** global que Shopify documenta como destructiva para las traducciones del idioma elegido. La documentación oficial indica expresamente que cambiar el idioma mostrado mediante Markets no requiere ajustar el contenido de la tienda. Por ello es la alternativa más segura para conservar las 9,458 traducciones españolas, aunque la conservación solo se confirmaría nuevamente por lectura después del cambio.

Shopify Basic / la dev store ya muestran las capacidades necesarias: idiomas publicados, presencia de dominio, rutas por subcarpeta y Mercado Panamá activo. No se observó requisito de aplicación pagada. Las funciones disponibles no sustituyen una revisión editorial: Contact, News y privacidad siguen siendo contenido fuente que puede permanecer en inglés.

## Operación que requiere autorización

1. En Shopify Admin, definir español como idioma predeterminado del dominio existente `poco-co-qa.myshopify.com`.
2. No cambiar el idioma principal global, mercados, dominios ni asociaciones de idioma.
3. Mantener inglés publicado y asignado al mismo dominio.
4. Dejar la redirección de idioma desactivada inicialmente; evaluarla después con pruebas de navegadores y geolocalización.
5. Releer idiomas, rutas y conteo de traducciones; probar `/`, `/en/`, `/es/`, búsqueda, filtros, carrito y checkout sin pedido.

Fuentes: https://help.shopify.com/en/manual/international/languages/manage-languages ; https://help.shopify.com/en/manual/international/languages/csv-translations ; https://help.shopify.com/en/manual/markets/customizations/domains-and-languages ; https://help.shopify.com/en/manual/international/automatic-redirection
