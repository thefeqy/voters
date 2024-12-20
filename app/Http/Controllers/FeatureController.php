<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paginatedFeatures = Feature::query()
            ->withVotesAndUserFlags(auth()->id())
            ->orderBy('id', 'desc')
            ->cursorPaginate(15);

        if ($request->expectsJson()) {
            return FeatureResource::collection($paginatedFeatures);
        }

        return Inertia::render('Features/Index', [
            'features' => FeatureResource::collection($paginatedFeatures),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort_unless(auth()->user()->can(PermissionEnum::ManageFeatures), 403);
        return Inertia::render('Features/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        abort_unless(auth()->user()->can(PermissionEnum::ManageFeatures), 403);

        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $data['user_id'] = auth()->id();

        Feature::create($data);

        return to_route('features.index')->with('message', 'Feature created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $feature = Feature::query()
            ->with(['comments' => function ($query) {
                $query->with('user')
                    ->orderBy('created_at', 'desc');
            }])
            ->withVotesAndUserFlags(auth()->id())
            ->findOrFail($id);

        return Inertia::render('Features/Show', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        abort_unless(auth()->user()->can(PermissionEnum::ManageFeatures), 403);

        return Inertia::render('Features/Edit', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        abort_unless(auth()->user()->can(PermissionEnum::ManageFeatures), 403);

        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $feature->update($data);

        return to_route('features.index')->with('message', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        abort_unless(auth()->user()->can(PermissionEnum::ManageFeatures), 403);

        $feature->delete();

        return to_route('features.index')->with('message', 'Feature deleted successfully.');
    }
}
