<?php

namespace App\Http\Controllers\Api\Rating;

use Exception;
use App\Events\Rating\Rated;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Contracts\User\UserInterface;
use App\Contracts\Rating\RatingInterface;
use App\Http\Requests\Rating\RatingRequest;

/**
 * Class RatingController
 * @package App\Http\Controllers\Api\Rating
 */
class RatingController extends Controller
{
    /**
     * @var RatingInterface
     */
    protected $ratingRepo;

    /**
     * @var
     */
    protected $userRepo;

    /**
     * RatingController constructor.
     * @param RatingInterface $ratingRepo
     * @param UserInterface $userRepo
     */
    public function __construct(RatingInterface $ratingRepo, UserInterface $userRepo)
    {
        $this->ratingRepo = $ratingRepo;
        $this->userRepo = $userRepo;
    }

    /**
     * @param RatingRequest $request
     * @return JsonResponse
     */
    public function store(RatingRequest $request): JsonResponse
    {
        try {
            $rate = $this->ratingRepo->updateOrCreate($request->all());

            $data = [
                'success'   => 1,
                'singer_id' => $rate->singer_id,
            ];

            broadcast(new Rated($data));

            $user = $this->userRepo->getById($request->singer_id);

            return response()->json([
                'success' => 1,
                'user'    => $user,
                'message' => 'Rated',
            ]);
        } catch(Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => 'Something went wrong!',
                'error'   => $exception->getMessage(),
            ]);
        }
    }
}
