# Propuestas locales Fase 4

No autorizadas para subir. El parche P1 afecta exactamente los cinco archivos del manifiesto; theme/ conserva la versión UX autorizada.

Preparar: node scripts/prepare-p1-candidate.mjs. Comprueba hashes fuente, copia a work/p1-candidate/theme, aplica el parche y comprueba hashes candidatos.

Probar dentro del entorno Docker seguro existente: node --test tests/p1-cart-reconciliation.test.mjs; node scripts/check-p1-candidate.mjs; shopify theme check --path /workspace/work/p1-candidate/theme --output json. Los scripts asumen /workspace como raíz del repositorio, sin escrituras remotas. Mantener usuario no root, filesystem de solo lectura, red deshabilitada y controles compose existentes.

La integración futura requiere autorización para cinco archivos y revisión explícita del hash permitido de product-form.js en el guard de upstream. No sustituir ni desactivar la comprobación del resto de JS nativo. La configuración global de idioma requiere aprobación separada por su impacto en Horizon y traducciones. Ver docs/phase4-p1-proposal.md.

Actualización de despliegue: el parche original fue autorizado/subido pero FALLÓ en runtime; ver docs/phase4-p1-deployment-results.md. prepare-p1-candidate reconstruye la propuesta histórica desde su commit fuente usando Git host existente; check-p1-candidate compara ese origen guardado sin necesitar Git en Docker. El parche p1-cart-endpoint-correction.patch es una propuesta adicional NO SUBIDA.
