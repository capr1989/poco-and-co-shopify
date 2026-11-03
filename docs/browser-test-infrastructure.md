# Infraestructura de navegador propuesta
Docker continúa como entorno principal. No se cambia Windows, seccomp, capacidades, usuario ni no-new-privileges para hacer funcionar Chrome.
Estado: Lighthouse/Playwright/axe instalados en imagen de herramientas, sin navegador compatible ejecutable en ese contenedor. La prueba de unshare de usuario devolvió EPERM bajo las restricciones actuales. El intento con Chrome Windows preinstalado y perfil separado fue rechazado por revisión automática («blocked by policy»); no se ejecutó ni se intentó otro lanzamiento.

## Solución propuesta para aprobación
Una VM de QA desechable, sin carpetas de usuario, credenciales comerciales, portapapeles compartido o socket Docker. Usar un hipervisor ya disponible; si hace falta instalarlo/habilitarlo, pedir permiso antes de cualquier cambio Windows. No usar servicio cloud pagado.
Sistema operativo soportado y actualizado desde imagen oficial verificada. Chrome/Chromium oficial con sandbox predeterminado y usuario normal, nunca root o --no-sandbox. Instalar Node y herramientas exactas del lock dentro de la VM; esa instalación no se hace en Windows.
Asignación inicial orientativa: 2 vCPU, 4 GiB RAM y disco de pruebas; registrar configuración real y consumo al ejecutar, no prometer equivalencia con un teléfono. Snapshot limpio por sesión. Copiar únicamente paquete de tema/datos ficticios/harness, sin montar el disco del host.
NAT sin redirecciones públicas; acceso al prototipo solo mediante una ruta privada acordada y a la tienda de desarrollo cuando su dominio haya sido aprobado. No abrir túnel ni puerto de depuración accesible fuera de la VM. La configuración de red exacta se revisa antes de crear la VM; no se afirma que ya exista.
Prueba de aceptación: navegador ejecuta como usuario normal con sandbox activo, sin privilegios, sin acceso a archivos personales; Lighthouse puede abrir una página de prueba y producir reporte con versiones y parámetros. Si falla, conservar error y no relajar controles.

## Medición posterior
Tres corridas por ruta/escenario: móvil y escritorio separados, mismo viewport, CPU/red, caché y catálogo. Mantener LCP/CLS/TBT/bytes/solicitudes e identificación de recurso, no TBT como INP. Priorizar Dawn; Horizon solo si existe comparación justificada.
Para tienda protegida por contraseña, autenticar manualmente el perfil de prueba sin guardar la contraseña en Git o informes. Verificar que el reporte corresponde a la página de producto y no a login/contraseña/barra de editor.
PSI no puede acceder al localhost o una tienda protegida como si fuera pública. No quitar protección para medir.
Accesibilidad automática con axe más teclado, lector de pantalla y revisión humana WCAG 2.2 AA; ninguna puntuación automática acredita conformidad total.

Referencias: [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [Playwright Docker](https://playwright.dev/docs/docker). La documentación de Playwright explica las limitaciones de root/sandbox; no se adoptan sus excepciones que reduzcan nuestros controles.
