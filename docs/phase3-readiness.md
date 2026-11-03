# Readiness Fase 3
Base: phase2/theme-evaluation, commit 33748a7. Rama: phase3/shopify-validation.
Dawn 16.1.1 queda aprobado por fundadores para pruebas/desarrollo; Horizon conserva rol alternativo, no se afirma ganador de velocidad.

## Preparado y ejecutado
- Tema completo contrastado contra los archivos del upstream, JS nativo sin modificar, marca A exacta y favicon corregido.
- Theme Check actual: 0 errores/9 advertencias, sin nuevos diagnósticos respecto a Dawn. Liquid estáticamente válido; runtime aún pendiente.
- Empaquetado Shopify CLI local en /tmp después de copiar fuente read-only; lista exacta de archivos y hash en evidence/phase3/theme-package.json. No se subió el ZIP.
- 15 pruebas locales: contratos del fixture, borradores/stock cero, variantes, fechas, entregas, cantidad/eliminación y contraste.
- Ocho productos ficticios, nueve variantes y seis departamentos en JSON; ocho PNG rotulados FICTICIO. Nada cargado a Shopify.
- Controles manuales de publicación/inventario y guía Admin preparados. Mensajes Liquid endurecidos para grupos válidos y fechas de verificación/caducidad coherentes, sin JS propio.
- Tres diagnósticos HTTP del prototipo con 14 rutas enumeradas cada uno; no son CWV ni prueba móvil.

## Integración nativa preparada, todavía no validada en tienda
Búsqueda mediante routes.search_url, filtros y navegación de Dawn, inventario/variantes/carrito nativos, bloques configurables y español. Mensajes por línea dentro de regiones nativas actualizadas. Colecciones, menús, filtros, moneda/idioma y datos de entrega requieren configuración aprobada en Admin.
El prototipo original permanece intacto. Ningún resultado de HTML o LiquidJS se presenta como funcionamiento de Liquid/checkout/Admin.

## Auditoría Shopify permitida durante la fase
El usuario autorizó consulta MCP en lectura. Solo se pudo auditar la tienda seleccionada: es Trial y partnerDevelopment=false, por lo que no se recomienda como banco gratuito permanente. Hay recursos/configuración que conservar. No se cambió nada.
El MCP no ofrece listado global de las tiendas del usuario; el usuario prefirió la propuesta de una nueva dev store gratuita en vez de seguir cambiando la tienda seleccionada. No se creó ninguna.
Detalles reales de dominio/plan/conteos/temas quedan en work/shopify-store-audit.private.json, no en Git público. config/shopify-authorization.json registra lectura permitida y ninguna escritura aprobada. CLI no autenticado.
Creación de tienda gratuita tiene autorización de principio, pero requiere presentar opción/operaciones y obtener aprobación final; no se creó ninguna.

## Bloqueado o pendiente
- Elegir y aprobar dominio/tienda de desarrollo; permiso explícito para auth CLI/carga no publicada y configuración ficticia.
- Navegador aislado apto para Lighthouse/axe. Docker actual no puede ejecutar sandbox de Chrome como está; lanzamiento nativo de prueba rechazado por revisión automática. No se debilitan controles.
- Pruebas reales de Liquid, búsqueda/filtros, variantes/inventario, carrito/Section Rendering, checkout y editor.
- Rendimiento móvil/escritorio y accesibilidad completa; pruebas humanas de compra/administración.
- Datos comerciales reales: costos, stock, proveedores, cobertura, tarifas, plazos, pagos, políticas y nombre legal.

## Siguiente paso
Revisar y aprobar la propuesta concreta de dev store gratuita nueva llamada Poco Co QA, capacidades Basic y país PA, sin demo-data. Después, presentar dominio literal, acceso y comandos exactos de conexión/carga; no publicar tema ni productos por defecto. Ver shopify-connection-plan.md.
No cuentas nuevas, cargos, pagos, dominios, borrados, pedidos reales ni merge a main. Push de esta rama autorizado por brief de Fase 3 tras revisar secretos. T001/T002 se mantienen PENDIENTES 0 %.

## Entrega GitHub
La implementación fef452f se subió a phase3/shopify-validation y se verificó contra el remoto, tras revisar secretos y exclusión del registro privado. No se hizo merge a main. Rama: https://github.com/capr1989/poco-and-co-shopify/tree/phase3/shopify-validation . La aprobación de creación de dev store sigue pendiente.

## Actualización · 3 de noviembre de 2026
El usuario autorizó la creación y eligió su organización. Poco Co QA fue creada sin demo-data y verificada por CLI de tipo dev y capacidades basic, país PA. No hubo contratación comercial ni cambios en la tienda anterior. El dominio literal está en work/dev-store-created.private.json y se comunicó al usuario; no se publica aquí. La autorización puntual de creación quedó consumida.
Sigue prohibida la carga de Dawn, productos u otros recursos hasta una autorización siguiente con dominio y comandos exactos. La sesión CLI de creación se cerró y el contenedor temporal fue eliminado, sin guardar sus credenciales en Windows/Git. T001/T002 permanecen pendientes al 0 %.
