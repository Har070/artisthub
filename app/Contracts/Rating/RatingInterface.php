<?php


namespace App\Contracts\Rating;

/**
 * Interface RatingInterface
 * @package App\Contracts\Rating
 */
interface RatingInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function store($data);

    /**
     * @param $data
     * @return mixed
     */
    public function updateOrCreate($data);
}
