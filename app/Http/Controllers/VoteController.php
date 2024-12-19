<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\Upvote;
use DB;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'feature_id' => ['required', 'exists:features,id'],
            'upvote' => ['required', 'boolean'],
        ]);

        $upvote = Upvote::updateOrCreate([
            'feature_id' => $data['feature_id'],
            'user_id' => auth()->id(),
        ], [
            'upvote' => $data['upvote'],
        ]);

        $feature->loadData();

        return new FeatureResource($feature);
    }

    public function destroy(int $id): FeatureResource
    {
        $userId = auth()->id();
        $feature = Feature::query()
            ->withVotesAndUserFlags($userId)
            ->findOrFail($id);

        $feature->upvotes()->where('user_id', $userId)->delete();

        $feature->loadData();

        return new FeatureResource($feature);
    }
}
