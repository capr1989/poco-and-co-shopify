# POCO & CO. — FASE 3
## Integración Shopify, validación funcional y rendimiento móvil

### 1. CONTEXTO Y CONTINUIDAD

Continúa el proyecto existente:

https://github.com/capr1989/poco-and-co-shopify

Repositorio de identidad visual:

https://github.com/capr1989/poco-and-co-brand

Rama de trabajo anterior:

`phase2/theme-evaluation`

**No empieces desde cero. No crees un proyecto nuevo. No reemplaces el trabajo existente.**

En la Fase 2:

- Se compararon técnicamente Dawn y Horizon.
- Se recomendó Dawn 16.1.1 como base provisional.
- Se preparó el directorio `theme/` con Dawn.
- Se integró la identidad geométrica A de Poco & Co.
- Se incorporó la búsqueda visible.
- Se prepararon mensajes de disponibilidad y entrega mediante Liquid y metacampos.
- Se adaptó el carrito nativo para mostrar advertencias de entregas diferentes.
- Shopify CLI 5.0.0 fue preparado dentro del entorno de desarrollo.
- Theme Check reportó 0 errores y 9 advertencias en el tema adaptado.
- Pasaron seis pruebas locales.
- No se añadió JavaScript personalizado al tema.
- El análisis Lighthouse quedó bloqueado por falta de un navegador compatible.
- No se conectó una tienda Shopify.

El prototipo HTML original sigue siendo una referencia de experiencia visual.

### 2. DECISIÓN DE LOS FUNDADORES

**Aprobamos Dawn 16.1.1 como tema principal para continuar las pruebas y el desarrollo.**

Esta decisión no significa que Dawn haya ganado definitivamente en rendimiento.

Horizon permanecerá como alternativa para comparación si las mediciones posteriores muestran una ventaja material.

No es necesario desarrollar simultáneamente dos tiendas completas.

Prioriza Dawn y limita el trabajo en Horizon a pruebas comparativas justificadas.

### 3. OBJETIVO DE ESTA FASE

Queremos comprobar que la tienda pueda funcionar correctamente usando los mecanismos reales de Shopify.

Necesitamos validar:

1. Renderizado Liquid.
2. Productos y colecciones nativas.
3. Variantes e inventario.
4. Búsqueda.
5. Filtros.
6. Navegación móvil.
7. Carrito nativo.
8. Diferentes ventanas de entrega.
9. Personalización visual.
10. Rendimiento móvil.
11. Accesibilidad.
12. Facilidad de administración.

**No queremos desarrollar un segundo sistema de e-commerce.**

Shopify debe gestionar catálogo, inventario, carrito, pedidos y checkout.

### 4. SEGURIDAD Y ENTORNO

Mantén Docker y Dev Containers como entorno principal.

No instales Shopify CLI globalmente en Windows.

Conserva:

- Usuario sin privilegios elevados.
- Dependencias versionadas.
- Restricciones de acceso al host.
- Secretos fuera de Git.
- Sin acceso innecesario a archivos personales.
- Sin montaje del socket de Docker.
- Sin contenedores privilegiados.
- Puertos locales limitados.
- Control de versiones.
- Sin servicios pagados.

No deshabilites el sandbox de Chrome ni reduzcas los controles de seguridad de Docker para conseguir que Lighthouse funcione.

Si necesitas un entorno de navegador separado, propón una solución segura que conserve el aislamiento, como un contenedor o máquina virtual de pruebas apropiadamente restringidos.

No hagas cambios de seguridad en Windows sin aprobación.

### 5. CONEXIÓN CON SHOPIFY — CONTROL DE AUTORIZACIÓN

**Todavía no hay autorización para crear una tienda nueva ni conectarse a una existente.**

Primero determina qué necesitamos para trabajar con una tienda de desarrollo de Shopify.

Verifica la documentación oficial vigente y presenta:

- Tipo de tienda de desarrollo recomendado.
- Requisitos de cuenta.
- Si tiene costo.
- Limitaciones aplicables.
- Permisos necesarios.
- Método de autenticación.
- Comandos de Shopify CLI.
- Qué archivos se transferirían.
- Qué datos serían creados o modificados.
- Cómo garantizar que el tema permanezca sin publicar.

Si detectas una tienda Shopify existente en la computadora o configuración, no asumas que puedes utilizarla.

**Antes de conectarte, detente y solicita mi autorización expresa indicando el dominio exacto y los comandos que ejecutarías.**

No realices autenticaciones externas, cargas de temas ni creaciones de tiendas por iniciativa propia.

Mientras esperas esa aprobación, continúa con todas las pruebas locales independientes.

### 6. PREPARACIÓN DEL TEMA DAWN

Trabaja con la versión de Dawn registrada en `theme/upstream.json`.

Comprueba que:

- Todos los archivos del tema estén presentes.
- La estructura sea compatible con Shopify.
- Las personalizaciones se mantengan separadas y documentadas.
- Los assets de Poco & Co. sean los originales.
- El favicon sea la versión corregida.
- La búsqueda visible utilice Shopify.
- Los menús y colecciones sean editables desde Shopify Admin.
- El carrito conserve los mecanismos nativos.
- Las traducciones funcionen en español.
- Los cambios puedan mantenerse durante futuras actualizaciones de Dawn.

No modifiques archivos nativos sin necesidad.

Prioriza configuración y Liquid antes de agregar JavaScript.

### 7. DATOS FICTICIOS PARA PRUEBAS

Prepara un conjunto reproducible de ocho productos ficticios.

Incluye:

- Joyería.
- Hogar.
- Tecnología.
- Accesorios de automóvil.
- Mascotas.
- Viajes.

Contempla:

- Productos disponibles.
- Producto agotado.
- Producto con variantes.
- Producto con entrega local.
- Producto con entrega externa.
- Producto con información de entrega pendiente.
- Producto con verificación de entrega vencida.
- Carrito con productos de ventanas distintas.

Todos los precios, disponibilidades, plazos e imágenes deben estar claramente identificados como datos ficticios.

Prepara los datos para importación o configuración posterior, pero no los cargues a Shopify sin autorización.

No crees clientes ni pedidos reales.

### 8. DISPONIBILIDAD Y ENTREGAS

Revisa los metacampos propuestos:

- `custom.delivery_group`
- `custom.delivery_message`
- `custom.delivery_verified`
- `custom.delivery_verified_at`
- `custom.delivery_valid_until`

Verifica los tipos de datos de Shopify y su uso correcto en Liquid.

Comprueba los siguientes casos:

1. Información válida y vigente.
2. Información no verificada.
3. Fecha de validez vencida.
4. Diferentes plazos dentro del carrito.
5. Mismo grupo logístico con plazos diferentes.
6. Producto con variantes.
7. Cambio de cantidades.
8. Eliminación de productos.
9. Actualización de secciones del carrito.

**Requisito importante:** mostrar una advertencia no equivale a impedir una compra.

Diseña un control operativo para evitar que productos sin condiciones de disponibilidad y entrega verificadas se publiquen o queden disponibles para comprar.

Prioriza controles nativos de publicación e inventario y procedimientos administrativos simples.

No afirmes que un snippet Liquid bloquea el checkout.

No desarrolles checkout personalizado.

### 9. RENDIMIENTO — PRIORIDAD CRÍTICA

La tienda debe ser extremadamente rápida en móviles.

Objetivos:

- LCP ≤ 2.5 segundos.
- INP ≤ 200 ms.
- CLS ≤ 0.1.
- Lighthouse móvil ≥ 90 como objetivo de laboratorio.

No declares estos objetivos como alcanzados sin pruebas.

Primero resuelve la infraestructura necesaria para medir rendimiento, sin debilitar la seguridad.

Después ejecuta las pruebas válidas que permita el entorno.

Al disponer de una tienda de desarrollo autorizada, mide:

- Página principal.
- Colecciones.
- Búsqueda.
- Producto con variantes.
- Producto agotado.
- Carrito.

Registra:

- Lighthouse Performance.
- LCP.
- CLS.
- TBT.
- Recursos transferidos.
- Tamaño de JS/CSS.
- Solicitudes de red.
- Scripts de terceros.
- Imágenes problemáticas.
- Bloqueos de renderizado.

No presentes TBT como si fuera INP real.

Distingue laboratorio de métricas de usuarios reales.

Realiza al menos tres mediciones comparables por escenario cuando sea viable.

No sacrifiques accesibilidad o funcionalidades esenciales para mejorar artificialmente una puntuación.

### 10. EXPERIENCIA CERO FRICCIÓN

La tienda debe permitir que una persona sin conocimientos tecnológicos pueda encontrar un producto y comprender cómo comprarlo.

Valida:

- Búsqueda fácilmente visible.
- Navegación clara.
- Filtros comprensibles.
- Departamentos sin páginas vacías.
- Precios visibles.
- Disponibilidad correcta.
- Variantes fáciles de elegir.
- Botones claramente identificados.
- Carrito sencillo.
- Diferentes plazos comunicados sin confusión.
- Mensajes de error comprensibles.
- Navegación móvil fluida.

Prioriza una página principal con búsqueda y catálogo, evitando banners gigantes y efectos innecesarios.

### 11. ACCESIBILIDAD

Utiliza WCAG 2.2 AA como referencia de evaluación.

Prueba cuando el entorno lo permita:

- Navegación por teclado.
- Estados de foco.
- Contraste.
- Etiquetas de formularios.
- Lectores de pantalla.
- Diálogos.
- Menú móvil.
- Mensajes de cambios en carrito.
- Selección de variantes.
- Estados de error.

Documenta las pruebas automáticas y las que requieren revisión humana.

### 12. EXPERIENCIA ADMINISTRATIVA

La tienda debe poder administrarse sin programar.

Verifica que Shopify Admin y el editor del tema permitan:

- Agregar productos.
- Editar precios.
- Subir fotografías.
- Gestionar variantes.
- Ajustar inventario.
- Modificar departamentos.
- Cambiar textos comerciales.
- Actualizar plazos de entrega.
- Publicar y ocultar productos.

Evita construir un panel propio.

Documenta cualquier paso que todavía requiera un desarrollador.

### 13. HORIZON COMO ALTERNATIVA

No descartes Horizon definitivamente.

Mantén una matriz comparativa de Dawn y Horizon con:

- Funcionalidades.
- Complejidad.
- Código personalizado.
- Accesibilidad.
- Mantenimiento.
- Rendimiento medido cuando exista evidencia.

Si Dawn cumple adecuadamente todos los requisitos, no dediques recursos a recrear por completo la tienda en Horizon.

Solo recomienda cambiar de base si existe una ventaja material demostrable.

### 14. ENTREGABLES

Actualiza el repositorio con:

**A. `docs/phase3-readiness.md`**

Resumen de qué está preparado para conectarse a Shopify y qué sigue bloqueado.

**B. `docs/shopify-connection-plan.md`**

Plan de conexión con dominio, permisos y comandos pendientes de aprobación.

**C. `docs/functional-test-plan.md`**

Matriz de escenarios de prueba con resultados verificables y pendientes.

**D. `docs/performance-results.md`**

Resultados reales, ambiente de medición y limitaciones.

**E. `docs/admin-setup-guide.md`**

Procedimiento previsto para configurar catálogo, menús, filtros y metacampos.

**F. `docs/operations-controls.md`**

Controles para no vender productos con información comercial no verificada.

**G. `docs/backlog.md`**

Actualiza el progreso de la Fase 3 sin modificar T001/T002.

Mantén las evidencias técnicas en archivos versionados, cuando sea adecuado y sin incluir secretos.

### 15. FORMA DE TRABAJO

Trabaja en una nueva rama:

`phase3/shopify-validation`

Parte de `phase2/theme-evaluation` y conserva todos sus cambios.

No elimines el prototipo original.

No hagas merge a `main` sin autorización.

No uses force push.

Puedes avanzar con análisis, preparación de archivos y pruebas locales dentro del entorno autorizado.

No debes detener todo el trabajo por una operación que necesite autorización externa. Continúa con lo que pueda hacerse localmente.

### 16. RESULTADO ESPERADO

Al finalizar esta etapa quiero conocer:

1. Si Dawn está preparado para ejecutarse sobre Shopify.
2. Qué funcionalidades nativas ya están integradas.
3. Qué pruebas locales pasaron.
4. Qué pruebas requieren Shopify.
5. Qué problemas técnicos o de seguridad quedan.
6. Qué rendimiento hemos podido medir realmente.
7. Qué necesitamos configurar en Shopify Admin.
8. Qué datos comerciales siguen pendientes.
9. Qué autorizaciones necesitas para las siguientes pruebas.
10. Si Dawn sigue siendo la mejor alternativa.

**No publiques ninguna tienda ni autorices gastos por tu cuenta.**

Mantén T001 y T002 oficialmente pendientes al 0 %.

### INSTRUCCIÓN FINAL

Comienza creando la rama de Fase 3 desde la rama de Fase 2.

Prepara la infraestructura de pruebas, revisa Dawn y ejecuta todo el trabajo local posible.

Cuando llegues al punto de necesitar una tienda Shopify de desarrollo, presenta un resumen con el dominio, acceso solicitado y comandos exactos.

**Detente únicamente antes de la conexión externa no autorizada. No interrumpas las tareas locales independientes.**

Al terminar, sube los cambios de la rama a GitHub, después de revisar que no haya secretos. No hagas merge.

Entrégame el enlace de la rama, el último commit, resultados y el siguiente paso recomendado.