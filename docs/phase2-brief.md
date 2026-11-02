# POCO & CO. — FASE 2
## Evaluación de temas Shopify y preparación del desarrollo real

### CONTEXTO

Continúa trabajando en el proyecto existente:

https://github.com/capr1989/poco-and-co-shopify

Repositorio de identidad visual:

https://github.com/capr1989/poco-and-co-brand

**No crees otro proyecto ni empieces desde cero.**

El proyecto actual ya contiene:

- Un prototipo funcional en HTML, CSS y JavaScript.
- Un entorno Docker con Node.js.
- Configuración Dev Containers.
- Ocho productos ficticios.
- Búsqueda, filtros y variantes.
- Carrito simulado con diferentes ventanas de entrega.
- Identidad geométrica A de Poco & Co.
- Favicon corregido.
- Documentación de arquitectura, seguridad y rendimiento.

El prototipo es una herramienta de referencia visual, no una tienda Shopify conectada.

El objetivo ahora es avanzar hacia una implementación basada en **un tema Shopify nativo**, sin duplicar las funcionalidades que Shopify ya proporciona.

---

# 1. OBJETIVO PRINCIPAL

Quiero que compares técnicamente los temas oficiales **Dawn y Horizon**, determines cuál satisface mejor nuestros requisitos y prepares el desarrollo real de Poco & Co. sobre una base Shopify adecuada.

La decisión debe fundamentarse en:

1. Rendimiento móvil.
2. Experiencia de compra de cero fricción.
3. Compatibilidad con Shopify Basic.
4. Facilidad de administración.
5. Mínimo código personalizado.
6. Accesibilidad.
7. Facilidad de mantenimiento y actualizaciones.
8. Compatibilidad con la identidad geométrica A.
9. Capacidades nativas de búsqueda, filtros, variantes y carrito.
10. Compatibilidad con productos que tienen diferentes plazos de entrega.

**La velocidad es prioritaria, pero no a costa de eliminar funcionalidades necesarias.**

---

# 2. INVESTIGACIÓN Y COMPARACIÓN DE TEMAS

Investiga los repositorios oficiales:

Dawn:
https://github.com/Shopify/dawn

Horizon:
https://github.com/Shopify/horizon

Verifica las versiones disponibles y selecciona versiones o commits específicos y reproducibles.

No ejecutes scripts externos sin revisarlos.

### Analiza

- Estructura Liquid.
- Secciones y bloques.
- Configuración del editor visual.
- Componentes reutilizables.
- Búsqueda predictiva.
- Filtros de productos.
- Navegación móvil.
- Fichas de producto.
- Selección de variantes.
- Carrito.
- Accesibilidad.
- JavaScript.
- CSS.
- Dependencias.
- Peso de recursos.
- Mantenimiento.
- Compatibilidad con futuras actualizaciones.

Documenta cuáles funcionalidades existen de forma nativa y cuáles necesitarían personalizaciones.

### Comparación de rendimiento

No inventes resultados Lighthouse.

Prepara una metodología reproducible usando:

- Los mismos productos.
- Las mismas imágenes.
- El mismo idioma y moneda.
- Las mismas secciones.
- Las mismas fuentes.
- Los mismos componentes equivalentes.
- Configuraciones comparables.

Si no es posible realizar una comparación justa sin una tienda Shopify de desarrollo, realiza el análisis estático disponible y documenta qué pruebas requieren autorización.

No utilices las demostraciones públicas de cada tema como si fueran entornos equivalentes.

---

# 3. IDENTIDAD VISUAL

La identidad seleccionada es:

**Propuesta A — En buena compañía.**

Utiliza los assets originales:

https://github.com/capr1989/poco-and-co-brand

Consulta:

- `concepts/concept-a/brand-guide.md`
- `concepts/concept-a/logo-horizontal.svg`
- `concepts/concept-a/logo-primary.svg`
- `concepts/concept-a/favicon.svg`
- `design-tokens/concept-a.json`

Conserva los colores, tipografía Manrope y lenguaje geométrico.

El favicon ya fue corregido para mantener coherencia con el azul principal.

No rediseñes los logotipos.

No modifiques el repositorio de branding.

---

# 4. DESARROLLO SHOPIFY NATIVO

No quiero que construyas una plataforma de comercio electrónico desde cero.

Shopify será responsable de:

- Productos.
- Colecciones.
- Inventario.
- Variantes.
- Pedidos.
- Descuentos.
- Checkout.
- Administración.
- Configuración de pagos y envíos.

Codex debe desarrollar principalmente:

- Adaptación de identidad visual.
- Configuración de navegación.
- Personalización de secciones.
- Fichas de producto cuando haga falta.
- Presentación de disponibilidad.
- Información clara sobre entregas.
- Experiencia del carrito.
- Adaptaciones móviles necesarias.
- Mejoras justificadas de rendimiento y accesibilidad.

**Prioriza Shopify nativo antes que Liquid personalizado y Liquid antes que JavaScript innecesario.**

No desarrolles un backend propio.

No utilices Hydrogen, Next.js ni una arquitectura headless sin una justificación extraordinaria.

---

# 5. EXPERIENCIA DE COMPRA

La tienda debe ser apta para personas con muy poca experiencia tecnológica.

### Inicio

- Logo visible.
- Búsqueda protagonista.
- Categorías fáciles de reconocer.
- Productos destacados.
- Información clara.
- Navegación sencilla.
- Sin banners gigantes ni animaciones innecesarias.

### Catálogo

- Departamentos intuitivos.
- Filtros por precio y disponibilidad.
- Imágenes optimizadas.
- Precios visibles.
- Solo departamentos con productos publicados.

### Producto

- Nombre.
- Fotos.
- Precio.
- Variantes.
- Stock o disponibilidad verificada.
- Plazo estimado sustentado.
- Condiciones relevantes.
- Agregar al carrito fácilmente.

### Carrito

Mostrar claramente si los productos tienen diferentes ventanas de entrega.

No prometer una única fecha ficticia para pedidos mixtos.

El flujo comercial final debe utilizar el carrito nativo de Shopify.

No construir un segundo motor de carrito en JavaScript.

### Lenguaje comercial

No utilices la palabra «dropshipping» en la presentación al comprador.

Explica condiciones de disponibilidad y entrega de forma transparente.

---

# 6. RENDIMIENTO — REQUISITO CRÍTICO

Prioriza Core Web Vitals:

- LCP ≤ 2.5 segundos.
- INP ≤ 200 ms.
- CLS ≤ 0.1.
- Lighthouse móvil ≥ 90 como objetivo de laboratorio.

Estos objetivos deberán medirse en condiciones reproducibles. No los presentes como resultados obtenidos.

### Reglas

- Mínimo JavaScript propio.
- No instalar frameworks innecesarios.
- Usar imágenes responsivas.
- No hacer lazy loading de la imagen LCP.
- Carga diferida para imágenes fuera de pantalla.
- Evitar scripts de terceros innecesarios.
- Limitar fuentes.
- Reservar dimensiones de imágenes.
- Evitar cambios bruscos de layout.
- Mantener navegación, búsqueda y carrito fluidos.
- No sacrificar usabilidad por puntuaciones artificiales.

Documenta un presupuesto de rendimiento para JS, CSS, imágenes, fuentes y transferencias.

Mantén los objetivos registrados en `docs/performance.md`.

---

# 7. ENTORNO DOCKER

Conserva el entorno existente.

No instales Shopify CLI globalmente en Windows.

Cuando se justifique, añade Shopify CLI al contenedor utilizando una versión específica y compatible.

Utiliza el enfoque de menor privilegio.

Mantén:

- Usuario no root cuando sea posible.
- Puertos locales limitados.
- Sin acceso al socket Docker.
- Sin contenedor privilegiado.
- Sin montar directorios personales.
- Credenciales excluidas de Git.
- Dependencias verificadas.
- Control de versiones.

No desactives controles de seguridad solamente para facilitar el desarrollo.

Si una función de Shopify CLI requiere acceso a Internet o autenticación, documenta exactamente para qué y solicita aprobación antes de conectarte a una tienda Shopify.

---

# 8. TRABAJO LOCAL AUTORIZADO

Puedes realizar las siguientes acciones dentro del repositorio existente:

1. Descargar código público de Dawn y Horizon para análisis, sin ejecutar automáticamente scripts de terceros.
2. Inspeccionar su arquitectura.
3. Preparar pruebas estáticas.
4. Crear documentación comparativa.
5. Preparar estructura de tema Shopify.
6. Integrar los assets de branding en una rama local de desarrollo.
7. Configurar herramientas de validación.
8. Crear pruebas automatizadas locales.
9. Ejecutar verificaciones de código.
10. Preparar una demostración local de las decisiones visuales.

**No reemplaces automáticamente el prototipo actual.**

Consérvalo como referencia hasta que exista una alternativa Shopify equivalente y validada.

No presentes un archivo HTML simulado como evidencia de que Liquid, Shopify Admin o el checkout funcionan realmente.

---

# 9. QUÉ NO ESTÁ AUTORIZADO

No debes:

- Contratar Shopify.
- Crear una tienda comercial.
- Publicar un tema.
- Conectar sistemas de pago.
- Subir productos reales.
- Crear pedidos reales.
- Comprar dominios.
- Registrar la marca.
- Contratar servicios.
- Instalar aplicaciones pagadas.
- Abrir túneles públicos.
- Modificar el repositorio de branding.
- Desplegar código en producción.
- Usar credenciales comerciales sin autorización.

No conectes el tema con una tienda de desarrollo sin presentarme primero qué acceso necesitas y qué acciones realizarás.

---

# 10. ENTREGABLES

### A. Comparación Dawn vs. Horizon

Archivo:

`docs/theme-comparison.md`

Incluye:

- Versiones examinadas.
- Arquitectura.
- Funcionalidades.
- Resultados verificables.
- Ventajas.
- Limitaciones.
- Personalizaciones necesarias.
- Riesgos de mantenimiento.
- Recomendación técnica fundamentada.

### B. Plan de implementación

Archivo:

`docs/shopify-implementation-plan.md`

Incluye:

- Tema recomendado.
- Estructura de archivos.
- Secciones necesarias.
- Configuración de Shopify.
- Modelo de metacampos para disponibilidad y entregas.
- Funcionalidades nativas reutilizadas.
- Código que sería necesario desarrollar.
- Trabajo que depende de Shopify Admin.
- Riesgos.
- Dependencias.
- Orden de implementación.

### C. Entorno técnico

Prepara Shopify CLI y las herramientas de análisis dentro de Docker cuando sea seguro y útil.

Documenta comandos exactos, versiones y resultados.

### D. QA

Incluye:

- Theme Check cuando exista un tema válido.
- Validación de Liquid.
- Auditorías de accesibilidad posibles.
- Pruebas de rendimiento que el entorno permita ejecutar.
- Registro explícito de pruebas bloqueadas.

### E. Backlog actualizado

Actualiza `docs/backlog.md`.

Conserva las tareas existentes y su historial.

No marques pruebas como aprobadas si no se ejecutaron realmente.

---

# 11. ORDEN DE EJECUCIÓN

Trabaja en este orden:

**Paso 1:** inspecciona el repositorio actual y confirma su estado.

**Paso 2:** identifica versiones estables de Dawn y Horizon.

**Paso 3:** analiza las diferencias de arquitectura y funcionalidades.

**Paso 4:** determina cuál requiere menos personalizaciones para nuestros requisitos.

**Paso 5:** prepara la estrategia de integración de la identidad A.

**Paso 6:** configura las herramientas de desarrollo y validación necesarias dentro de Docker.

**Paso 7:** prepara un tema local basado en el candidato técnicamente preferido, en una rama separada, sin conexiones remotas con Shopify.

**Paso 8:** ejecuta las verificaciones locales posibles.

**Paso 9:** documenta las pruebas que requieren una tienda de desarrollo autorizada.

**Paso 10:** presenta la recomendación y las decisiones pendientes.

No elijas automáticamente una alternativa definitiva por una diferencia pequeña o poco confiable.

---

# 12. CRITERIOS DE ACEPTACIÓN

Esta fase estará lista para revisión cuando pueda:

- Identificar qué tema se recomienda y por qué.
- Entender qué funcionalidades serán nativas de Shopify.
- Ver qué código personalizado sería necesario.
- Revisar cómo se aplicará la identidad A.
- Confirmar que el entorno Docker sigue protegido.
- Revisar resultados técnicos reales.
- Identificar qué pruebas necesitan Shopify.
- Conocer las tareas siguientes antes de conectar una tienda.

No necesito una tienda publicada al finalizar esta fase.

Necesito una **base Shopify técnicamente sólida, rápida y mantenible**, preparada para pasar a pruebas reales cuando autoricemos la conexión.

---

# 13. CONTINUIDAD Y CONTROL

Trabaja sobre:

https://github.com/capr1989/poco-and-co-shopify

Conserva commits y documentación existente.

Usa una rama de trabajo para los cambios importantes. No sobrescribas trabajo previo.

No hagas force push.

No publiques una tienda.

No cambies T001/T002; ambas siguen PENDIENTES, 0 %.

Al finalizar, informa:

1. Rama utilizada.
2. Commit.
3. Tema recomendado.
4. Archivos modificados.
5. Pruebas ejecutadas.
6. Pruebas pendientes.
7. Riesgos.
8. Próxima autorización necesaria.

**Comienza con la auditoría de Dawn y Horizon y prepara el entorno técnico. Aprovecha el proyecto existente y evita programar funcionalidades comerciales duplicadas.**