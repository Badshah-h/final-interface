# Laravel Backend Setup Guide

## Initial Setup

```bash
# Install Laravel via Composer
composer create-project laravel/laravel .

# Install required packages
composer require laravel/sanctum
composer require spatie/laravel-permission
composer require owen-it/laravel-auditing
composer require darkaonline/l5-swagger

# Set up Laravel Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Set up Spatie Permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

# Set up Laravel Auditing
php artisan vendor:publish --provider="OwenIt\Auditing\AuditingServiceProvider"

# Set up L5 Swagger
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"

# Run migrations
php artisan migrate
```

## Configure CORS

Edit `config/cors.php` to allow requests from your frontend:

```php
<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Add your frontend URL
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## Configure Sanctum

Edit `config/sanctum.php` to set the stateful domains:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
```

## Create Base Models

Run the following commands to create the base models:

```bash
php artisan make:model User -m
php artisan make:model Role -m
php artisan make:model Permission -m
php artisan make:model ActivityLog -m
```

## Create Controllers

```bash
php artisan make:controller Api/AuthController
php artisan make:controller Api/UserController --api
php artisan make:controller Api/RoleController --api
php artisan make:controller Api/PermissionController --api
php artisan make:controller Api/ActivityLogController --api
```

## Create Services

```bash
php artisan make:provider AppServiceProvider
php artisan make:provider RepositoryServiceProvider
```

## Create Repositories

```bash
mkdir -p app/Repositories
touch app/Repositories/BaseRepository.php
touch app/Repositories/UserRepository.php
touch app/Repositories/RoleRepository.php
touch app/Repositories/PermissionRepository.php
touch app/Repositories/ActivityLogRepository.php
```

## Create API Resources

```bash
php artisan make:resource UserResource
php artisan make:resource RoleResource
php artisan make:resource PermissionResource
php artisan make:resource ActivityLogResource
```

## Create API Requests

```bash
php artisan make:request Api/LoginRequest
php artisan make:request Api/RegisterRequest
php artisan make:request Api/UserStoreRequest
php artisan make:request Api/UserUpdateRequest
php artisan make:request Api/RoleStoreRequest
php artisan make:request Api/RoleUpdateRequest
```

## Set Up API Routes

Edit `routes/api.php` to define your API routes.
