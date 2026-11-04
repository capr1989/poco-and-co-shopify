# Poco & Co. — Fase 6B: preparación local presentation-ready

Base: `phase6/presentation-ready` (`22f15b5`)  
Estado: cambios locales preparados; no desplegados a Shopify.

## Cambios preparados

- `theme/templates/index.json`: reemplaza el copy visible de “Catálogo ficticio” y “DEMOSTRACIÓN PRIVADA” por lenguaje de marca basado en «En buena compañía».
- `theme/sections/footer-group.json`: crea un footer compacto con identidad, descripción breve y menú Explorar; activa el selector nativo de idioma y oculta enlaces opcionales de políticas mientras requieren revisión.
- `theme/sections/footer.liquid`: muestra copyright de Poco & Co. mediante traducción nativa, sin cambiar la lógica de políticas obligatorias.
- `theme/locales/es.json` y `theme/locales/en.default.json`: añade traducciones para copyright y la página Sobre nosotros.
- `theme/sections/poco-about.liquid` y `theme/templates/page.about.json`: prepara una página editorial bilingüe sin historia empresarial, claims ni datos comerciales inventados. No crea la página en Admin.
- `docs/phase6b-product-proposals.md`: tabla ANTES/DESPUÉS con ocho títulos y descripciones neutrales. No se modificaron productos mediante API.

## Productos: aprobación pendiente

Los ocho productos siguen mostrando en Shopify los marcadores `[PRUEBA FICTICIA]`, vendor `Poco & Co. DEMO` y descripciones de prueba. Se mantienen intactos hasta que se apruebe la tabla editorial y se autorice una operación Admin/API separada. Handles, variantes, SKU, precios, inventario, colecciones y metacampos no se tocaron.

## Validación local

- JSON de `index.json`, `footer-group.json`, `page.about.json` y ambos locales: válido.
- `git diff --check`: sin errores.
- Theme Check Docker: 2 errores y 9 warnings, coincidentes con la línea base Dawn/Shopify conocida; no aparecen errores nuevos en los archivos modificados.
- No se ejecutó navegador, Computer Use, Cloud Browser ni Lighthouse.

## Limitaciones y decisiones pendientes

1. El menú `poco-demo-menu` sigue siendo el menú remoto existente; su handle es técnico y no visible, pero sus enlaces visibles deben aprobarse antes de sustituir nombres.
2. La página Sobre nosotros está preparada como plantilla local, pero requiere crear/asignar una página en Shopify Admin en una etapa posterior.
3. La política de privacidad no se modificó y continúa siendo un bloqueante comercial por su contenido generado por Shopify y parcialmente inglés.
4. El copyright usa traducción del tema; el nombre de la tienda Admin sigue siendo `Poco Co QA` hasta una decisión separada.
5. La activación del selector de idioma en el tema requiere despliegue remoto para verse; no se ha subido.

## Plan remoto mínimo y reversible

1. Aprobar la tabla de productos y ejecutar su actualización mediante API solo después de confirmar copy.
2. Crear/asignar la página “Sobre nosotros” y traducirla mediante Shopify nativo.
3. Subir únicamente los archivos de presentación aprobados a Dawn, sin tocar Horizon.
4. Verificar rutas `/`, `/en/`, footer, contacto y plantilla Sobre nosotros con contraseña activa.
5. Revertir por archivo usando el commit anterior si aparece una regresión.
