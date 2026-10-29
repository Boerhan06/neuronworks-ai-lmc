param(
    [string]$Target = "dev"
)

switch ($Target) {
    "dev" { pnpm dev }
    "test" { pnpm test }
    "lint" { pnpm lint }
    "typecheck" { pnpm typecheck }
    "build" { pnpm build }
    "infra-up" { docker compose -f infra/docker-compose.yml up -d }
    "infra-down" { docker compose -f infra/docker-compose.yml down }
    default {
        if (Test-Path "C:\MinGW\bin\mingw32-make.exe") {
            & C:\MinGW\bin\mingw32-make.exe $Target
        } else {
            Write-Error "Target tidak dikenal: $Target. Pilihan: dev, test, lint, typecheck, build, infra-up, infra-down"
        }
    }
}

