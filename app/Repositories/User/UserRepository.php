<?php


namespace App\Repositories\User;


use App\Contracts\User\UserInterface;
use App\Models\User;

/**
 * Class UserRepository
 * @package App\Repositories\User
 */
class UserRepository implements UserInterface
{
    /**
     * @var User
     */
    protected $model;

    /**
     * UserRepository constructor.
     * @param User $model
     */
    public function __construct(User $model)
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
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->model
            ->with([
                'images' => function ($qb) {
                    $qb->select(
                        'imageable_id',
                        'image_name',
                        'profile_image'
                    )
                        ->where('profile_image', '!=', 1)
                        ->get();
                },
            ])
            ->where('id', $id)
            ->first();
    }

    /**
     * @param $email
     * @return mixed
     */
    public function getByEmail($email)
    {
        return $this->model
            ->where('email', $email)
            ->first();
    }

    /**
     * @param $type
     * @return mixed
     */
    public function getNewestByType($type)
    {
        return $this->model
            ->with([
//                'image' => function ($qb) {
//                    $qb->select('imageable_id', 'image_name', 'profile_image')->get();
//                }
            ])
            ->where('type', $type)
            ->orderBy('id', 'DESC')
            ->skip(0)
            ->take(4)
            ->get();
    }

    /**
     * @param $type
     * @return mixed
     */
    public function getAllByType($type)
    {
        return $this->model
            ->with('imageGallery')
            ->where('type', $type)
            ->orderBy('id', 'DESC')
//            ->skip(0)
//            ->take(3)
            ->get();
    }

    public function update($user_id, $data)
    {
        return $this->model
            ->where('id', $user_id)
            ->update($data);
    }
}
