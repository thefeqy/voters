<?php

use App\Enums\PermissionEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth'])
    ->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::middleware(['verified'])
            ->group(function () {
                Route::get('/dashboard', function () {
                    return Inertia::render('Dashboard');
                })->name('dashboard');
                Route::resource('/features', FeatureController::class);
                Route::put('/features/{feature}/vote', [VoteController::class, 'store'])
                    ->name('features.vote.store');

                Route::delete('/upvote/{feature}', [VoteController::class, 'destroy'])
                    ->name('upvote.destroy');

                Route::post('/features/{feature}/comment', [CommentController::class, 'store'])
                    ->middleware('can:' . PermissionEnum::ManageComments->value)
                    ->name('comments.store');
                Route::delete('/features/{comment}/delete', [CommentController::class, 'destroy'])
                    ->middleware('can:' . PermissionEnum::ManageComments->value)
                    ->name('comments.destroy');
            });
    });


require __DIR__.'/auth.php';
