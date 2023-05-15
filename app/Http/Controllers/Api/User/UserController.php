<?php

namespace App\Http\Controllers\Api\User;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Contracts\User\UserInterface;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;

/**
 * Class UserController
 * @package App\Http\Controllers\Api\User
 */
class UserController extends Controller
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
     * get auth user.
     *
     * @return JsonResponse
     */
    public function auth(): JsonResponse
    {
        try {
            $auth = auth()->user();

            if(!$auth){
                return response()->json([
                    'success' => 0,
                    'user'    => null,
                ]);
            } else {
                $user = $this->userRepo->getById($auth->id);

                return response()->json([
                    'success' => 1,
                    'user'    => $user,
                ]);
            }
        } catch (Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => $exception,
            ]);
        }
    }

    /***
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $id = $request->id;

        try {
            if(!$id){
                return response()->json([
                    'success' => 0,
                    'user'    => null,
                ]);
            } else {
                $user = $this->userRepo->getById($id);

                return response()->json([
                    'success' => 1,
                    'user'    => $user,
                ]);
            }
        } catch (Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => $exception,
            ]);
        }
    }

    /**
     * @param UserStoreRequest $request
     * @return JsonResponse
     */
    public function store(UserStoreRequest $request): JsonResponse
    {
        try {
            $path = storage_path('app/public/uploads/images/users');

            if (!file_exists($path)) {
                mkdir(storage_path('app/public/uploads'));
                mkdir(storage_path('app/public/uploads/images'));
                mkdir(storage_path('app/public/uploads/images/users'));
            }

            $user = $this->userRepo->store($request->all());

            mkdir(storage_path('app/public/uploads/images/users/' . $user->id));
            mkdir(storage_path('app/public/uploads/images/users/' . $user->id . '/avatar'));

            $image = $request->file('image');
            $file_name = time().rand(3, 5) . '.' . $image->getClientOriginalExtension();

            $user->images()->create([
                'profile_image' => true,
                'image_name'    => $file_name,
            ]);
            $image->move(storage_path('app/public/uploads/images/users/' . $user->id . '/avatar'), $file_name);

            return response()->json([
                'success' => 1,
                'message' => 'You are successfully registered.'
            ]);
        } catch(Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => 'Something went wrong!',
                'error'   => $exception->getMessage(),
            ]);
        }
    }


    /**
     * @param UserUpdateRequest $request
     * @param User $user
     * @return JsonResponse
     */
    public function update(UserUpdateRequest $request, User $user): JsonResponse
    {
        try {
            $data = $request->all();
            $new_image = $request->file('profile_image');
            $multiple_images = $request->file('multiple_images');

            if ($new_image) {
                $avatar_path = storage_path('app/public/uploads/images/users/' . $user->id . '/avatar');
                $old_image = $avatar_path . '/' . $user->profile_image;

                \File::delete($old_image);
                $file_name = time().rand(5, 10) . '.' . $new_image->getClientOriginalExtension();

                $user->images()->where('profile_image', 1)->update(['image_name' => $file_name]);
                $new_image->move($avatar_path, $file_name);
            }

            if ($multiple_images) {
                $gallery_path =  storage_path('app/public/uploads/images/users/' . $user->id . '/gallery');

                if (!file_exists($gallery_path)) {
                    mkdir($gallery_path);
                }

                foreach ($multiple_images as $image) {
                    $file_name = time().rand(5, 10) . '.' . $image->getClientOriginalExtension();

                    $user->images()
                        ->create([
                            'image_name' => $file_name,
                        ]);

                    $image->move($gallery_path, $file_name);
                }
            }

            unset($data['profile_image']);
            unset($data['multiple_images']);

            $this->userRepo->update($user->id, $data);
            $user = $this->userRepo->getById($user->id);

            return response()->json([
                'success' => 1,
                'user'    => $user,
                'message' => 'You are successfully update your profile.'
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => 0,
                'message' => 'Something went wrong!',
                'error'   => $exception->getMessage(),
            ]);
        }
    }
}
