# Frontend-Backend Integration Guide

## API Integration

The React frontend is already set up to communicate with a RESTful API. The Laravel backend provides this API. Here's how to integrate them:

### 1. Update API Base URL

In the React frontend, update the API base URL in `src/services/api/config.ts`:

```typescript
// Base API URL - would be replaced with actual API URL in production
export const API_BASE_URL = "http://localhost:8000/api";

// Flag to toggle between mock and real API
export const USE_MOCK_API = false; // Set to false to use the real API
```

### 2. CORS Configuration

Ensure that the Laravel backend is configured to accept requests from the React frontend. This is already set up in the Laravel CORS configuration.

### 3. Authentication

The React frontend uses token-based authentication. The Laravel backend provides this via Laravel Sanctum. When a user logs in, the backend returns a token that the frontend stores and includes in subsequent requests.

### 4. API Endpoints

The Laravel backend provides the following API endpoints that match the frontend expectations:

- **Authentication**
  - `POST /api/login`
  - `POST /api/register`
  - `POST /api/logout`
  - `GET /api/user`

- **User Management**
  - `GET /api/users`
  - `POST /api/users`
  - `GET /api/users/{id}`
  - `PATCH /api/users/{id}`
  - `DELETE /api/users/{id}`

- **Role Management**
  - `GET /api/roles`
  - `POST /api/roles`
  - `GET /api/roles/{id}`
  - `PATCH /api/roles/{id}`
  - `DELETE /api/roles/{id}`

- **Permission Management**
  - `GET /api/permissions`

- **Activity Logs**
  - `GET /api/activity-logs`
  - `GET /api/activity-logs/{id}`
  - `GET /api/activity-logs/export`

### 5. Response Format

The Laravel backend returns responses in the following format, which matches the frontend expectations:

```json
{
  "data": { ... },
  "message": "Success message",
  "meta": { ... } // For paginated responses
}
```

For paginated responses:

```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 10,
    "path": "http://localhost:8000/api/users",
    "per_page": 10,
    "to": 10,
    "total": 100
  }
}
```

## Development Workflow

1. Start the Laravel backend:
   ```bash
   cd laravel-backend
   php artisan serve
   ```

2. Start the React frontend:
   ```bash
   npm run dev
   ```

3. The React frontend will now communicate with the Laravel backend API.

## Production Deployment

For production deployment, you have several options:

1. **Separate Deployments**:
   - Deploy the Laravel backend to a server/VPS
   - Deploy the React frontend to a static hosting service (Netlify, Vercel, etc.)
   - Configure the frontend to use the production API URL

2. **Single Server Deployment**:
   - Build the React frontend: `npm run build`
   - Copy the build files to the Laravel public directory
   - Configure Laravel to serve the React app and API from the same domain

3. **Docker Deployment**:
   - Use Docker Compose to run both the frontend and backend containers
   - Configure a reverse proxy (Nginx) to route requests appropriately

## Testing the Integration

1. Ensure both the frontend and backend are running
2. Set `USE_MOCK_API = false` in the frontend config
3. Try logging in with a user created in the Laravel backend
4. Test CRUD operations for users, roles, etc.
5. Verify that data is being stored in the database
