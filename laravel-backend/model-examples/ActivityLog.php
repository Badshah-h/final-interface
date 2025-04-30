<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'action',
        'target',
        'details',
        'ip_address',
        'user_agent',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'details' => 'array',
    ];

    /**
     * Get the user that performed the action.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Create a new activity log entry.
     *
     * @param string $action
     * @param string $target
     * @param array|null $details
     * @param \App\Models\User|null $user
     * @return static
     */
    public static function log($action, $target, $details = null, $user = null)
    {
        $userId = $user ? $user->id : (auth()->check() ? auth()->id() : null);

        return static::create([
            'user_id' => $userId,
            'action' => $action,
            'target' => $target,
            'details' => $details,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
