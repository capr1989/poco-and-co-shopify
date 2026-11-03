# Lighthouse seguro — decisión de Fase 4

Investigado2026-11-03. No se ejecutó un benchmark en esta revisión ni se cambió seguridad de Docker/Windows. El contenedor de herramientas conserva usuario1000, rootfs read-only, cap_dropALL, no-new-privileges, sin socket Docker y perfil seccomp existente. La propuesta visual no requiere cambiar nada de esto.

## Opción práctica para la siguiente medición

Auditar la página autenticada con el panel Lighthouse de DevTools en Chrome existente, si ese panel está disponible. Es una auditoría local en navegador, no una ejecución en Docker: conserva intacto el entorno Docker, pero no ofrece el aislamiento adicional de una VM dedicada. La documentación oficial explica que DevTools mantiene las cookies de la sesión; si la autenticación depende de almacenamiento adicional, conservarlo con Clear storage desmarcado. No exportar cookies ni incrustar contraseñas en comandos.

Procedimiento propuesto, todavía NO ejecutado:

1. Abrir vista previa QA, confirmar Dawn Draft y tienda protegida. Mantener Shopify Admin fuera de capturas/reportes.
2. Entrar por el mecanismo normal. Abrir DevTools y el panel Lighthouse mediante su UI. No lanzar Chrome por otro mecanismo ni abrir puertos de depuración.
3. Registrar Chrome/Lighthouse, equipo, extensiones, ruta/commit remoto, viewport, navegación, configuración de throttling, caché/almacenamiento y estado del carrito. La sesión existente tiene extensiones/actividad que pueden afectar los resultados: etiquetar la medición como exploratoria.
4. Ejecutar tres navegaciones por ruta y perfil: inicio, colección, producto y carrito; móvil y escritorio. Usar exactamente la misma configuración para comparar temas. Verificar que cada informe audita la página esperada y no la pantalla de contraseña o Horizon. No cambiar Horizon para obtener equivalencia.
5. Mantener el mismo estado de la barra de preview y apps en todas las corridas; indicar su sobrecarga. Registrar mediana y rango, no solo la mejor puntuación.
6. Exportar HTML/JSON localmente y revisar URLs/tokens/datos antes de subir una versión sanitizada a Git. No publicar trazas crudas con información de sesión. Registrar advertencias y recursos lentos.
7. Separar Lighthouse de campo: no inventar INP/p75 ni convertir una puntuación móvil en garantía. La tienda QA aún no tiene datos reales suficientes. PSI público no puede asumir nuestra sesión privada; no quitar contraseña para obtener un número.

Fuente oficial: [Lighthouse en páginas autenticadas](https://github.com/GoogleChrome/lighthouse/blob/main/docs/authenticated-pages.md), [panel Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse).

## Opción para benchmark aislado y repetible

Si se exige aislamiento del navegador respecto al perfil personal, proponer una VM de QA separada y desechable con usuario normal, Chrome oficial y sandbox predeterminado. Sin carpetas personales compartidas, socket Docker, credenciales Admin ni puertos públicos. Instalar herramientas de versiones fijadas en esa VM desde fuentes oficiales; autenticar solo la vista previa QA mediante entrada normal. El desarrollo continúa en Docker sin cambios. Exportar únicamente reportes revisados. No se creó VM, instaló software, activó servicio pagado ni cambió Windows. Esta preparación requiere aprobación técnica específica antes de ejecutarse; no se afirma viabilidad/costo del host sin comprobarlo.

## Por qué no aplicar la receta habitual al contenedor actual

La documentación de Playwright señala que ejecutar como root deshabilita el sandbox y que el perfil para un usuario no-root añade permisos clone/setns/unshare. Eso amplía la política seccomp existente. Sus ejemplos también incluyen IPC de host o SYS_ADMIN para ciertos problemas: no cumplen nuestras restricciones y no se adoptaron. Docker recomienda conservar su perfil predeterminado.

No usar no-sandbox, privileged, seccomp unconfined, cap-addSYS_ADMIN, IPC de host ni relajar controles de Windows como solución rápida. El fallo anterior de namespaces no demuestra que el tema sea lento. La aprobación automática rechazó antes lanzar otra instancia Chrome con perfil específico; no se reintentó ese lanzamiento por una ruta alternativa.

Fuentes: [Playwright Docker](https://playwright.dev/docs/docker), [Docker seccomp](https://docs.docker.com/engine/security/seccomp/).

Decisión: procedimiento DevTools autenticado listo para evaluación exploratoria; VM separada propuesta para mayor aislamiento. Métricas de esta revisión: NO MEDIDAS.
