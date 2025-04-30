# ChatSystem Laravel Backend

This is the Laravel backend for the ChatSystem application. It provides the API endpoints for the React frontend.

## Requirements

- PHP >= 8.1
- Composer
- MySQL

## Installation

1. Clone the repository
2. Navigate to the `laravel-backend` directory
3. Run `composer install`
4. Copy `.env.example` to `.env` and configure your database settings
5. Run `php artisan key:generate`
6. Run `php artisan migrate`
7. Run `php artisan db:seed` (optional, for development data)
8. Run `php artisan serve` to start the development server

## API Documentation

API endpoints are documented using OpenAPI/Swagger. After installation, you can access the documentation at `/api/documentation`.

## Directory Structure

- `app/Http/Controllers/Api` - API controllers
- `app/Models` - Eloquent models
- `app/Services` - Business logic services
- `app/Repositories` - Data access repositories
- `app/Policies` - Authorization policies
- `database/migrations` - Database migrations
- `routes/api.php` - API routes

## Authentication

This API uses Laravel Sanctum for authentication. To authenticate, send a POST request to `/api/login` with your email and password.
