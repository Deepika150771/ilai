@echo off
set PATH=C:\Users\Admin\AppData\Local\node\node-v20.11.1-win-x64;%PATH%
echo Setting Git Configuration...
git config user.name "Deepika150771"
git config user.email "deepika150771@users.noreply.github.com"
echo Setting Git Remote...
git remote set-url origin https://github.com/Deepika150771/ilaia.git 2>nul || git remote add origin https://github.com/Deepika150771/ilaia.git
echo Committing changes...
git add .
git commit -m "Initial commit of ilai eco-friendly biodegradable sanitary pads web application and Express backend"
echo Pushing to GitHub repository https://github.com/Deepika150771/ilaia ...
git push -u origin main
echo Done!
pause
