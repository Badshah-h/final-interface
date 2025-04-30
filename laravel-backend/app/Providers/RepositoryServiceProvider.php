<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Models
use App\Models\User;
use App\Models\Role;
use App\Models\ActivityLog;
use Spatie\Permission\Models\Permission;

// Repositories
use App\Repositories\UserRepository;
use App\Repositories\RoleRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\ActivityLogRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepository::class, function ($app) {
            return new UserRepository(new User());
        });

        $this->app->bind(RoleRepository::class, function ($app) {
            return new RoleRepository(new Role());
        });

        $this->app->bind(PermissionRepository::class, function ($app) {
            return new PermissionRepository(new Permission());
        });

        $this->app->bind(ActivityLogRepository::class, function ($app) {
            return new ActivityLogRepository(new ActivityLog());
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
