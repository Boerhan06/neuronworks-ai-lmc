@echo off
setlocal

if "%1"=="dev" goto do_dev
if "%1"=="test" goto do_test
if "%1"=="lint" goto do_lint
if "%1"=="typecheck" goto do_typecheck
if "%1"=="build" goto do_build
if "%1"=="" goto do_dev

if exist C:\MinGW\bin\mingw32-make.exe (
  C:\MinGW\bin\mingw32-make.exe %*
  exit /b %ERRORLEVEL%
)

echo Unknown target: %1
echo Usage: make [dev^|test^|lint^|typecheck^|build]
exit /b 1

:do_dev
pnpm dev
exit /b %ERRORLEVEL%

:do_test
pnpm test
exit /b %ERRORLEVEL%

:do_lint
pnpm lint
exit /b %ERRORLEVEL%

:do_typecheck
pnpm typecheck
exit /b %ERRORLEVEL%

:do_build
pnpm build
exit /b %ERRORLEVEL%
