# QA y evidencia
No storefront conectado ni datos reales; no se declara Lighthouse/PSI o CWV aprobado.
npm run check: sintaxis JS, hashes de marca, referencias HTML y presupuestos gzip propios. Son controles estáticos, no validan usabilidad o red.
QA manual pendiente: 390px/1440px, filtros/menú, búsqueda vacía/sin coincidencias, ficha/variantes, agotados, añadir/aumentar/reducir/quitar, límites ficticios y carrito mixto. Tab/Shift+Tab, foco visible, Escape/cierre/retorno de foco; lector y contraste.
Carrito en memoria, se pierde al recargar. Stock por acabado es simplificación ficticia; no inventario comercial. SVG ilustrativos no validan fotografía final.
Theme Check, Lighthouse, PSI, auditoría accesible y pruebas humanas siguen pendientes. Docker ya disponible; falta preparar herramientas de medición en contenedor.
Registrar fecha, commit, ruta, tema, dispositivo, red/CPU, versiones, intentos, métricas disponibles, recursos lentos y artefactos. INP campo sin datos; TBT nunca etiquetado INP.

Manrope TTF original: 164700 bytes. Si excede presupuesto de 100 KiB, convertir a WOFF2 en contenedor y medir cobertura/calidad; no se declara presupuesto de fuente aprobado.

## Verificación real posterior a instalar Docker
Compose construido/arrancado. npm run check dentro del contenedor: OK. HTTP 200 en home, JS, CSS, fuente, SVG de marca y productos 1/8. CSP presente. Usuario uid/gid 1000; escrituras a /workspace y /etc rechazadas EROFS; read-only, cap_drop ALL y no-new-privileges verificados. Solo 127.0.0.1:8080 publicado.
Navegador: búsqueda sin coincidencias y restablecimiento OK; filtro Hogar muestra 2 productos; carrito local+externo USD40 y aviso mixto; aumentar organizador da USD58; quitar externo da USD36 y oculta aviso. Variante Plateado añadida y visible en carrito. Vista móvil 390×844 inspeccionada. Esto no acredita accesibilidad completa ni rendimiento bajo throttling. Evidencia local en reports/mobile.jpg.
