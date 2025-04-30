<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository
{
    /**
     * UserRepository constructor.
     *
     * @param \App\Models\User $model
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all users with pagination and filtering.
     *
     * @param int $perPage
     * @param string|null $search
     * @param string|null $role
     * @param string|null $status
     * @param string|null $sortBy
     * @param string|null $sortDirection
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getAllWithPagination(
        int $perPage = 10,
        ?string $search = null,
        ?string $role = null,
        ?string $status = null,
        ?string $sortBy = null,
        ?string $sortDirection = null
    ) {
        $query = $this->model->with('roles');

        // Apply search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply role filter
        if ($role && $role !== 'all') {
            $query->whereHas('roles', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }

        // Apply status filter
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        // Apply sorting
        if ($sortBy && in_array($sortBy, ['name', 'email', 'status', 'created_at'])) {
            $direction = $sortDirection === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortBy, $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($perPage);
    }

    /**
     * Find user by email.
     *
     * @param string $email
     * @return \App\Models\User|null
     */
    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }

    /**
     * Get users by role.
     *
     * @param string $role
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByRole(string $role)
    {
        return $this->model->role($role)->get();
    }

    /**
     * Get users by status.
     *
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    /**
     * Get active users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getActive()
    {
        return $this->getByStatus('active');
    }

    /**
     * Get inactive users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getInactive()
    {
        return $this->getByStatus('inactive');
    }

    /**
     * Get pending users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPending()
    {
        return $this->getByStatus('pending');
    }
}
