# Fase 4 — preflight para español como idioma principal

Fecha: 2026-11-04. Estado: **DETENIDO ANTES DE CAMBIAR EL IDIOMA PRINCIPAL**.

## Verificaciones completadas

- Tienda conectada: `poco-co-qa.myshopify.com` (Poco Co QA, Basic App Development, Panamá).
- Dawn `190052991089`: `UNPUBLISHED`.
- Horizon `190052663409`: `MAIN`; no se modificó.
- Respaldos privados de `c276cc5` presentes: `work/p1-translations-export.private.json` y `work/p1-market-translations-export.private.json`; además permanece el resumen versionado `docs/evidence/phase4/p1-translation-export-summary.json`.
- Idiomas antes de cualquier mutación: inglés publicado y principal; español publicado y secundario.
- Presencia web existente: `poco-co-qa.myshopify.com`, raíz inglesa `/` y alternativa española `/es/`. No se crearon dominios ni mercados. Panamá sigue `ACTIVE`.

## Bloqueo de seguridad

El respaldo de `c276cc5` registra cero traducciones globales o específicas de Panamá. La consulta actual, completa para los 29 tipos de recursos y sin paginación pendiente, detectó **9,458 traducciones españolas**:

- `ONLINE_STORE_THEME_LOCALE_CONTENT`: 4,661
- `ONLINE_STORE_THEME`: 4,661
- `EMAIL_TEMPLATE`: 132
- `FILTER`: 2
- `PACKING_SLIP_TEMPLATE`: 1
- `SHOP_POLICY`: 1

Estas traducciones no están contenidas en el respaldo anterior. Cambiar el idioma principal podría eliminarlas o alterar su relación con el idioma principal. Según la autorización, no se ejecutó la operación oficial de Shopify Admin ni se realizó ninguna otra mutación.

## Estado y siguiente decisión requerida

No hubo cambios en idiomas, mercados, dominios, productos, pedidos, pagos, checkout, contraseña, Sign in with Shop, Dawn ni Horizon. T001 y T002 permanecen pendientes al 0 %.

Para continuar será necesario crear un respaldo actualizado de esas 9,458 traducciones y recibir una autorización explícita que cubra el riesgo de que Shopify las elimine durante el cambio de idioma principal. Hasta entonces, español continúa disponible en `/es/` e inglés permanece como idioma principal en `/`.
