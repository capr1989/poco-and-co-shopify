# Poco & Co. — Fase 6A: auditoría presentation-ready

Fecha: 2026-11-04  
Rama: `phase6/presentation-ready`  
Alcance: lectura local del tema y consultas Shopify; sin cambios ni pruebas de navegador.

## Resumen ejecutivo

La tienda tiene una estructura visual coherente con Concepto A, pero todavía comunica explícitamente “QA/demo” en varios puntos. Para una presentación privada esto evita confundir sobre las ventas, pero hace que parezca un prototipo. El mayor riesgo de presentación es la combinación de nombres de productos `[PRUEBA FICTICIA]`, textos de portada/footer que dicen demostración y una política de privacidad generada por Shopify que permanece en inglés y contiene datos legales/comerciales que requieren revisión.

## Hallazgos P1 — corregir antes de mostrar

| Hallazgo | Evidencia | Clasificación | Recomendación |
|---|---|---|---|
| Marcadores de prueba visibles en todo el catálogo | Shopify API: los 8 productos activos usan títulos `[PRUEBA FICTICIA]`, vendor `Poco & Co. DEMO`, tags `FICTICIO/POCO-DEMO` y descripciones “Producto de prueba. No está a la venta…” | A/B — contenido de demostración | Para esta presentación, elegir entre mantener una franja discreta “Catálogo de demostración privada” o aprobar nombres comerciales provisionales sin inventar claims. No renombrar automáticamente. |
| Portada declara demostración en dos bloques | `theme/templates/index.json:37,45` contiene “Catálogo ficticio…” y “DEMOSTRACIÓN PRIVADA” | A/B | Sustituir por una sola nota discreta aprobada, o mantenerla si la prioridad es dejar claro que no hay venta. |
| Footer parece incompleto y repite Demo | `theme/sections/footer-group.json:12-19`: solo bloque “Poco & Co. · Demo”, newsletter/social/idioma/pagos desactivados y menú footer no configurado en el grupo | A/B/D | Reestructurar footer con marca, navegación, contacto aprobado, selector de idioma y políticas; ocultar newsletter/social/pagos hasta tener contenido real. |
| Política legal visible en inglés y con datos de QA | Shopify API: política `PRIVACY_POLICY` titulada en español, cuerpo mayormente inglés, “Last updated: November 3, 2026”, “Poco Co QA” y email personal | C — requiere aprobación legal | No editar automáticamente. Revisar identidad legal, contacto, jurisdicción, fecha y traducción antes de mostrar una página legal. |

## Hallazgos P2 — recomendables

| Hallazgo | Evidencia | Recomendación |
|---|---|---|
| Menú visible mezcla estructura de prueba y navegación final | Shopify API: `poco-demo-menu` usa Inicio, Departamentos, Ver todo; enlaces de departamentos son correctos pero el handle interno es demo | A/B | Mantener textos visibles actuales si se desea claridad; decidir nombre final del menú y si “Ver todo” debe llamarse “Catálogo”. |
| Footer solo ofrece “Search” en el menú nativo `footer` | Shopify API: menú `footer` contiene únicamente `/search` | B | Añadir enlaces solo después de aprobar páginas reales: Contacto, Sobre nosotros, Entregas, Cambios y políticas. |
| No hay página “About/Sobre nosotros” | Shopify API: solo existe la página publicada `Contact`, con cuerpo vacío; `page.contact.json` renderiza plantilla nativa y formulario | B | Crear contenido de marca únicamente con información aprobada; mientras tanto, ocultar el enlace si aparece o dejar Contacto como único punto de atención. |
| Selector de idioma no aparece en header/footer configurado | `theme/sections/header-group.json:settings` y `footer-group.json` tienen `enable_language_selector: false`; API sí confirma raíz `/` en español y `/en/` en inglés | B | Para la presentación, decidir si se muestra selector nativo; no añadir selector personalizado. |
| SEO visible incompleto | Shopify API devuelve `shop.description` vacío; `theme/layout/theme.liquid` solo emite description si `page_description` existe | B | Definir una meta descripción aprobada, sin promesas comerciales inventadas. Revisar títulos de portada, colección, producto y Contacto en navegador. |
| Colección nativa “Home page” convive con seis departamentos y “Explora Poco & Co.” | Shopify API devuelve ocho colecciones, incluyendo `frontpage` y seis demo | B | Confirmar qué colecciones deben ser visibles; no mostrar “Home page” si no forma parte de la arquitectura de marca. |

## Hallazgos P3 — pueden esperar

- Textos nativos de Dawn como “Search”, “Catalog”, “Contact”, “Subscribe to our emails” siguen presentes en menús/configuración aunque varias secciones están desactivadas. Normalizar cuando se defina la voz final bilingüe.
- Redes sociales están apagadas (`show_social: false`) y no hay URLs activas en la configuración visible. Esto evita enlazar accidentalmente cuentas de la pareja; mantener así hasta recibir autorización explícita.
- Métodos de pago están ocultos (`payment_enable: false`), apropiado para QA; no deben activarse para la presentación privada.
- No hay evidencia estática de Lorem ipsum, “coming soon” ni placeholders visibles activos. Los `placeholder_svg_tag` encontrados son rutas de fallback de Dawn, no contenido confirmado en el catálogo actual.

## Elementos que pueden corregirse automáticamente en 6B

Solo después de aprobación de contenido: consolidar la nota de demo en un único lugar, corregir títulos/configuración de footer, conectar el menú footer aprobado, activar el selector nativo de idioma y añadir meta descripción. Son cambios de configuración/contenido de bajo riesgo, pero afectan la presentación pública de texto.

## Decisiones que debe tomar el propietario

1. ¿La presentación debe conservar una marca visible de “demo privada” o usar nombres provisionales más comerciales?
2. Nombre y descripción pública de la marca, sin claims inventados.
3. Email, identidad legal, fecha y texto de privacidad/condiciones.
4. Existencia y contenido de “Sobre nosotros”, entregas, cambios y contacto.
5. Si se desea mostrar selector de idioma, newsletter, redes o métodos de pago.

## Propuesta de footer profesional

1. Columna de marca: logo, “En buena compañía” y una descripción aprobada.
2. Columna Explorar: Inicio, Departamentos, Catálogo.
3. Columna Ayuda: Contacto, Entregas, Cambios/Devoluciones (solo si existen políticas aprobadas).
4. Columna Legal: Privacidad, Términos y cookies, con textos revisados.
5. Franja inferior: selector nativo Español/English, copyright aprobado y nota de demo solo si se decide conservarla.
6. Redes, newsletter y pagos únicamente cuando existan cuentas, textos y operaciones aprobados.

## Plan mínimo de Etapa 6B

1. Recibir decisiones de contenido/legal anteriores.
2. Preparar un diff limitado a configuración y copy; no tocar JavaScript ni rendimiento.
3. Validar español e inglés de portada, footer, Contacto, colecciones, producto, búsqueda y carrito.
4. Revisar títulos/meta descripción y enlaces rotos mediante Shopify API y una sesión manual autorizada.
5. Presentar captura/lista de cambios para aprobación antes de subir o editar Shopify.

## Limitaciones

No se utilizó Computer Use, Cloud Browser ni navegador personal. La presencia exacta en píxeles, textos inyectados por `content_for_header`, footer renderizado, SEO final y enlaces visibles en sesión protegida requieren una comprobación manual posterior. No se modificó Shopify, ningún tema, producto, inventario, idioma, política ni cuenta social. T001/T002 permanecen al 0 %.
