<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User Management
            ['name' => 'create_users', 'category' => 'User Management'],
            ['name' => 'edit_users', 'category' => 'User Management'],
            ['name' => 'delete_users', 'category' => 'User Management'],
            ['name' => 'assign_roles', 'category' => 'User Management'],
            ['name' => 'view_users', 'category' => 'User Management'],
            
            // AI Configuration
            ['name' => 'manage_models', 'category' => 'AI Configuration'],
            ['name' => 'edit_prompts', 'category' => 'AI Configuration'],
            ['name' => 'test_ai', 'category' => 'AI Configuration'],
            ['name' => 'view_ai_logs', 'category' => 'AI Configuration'],
            
            // Widget Builder
            ['name' => 'create_widgets', 'category' => 'Widget Builder'],
            ['name' => 'edit_widgets', 'category' => 'Widget Builder'],
            ['name' => 'publish_widgets', 'category' => 'Widget Builder'],
            ['name' => 'delete_widgets', 'category' => 'Widget Builder'],
            
            // Knowledge Base
            ['name' => 'create_kb_articles', 'category' => 'Knowledge Base'],
            ['name' => 'edit_kb_articles', 'category' => 'Knowledge Base'],
            ['name' => 'delete_kb_articles', 'category' => 'Knowledge Base'],
            ['name' => 'manage_kb_categories', 'category' => 'Knowledge Base'],
            
            // System Settings
            ['name' => 'manage_api_keys', 'category' => 'System Settings'],
            ['name' => 'billing_subscription', 'category' => 'System Settings'],
            ['name' => 'system_backup', 'category' => 'System Settings'],
            ['name' => 'view_audit_logs', 'category' => 'System Settings'],
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission['name'],
                'category' => $permission['category'],
                'guard_name' => 'web',
            ]);
        }

        // Create roles and assign permissions
        $superAdmin = Role::create(['name' => 'super-admin', 'description' => 'Full access to all system features and settings']);
        $superAdmin->givePermissionTo(Permission::all());

        $businessAdmin = Role::create(['name' => 'business-admin', 'description' => 'Manage business-specific settings and content']);
        $businessAdmin->givePermissionTo([
            'create_users',
            'edit_users',
            'manage_models',
            'edit_prompts',
            'test_ai',
            'view_ai_logs',
            'create_widgets',
            'edit_widgets',
            'publish_widgets',
            'create_kb_articles',
            'edit_kb_articles',
            'delete_kb_articles',
            'manage_kb_categories',
            'view_audit_logs',
        ]);

        $moderator = Role::create(['name' => 'moderator', 'description' => 'Monitor conversations and manage content']);
        $moderator->givePermissionTo([
            'create_kb_articles',
            'edit_kb_articles',
            'manage_kb_categories',
            'test_ai',
            'view_ai_logs',
        ]);

        $user = Role::create(['name' => 'user', 'description' => 'Regular user with limited access']);
        // No specific permissions for regular users
    }
}
