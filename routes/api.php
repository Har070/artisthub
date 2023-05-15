<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/login', 'Api\Auth\LoginController@login');

Route::middleware(['auth:api'])->group(function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::get('/', 'Api\User\UserController@auth');
        Route::get('/logout', 'API\Auth\LoginController@logout');
    });

    Route::group(['prefix' => 'user'], function () {
        Route::put('/{user}', 'Api\User\UserController@update');
        Route::post('/rate', 'Api\Rating\RatingController@store');
    });


});


Route::group(['prefix' => 'user'], function () {
    Route::get('/', 'Api\User\UserController@index');
    Route::post('/', 'Api\User\UserController@store');
});

Route::group(['prefix' => 'singers'], function () {
    Route::get('/all', 'Api\Singer\SingerController@getAll');
    Route::get('/new', 'Api\Singer\SingerController@getNew');
    Route::get('/top', 'Api\Singer\SingerController@getTop');
});






