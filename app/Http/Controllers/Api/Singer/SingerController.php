<?php

namespace App\Http\Controllers\Api\Singer;

use Exception;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Contracts\User\UserInterface;

/**
 * Class SingerController
 * @package App\Http\Controllers\Api\Singer
 */
class SingerController extends Controller
{
    /**
     * @var UserInterface
     */
    protected $userRepo;

    public function __construct(UserInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * @return JsonResponse
     */
    public function getNew()
    {
        try {
            $users = $this->userRepo->getNewestByType(['type' => 'singer']);

            return response()->json([
                'success' => 1,
                'users'   => $users,
            ]);
        } catch (Exception $exception) {
            dd($exception);
            return response()->json([
                'success' => 0,
                'message' => $exception,
            ]);
        }
    }

    /**
     * @return JsonResponse
     */
    public function getAll()
    {
        try {
            $users = $this->userRepo->getAllByType(['type' => 'singer']);
//            dd($users);

            return response()->json([
                'success' => 1,
                'users'   => $users,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => $exception,
            ]);
        }
    }

    /**
     * @return JsonResponse
     */
    public function getTop()
    {
        try {
            $users = $this->userRepo->getAllByType(['type' => 'singer']);

            return response()->json([
                'success' => 1,
                'users'   => $users,
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => $exception,
            ]);
        }
    }

//    /**
//     * @param $user_id
//     * @return JsonResponse
//     */
//    public function getDefaultUser($user_id)
//    {
//        try {
//            $user = $this->userRepo->getById($user_id);
//
//            return response()->json([
//                'success' => 1,
//                'user'    => $user,
//            ]);
//        } catch (Exception $exception) {
//            return response()->json([
//                'success' => 0,
//                'message' => $exception,
//            ]);
//        }
//    }
}
