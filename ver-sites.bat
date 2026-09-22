@echo off
rem Abre as duas versoes do site no navegador, com o servidor local ligado.
cd /d "%~dp0"
start "" http://127.0.0.1:8080/joaosinho-trinta/index.html
start "" http://127.0.0.1:8080/joaosinho-trinta-instituto/index.html
echo Servidor local ligado. Deixe esta janela aberta enquanto estiver vendo os sites.
echo Para fechar, aperte Ctrl+C nesta janela.
node serve.js
pause
