# PROYECTO 02 — POCO & CO.
## Desarrollo de tienda Shopify Panamá
### Brief maestro para Codex — Arquitectura, UX, desarrollo, operaciones y seguridad

## 0. TU ROL Y MISIÓN

Actúa como un equipo de ingeniería y comercio electrónico integrado por:

- Arquitecto senior de Shopify.
- Desarrollador Shopify Liquid, HTML, CSS y JavaScript.
- Especialista en UX/UI mobile-first.
- Ingeniero de DevOps y seguridad de desarrollo.
- Analista de operaciones de e-commerce.
- Especialista en QA, accesibilidad y rendimiento web.
- Analista de costos e integraciones de Shopify.

Tu misión es preparar y desarrollar progresivamente la tienda online **Poco & Co.**, una tienda multidepartamento orientada inicialmente al mercado panameño.

Debes respetar el contexto completo de este documento. No cambies decisiones de negocio sin autorización.

**OBJETIVO PRINCIPAL:** construir una experiencia de compra extremadamente sencilla, moderna, rápida y confiable, aprovechando al máximo las funcionalidades nativas de Shopify Basic.

No quiero una aplicación de comercio electrónico desarrollada desde cero.

Quiero una tienda Shopify real, mantenible y económicamente razonable.

### Estado y autorizaciones

El desarrollo de un repositorio local, un entorno Docker, prototipos y pruebas técnicas locales está autorizado por este encargo.

NO está autorizado:

- Crear o activar una tienda comercial real.
- Publicar un tema o storefront.
- Contratar Shopify ni otros servicios.
- Integrar pagos reales.
- Comprar dominios.
- Registrar marcas.
- Crear cuentas externas.
- Instalar aplicaciones pagadas.
- Consumir APIs pagadas.
- Desplegar servicios públicos.
- Modificar repositorios que no sean los autorizados.
- Ejecutar acciones irreversibles sin aprobación.

Cualquier prueba que requiera una cuenta, autenticación, conexión con Shopify o interacción con un servicio externo deberá distinguirse claramente y solicitar autorización cuando corresponda.

**Las tareas T001 y T002 deben permanecer oficialmente PENDIENTES, al 0 %.** No actualices sus estados automáticamente.

---

# 1. CONTEXTO DE LA EMPRESA

## 1.1 Identidad comercial

Nombre provisional:

**Poco & Co.**

Mercado inicial: Panamá.

Moneda de trabajo: USD.

Modelo: tienda online multidepartamento.

Público: compradores de diferentes géneros, edades, intereses y perfiles.

La marca debe ser comercialmente neutral. No debe parecer una boutique femenina, una joyería exclusiva ni una tienda de un único nicho.

## 1.2 Filosofía

Nuestra prioridad absoluta es:

**CERO FRICCIÓN PARA EL COMPRADOR Y OPERACIÓN SENCILLA PARA LOS ADMINISTRADORES.**

Esto significa que una persona con poca experiencia tecnológica debe poder:

1. Encontrar el producto que necesita.
2. Navegar departamentos.
3. Filtrar resultados.
4. Entender precio y disponibilidad.
5. Comprender cuándo recibirá el producto.
6. Agregarlo al carrito.
7. Entender cómo pagar y qué sucederá después.

Sin instrucciones, interfaces confusas ni pasos innecesarios.

No confundas simplicidad visual con falta de funcionalidades.

Se permite implementar características sofisticadas siempre que el usuario perciba una experiencia sencilla.

## 1.3 Los fundadores

El proyecto es desarrollado por una pareja.

Una persona tiene experiencia fuerte en desarrollo de software, datos, automatización e integraciones.

La otra tiene experiencia en ventas, gestión comercial, retail, Shopify, redes sociales, atención al cliente y operaciones de pedidos.

La plataforma debe ser cómoda tanto para una persona técnica como para una administradora que no programa.

No queremos un sistema donde actualizar precios o productos requiera modificar código.

---

# 2. IDENTIDAD VISUAL: REPOSITORIO YA EXISTENTE

## 2.1 Fuente oficial de branding

Repositorio:

https://github.com/capr1989/poco-and-co-brand

Este proyecto fue desarrollado separadamente por Codex y contiene tres propuestas de identidad visual.

**La propuesta seleccionada para continuar es:**

**CONCEPT A — “EN BUENA COMPAÑÍA”**

Identidad geométrica y contemporánea.

No vuelvas a generar logotipos desde cero.

No sustituyas los logos existentes por imágenes generadas con IA.

Debes utilizar los activos originales y sus guías.

## 2.2 Archivos importantes

Examina especialmente:

- `README.md`
- `concepts/concept-a/`
- `concepts/concept-a/brand-guide.md`
- `concepts/concept-a/logo-primary.svg`
- `concepts/concept-a/logo-horizontal.svg`
- `concepts/concept-a/logo-compact.svg`
- `concepts/concept-a/logo-light.svg`
- `concepts/concept-a/logo-dark.svg`
- `concepts/concept-a/favicon.svg`
- `concepts/concept-a/exports/`
- `design-tokens/concept-a.json`
- `assets/fonts/`
- `comparison/evaluation.md`
- `qa/report.md`

## 2.3 Paleta de identidad A

Según la guía de marca:

- Tinta principal: `#192C46`
- Fondo claro: `#F1F4F2`
- Acento: `#2855D9`
- Superficie secundaria: `#B8CEC7`
- Blanco: `#FFFFFF`

La tipografía de interfaz es **Manrope**. El lettering del logo es un diseño geométrico propio.

Debes consultar el repositorio original antes de aplicar estos valores. Si un archivo actualizado contradice este resumen, documenta la diferencia.

## 2.4 Favicon pendiente

Se solicitó ajustar el favicon para que su azul de fondo coincida visualmente con el fondo del logo principal.

El proyecto de branding es responsable de realizar ese ajuste.

Utiliza la versión más reciente verificada. Si todavía no está actualizada, documenta el pendiente sin modificar por tu cuenta el diseño maestro.

## 2.5 Integración entre proyectos

Mantén dos repositorios independientes:

**Proyecto 01:** branding.

**Proyecto 02:** tienda Shopify.

El repositorio de branding debe funcionar como fuente de activos.

Puedes:

- Clonarlo como dependencia o referencia de solo lectura.
- Copiar a la web los activos necesarios mediante un procedimiento reproducible.
- Crear un manifiesto con rutas y versiones utilizadas.
- Preparar un mecanismo de sincronización controlado.

No debes modificar el repositorio de branding desde el proyecto web.

No dependas de imágenes remotas del repositorio para el storefront final. Los activos aprobados deberán incorporarse a los recursos del tema Shopify.

La selección de identidad A es una decisión de diseño para continuar. El nombre Poco & Co. todavía requiere validación legal antes del lanzamiento.

---

# 3. SEGURIDAD Y AISLAMIENTO DEL DESARROLLO

## 3.1 Requisito prioritario

**Quiero desarrollar este proyecto en contenedores para limitar modificaciones a mi computadora Windows 11.**

Entorno previsto:

- Windows 11.
- Visual Studio Code.
- Git.
- Docker Desktop.
- WSL 2.
- VS Code Dev Containers.
- GitHub.
- Shopify CLI.

Primero verifica qué herramientas están disponibles. No instales componentes en Windows automáticamente.

El objetivo es mantener la mayor parte de las dependencias dentro de contenedores reproducibles.

## 3.2 Arquitectura solicitada

Diseña un entorno de desarrollo basado en:

- `Dockerfile`
- `.devcontainer/devcontainer.json`
- `compose.yaml`, solo si aporta valor.
- `.dockerignore`
- `.gitignore`
- Scripts reproducibles de preparación y validación.
- Documentación de instalación y recuperación del entorno.

Usa imágenes oficiales o fuentes verificables, con versiones fijadas de forma razonable.

Node.js, npm, Shopify CLI y las herramientas auxiliares deben ejecutarse principalmente dentro del contenedor.

Evita instalar dependencias globales en Windows.

## 3.3 Restricciones de seguridad

Aplica las siguientes medidas cuando sean técnicamente compatibles:

1. Ejecutar procesos con usuario sin privilegios de root.
2. No utilizar `privileged: true`.
3. No montar `/var/run/docker.sock` dentro del contenedor.
4. No montar el disco completo de Windows.
5. No montar carpetas personales fuera del proyecto.
6. No montar directorios de credenciales del sistema.
7. Mantener los assets de branding como referencia de solo lectura.
8. Exponer únicamente puertos de desarrollo necesarios, ligados preferentemente a `127.0.0.1`.
9. No usar red del host salvo necesidad justificada.
10. No guardar secretos en código, Git, logs o imágenes.
11. Mantener credenciales en mecanismos apropiados de secretos o variables locales excluidas de Git.
12. No ejecutar scripts descargados de Internet sin revisarlos.
13. No habilitar acceso remoto al entorno de desarrollo.
14. Limitar CPU y memoria cuando convenga.
15. Documentar qué acceso a red necesita cada herramienta.
16. Evitar configuraciones que degraden la seguridad solo para simplificar la instalación.

No prometas aislamiento absoluto. Documenta los límites de Docker y WSL.

Para código no confiable, propón una máquina virtual separada antes de ejecutar cargas de alto riesgo.

## 3.4 Ubicación del código

Prefiere almacenar el proyecto dentro del sistema de archivos Linux de WSL 2 para reducir problemas de rendimiento y seguimiento de cambios.

No utilices como ruta principal un montaje general de `C:\Users`.

El proyecto debe poder abrirse en VS Code mediante Dev Containers.

## 3.5 Dependencias

No instales paquetes innecesarios.

No utilices `latest` indiscriminadamente.

Mantén archivos de bloqueo de dependencias.

Revisa advertencias de seguridad relevantes antes de ejecutar paquetes o scripts nuevos.

No ejecutes comandos destructivos ni modifiques configuraciones de Windows sin aprobación.

## 3.6 Resultado esperado del entorno

Quiero poder:

- Abrir el proyecto en VS Code.
- Entrar al contenedor.
- Ejecutar comandos de desarrollo y pruebas.
- Ver un prototipo local.
- Detener el contenedor.
- Reiniciarlo sin reinstalar todo.
- Reconstruir el entorno desde los archivos versionados.
- Trabajar sin contaminar mi sistema principal con dependencias innecesarias.

Documenta paso a paso el procedimiento para Windows 11.

---

# 4. PLATAFORMA: SHOPIFY BASIC

Shopify Basic es nuestro plan inicial preferido.

No propongas Shopify Plus, Grow, Advanced ni una arquitectura headless como solución predeterminada.

Primero investiga las capacidades actuales y limitaciones del plan.

Preferimos aprovechar:

- Catálogo nativo.
- Productos y variantes.
- Colecciones.
- Inventario.
- Descuentos.
- Pedidos.
- Draft Orders cuando corresponda.
- Páginas y políticas.
- Funciones nativas de búsqueda y filtrado.
- Metacampos y metaobjetos cuando justifiquen su uso.
- Configuración de envío.
- Métodos de pago compatibles.
- Notificaciones.
- Editor visual del tema.

Prioriza Shopify Search & Discovery para filtros y configuración de búsqueda cuando sea adecuado.

No construyas un backend propio si Shopify ya cubre la necesidad.

No crees bases de datos externas por costumbre.

No desarrolles un checkout personalizado. Respeta los límites del plan.

No utilices servicios externos o aplicaciones pagadas salvo que se demuestre una necesidad concreta y aprobada.

Verifica los precios y condiciones vigentes para Panamá antes de proponer gastos.

---

# 5. MODELO COMERCIAL

## 5.1 Tienda departamental

Desde el principio la tienda debe sentirse multidepartamento, aunque el catálogo se publique gradualmente.

Categorías consideradas:

- Joyería y accesorios.
- Organización y hogar.
- Tecnología y gadgets.
- Accesorios de automóvil.
- Accesorios para mascotas.
- Viajes y movilidad.
- Regalos y productos cotidianos.

No debes crear una categoría visible si no tiene productos publicados.

Catálogo inicial objetivo: aproximadamente 20 a 50 productos, sujeto a disponibilidad y validación.

No inventes SKUs reales, costos de compra ni proveedores confirmados.

## 5.2 Línea inicial A: joyería física existente

Una de las socias dispone de joyería física que podría incorporarse al negocio.

No asumimos que se necesita capital nuevo para adquirir esas piezas.

Sin embargo, cada producto tiene un costo económico que debe registrarse.

Todavía falta definir:

- Inventario exacto.
- Costos por pieza.
- Acuerdo entre socios.
- Liquidaciones.
- Reparto de resultados.
- Reposición de mercancía.

No inventes esas cifras ni solicites un inventario detallado para comenzar el desarrollo técnico.

Utiliza datos ficticios explícitamente etiquetados para las pruebas.

## 5.3 Línea inicial B: productos externos validados

También queremos ofrecer productos suministrados por terceros, incluyendo dropshipping cuando resulte viable.

Requisitos:

- Proveedor verificado.
- Precio actualizado.
- Disponibilidad confirmada.
- Envío a Panamá.
- Costo total razonable.
- Plazo estimado sustentado.
- Política de incidencias.
- Margen potencial positivo.

No publiques productos cuya disponibilidad y entrega no estén sustentadas.

**El término “dropshipping” es interno y no debe aparecer en la experiencia del comprador.**

El cliente debe comprender disponibilidad, precio, condiciones y tiempo de entrega.

No ocultes información material sobre plazos u origen cuando afecte su decisión de compra.

## 5.4 Modalidades futuras

El sistema debe poder ampliarse para incorporar:

1. Productos bajo pedido publicados.
2. Productos no listados solicitados por clientes.
3. Búsqueda y cotización personalizada.
4. Compras especiales por volumen.
5. Campañas periódicas de importación agrupada.

Estas modalidades NO forman parte obligatoria del MVP.

No desarrolles sistemas complejos de preventa o agrupación de pedidos antes de que sean aprobados.

### Campañas por lotes

Concepto futuro:

- Recibir pedidos durante una ventana determinada.
- Agrupar compras para reducir costos de importación.
- Trasladar parte del ahorro al cliente.
- Establecer una cantidad mínima cuando corresponda.
- Informar fecha de cierre.
- Comunicar fechas estimadas realistas.
- Verificar pago y disponibilidad.
- Si no se alcanza el mínimo, ofrecer reembolso o reprogramación con aceptación expresa.

No activar esta funcionalidad en el lanzamiento sin autorización.

**Las campañas de compra por lotes no deben confundirse con las campañas de publicidad de Meta, Google o TikTok.**

La publicidad sí podría utilizarse desde el lanzamiento.

---

# 6. PRESUPUESTO Y RENTABILIDAD

Capital inicial: todavía no definido.

No supongas USD 300, USD 500 ni otra cifra como capital oficial de este proyecto.

Publicidad inicial de referencia:

**USD 50 mensuales, separados del capital inicial.**

Buscamos evitar:

- Inmovilizar capital innecesariamente.
- Comprar productos sin validar demanda.
- Pagar aplicaciones evitables.
- Contratar servicios prematuramente.
- Automatizar procesos que podrían resolverse de forma semimanual al principio.

Distingue:

- Gastos de plataforma.
- Aplicaciones.
- Dominio.
- Procesamiento de pagos.
- Logística.
- Costos de mercancía.
- Importación.
- Publicidad.
- Comisiones.
- Reembolsos.
- Pérdidas por incidencias.

Calcula márgenes usando costos realistas cuando existan datos verificados.

No incluyas el tiempo de los socios como desembolso monetario directo del presupuesto inicial, pero sí documenta esfuerzo de mantenimiento y complejidad técnica.

---

# 7. EXPERIENCIA DE COMPRA — CERO FRICCIÓN

Diseña mobile-first.

## 7.1 Página principal

La portada debe priorizar:

1. Logo reconocible.
2. Búsqueda visible.
3. Acceso claro a departamentos.
4. Productos disponibles.
5. Productos destacados cuando corresponda.
6. Promociones sin saturación.
7. Información de confianza, entrega y atención.

No quiero un home dominado por enormes banners que obliguen al comprador a desplazarse mucho para encontrar productos.

No quiero una interfaz que parezca un marketplace complicado.

## 7.2 Navegación

- Categorías intuitivas.
- Jerarquía superficial.
- Menú móvil simple.
- Acceso inmediato al carrito.
- Búsqueda destacada.
- Filtros comprensibles.
- Sin departamentos vacíos.
- Sin popups invasivos.
- Sin navegación confusa.

## 7.3 Tarjetas de producto

Mostrar de manera clara:

- Imagen.
- Nombre.
- Precio en USD.
- Disponibilidad.
- Información breve de entrega, cuando esté respaldada.
- Acceso evidente a la ficha.

Evitar demasiadas etiquetas promocionales.

## 7.4 Fichas de producto

Incluir:

- Fotografías.
- Nombre y descripción sencilla.
- Precio.
- Variantes cuando existan.
- Disponibilidad real.
- Estimación de entrega respaldada.
- Condiciones relevantes.
- Política de devoluciones o enlace a ella.
- Botón de compra claro.
- Ayuda por WhatsApp cuando sea útil.

Nunca inventar fechas.

Nunca prometer disponibilidad sin comprobación.

## 7.5 Carrito

El carrito debe ser especialmente claro cuando contiene productos de diferentes orígenes.

Ejemplo:

- Producto A: disponibilidad local confirmada.
- Producto B: suministro externo con otra ventana de entrega.

El comprador debe comprender que podrían llegar en momentos diferentes.

No debemos presentar una única fecha de entrega ficticia.

Los costos y condiciones deben comunicarse correctamente dentro de las capacidades de Shopify.

## 7.6 WhatsApp

WhatsApp es un canal complementario de atención y venta.

Puede facilitar:

- Consultas.
- Disponibilidad.
- Recomendaciones.
- Incidencias.
- Cotizaciones futuras.

No debe sustituir innecesariamente el carrito ni el flujo de compra web.

## 7.7 Accesibilidad

Prioriza:

- Contrastes adecuados.
- Fuentes legibles.
- Botones suficientemente grandes.
- Navegación por teclado.
- Estados de foco visibles.
- Etiquetas accesibles.
- Mensajes de error comprensibles.
- Buen rendimiento en conexiones móviles.

Usa WCAG como referencia técnica actual, verificando la versión aplicable.

---

# 8. ADMINISTRACIÓN PARA LOS SOCIOS

Quiero que una persona que no programa pueda:

- Agregar productos.
- Editar precios.
- Cambiar imágenes.
- Actualizar inventario.
- Publicar y ocultar productos.
- Revisar pedidos.
- Confirmar pagos manuales cuando proceda.
- Registrar incidencias.
- Gestionar devoluciones.
- Cambiar contenido y promociones.

Hazlo mediante Shopify Admin y el editor visual del tema siempre que sea posible.

No construyas un panel administrativo independiente si no existe una necesidad demostrada.

No desarrolles automatizaciones complejas para operaciones que podamos gestionar manualmente durante el aprendizaje.

---

# 9. INVENTARIO Y DISPONIBILIDAD

Diseña una estructura de datos que distinga:

### Producto

- SKU.
- Categoría.
- Proveedor u origen interno.
- Precio de venta.
- Costo económico.
- Costos logísticos relevantes.
- Disponibilidad.
- Variantes.
- Estado de publicación.
- Ventana de entrega sustentada.

### Estados internos sugeridos

- Borrador.
- En validación.
- Validado.
- Publicado.
- Pausado.
- Agotado o no disponible.

### Pedido

- Recibido.
- Pago pendiente.
- Pago verificado.
- Disponibilidad confirmada.
- Preparación.
- Enviado.
- Entregado.
- Incidencia.
- Cancelado.
- Reembolsado.

No asumas que Shopify implementa exactamente todos estos estados de forma nativa.

Debes identificar cuáles son nativos y cuáles necesitarían etiquetas, metacampos o un registro complementario.

Evita duplicar innecesariamente datos que Shopify ya conserva.

---

# 10. PAGOS EN PANAMÁ

La pasarela de pago definitiva no está seleccionada.

Queremos aceptar tarjetas si es viable, además de evaluar métodos locales adecuados.

Opciones investigadas anteriormente:

- Tilopay.
- PayPal Business.
- Yappy Comercial.
- Transferencias bancarias.
- Depósitos.
- Otras soluciones compatibles que se verifiquen.

Credicorp y PagueloFácil no son nuestras opciones preferidas.

No queremos iniciar trámites bancarios complejos ni presenciales si existe una alternativa legal y razonable de afiliación online.

Investiga oficialmente:

- Disponibilidad en Panamá.
- Compatibilidad con Shopify Basic.
- Requisitos de inscripción.
- Documentación empresarial.
- Cuenta bancaria necesaria.
- Comisiones.
- Cargos adicionales de Shopify por proveedores externos.
- Reembolsos.
- Contracargos.
- Tiempos de acreditación.
- Experiencia del comprador.
- Compatibilidad con pagos manuales.
- Limitaciones de pagos parciales y anticipos.

No asumas que Shopify Payments está disponible en Panamá.

No sugieras el uso de Yappy Personal para comercio sin revisar sus condiciones.

No integres pagos reales durante esta fase.

No crees un checkout propio.

Las obligaciones fiscales, legales y comerciales de Panamá deben investigarse cuando corresponda. No deben ignorarse por encontrarnos en etapa inicial.

---

# 11. LOGÍSTICA Y ENTREGAS

Todavía debemos confirmar:

- Transportistas.
- Cobertura geográfica.
- Tarifas.
- Entrega en Ciudad de Panamá.
- Entrega al interior.
- Plazos de proveedores externos.
- Costos de importación.
- Políticas de devolución.
- Manejo de pedidos mixtos.

Diseña una estructura flexible para estos datos.

No codifiques tarifas o plazos inventados.

Utiliza información ficticia identificada como tal para los prototipos.

Los plazos reales deben validarse antes del lanzamiento.

---

# 12. SHOPIFY THEMES — HORIZON VS DAWN

Ambos temas siguen siendo finalistas.

No existe una selección definitiva del tema.

Tu misión es investigar y comparar las dos alternativas antes de recomendar una.

Evalúa:

1. Arquitectura.
2. Facilidad de personalización.
3. Compatibilidad con los assets de la identidad A.
4. Búsqueda.
5. Filtros.
6. Menú móvil.
7. Fichas de producto.
8. Carrito.
9. Accesibilidad.
10. Rendimiento móvil.
11. Carga de JavaScript.
12. Mantenibilidad.
13. Facilidad de actualización.
14. Cantidad de código personalizado necesario.
15. Facilidad de administración.

### Metodología

Utiliza los mismos productos ficticios, imágenes equivalentes y escenarios de prueba.

Idealmente:

- 6–10 productos representativos.
- Un producto con stock local.
- Un producto de suministro externo.
- Un producto agotado.
- Un producto con variantes.
- Un carrito con productos de distintas ventanas de entrega.

Ejecuta pruebas reproducibles cuando el entorno lo permita.

Incluye Lighthouse, Theme Check, accesibilidad y comprobaciones de JavaScript.

Distingue las pruebas reales de las estimaciones.

Si una prueba requiere una tienda de desarrollo Shopify, documenta la dependencia y pide autorización antes de conectarte.

No inventes puntuaciones.

### Resultado

Entrega una matriz comparativa con:

- Ventajas.
- Desventajas.
- Funcionalidades nativas.
- Personalizaciones necesarias.
- Riesgos.
- Resultados de rendimiento comprobados.
- Recomendación provisional.

No selecciones automáticamente el tema ganador.

---

# 13. ESTRATEGIA DE CÓDIGO

Quiero minimizar código personalizado.

Prioriza este orden:

**Nivel 1:** configuración nativa de Shopify.

**Nivel 2:** configuración del editor del tema y secciones existentes.

**Nivel 3:** metacampos, metaobjetos y plantillas Liquid.

**Nivel 4:** CSS y JavaScript de alcance limitado.

**Nivel 5:** aplicaciones externas únicamente con justificación.

**Nivel 6:** backend personalizado solo ante necesidad demostrada.

No utilices React, Next.js, Hydrogen, una base de datos externa o microservicios simplemente por familiaridad tecnológica.

Un tema Shopify convencional debe ser la solución predeterminada.

Separa:

- Código del tema.
- Datos comerciales.
- Configuración.
- Assets.
- Pruebas.
- Documentación.
- Herramientas de desarrollo.

Evita modificaciones invasivas al tema que compliquen futuras actualizaciones.

No construyas funcionalidades que Shopify ya resuelve satisfactoriamente.

---

# 14. PROTOTIPO LOCAL

Está autorizado desarrollar un prototipo local e interactivo para revisar la experiencia de compra.

Puede usar HTML, CSS y JavaScript cuando sea necesario.

Debe:

- Utilizar la propuesta A de Poco & Co.
- Simular departamentos y navegación.
- Permitir búsqueda de productos ficticios.
- Mostrar filtros.
- Permitir añadir productos a un carrito de demostración.
- Representar disponibilidad y ventanas de entrega.
- Mostrar advertencias en un carrito mixto.
- Funcionar en dispositivos móviles.
- Ser accesible.
- No registrar pagos ni datos personales.

IMPORTANTE:

El prototipo local no reemplaza la posterior implementación real del tema Shopify.

No construyas una arquitectura duplicada e innecesaria.

Elige la forma de prototipo que permita reutilizar el máximo trabajo en el tema final o que minimice trabajo desechable.

Documenta con claridad qué es una simulación y qué está implementado de verdad.

---

# 15. ENTORNO DE SHOPIFY CLI

Cuando se autorice trabajar con una tienda de desarrollo:

- Utiliza Shopify CLI.
- Emplea un development theme o tema no publicado.
- Mantén Git como fuente de control de versiones.
- Evita operaciones de publicación.
- Ejecuta Theme Check.
- Conserva la configuración del entorno separada por proyecto.
- No uses credenciales de producción para pruebas.
- No mezcles datos de clientes reales con productos ficticios.

Antes de ejecutar comandos que suban o modifiquen temas remotos, explícame qué hará exactamente el comando y solicita autorización para la conexión.

---

# 16. PRUEBAS Y QA

Quiero un protocolo reproducible.

### Pruebas funcionales

- Menú móvil.
- Búsqueda.
- Resultados sin coincidencias.
- Filtros.
- Categorías sin productos.
- Ficha de producto.
- Variantes.
- Producto agotado.
- Carrito.
- Carrito mixto.
- Mensajes de disponibilidad.
- Navegación por teclado.

### Pruebas técnicas

- HTML válido cuando corresponda.
- Liquid y Theme Check.
- Errores de JavaScript.
- Recursos faltantes.
- Accesibilidad automática.
- Rendimiento móvil.
- Imágenes responsivas.
- Dependencias vulnerables.
- Contrastes.
- Diseño responsivo.
- Componentes demasiado pesados.

### Pruebas humanas posteriores

La usabilidad no se considera validada únicamente porque los tests automáticos pasen.

Antes del lanzamiento tendremos que comprobar que compradores sin experiencia tecnológica puedan navegar sin ayuda.

---

# 17. ESTRUCTURA SUGERIDA DEL REPOSITORIO

Crea un repositorio independiente para la web.

Puedes proponer una estructura equivalente a:

poco-and-co-shopify/
- README.md
- .devcontainer/
- Dockerfile
- compose.yaml, si hace falta
- .dockerignore
- .gitignore
- docs/
  - requirements.md
  - decisions.md
  - architecture.md
  - catalog-model.md
  - payments-panama.md
  - operations.md
  - logistics.md
  - security.md
  - theme-comparison.md
  - implementation-roadmap.md
- brand/
  - assets-manifest.json
  - sync-instructions.md
- prototype/
- theme/
- tests/
- scripts/

Dentro de `theme/`, respeta la estructura oficial de Shopify:

- assets/
- blocks/
- config/
- layout/
- locales/
- sections/
- snippets/
- templates/

No inventes una estructura incompatible con Shopify CLI.

No es obligatorio crear archivos vacíos para todas estas rutas. Crea solo lo que tenga utilidad.

---

# 18. ENTREGABLES

### Entregable A — Entorno seguro

- Dockerfile.
- Configuración Dev Container.
- Archivos de dependencias.
- Instrucciones de VS Code.
- Guía para levantar y detener el entorno.
- Comprobación de seguridad del contenedor.
- Documentación de limitaciones.

### Entregable B — Integración de marca

- Revisión de la propuesta A.
- Manifiesto de archivos utilizados.
- Paleta y tipografías integradas.
- Registro de versión/commit de los assets.
- Procedimiento de actualización del branding.
- Estado del ajuste de favicon.

### Entregable C — Arquitectura Shopify

- Modelo de catálogo.
- Departamentos.
- Navegación.
- Búsqueda y filtros.
- Carrito.
- Información de entrega.
- Páginas necesarias.
- Administración.
- Modelo de pagos pendiente.
- Requisitos de logística.
- Decisiones técnicas justificadas.

### Entregable D — Prototipo visual

- Interfaz local funcional.
- Versión escritorio.
- Versión móvil.
- Datos ficticios.
- Navegación demostrable.
- Carrito demostrable.
- Ejemplos de diferentes plazos de entrega.

### Entregable E — Evaluación de temas

- Comparación Dawn/Horizon.
- Matriz técnica.
- Evidencias.
- Pruebas ejecutadas cuando se pueda.
- Pruebas bloqueadas por falta de cuenta Shopify.
- Recomendación justificada.

### Entregable F — Documentación para desarrollo posterior

- Roadmap.
- Backlog.
- Decisiones pendientes.
- Costos potenciales.
- Dependencias.
- Riesgos.
- Criterios de aceptación.
- Pasos necesarios para conectar una tienda Shopify cuando lo autoricemos.

---

# 19. FASES DE TRABAJO

## Fase 0 — Inspección

- Revisa el entorno actual.
- Confirma acceso al repositorio de branding.
- Revisa los assets de la propuesta A.
- Inspecciona herramientas instaladas.
- Identifica riesgos del entorno.

## Fase 1 — Contenedor

- Prepara Docker y Dev Containers.
- Construye el entorno.
- Comprueba que funciona.
- No instales dependencias globales innecesarias en Windows.

Si falta Docker Desktop o WSL 2, informa exactamente qué instalación requiere aprobación. No modifiques Windows sin autorización.

## Fase 2 — Arquitectura y prototipo

- Define la arquitectura.
- Construye el prototipo local.
- Aplica branding A.
- Implementa únicamente interacciones ficticias y seguras.
- Ejecuta QA.

## Fase 3 — Comparación de temas

- Analiza Dawn y Horizon.
- Prepara pruebas equivalentes.
- Ejecuta las que sean posibles sin cuenta.
- Documenta lo que requiere una tienda de desarrollo.

## Fase 4 — Revisión de los fundadores

Presenta:

- Prototipo.
- Capturas.
- Resultados.
- Decisiones pendientes.
- Riesgos.
- Recomendación de tema.

Solicita aprobación antes de avanzar a conexiones reales.

## Fase 5 — Implementación Shopify futura

Solo cuando exista autorización explícita:

- Conectar tienda de desarrollo.
- Preparar tema no publicado.
- Probar con datos ficticios.
- Validar funcionalidades reales de Shopify.
- Preparar catálogo real.
- Revisar pagos y logística.

**No llegar automáticamente a la fase 5.**

---

# 20. REGLAS DE CONTROL

No afirmes que algo funciona si no lo has probado.

No inventes disponibilidad de productos, fechas de entrega ni datos comerciales.

No consideres un dominio disponible sin comprobación suficiente.

No confundas una tienda local simulada con Shopify funcionando realmente.

No publiques información privada.

No implementes un checkout propio.

No contrates servicios.

No modifiques el repositorio de branding.

No hagas cambios irreversibles en mi computadora.

No cambies automáticamente las decisiones del negocio.

No marques T001/T002 como completadas.

No selecciones temas, pasarelas ni proveedores sin justificar la decisión y presentarla para aprobación.

No gastes dinero sin permiso.

No desarrolles más código del necesario.

---

# 21. CÓMO QUIERO QUE TRABAJES

Primero revisa qué puedes reutilizar.

Antes de cada cambio técnico importante:

1. Explica brevemente el objetivo.
2. Identifica los archivos afectados.
3. Confirma que no modifica sistemas externos.
4. Implementa dentro del entorno autorizado.
5. Ejecuta pruebas.
6. Documenta resultados y limitaciones.

No te detengas en preguntas sobre información que ya está contenida aquí.

Cuando falten detalles no críticos, utiliza supuestos explícitos y datos de prueba.

Cuando falte una autorización crítica, detente solamente en esa operación y continúa con el trabajo local que sea independiente.

Evita consumir recursos innecesarios.

Prefiero entregables funcionales y revisables antes que documentos extensos que no produzcan resultados concretos.

---

# 22. RESULTADO FINAL ESPERADO DE ESTA ETAPA

Quiero tener un proyecto Shopify Panamá que incluya:

1. Un entorno de desarrollo contenido y reproducible.
2. Un repositorio independiente de la marca.
3. La identidad geométrica A de Poco & Co. integrada.
4. Un prototipo funcional local.
5. Una arquitectura pensada para Shopify Basic.
6. Una comparación verificable de Horizon y Dawn.
7. Un backlog de implementación ordenado.
8. Documentación suficiente para continuar sin perder decisiones.
9. Una lista clara de requisitos para conectar posteriormente Shopify.
10. Cero compras, cero despliegues públicos y cero cambios de estado no autorizados.

**NO QUIERO QUE CONSTRUYAS UNA PLATAFORMA DE COMERCIO ELECTRÓNICO DESDE CERO.**

Quiero que prepares una tienda Shopify moderna, comercial, segura, mantenible y de cero fricción, reutilizando la mayor cantidad posible de funcionalidades nativas.

**Empieza por inspeccionar el entorno de desarrollo y el repositorio de branding. Después prepara el contenedor y continúa con las fases locales autorizadas.**