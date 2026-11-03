# Plan de conexión Shopify · Fase 3
## Autorización actual
Solo auditoría de lectura mediante MCP autorizada por el usuario durante esta fase. No se ha autenticado CLI, creado tienda, cargado tema/catálogo, renombrado ni publicado nada.
Tienda para escrituras: **sin seleccionar ni aprobar**. El dominio y los datos de la tienda auditada se conservan en work/shopify-store-audit.private.json, excluido de Git porque este repositorio es público. El resumen con dominio exacto se entrega al usuario en el chat.
El MCP expone una tienda seleccionada. get_shop_info y Admin GraphQL no enumeran todas las tiendas de la cuenta. switch_shop revoca la selección actual y abre otro flujo de autorización; no se ejecutó para no cambiar la conexión sin que el usuario seleccione otra. No afirmar que solo existe una tienda.
Resultado actual: la tienda seleccionada es Trial, partnerDevelopment=false; no cumple por sí sola el banco gratuito permanente. Tiene recursos/configuración que se deben preservar. Las demás tiendas no se enumeraron; el usuario prefirió solicitar la propuesta de una dev store gratuita nueva. No es aprobación para crearla. No se consultaron fichas de clientes/pedidos ni datos de pagos; solo conteos y metadatos.

## Tipo y costo recomendados
Para esta fase, una **dev store de pruebas sobre capacidades Basic**, sin feature previews ni datos generados ajenos al fixture. Es gratuita para probar temas; no requiere contratar Basic para estas pruebas. Es diferente de una prueba comercial y de una client transfer store.
Requiere cuenta Shopify Partner o permisos de desarrollo admitidos y permiso para crear dev stores en la organización. Para CLI en dev store: propietario o staff autorizado con Themes; no asumir que basta colaborador.
No puede procesar pagos reales, convertirse en producción ni transferirse al cliente; mantiene protección por contraseña. La tienda comercial futura es una decisión separada. No habilitar pasarela, quitar contraseña, comprar dominio o escoger plan pagado.
Fuentes actuales: [dev stores para temas](https://shopify.dev/docs/storefronts/themes/tools/development-stores), [tipos de tienda](https://shopify.dev/docs/apps/build/stores), [requisitos y límites](https://shopify.dev/docs/apps/build/stores/development-stores). No se conoce costo comercial futuro; nada contratado.

## Decisión antes de actuar
1. El usuario ha elegido recibir la propuesta de una nueva dev store gratuita. La tienda Trial existente se preserva; no se necesita renombrarla ni vaciarla.
2. Solicitar aprobación final para creación gratuita antes de ejecutar. Propuesta de comando, **NO ejecutada**:
~~~bash
shopify store create dev --name "Poco Co QA" --plan basic --country PA --json
~~~
Flags comprobados mediante help de CLI 5.0.0, sin crear nada. Nombre propuesto no equivale a dominio reservado o disponible; el dominio exacto se confirma tras creación. Confirmar organización de desarrollo/propietario antes de crear; si no hay cuenta/permisos apropiados, detenerse sin abrir una cuenta ni activar un plan. Crear cuenta/aceptar condiciones queda a cargo del usuario. Este comando no carga nuestros productos.
3. Reutilizar/renombrar la trial auditada no se recomienda para sostener pruebas sin costos. Cambiar el nombre visible no cambia el myshopify.com ni borra recursos, pero sí puede afectar identificación comercial y comunicaciones de esa tienda; requiere confirmar uso y aprobación específica. No se propone resetearla ni borrar datos.

## Acceso mínimo por etapas
- Tema: propietario/staff de dev store y permiso Themes; no clientes, pedidos, pagos o facturación.
- Configuración posterior: Productos/Colecciones, inventario, archivos, menús y definiciones de metacampos solo si se aprueban esos cambios. El operador puede configurar desde Admin; sin app/backend propios.
- Autenticación: sesión Shopify interactiva mediante CLI; el usuario completa login. No pegar tokens/contraseñas en chat, flags, Git o logs. No reutilizar credenciales comerciales. Evitar OAuth amplio cuando basta Themes.
[Documentación de autenticación](https://shopify.dev/docs/storefronts/themes/tools/cli#authenticating-and-accessing-stores).

## Comandos de tema pendientes
En un contenedor interactivo efímero de herramientas, con fuente read-only y HOME temporal. Red saliente solo para Shopify, sin montar perfiles/credenciales Windows. No exponer puertos para la primera carga. La sesión desaparece al detener el contenedor.
Los siguientes son **plantillas**, no autorización: DOMINIO_APROBADO debe sustituirse por el myshopify.com literal de la tienda elegida y presentarse de nuevo al usuario antes de ejecutar.
~~~bash
shopify theme list --store DOMINIO_APROBADO.myshopify.com --json
shopify theme push --store DOMINIO_APROBADO.myshopify.com --path /workspace/theme --unpublished --theme "Poco Co QA Dawn 16.1.1" --json
shopify theme list --store DOMINIO_APROBADO.myshopify.com --json
~~~
La primera consulta puede pedir autenticación; no se ha ejecutado. Crear un tema nuevo con --unpublished y nombre explícito, registrar su ID/role y comprobar UNPUBLISHED tras subir. Sin --publish, --live o --allow-live; sin seleccionar un ID MAIN. No usar theme publish ni integración GitHub con publicación automática.
No se sobrescribe el tema existente ni se transfiere catálogo con theme push. Si el remoto contiene cambios editoriales, revisar antes de cualquier actualización posterior.
Si se necesita theme dev más adelante, presentar dominio e ID no publicado, --path /workspace/theme, --host 0.0.0.0 y --port 9292 dentro del contenedor, con host 127.0.0.1:9292 exclusivamente. theme dev también sube archivos: no es puramente local. No está autorizado ahora.
[Push](https://shopify.dev/docs/api/shopify-cli/theme/theme-push) y [dev](https://shopify.dev/docs/api/shopify-cli/theme/theme-dev).

## Archivos y datos que se transferirían
Solo los archivos del tema compatibles incluidos en el paquete local. Lista exacta en docs/evidence/phase3/theme-package.json; upstream.json, documentación de negocio, work/, tests, secretos y prototipo no forman parte del paquete. Incluir código Liquid/JSON, JS/CSS nativos, SVG A y textos/traducciones propios.
Una autorización de tema no incluye cargar productos, menús, colecciones o metacampos. Propuesta separada: cinco definiciones custom, ocho productos DRAFT, nueve variantes, ocho PNG rotulados FICTICIO, inventario inicial cero y ninguna publicación de producto. Revisar conteos del archivo products.json antes de aprobar; no tocar recursos existentes.
Definiciones: delivery_group, delivery_message, delivery_verified, delivery_verified_at y delivery_valid_until.
No crear clientes, pedidos, pagos, dominios ni apps pagadas. No borrar información. Conservar controles nativos y registrar cambios por recurso después de autorización.

## Creación autorizada y completada · 3 de noviembre de 2026
El usuario aprobó explícitamente la creación gratuita y eligió su organización. CLI devolvió una tienda sin demo-data; store list --type dev la confirmó de tipo dev y capacidades basic. No hubo cambios en la tienda Trial, ni cargas de tema/catálogo ni acciones de facturación. El dominio exacto está en work/dev-store-created.private.json y se entrega en chat, sin publicarlo en este repositorio público.
La autorización de creación se consumió y no permite crear más tiendas. Subir Dawn sigue pendiente de autorización separada. Preparar después un contenedor con solo theme/ montado read-only en /workspace/theme, no todo el repositorio, y presentar los comandos con el dominio literal antes de ejecutar. Verificar role UNPUBLISHED tras subir; nunca --publish o --allow-live.
La protección por contraseña es una restricción obligatoria de las dev stores según Shopify. No se cambió. La comprobación HTTP anónima devolvió 429 y no permitió observar directamente la pantalla de contraseña. No se creó contraseña en Git ni se desactivó protección.
