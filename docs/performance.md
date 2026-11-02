# Contrato de rendimiento
LCP ≤2.5 s, INP ≤200 ms y CLS ≤0.1 en p75 real con muestra suficiente. Lighthouse móvil ≥90 es meta de laboratorio. TBT es diagnóstico, no reemplaza INP. Una ejecución Lighthouse de navegación no aporta INP real.

## Presupuesto inicial propuesto
KiB=1024 bytes; JS/CSS comprimidos transferidos, imágenes/fuentes bytes de red. Por ruta, caché fría, incluyendo plataforma y terceros.

| Recurso | Límite inicial | Justificación |
|---|---:|---|
| JS propio inicial | 20 KiB gzip | Interacciones acotadas sin framework |
| JS total inicial | 150 KiB comprimidos | Margen tema/plataforma, limita apps |
| CSS total inicial | 60 KiB comprimidos | Evitar estilos globales sin uso |
| CSS propio | 15 KiB gzip | Personalización contenida |
| Imagen LCP móvil | 150 KiB | Reducir transferencia con red limitada |
| Imágenes viewport móvil | 300 KiB total | No cargar toda galería inicialmente |
| Fuentes iniciales | 100 KiB, 1 familia | Evitar descargas y cambios de métricas |
| Transferencia inicial total | 800 KiB | Incluye HTML y todos los recursos |
| Orígenes opcionales externos | 0 por defecto | Apps solo con coste y utilidad medidos |

Son límites internos propuestos, no umbrales oficiales Google. Confirmar frente a baselines de ambos temas. Si plataforma supera límite, atribuir contribución y justificar excepción; no ocultar recursos o quitar funciones necesarias. La suma del repositorio no equivale a bytes descargados.

## Protocolo reproducible
Fijar versiones/commits de temas, Chrome y Lighthouse. Mismos 8 productos, imágenes, dimensiones, secciones, idioma, moneda, fuentes, apps y consentimiento. Misma tienda de prueba autorizada; evitar editor/barra preview. No comparar demos comerciales distintas.
Rutas: home, colección, búsqueda con/sin resultados, producto con variantes, agotado y carrito mixto. Al menos tres corridas frías por ruta/tema/dispositivo, alternar temas; guardar todas, mediana y rango, y navegación caliente por separado.
Móvil: preset móvil de Lighthouse. Prueba adicional 390×844, CPU 4×, descarga 1.6 Mbps, subida 750 Kbps, RTT 150 ms. Es escenario de estrés reproducible, NO estadística de conexiones Panamá. Complementar Android medio/red panameña cuando posible. Escritorio: 1440×900 y preset desktop; registrar parámetros exactos y máquina. No mezclar throttling simulado y aplicado.
Herramientas QA dentro de contenedor, versiones y lock fijados tras revisar seguridad, Chrome con sandbox; no npx sin versión ni instalaciones globales en Windows. Guardar HTML/JSON por ruta, tema y dispositivo.
PSI requiere URL autorizada accesible; no publicar ni abrir túnel para medir. Separar laboratorio de campo, URL de origen y móvil de escritorio.
DevTools Performance: abrir menú, escribir búsqueda, cambiar filtros, elegir variante, añadir/cambiar/quitar carrito. Registrar latencia, errores, foco, saltos y long tasks. INP observado en recorrido es laboratorio, no p75 real.
Registrar LCP/elemento y fases (TTFB, demora/descarga del recurso, render), CLS/elementos causantes, FCP, TBT, Speed Index, solicitudes y bytes. Revisar waterfall, Coverage, cadenas bloqueantes, imágenes grandes, JS/CSS sin uso y terceros.
Repetir tras cambios importantes de tema, scripts, apps, imágenes, fuentes, búsqueda/filtros/carrito. Comparar baseline y revisar cada recorrido, no solo promedio.

## Datos de usuarios
Tras lanzamiento autorizado: informes Shopify y CrUX/PSI cuando disponibles, p75 por métrica/dispositivo, ventana y ámbito URL/origen. CrUX suele usar 28 días. Sin muestra suficiente: sin datos, sin inventar valores. No atribuir dato de origen a página individual. RUM externo solo tras revisión de privacidad, coste y autorización. Pruebas humanas con compradores sin experiencia complementan métricas.

Fuentes oficiales consultadas:
- https://shopify.dev/docs/storefronts/themes/best-practices/performance
- https://web.dev/articles/vitals

## Evidencia de Fase 2
No se cambian los objetivos ni presupuestos de la fase inicial. El inventario LF de fuente de los temas está en evidence/theme-static-audit.json y no equivale a transferencia inicial. Horizon tiene CSS dentro de Liquid; no comparar únicamente archivos .css.
Tema candidato: cero JS propio añadido, CSS propio 686 bytes fuente / 334 gzip. Fuente final configurada mediante biblioteca Shopify Manrope n5/n7: bytes reales aún sin medir. La TTF original de 164700 bytes sigue solo en prototipo y continúa excediendo presupuesto inicial; no se ha reemplazado el prototipo.
Lighthouse instalado 13.5.0: intento de ejecución bloqueado sin Chrome; no hay score, LCP, INP o CLS medidos. Playwright/axe sin navegador instalado. PSI imposible sobre localhost desde sus servidores; no se publica ni abre túnel. Comparación justa Dawn/Horizon pendiente de tienda autorizada. Sin datos CrUX/RUM.
Theme Check y pruebas de entrega/contraste no son pruebas de Core Web Vitals. Presupuestos se revisarán por ruta, incluyendo scripts de plataforma y fuentes reales, tras configurar ocho productos equivalentes en Shopify.
