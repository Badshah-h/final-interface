<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'guard_name',
        'category',
    ];

    /**
     * Get all permissions grouped by category.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getByCategory()
    {
        return static::all()->groupBy('category');
    }
}
