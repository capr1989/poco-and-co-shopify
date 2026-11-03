# Poco & Co. · Shopify Panamá
Proyecto local independiente, identidad A y prioridad de rendimiento móvil. Sin tienda conectada ni publicación.

## Inicio en Windows 11
Docker Desktop con backend WSL2 debe estar instalado y operativo. Desde esta carpeta: `docker compose up --build -d`. Abrir http://127.0.0.1:8080 . Detener con `docker compose down`. Reconstruir con `docker compose build --pull` y repetir comprobaciones.
VS Code: abrir carpeta, **Dev Containers: Reopen in Container**. Dentro: `npm run check` y `npm start`; reenvío privado del puerto 8080.
Para revisar directamente el diseño, abrir prototype/index.html. Las pruebas HTTP requieren servidor.

## Estado del entorno
Docker Desktop 4.97.0 y motor Linux 29.9.2 operativos. Contenedor construido y arrancado; npm run check dentro del contenedor y respuestas HTTP comprobados. Docker está en AppData/Local/Programs/DockerDesktop/resources/bin; esta terminal todavía requiere su ruta completa. Shopify CLI no instalado.
El usuario instaló Docker Desktop. Prototipo disponible en http://127.0.0.1:8080/ . No se conectó Shopify.
Se respeta la ruta Windows solicitada; si el montaje afecta al rendimiento de desarrollo, evaluar migración a WSL sin mover archivos automáticamente.

## Continuidad
brief-original.md conserva el encargo. docs/requirements.md y performance.md integran los objetivos de velocidad; architecture.md describe Shopify Basic; theme-comparison.md mantiene ambos temas finalistas; backlog.md registra estados.
Prototipo de ocho productos ficticios, búsqueda, filtros, variantes y carrito mixto. Sin pedidos, pagos ni datos personales; carrito en memoria.
Repositorio: https://github.com/capr1989/poco-and-co-shopify . Su visibilidad actual es pública (verificada en Fase 2); no se cambió desde este trabajo. No se ha elegido tema definitivo. T001/T002 siguen PENDIENTES 0 %.

## Fase 2 preparada en rama local
Rama phase2/theme-evaluation. Candidato técnico provisional Dawn 16.1.1 en theme/, sin conexión Shopify. Prototipo conservado. Comparación con Horizon 4.3.0 por commit en docs/theme-comparison.md; plan concreto en docs/shopify-implementation-plan.md; comandos de herramientas en docs/tooling.md. Los cambios de esta fase no se han subido al remoto público.
Theme Check válido con advertencias y seis tests locales aprobados. Sin métricas Lighthouse/PSI ni validación de storefront Shopify.

## Fase 3: preparada para autorización
Rama phase3/shopify-validation desde 33748a7. Dawn aprobado como base principal de pruebas/desarrollo. Readiness, plan de conexión, matriz funcional, resultados, guía Admin y controles en docs/phase3-readiness.md, shopify-connection-plan.md, functional-test-plan.md, performance-results.md, admin-setup-guide.md y operations-controls.md.
Ocho fixtures Draft y ocho PNG FICTICIO; no cargados. MCP usado solo para auditoría de lectura; no autenticación CLI ni mutaciones. Se propone dev store gratuita nueva, todavía sin aprobación final. No se cambió la tienda existente.
15 tests locales, Theme Check y empaquetado ejecutados. Sin score Lighthouse/CWV; ver limitaciones de navegador y propuesta VM. Datos reales de la tienda auditada solo en work/ ignorado, nunca en esta rama pública. Push autorizado para Fase 3, sin merge.
