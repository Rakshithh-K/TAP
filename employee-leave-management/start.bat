@echo off
echo Starting Employee Leave Management System...
echo.

echo Step 1: Starting MongoDB (if not already running)
echo Please ensure MongoDB is installed and running
echo If MongoDB is not running, start it with: mongod
echo.

echo Step 2: Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
cd ..

echo Step 3: Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo.
echo Both servers should now be starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Test credentials:
echo Employee: employee@test.com / password123
echo Manager: manager@test.com / password123
pause