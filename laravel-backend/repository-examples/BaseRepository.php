<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all models.
     *
     * @param array $columns
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all(array $columns = ['*'], array $relations = []): Collection
    {
        return $this->model->with($relations)->get($columns);
    }

    /**
     * Get all models with pagination.
     *
     * @param int $perPage
     * @param array $columns
     * @param array $relations
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(int $perPage = 10, array $columns = ['*'], array $relations = [])
    {
        return $this->model->with($relations)->paginate($perPage, $columns);
    }

    /**
     * Find model by id.
     *
     * @param int $modelId
     * @param array $columns
     * @param array $relations
     * @param array $appends
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function find(int $modelId, array $columns = ['*'], array $relations = [], array $appends = [])
    {
        return $this->model->select($columns)->with($relations)->find($modelId)?->append($appends);
    }

    /**
     * Find model by id or fail.
     *
     * @param int $modelId
     * @param array $columns
     * @param array $relations
     * @param array $appends
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function findOrFail(int $modelId, array $columns = ['*'], array $relations = [], array $appends = []): Model
    {
        return $this->model->select($columns)->with($relations)->findOrFail($modelId)->append($appends);
    }

    /**
     * Create a model.
     *
     * @param array $payload
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $payload): Model
    {
        $model = $this->model->create($payload);

        return $model;
    }

    /**
     * Update existing model.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param array $payload
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update(Model $model, array $payload): Model
    {
        $model->update($payload);

        return $model;
    }

    /**
     * Delete model by id.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return bool
     */
    public function delete(Model $model): bool
    {
        return $model->delete();
    }
}
