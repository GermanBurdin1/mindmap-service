# generate-migration.ps1
# Script pour generer de nouvelles migrations dans mindmap-service

param(
    [Parameter(Mandatory=$true)]
    [string]$MigrationName
)

Write-Host "Generation de la migration: $MigrationName" -ForegroundColor Cyan

# Verifions que nous sommes dans le bon repertoire
if (!(Test-Path "package.json")) {
    Write-Host "ERREUR: package.json introuvable. Assurez-vous d'etre dans le repertoire mindmap-service" -ForegroundColor Red
    exit 1
}

# Generons la migration
try {
    Write-Host "Execution de la commande: npm run migration:generate -- src/migrations/$MigrationName -d src/data-source.ts" -ForegroundColor Yellow
    npm run migration:generate -- src/migrations/$MigrationName -d src/data-source.ts
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCES: Migration '$MigrationName' generee avec succes!" -ForegroundColor Green
        Write-Host "Verifiez le fichier dans le dossier src/migrations/" -ForegroundColor Gray
    } else {
        Write-Host "ERREUR: lors de la generation de la migration" -ForegroundColor Red
    }
} catch {
    Write-Host "ERREUR: Une erreur s'est produite: $_" -ForegroundColor Red
}

# Affichons la liste des migrations
Write-Host "`nMigrations actuelles:" -ForegroundColor Blue
Get-ChildItem -Path "src/migrations" -Filter "*.ts" | Sort-Object Name | ForEach-Object {
    Write-Host "   - $($_.Name)" -ForegroundColor Gray
}

Write-Host "`nPour appliquer la migration, utilisez: .\run-migration.ps1" -ForegroundColor Cyan 