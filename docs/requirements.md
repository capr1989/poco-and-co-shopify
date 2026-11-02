# Requisitos vinculantes
Se conserva íntegro brief-original.md. Velocidad es prioridad desde arquitectura, selección de tema y cada cambio.
Objetivos: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 en p75 real cuando exista muestra suficiente; segmentar móvil/escritorio. Lighthouse móvil ≥90 es objetivo de laboratorio, nunca garantía por visita.
Liquid/HTML para contenido principal. Shopify nativo antes de personalizar. JS mínimo, sin frameworks innecesarios ni backend/headless predeterminados.
Imágenes responsivas desde CDN Shopify, dimensiones y aspect-ratio reservados. Imagen visible principal eager, prioridad alta si es LCP; nunca lazy loading. Lazy solo en contenido secundario fuera del viewport. Revisar candidatos LCP en móvil y escritorio.
SVG originales de marca; eliminar fuentes/scripts sin uso. Sin autoplay, animaciones pesadas, carruseles innecesarios ni terceros prescindibles. Evitar bloqueo de render y cambios bruscos sin provocar destellos.
Búsqueda, filtros, menú móvil y carrito fluidos. No sacrificar accesibilidad ni funciones comerciales para mejorar una puntuación.
Lighthouse/PSI cuando sean válidos, pruebas equivalentes Dawn/Horizon, móvil/escritorio, red limitada y CPU moderada, diagnóstico de recursos y repetición tras cambios importantes. No inventar métricas.
Shopify Basic, Docker, seguridad, costos y prohibición de publicar sin autorización se mantienen.
