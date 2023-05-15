<?php


namespace App\Http\Requests\User;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

/**
 * Class UserUpdateRequest
 * @package App\Http\Requests\User
 */
class UserUpdateRequest extends FormRequest
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
            'first_name'      => 'required',
            'last_name'       => 'required',
            'dob'             => 'required',
            'type'            => 'required',
            'city'            => 'required',
            'description'     => 'required',
            'country'         => 'required',
            'zip_code'        => 'required|max:6',
//            'music_genre'     => 'required|max:10',
            'profile_image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
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

            unset($input['_method']);

            $this->replace($input);
        }
        return $validator;
    }
}
