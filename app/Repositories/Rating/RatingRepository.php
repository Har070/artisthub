<?php


namespace App\Repositories\Rating;
use App\Contracts\Rating\RatingInterface;
use App\Models\Rating;

/**
 * Class RatingRepository
 * @package App\Repositories\Rating
 */
class RatingRepository implements RatingInterface
{
    /**
     * @var Rating
     */
    protected $model;

    /**
     * RatingRepository constructor.
     * @param Rating $model
     */
    public function __construct(Rating $model)
    {
        $this->model = $model;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function store($data)
    {
        return $this->model->create($data);
    }

    /**
     * @param $data
     * @return mixed
     */
    public function updateOrCreate($data)
    {
        return $this->model
            ->updateOrCreate([
            'user_id'   => $data['user_id'],
            'singer_id' => $data['singer_id'],
        ], $data);
    }
}
