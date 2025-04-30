<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\ActivityLogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/password/email', [AuthController::class, 'sendPasswordResetLink']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // User management
    Route::apiResource('users', UserController::class);
    Route::patch('/users/{id}/status', [UserController::class, 'updateStatus']);
    Route::post('/users/password-reset', [UserController::class, 'sendPasswordReset']);
    Route::get('/users/{id}/permissions', [UserController::class, 'permissions']);
    Route::get('/users/{id}/activity-logs', [UserController::class, 'activityLogs']);

    // Role management
    Route::apiResource('roles', RoleController::class);
    Route::get('/roles/{id}/users', [RoleController::class, 'users']);
    Route::get('/roles/{id}/permissions', [RoleController::class, 'permissions']);
    Route::put('/roles/{id}/permissions', [RoleController::class, 'updatePermissions']);

    // Permission management
    Route::get('/permissions', [PermissionController::class, 'index']);

    // Activity logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);
    Route::get('/activity-logs/{id}', [ActivityLogController::class, 'show']);
    Route::get('/activity-logs/export', [ActivityLogController::class, 'export']);

    // Widget management
    Route::apiResource('widgets', 'WidgetController');
    Route::post('/widgets/{id}/publish', 'WidgetController@publish');

    // Knowledge base
    Route::apiResource('kb/articles', 'KbArticleController');
    Route::apiResource('kb/categories', 'KbCategoryController');

    // AI configuration
    Route::apiResource('ai/models', 'AiModelController');
    Route::apiResource('ai/prompts', 'AiPromptController');
    Route::post('/ai/test', 'AiController@test');
    Route::get('/ai/logs', 'AiController@logs');

    // Analytics
    Route::get('/analytics/conversations', 'AnalyticsController@conversations');
    Route::get('/analytics/users', 'AnalyticsController@users');
    Route::get('/analytics/performance', 'AnalyticsController@performance');
    Route::get('/analytics/export', 'AnalyticsController@export');
});
