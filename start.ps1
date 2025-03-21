# Start the client and server applications for Uganda Health Gateway
Write-Host "Starting Uganda Health Gateway..." -ForegroundColor Green

# Start the server
Write-Host "Starting the server on port 5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command cd $PWD\server; node index.js"

# Wait a moment for the server to initialize
Start-Sleep -Seconds 2

# Start the client on port 3000
Write-Host "Starting the client on port 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-Command cd $PWD\client; npm start"

Write-Host "Both applications are starting:" -ForegroundColor Green
Write-Host "- Client: http://localhost:3000" -ForegroundColor Yellow
Write-Host "- Server: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C in each window to stop the applications when done." -ForegroundColor Gray 