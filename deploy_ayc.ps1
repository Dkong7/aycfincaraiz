# ==========================================
# SCRIPT DE DESPLIEGUE AYC (VERSION LIMPIA)
# ==========================================

$SERVER_IP   = "209.126.77.41"
$USER        = "root"
$REMOTE_DIR  = "/root/ayc_fincaraiz"
$SERVICE     = "ayc-web"
$PORT        = "8080"

# Usamos ${} para separar la variable de los dos puntos
Write-Host "INICIANDO DESPLIEGUE EN ${SERVER_IP}:${PORT} ..." -ForegroundColor Cyan

# 1. Empaquetar DB Local
Write-Host "[1/4] Empaquetando base de datos..." -ForegroundColor Yellow
if (Test-Path "pb_data.zip") { Remove-Item "pb_data.zip" -Force }
Compress-Archive -Path "pb_data" -DestinationPath "pb_data.zip" -Force

# 2. Compilar React
Write-Host "[2/4] Compilando codigo web..." -ForegroundColor Yellow
cmd /c "npm run build"

if (!(Test-Path "dist")) {
    Write-Host "ERROR: No se creo la carpeta dist." -ForegroundColor Red
    exit
}

# 3. Subir Archivos
Write-Host "[3/4] Subiendo archivos al servidor..." -ForegroundColor Cyan
scp "pb_data.zip" "${USER}@${SERVER_IP}:${REMOTE_DIR}/"
ssh ${USER}@${SERVER_IP} "rm -rf ${REMOTE_DIR}/pb_public/*"
scp -r dist/* "${USER}@${SERVER_IP}:${REMOTE_DIR}/pb_public/"

# 4. Reiniciar Servidor Remoto
Write-Host "[4/4] Reiniciando servicio en Contabo..." -ForegroundColor Yellow
ssh ${USER}@${SERVER_IP} "
    systemctl stop ${SERVICE}
    cd ${REMOTE_DIR}
    rm -rf pb_data
    unzip -o -q pb_data.zip
    rm pb_data.zip
    systemctl start ${SERVICE}
"

Write-Host "DESPLIEGUE FINALIZADO EXITOSAMENTE." -ForegroundColor Green
Write-Host "LINK: http://${SERVER_IP}:${PORT}" -ForegroundColor Green
