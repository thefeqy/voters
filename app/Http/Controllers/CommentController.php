<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate(['comment' => ['required', 'string']]);

        $feature->comments()->create(array_merge($data, ['user_id' => auth()->id()]));

        return back();
    }

    public function destroy(Comment $comment)
    {
        abort_if($comment->user_id !== auth()->id(), 403);
        $feature = $comment->feature;
        $comment->delete();

        return to_route('features.show', $feature);
    }
}
