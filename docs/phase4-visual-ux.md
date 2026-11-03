# Fase 4 — validación visual y UX

Rama: phase4/visual-ux-validation. Autorización: configurar exclusivamente la dev store QA y el borrador Dawn ya identificados por el usuario; no publicar el tema, quitar contraseña, crear pedidos ni configurar pagos. T001/T002 pendientes al 0 %.

## Estado inicial

La conexión MCP estaba seleccionada en otra tienda. Se invocó switch_shop y se solicitó reautenticación para seleccionar Poco Co QA. No se ejecutaron escrituras Shopify. No confundir la solicitud de reautenticación con una conexión QA confirmada.

## Secuencia de ejecución

1. Confirmar dominio QA, dev store, contraseña y roles Dawn unpublished/Horizon live. Registrar metadatos y archivos de Horizon cuando el acceso lo permita; no editar Horizon. Los cambios de catálogo/menú son globales de la dev store y pueden verse también en Horizon sin modificar sus archivos.
2. Consultar catálogo, ubicaciones, publicaciones, menús, colecciones y definiciones existentes. Reutilizar recursos de esta demo por identificador/handle; no sobrescribir datos ajenos ni duplicar tras una interrupción.
3. Crear primero las cinco definiciones merchant-owned custom de entrega, respetando tipos del fixture; escribir valores y leerlos para comprobarlos. No instalar una app propia para definirlos.
4. Crear/reutilizar ocho productos de data/fixtures/products.json, nueve variantes, imágenes PNG locales rotuladas FICTICIO y precios USD ficticios. Stock planificado: organizador 6, soporte teléfono 8, collar 4+4, bolsa 5, dispensador 0, soporte auto 7, bandeja 5, estuche 3. Tracking activo, DENY. Conservar escenarios pendiente/vencido y no convertir fechas simuladas en verificación comercial.
5. Activar disponibilidad solo en Online Store de QA para probar catálogo/carrito bajo contraseña. Sin otros canales ni pedidos. La activación sustituye únicamente para esta demo la política inicial Draft/cero stock del fixture histórico.
6. Crear seis colecciones: Hogar, Tecnología, Joyería, Viajes, Mascotas y Automóvil; más colección de demostración destacada. Menú sencillo enlazado a las seis, inicio y catálogo. Preferir menú propio de QA; asignarlo solamente al encabezado Dawn.
7. Inspeccionar filtros nativos existentes y habilitar los disponibles sin servicios pagados ni dependencias pesadas. Si requieren herramienta o permiso adicional, documentar el límite sin inventar filtros funcionales.
8. Configurar colección destacada en Dawn exclusivamente. Mantener identidad A y JS nativo. Theme Check después de cambios de tema.
9. Validar lectura del catálogo, metacampos, nueve variantes/inventario y publicaciones. En navegador: inicio, producto, búsqueda, filtros, variantes, agotado, carrito mixto, cantidades/eliminación y menú móvil. No checkout ni pedidos.
10. Revisar móvil y escritorio; capturas seguras sin contraseña, tokens o Admin. Medir Lighthouse/PSI solo con un entorno válido. Separar pruebas API, render real, interacción y métricas; una lectura Admin no demuestra UX.

## Evidencia y cierre

Guardar respuestas originales, IDs y enlaces operativos en work/ excluido de Git; publicar solo evidencia sanitizada. Documentar cada prueba ejecutada y pendiente. Confirmar Dawn unpublished, Horizon live y protección conservada. Push de la rama Fase 4, sin merge a main. El diseño queda sujeto a revisión del usuario.

Estado actual: pendiente de reautenticación MCP en la tienda QA; no hay productos cargados ni capturas nuevas.
