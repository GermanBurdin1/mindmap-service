# run-migration.ps1
# Script pour executer les migrations dans mindmap-service

param(
    [switch]$Revert,
    [switch]$Show
)

Write-Host "Migrations de base de donnees pour mindmap-service" -ForegroundColor Cyan

if (!(Test-Path "package.json")) {
    Write-Host "Erreur: package.json introuvable. Assurez-vous d'etre dans le repertoire mindmap-service" -ForegroundColor Red
    exit 1
}

if ($Show) {
    Write-Host "Affichage de l'historique des migrations..." -ForegroundColor Yellow
    try {
        npm run typeorm -- migration:show -d src/data-source.ts
    } catch {
        Write-Host "Erreur lors de l'affichage des migrations: $_" -ForegroundColor Red
    }
    exit 0
}

if ($Revert) {
    Write-Host "Annulation de la dernière migration..." -ForegroundColor Yellow
    $confirmation = Read-Host "Êtes-vous sûr de vouloir annuler la dernière migration? (o/N)"
    
    if ($confirmation -eq 'o' -or $confirmation -eq 'O') {
        try {
            npm run typeorm -- migration:revert -d src/data-source.ts
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Migration annulée avec succès!" -ForegroundColor Green
            } else {
                Write-Host "Erreur lors de l'annulation de la migration" -ForegroundColor Red
            }
        } catch {
            Write-Host "Une erreur s'est produite: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "Annulation de la migration annulée" -ForegroundColor Yellow
    }
    exit 0
}

Write-Host "Exécution des migrations..." -ForegroundColor Yellow

try {
    Write-Host "`nStatut actuel des migrations:" -ForegroundColor Blue
    npm run typeorm -- migration:show -d src/data-source.ts
    
    Write-Host "`nApplication des nouvelles migrations..." -ForegroundColor Yellow
    npm run migration:run
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Toutes les migrations ont été appliquées avec succès!" -ForegroundColor Green
        
        Write-Host "`nStatut mis à jour:" -ForegroundColor Blue
        npm run typeorm -- migration:show -d src/data-source.ts
    } else {
        Write-Host "Erreur lors de l'exécution des migrations" -ForegroundColor Red
    }
} catch {
    Write-Host "Une erreur s'est produite: $_" -ForegroundColor Red
}

Write-Host "`nCommandes disponibles:" -ForegroundColor Cyan
Write-Host "   .\run-migration.ps1           - Exécuter toutes les nouvelles migrations" -ForegroundColor Gray
Write-Host "   .\run-migration.ps1 -Show     - Afficher l'historique des migrations" -ForegroundColor Gray
Write-Host "   .\run-migration.ps1 -Revert   - Annuler la dernière migration" -ForegroundColor Gray 