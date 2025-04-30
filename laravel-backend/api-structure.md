# API Structure

## Authentication Endpoints

```
POST /api/login
POST /api/register
POST /api/logout
GET /api/user
POST /api/password/email
POST /api/password/reset
```

## User Management Endpoints

```
GET /api/users
POST /api/users
GET /api/users/{id}
PATCH /api/users/{id}
DELETE /api/users/{id}
PATCH /api/users/{id}/status
POST /api/users/password-reset
GET /api/users/{id}/permissions
GET /api/users/{id}/activity-logs
```

## Role Management Endpoints

```
GET /api/roles
POST /api/roles
GET /api/roles/{id}
PATCH /api/roles/{id}
DELETE /api/roles/{id}
GET /api/roles/{id}/users
GET /api/roles/{id}/permissions
PUT /api/roles/{id}/permissions
```

## Permission Management Endpoints

```
GET /api/permissions
```

## Activity Log Endpoints

```
GET /api/activity-logs
GET /api/activity-logs/{id}
GET /api/activity-logs/export
```

## Widget Management Endpoints

```
GET /api/widgets
POST /api/widgets
GET /api/widgets/{id}
PATCH /api/widgets/{id}
DELETE /api/widgets/{id}
POST /api/widgets/{id}/publish
```

## Knowledge Base Endpoints

```
GET /api/kb/articles
POST /api/kb/articles
GET /api/kb/articles/{id}
PATCH /api/kb/articles/{id}
DELETE /api/kb/articles/{id}
GET /api/kb/categories
POST /api/kb/categories
GET /api/kb/categories/{id}
PATCH /api/kb/categories/{id}
DELETE /api/kb/categories/{id}
```

## AI Configuration Endpoints

```
GET /api/ai/models
POST /api/ai/models
GET /api/ai/models/{id}
PATCH /api/ai/models/{id}
DELETE /api/ai/models/{id}
GET /api/ai/prompts
POST /api/ai/prompts
GET /api/ai/prompts/{id}
PATCH /api/ai/prompts/{id}
DELETE /api/ai/prompts/{id}
POST /api/ai/test
GET /api/ai/logs
```

## Analytics Endpoints

```
GET /api/analytics/conversations
GET /api/analytics/users
GET /api/analytics/performance
GET /api/analytics/export
```
