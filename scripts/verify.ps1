# ==========================================================================
# SCRIPT DE AUDITORÍA Y VERIFICACIÓN DE CALIDAD DEL PORTAFOLIO
# Ejecuta validaciones de integridad de archivos y enlaces locales
# ==========================================================================

$ErrorActionPreference = "Stop"
$requiredFiles = @(
  "index.html",
  "cv.html",
  "css/styles.css",
  "js/config.tailwind.js",
  "js/data.js",
  "js/main.js",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "assets/favicon.svg",
  "assets/logo.svg",
  "assets/avatar.svg",
  "assets/project-1.png",
  "assets/project-2.png",
  "assets/project-3.png",
  "assets/project-4.png"
)

Write-Host "==> Verificando archivos requeridos del portafolio..." -ForegroundColor Cyan
foreach ($file in $requiredFiles) {
  if (-not (Test-Path $file)) {
    throw "Falta archivo requerido: $file"
  }
  $item = Get-Item $file
  if ($item.Length -eq 0) {
    throw "El archivo esta vacio: $file"
  }
}

Write-Host "==> Todos los archivos e imagenes verificados correctamente." -ForegroundColor Green
