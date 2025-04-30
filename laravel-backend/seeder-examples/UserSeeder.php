<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'status' => 'active',
            'last_active_at' => now(),
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        ]);
        $admin->assignRole('super-admin');

        // Create business admin user
        $businessAdmin = User::create([
            'name' => 'Business Admin',
            'email' => 'business@example.com',
            'password' => Hash::make('password'),
            'status' => 'active',
            'last_active_at' => now(),
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=business',
        ]);
        $businessAdmin->assignRole('business-admin');

        // Create moderator user
        $moderator = User::create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
            'password' => Hash::make('password'),
            'status' => 'active',
            'last_active_at' => now(),
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=moderator',
        ]);
        $moderator->assignRole('moderator');

        // Create regular user
        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'status' => 'active',
            'last_active_at' => now(),
            'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        ]);
        $user->assignRole('user');

        // Create some additional users for testing
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'role' => 'user',
                'status' => 'active',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'role' => 'moderator',
                'status' => 'active',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
            ],
            [
                'name' => 'Robert Johnson',
                'email' => 'robert@example.com',
                'role' => 'user',
                'status' => 'inactive',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily@example.com',
                'role' => 'user',
                'status' => 'active',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
            ],
            [
                'name' => 'Michael Wilson',
                'email' => 'michael@example.com',
                'role' => 'moderator',
                'status' => 'pending',
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
                'status' => $userData['status'],
                'last_active_at' => $userData['status'] === 'active' ? now() : null,
                'avatar' => $userData['avatar'],
            ]);
            $user->assignRole($userData['role']);
        }
    }
}
