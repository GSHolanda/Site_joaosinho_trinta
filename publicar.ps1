# Publica o site por FTP na hospedagem (Hostinger). Uso:
#   .\publicar.ps1                      publica a versao atual, clara (joaosinho-trinta-instituto)
# Antes da primeira publicacao, preencha o arquivo hospedagem.env que esta nesta pasta.

param([string]$Pasta = "joaosinho-trinta-instituto")

$envFile = Join-Path $PSScriptRoot "hospedagem.env"
if (-not (Test-Path $envFile)) { Write-Host "Falta o arquivo hospedagem.env nesta pasta. Copie hospedagem.env.exemplo para hospedagem.env e preencha."; exit 1 }

Get-Content $envFile | ForEach-Object {
  if ($_ -match '^\s*[^#].*=') { $k, $v = $_ -split '=', 2; Set-Variable -Name $k.Trim() -Value $v.Trim() }
}
if (-not $HG_HOST -or $HG_USER -eq "SEU_USUARIO_FTP") { Write-Host "Preencha HG_HOST, HG_USER e HG_PASS no hospedagem.env."; exit 1 }

$deploy = Join-Path $PSScriptRoot $Pasta
if (-not $HG_DIR) { $HG_DIR = "public_html" }
if (-not (Test-Path (Join-Path $deploy "index.html"))) { Write-Host "Nao achei o index.html em $deploy"; exit 1 }

Write-Host "Publicando a pasta $Pasta em $SITE_URL"
$erros = 0
Get-ChildItem $deploy -Recurse -File | ForEach-Object {
  $remote = $_.FullName.Substring($deploy.Length + 1) -replace '\\', '/'
  Write-Host "subindo $remote"
  curl.exe -sS --ssl --ftp-create-dirs -u "${HG_USER}:${HG_PASS}" -T $_.FullName "ftp://$HG_HOST/$HG_DIR/$remote"
  if ($LASTEXITCODE -ne 0) { $erros++; Write-Host "  falhou: $remote" }
}
if ($erros -gt 0) { Write-Host "$erros arquivos falharam. Rode de novo." } else { Write-Host "Pronto. Publicado em $SITE_URL" }
