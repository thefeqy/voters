<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Feature extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id'];

    public function upvotes(): HasMany
    {
        return $this->hasMany(Upvote::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function scopeWithVotesAndUserFlags(Builder $query, $userId): Builder
    {
        return $query->withCount([
                'upvotes as upvotes_count' => function ($query) {
                    $query->select(DB::raw('SUM(CASE WHEN upvote = TRUE THEN 1 ELSE -1 END)'));
                }
            ])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->where('upvote', true);
                },
                'upvotes as user_has_downvoted' => function ($query) use ($userId) {
                    $query->where('user_id', $userId)->where('upvote', false);
                },
            ]);
    }
}
