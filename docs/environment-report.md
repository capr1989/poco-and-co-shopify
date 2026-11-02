# Inspección y verificaciones · 2026-11-02
Destino creado: C:/Users/Carlos Pretto/Dev/Poco and Co Shopify. Carpeta inicialmente vacía; Git local independiente inicializado en main, sin remoto ni publicación.
Git, Python y Node preexistentes encontrados; WSL disponible (estado reporta versión predeterminada 2 y advertencia sobre WSL1). Docker/Shopify CLI no encontrados en PATH; Docker tampoco en ruta habitual. No se instaló software.
Assets copiados desde branding, sin modificar su repositorio; hashes en manifiesto.
Pruebas ejecutadas usando Node ya instalado, solo sintaxis/lectura local, sin instalar dependencias: node --check app.js, node --check serve.mjs y scripts/check.mjs: OK.
JS propio 5134 bytes sin compresión, 2155 gzip; CSS 2740 bytes sin compresión, 1148 gzip. No son transferencia HTTP observada ni CWV.
Imagen base actualizada a Node v22.23.4 según índice oficial https://nodejs.org/dist/index.json (fecha de release 2026-10-20); tag concreto sin digest todavía. Pendientes descarga, revisión de avisos y escaneo antes de ejecución.
No se ejecutó contenedor, navegador, Lighthouse, PSI, Theme Check ni pruebas funcionales reales. No hay LCP/INP/CLS medidos ni tema ganador.
El enlace OAuth recibido no se abrió ni utilizó para conceder permisos. No se guardó en el proyecto.

Dimensiones intrínsecas del logo corregidas a 660×240 para respetar SVG original. Fuente original: 164700 bytes; pendiente optimización/validación frente a presupuesto final.

## Actualización después de instalación por el usuario
Docker localizado en C:/Users/Carlos Pretto/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe. Desktop 4.97.0, Engine 29.9.2, Compose v5.6.1. Contexto desktop-linux. Se inició Docker Desktop existente, se construyó imagen y se arrancó servicio. npm run check dentro de Docker OK. Seguridad y HTTP verificados (ver qa.md). No se instalaron dependencias globales en Windows.
Digest de base resuelto durante build: node:22.23.4-bookworm-slim@sha256:4b150b48b4116e2a22f2c39cc27025fbf4f153e2078fd3b14d159fdb5c7279da. No se ejecutó escaneo de vulnerabilidades.
QA funcional parcial de navegador realizada; Lighthouse/PSI y datos de campo siguen pendientes. Estado anterior se conserva como historial.

## GitHub remoto
A petición explícita del usuario se creó capr1989/poco-and-co-shopify como repositorio privado. Se excluyen work/, reports/ y secretos mediante .gitignore. La creación del repositorio no publica el storefront ni conecta Shopify.
