# Fase 4: subida UX autorizada

Fecha: 2026-11-03. Rama: phase4/visual-ux-validation. Fuente Dawn 16.1.1: d60cc00bc09e6bdf3e4e6ee802f3b410ec5cafa2.

Se subieron exclusivamente assets/poco.css, sections/header-group.json, templates/index.json y sections/poco-search.liquid. Coincidían con la propuesta de phase4-ux-audit.md y el commit fuente. Shopify aceptó los cuatro sin userErrors. Sin eliminaciones ni publicación. Copias completas anteriores y posteriores en work/ (privado); hashes en [verificación](evidence/phase4/ux-upload-verification.json). JSON comparado semánticamente y CSS/Liquid normalizando finales de línea.

Dawn continúa UNPUBLISHED y la contraseña activa. Horizon continúa MAIN, sin cambios en updatedAt ni en los dos archivos coincidentes muestreados. No se repitió una comparación completa de sus 507 archivos en esta operación. No hubo escrituras de catálogo ni configuración Admin.

## Comprobaciones reales

| Ancho móvil | Intro antes → después | Encabezado departamentos antes → después |
|---|---|---|
| 320 px | 497 → 473 px | 730.7 → 690.7 px |
| 360 px | 431 → 407 px | 652.25 → 612.25 px |
| 390 px | 392 → 368 px | 624.3 → 584.3 px |

La intro disminuyó 24 px y departamentos aparecen 40 px antes: 8 px de cabecera, 8 px del buscador y 24 px de intro. Sin desbordamiento horizontal; campo y botón conservan 48 px de altura. El logo conserva sus dimensiones en cada ancho; escritorio 200 × 72.7 px. Manrope, fondo #F1F4F2 y botón #2855D9 con texto blanco verificados.

Búsqueda real de collar: un resultado. Término sin coincidencias: cero resultados y recuperación visible. En resultados no existe la sección poco-search y hay un único campo visible; el buscador modal nativo cerrado no se cuenta como visible. Se abrieron seis enlaces de departamentos y el modal Account: Sign in with Shop continúa presente, sin iniciar sesión. Carrito conservó el organizador, una unidad y USD18; lectura sin compra ni cambios del carrito durante esta ronda. Estas comprobaciones no certifican todos los flujos posibles.

Theme Check posterior: cero errores y nueve advertencias upstream, sin nuevos errores. Guard de integridad aprobado. Sin Lighthouse, PSI, CWV ni mediciones de tiempo: estos números son geometría de interfaz, no rendimiento.

## Capturas

La captura previa conservada muestra un layout de escritorio reducido y no constituye una comparación visual móvil equivalente. La comparación antes/después de la tabla procede de mediciones DOM registradas por ancho; las capturas posteriores sí muestran el layout móvil.

- [Captura previa de referencia, no comparable visualmente](evidence/phase4/screenshots/phase4-upload-before-390.jpg)
- [Después, 320 px](evidence/phase4/screenshots/phase4-upload-after-320.jpg)
- [Después, 360 px](evidence/phase4/screenshots/phase4-upload-after-360.jpg)
- [Después, 390 px](evidence/phase4/screenshots/phase4-upload-after-390.jpg)
- [Escritorio](evidence/phase4/screenshots/phase4-upload-after-desktop.jpg)
- [Resultados de búsqueda](evidence/phase4/screenshots/phase4-upload-search-desktop.jpg)

El diseño definitivo sigue pendiente de evaluación del usuario. Los dos P1 se describen en [la propuesta local](phase4-p1-proposal.md); no se han desplegado. T001/T002 pendientes al 0 %.
