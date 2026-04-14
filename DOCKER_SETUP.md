# Docker Setup Guide

## Overview
This project uses Docker Compose to orchestrate three services:
- **MySQL Database** (port 3306)
- **Backend API** (port 5000) - Node.js/Express
- **Frontend** (port 3000) - React/Vite with Nginx

## Files Modified/Created

### 1. Backend Changes
- ✅ Added `start` script to `package.json`
- ✅ Simplified `dockerfile` for better performance
- ✅ Updated CORS configuration to work in Docker environment

### 2. Frontend Changes
- ✅ Created `nginx.conf` - Nginx configuration for SPA routing
- ✅ Updated `dockerfile` to use nginx.conf

### 3. Docker Compose
- ✅ Updated `docker-compose.yml` with:
  - Environment variables for Node.js
  - Volume for backend uploads persistence
  - Updated CORS configuration

### 4. Environment File
- ✅ Created `.env.example` - Reference for environment variables

## Prerequisites

Make sure you have installed:
- Docker Desktop (Windows: https://www.docker.com/products/docker-desktop)
- Docker Compose (included with Docker Desktop)

## Quick Start

### Step 1: Verify Docker Installation
```bash
docker --version
docker-compose --version
```

### Step 2: Navigate to Project Directory
```bash
cd c:\Users\Jagta\OneDrive\Desktop\next_genturfclon\Turf-new
```

### Step 3: Build Docker Images
```bash
docker-compose build
```

This will:
- Build MySQL image (if not cached)
- Build backend Node.js image
- Build frontend Nginx image

### Step 4: Start Containers
```bash
docker-compose up -d
```

The `-d` flag runs containers in detached mode (background).

### Step 5: Verify Services
```bash
docker-compose ps
```

You should see three running containers:
- myapp-db (MySQL)
- myapp-backend (Node.js)
- myapp-frontend (Nginx)

## Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:3306

## Database Setup

The MySQL database will be automatically created with:
- Database: `mydb`
- User: `appuser`
- Password: `apppass`
- Root Password: `rootpass`

To initialize tables, run:
```bash
docker exec myapp-db mysql -u appuser -papppass mydb < ./backend/database_setup.sql
```

Or if you have additional SQL files:
```bash
docker exec myapp-db mysql -u appuser -papppass mydb < ./backend/pricing_schema.sql
```

## Common Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

### Stop Containers
```bash
docker-compose stop
```

### Restart Containers
```bash
docker-compose restart
```

### Remove Containers and Volumes
```bash
docker-compose down -v
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

## Troubleshooting

### Backend can't connect to database
- **Issue**: Backend fails to connect when starting
- **Solution**: MySQL takes time to initialize. The health check waits up to 20 seconds. If still failing:
  ```bash
  docker-compose logs database
  docker-compose restart backend
  ```

### Frontend not loading API data
- **Issue**: 404 or CORS errors
- **Solution**: Ensure backend is running and check logs:
  ```bash
  docker-compose logs backend
  ```

### Port Already in Use
- **Issue**: `Error: bind: address already in use`
- **Solution**: Change ports in `docker-compose.yml`:
  ```yaml
  ports:
    - "3001:3000"  # Changed from 3000
    - "5001:5000"  # Changed from 5000
    - "3307:3306"  # Changed from 3306
  ```

### Clean Rebuild (Start Fresh)
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## Environment Variables

Edit `docker-compose.yml` to change:
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `SESSION_SECRET` (change for production)
- `NODE_ENV` (set to 'development' or 'production')

## Production Considerations

For production deployment:
1. Change `SESSION_SECRET` to a strong random string
2. Use environment-specific variables
3. Set `NODE_ENV=production`
4. Enable HTTPS
5. Use proper backup strategy for database volumes
6. Consider using Docker secrets for sensitive data

## Network Communication

All services communicate through the `app-network` bridge network:
- Backend → Database: Use hostname `database`
- Frontend → Backend: Use hostname `backend` (for nginx proxy)
- External access: Use `localhost:port`

## File Structure for Docker

```
Turf-new/
├── docker-compose.yml      # Main orchestration file
├── .env.example            # Environment variables template
├── backend/
│   ├── dockerfile          # Backend container definition
│   ├── package.json        # Node.js dependencies
│   ├── server.js           # Express server entry point
│   ├── database_setup.sql  # Initial database schema
│   ├── pricing_schema.sql  # Additional schema
│   └── uploads/            # Persisted volume
├── frontend/
│   ├── dockerfile          # Frontend container definition
│   ├── nginx.conf          # Nginx server configuration
│   ├── package.json        # React/Vite dependencies
│   ├── vite.config.js      # Vite build configuration
│   └── dist/               # Build output (generated)
└── DOCKER_SETUP.md         # This file
```

---

For more help, check Docker documentation: https://docs.docker.com/
