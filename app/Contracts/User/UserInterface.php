<?php


namespace App\Contracts\User;


/**
 * Interface UserInterface
 * @package App\Contracts\User
 */
interface UserInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function store($data);

    /**
     * @param $id
     * @return mixed
     */
    public function getById($id);

    /**
     * @param $email
     * @return mixed
     */
    public function getByEmail($email);

    /**
     * @param $type
     * @return mixed
     */
    public function getNewestByType($type);

    /**
     * @param $type
     * @return mixed
     */
    public function getAllByType($type);

    /**
     * @param $user_id
     * @param $data
     * @return mixed
     */
    public function update($user_id, $data);
}
