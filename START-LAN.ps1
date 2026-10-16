# Запуск сервера ЯблокИИ: API и сайт на одном порту 8000.
# После запуска откройте напечатанный адрес на телефоне/планшете/другом ПК
# в этой же сети — данные будут живые (бейдж «онлайн»), а не демо.
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if (-not (Test-Path "frontend\dist\index.html")) {
  Write-Host "Сайт ещё не собран. Собираю (нужен Node.js, делается один раз)..." -ForegroundColor Yellow
  Push-Location frontend
  cmd /c "npm install && npm run build"
  Pop-Location
}

Write-Host ""
Write-Host "Открывайте на своих устройствах:" -ForegroundColor Green
Write-Host "  http://localhost:8000            (этот компьютер)"
# только реальные сетевые карты (Wi-Fi / Ethernet), без VPN-туннелей
$lanAdapters = Get-NetAdapter -ErrorAction SilentlyContinue |
  Where-Object { $_.Status -eq 'Up' -and $_.MediaType -like '*802*' } |
  Select-Object -ExpandProperty Name
Get-NetIPConfiguration -ErrorAction SilentlyContinue |
  Where-Object { $lanAdapters -contains $_.InterfaceAlias -and $_.IPv4Address } |
  ForEach-Object { $_.IPv4Address.IPAddress } |
  Select-Object -Unique |
  ForEach-Object { Write-Host "  http://${_}:8000" }
Write-Host ""
Write-Host "Окно не закрывать, пока нужен сервер. Ctrl+C — остановить." -ForegroundColor DarkGray
Write-Host ""

python -m uvicorn backend.app:app --port 8000 --host 0.0.0.0
