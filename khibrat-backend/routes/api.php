<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PropertySubmissionController;
use App\Http\Controllers\Api\AdminAuthController;

Route::post('/property-submissions', [PropertySubmissionController::class, 'store']);
Route::get('/property-submissions', [PropertySubmissionController::class, 'index']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
Route::get('/admin/me', [AdminAuthController::class, 'me']);
Route::get('/property-submissions', [PropertySubmissionController::class, 'index']);

Route::middleware('admin.auth')->group(function () {
    Route::get('/property-submissions', [PropertySubmissionController::class, 'index']);
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('/admin/me', [AdminAuthController::class, 'me']);
    Route::delete('/property-submissions/{id}', [PropertySubmissionController::class, 'destroy']);
    Route::get('/property-submissions/{id}/pdf', [PropertySubmissionController::class, 'downloadPdf']);
});