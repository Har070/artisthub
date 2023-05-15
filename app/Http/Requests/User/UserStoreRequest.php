<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

/**
 * Class UserStoreRequest
 * @package App\Http\Requests\User
 */
class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'first_name'   => 'required',
            'last_name'    => 'required',
            'dob'          => 'required',
            'type'         => 'required',
            'city'         => 'required',
            'description'  => 'required',
            'country'      => 'required',
            'zip_code'     => 'required|max:6',
            'password'     => 'required|min:6',
//            'music_genre'  => 'required|max:10',
            'phone_number'  => 'required|max:10',
            'email'        => 'required|email|unique:users,email',
            'image.*'      => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }

    /**
     * Get validation after rules validation.
     *
     * @return Validator
     */
    protected function getValidatorInstance(): Validator
    {
        $validator = parent::getValidatorInstance();
        if (!$validator->fails()) {
            $input = $this->all();

            if ($input['password']) {
                $input['password'] = bcrypt($input['password']);
            }

            $this->replace($input);
        }
        return $validator;
    }
}
