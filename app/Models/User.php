<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * @package App\Models
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dob',
        'type',
        'city',
        'email',
        'country',
        'password',
        'zip_code',
        'last_name',
        'first_name',
        'music_genre',
        'description',
        'phone_number',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'updated_at',
        'deleted_at',
        'remember_token',
        'email_verified_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @var array
     */
    protected $appends = [
        'ratings',
        'profile_image'
    ];

    /**
     * @param $value
     * @return string
     */
    public function getCreatedAtAttribute($value)
    {
        $explodedValue = explode('T', $value);
        $explodedHours = explode('.', $explodedValue[1]);

        $dateTime = $explodedValue[0] . ' ' . $explodedHours[0];

        $updatedValue =  Carbon::createFromFormat('Y-m-d H:i:s', $dateTime)->format('m-d-Y');

        return $updatedValue;
    }

    /**
     * @return string
     */
    public function getRatingsAttribute()
    {
        $ratings = $this->ratings()->get();

        $rating = 0;

        foreach ($ratings as $data) {
            $rating = $rating + $data->rating;
        }

        $ratingsSum = $rating ? $rating / count($ratings) : 0;

        $data = [
            'rating'  => $ratingsSum,
            'count'   => count($ratings),
        ];

        return $data;
    }

    /**
     * @return Model|MorphMany|object|null
     */
    public function getProfileImageAttribute()
    {
       $image = $this->images()
           ->select('image_name')
           ->where('profile_image', 1)
           ->first();

       return $image->image_name ?? '';
    }

    /**
     * @return Model|MorphMany|object|null
     */
    public function getGalleryImagesAttribute()
    {
        $image = $this->images()
            ->select('image_name')
            ->where('profile_image', 1)
            ->first();

        return $image->image_name;
    }

    /**
     * @return HasMany
     */
    public function OauthAccessToken(){
        return $this->hasMany(OauthAccessToken::class);
    }

    /**
     * @return MorphMany
     */
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    /**
     * @return MorphMany
     */
    public function imageGallery()
    {
        return $this->morphMany(Image::class, 'imageable')->where('profile_image', '=', 0);
    }

//    /**
//     * @return MorphOne
//     */
//    public function images()
//    {
//        return $this->morphOne(Image::class, 'imageable')->where('type', 'gallery');
//    }

    /**
     * @return HasMany
     */
    public function ratings()
    {
        return $this->hasMany('App\Models\Rating', 'singer_id');
    }
}
