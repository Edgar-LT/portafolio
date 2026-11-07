# ==========================================================================
# SCRIPT DE AUDITORÍA Y VERIFICACIÓN DE CALIDAD DEL PORTAFOLIO
# Ejecuta validaciones de integridad de archivos, activos, SEO y datos
# ==========================================================================

$ErrorActionPreference = "Stop"

$requiredFiles = @(
  "index.html",
  "cv.html",
  "css/styles.css",
  "js/config.tailwind.js",
  "js/data.js",
  "js/i18n.js",
  "js/main.js",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "assets/favicon.svg",
  "assets/logo.svg",
  "assets/profile.webp",
  "assets/og-preview.svg",
  "assets/projects/voxpdf-studio.png",
  "assets/projects/voxpdf-studio-card.png",
  "assets/projects/robotic-arm-simulation.png",
  "assets/projects/robotic-arm-simulation-card.png",
  "assets/projects/pid-telemetry-lab.png",
  "assets/projects/pid-telemetry-lab-card.png",
  "assets/projects/pid-telemetry-lab.svg",
  "assets/projects/chemblind.png",
  "assets/projects/chemblind-card.png",
  "assets/projects/portfolio-architecture.svg"
)

Write-Host "==> [1/4] Verificando archivos requeridos del portafolio..." -ForegroundColor Cyan
foreach ($file in $requiredFiles) {
  if (-not (Test-Path $file)) {
    throw "Falta archivo requerido: $file"
  }
  $item = Get-Item $file
  if ($item.Length -eq 0) {
    throw "El archivo esta vacio: $file"
  }
}

Write-Host "==> [2/4] Auditando ausencia de placeholders olvidados en js/data.js..." -ForegroundColor Cyan
$dataContent = Get-Content "js/data.js" -Raw -Encoding UTF8
$forbiddenPatterns = @(
  "\[ Agregar Framework \]",
  "Espacio reservado para tu primer proyecto"
)
foreach ($pattern in $forbiddenPatterns) {
  if ($dataContent -match $pattern) {
    throw "Se detecto texto placeholder sin completar en js/data.js: $pattern"
  }
}

Write-Host "==> [3/4] Verificando configuracion unificada y metadatos Open Graph..." -ForegroundColor Cyan
$indexHtml = Get-Content "index.html" -Raw -Encoding UTF8
$cvHtml = Get-Content "cv.html" -Raw -Encoding UTF8

if ($indexHtml -notmatch 'src="js/config.tailwind.js"') {
  throw "index.html no esta utilizando js/config.tailwind.js unificado."
}
if ($indexHtml -notmatch 'property="og:image"') {
  throw "Falta etiqueta og:image en index.html."
}
if ($cvHtml -notmatch 'property="og:image"') {
  throw "Falta etiqueta og:image en cv.html."
}

Write-Host "==> [4/4] Verificando sintaxis de archivos JSON (site.webmanifest)..." -ForegroundColor Cyan
$null = Get-Content "site.webmanifest" -Raw -Encoding UTF8 | ConvertFrom-Json

Write-Host "==> Auditoria superada: Todos los archivos, activos y controles de calidad estan correctos." -ForegroundColor Green
