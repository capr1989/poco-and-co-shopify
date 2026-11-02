# Herramientas locales y comandos
Imagen de herramientas separada; el contenedor del prototipo no se reemplaza.
Node 22.23.4, imagen oficial fijada por digest en tools/Dockerfile. Shopify CLI 5.0.0, Lighthouse 13.5.0, Playwright 1.64.1, axe-core/playwright 4.14.0, LiquidJS 10.30.1. Versiones exactas y dependencias transitivas/integrity en tools/package-lock.json.
Node cumple engines de las herramientas. CLI puede devolver unknown para la versión interna de Theme Check; se registra esa salida, no se inventa una versión. CLI 5.0.0 es el identificador reproducible usado.
npm ci --ignore-scripts evita lifecycle scripts de dependencias, incluido esbuild. No se ejecutaron scripts del tema descargado. No hay navegador descargado ni herramientas globales instaladas en Windows.

Desde la raíz del proyecto, Docker en PATH:
~~~powershell
docker compose -f compose.tools.yaml build
docker compose -f compose.tools.yaml run --rm tools shopify version
docker compose -f compose.tools.yaml run --rm tools node --test tests/delivery.test.mjs tests/contrast.test.mjs
./scripts/prepare-upstream.ps1
docker compose -f compose.tools.yaml run --rm tools node scripts/audit-themes.mjs
docker compose -f compose.tools.yaml run --rm tools node scripts/check-theme.mjs
~~~
La primera construcción descarga Node y paquetes desde Docker Hub/npm. prepare-upstream descarga únicamente los commits públicos bloqueados en upstream-lock.json; no ejecuta scripts.
Compose tools ejecuta como uid/gid1000, red none, proyecto read-only, rootfs read-only, /tmp temporal, sin capacidades, no-new-privileges y límites CPU/RAM/PID. No tiene puerto, socket Docker ni credenciales. El servicio prototipo conserva su publicación solo 127.0.0.1:8080.

## Theme Check
El comando offline reproducible es:
~~~powershell
docker compose -f compose.tools.yaml run --rm tools shopify theme check --path theme --json --no-input
~~~
La referencia embebida de CLI 5.0.0 no conoce applicable_disclosures y genera dos errores heredados. Para obtener la referencia pública actual se ejecutó **solo validación local**, con red saliente y sin credenciales/tienda:
~~~powershell
docker run --rm --read-only --tmpfs /tmp:rw,size=128m --cap-drop ALL --security-opt no-new-privileges -e SHOPIFY_CLI_NO_ANALYTICS=1 --mount "type=bind,source=C:/Users/Carlos Pretto/Dev/Poco and Co Shopify,target=/workspace,readonly" poco-shopify-tools:phase2 shopify theme check --path theme --json --no-input
~~~
Se repitió reemplazando --path por work/upstream/dawn y work/upstream/horizon. Evidencia JSON en docs/evidence/. Descarga documentación pública del validador; no conecta Admin/storefront ni sube el tema. La referencia pública puede evolucionar: conservar reportes fechados, CLI y lock en cada revisión. No se desactivó UnknownFilter.
El guard de regresión compara los reportes guardados; hay que regenerarlos antes de usarlo para cambios nuevos. No reemplaza ejecutar Theme Check.

## Seguridad de paquetes
npm audit se ejecutó en imagen sin montaje de proyecto/credenciales, con acceso solo necesario al registro para auditoría. Primer Lighthouse 13.6.0: cinco entradas moderadas en cadena de dependencias (glob/minimatch/Sentry). Se fijó 13.5.0 y regeneró lock; auditoría final cero vulnerabilidades conocidas. Ver npm-audit-initial.json y npm-audit.json.
Es una consulta al registro en esa fecha, no un escaneo del sistema operativo ni garantía futura. Se conservan advertencias de paquetes deprecated; actualizar de manera controlada. No npm audit fix --force.

## Navegador, accesibilidad y rendimiento
Lighthouse está instalado pero el intento no produjo métricas: falta Chrome. Prueba de namespaces de usuario bajo política actual devuelve Operation not permitted. No se utilizó --no-sandbox, seccomp unconfined, SYS_ADMIN ni privileged para sortearlo. No descargar un navegador sin preparar un entorno compatible con su sandbox.
Playwright/axe instalados, sin navegador funcional en este contenedor: auditoría automática DOM pendiente. La prueba de contraste es cálculo estático; no acredita todos los estados de la UI.
No hay Shopify renderizado, ni URL accesible autorizada para PSI, ni datos CrUX. La comparación de temas requiere autorización de tienda de desarrollo. No se abre túnel público.

## Validador de la skill
Se intentó validate.mjs --api liquid con theme-path y lista de archivos modificados. El paquete de la skill carece de @shopify/theme-check-common y falla antes de validar; ver shopify-validator.txt. No se alteró la instalación del plugin ni Windows. La validación independiente CLI sí se ejecutó y pasó con advertencias.
