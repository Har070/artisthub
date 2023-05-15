<?php


namespace App\Http\Requests\Rating;


use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class RatingRequest
 * @package App\Http\Requests\Rating
 */
class RatingRequest extends FormRequest
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
            'rating'    => 'required',
            'singer_id' => 'required',
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

            $input['user_id'] = auth()->id();

            $this->replace($input);
        }
        return $validator;
    }
}
