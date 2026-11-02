# Seguridad
No se instaló software ni se conectó Shopify. Sin compras, cuentas, pagos ni publicación.
Compose: usuario node sin root; capacidades eliminadas; no-new-privileges; sin socket Docker, privileged o host network. Solo proyecto montado de solo lectura; filesystem read-only y /tmp temporal; límites CPU/RAM/PID. Puerto host 127.0.0.1:8080. Dev Container permite escritura al proyecto para editar, sin montar marca, perfil o credenciales.
Red build: Docker Hub. Red prototipo: loopback, sin recursos externos. npm/Shopify futuros solo tras revisión y autorización aplicable. CSP restringe recursos al origen y prohíbe inline/eval.
Imagen Node descargada y construida; digest registrado en environment-report.md. No se ha realizado escaneo de vulnerabilidades. Verificados usuario no root, filesystem y montaje de solo lectura, límites de recursos, capacidades eliminadas y puerto exclusivo loopback. El usuario instaló Docker Desktop.
Docker/WSL no son aislamiento absoluto; el montaje permite acceso al proyecto y red no es sandbox. Código no confiable: VM restringida. No ejecutar scripts remotos sin revisar.
Secretos fuera de Git, logs e imágenes; no montar credenciales del host. Sin credenciales productivas.
Recuperación: docker compose down conserva archivos; reconstruir sin borrar datos/volúmenes automáticamente.
