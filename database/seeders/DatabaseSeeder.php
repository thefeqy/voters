<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Models\Feature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        $userRole = Role::create(['name' => RoleEnum::USER->value]);
//        $commenterRole = Role::create(['name' => RoleEnum::COMMENTER->value]);
//        $adminRole = Role::create(['name' => RoleEnum::ADMIN->value]);
//
//        $manageFeaturePermission = Permission::create(['name' => PermissionEnum::ManageFeatures->value]);
//        $manageUsersPermission = Permission::create(['name' => PermissionEnum::ManageUsers->value]);
//        $manageCommentsPermission = Permission::create(['name' => PermissionEnum::ManageComments->value]);
//        $upvoteDownvotePermission = Permission::create(['name' => PermissionEnum::UpvoteDownvote->value]);
//
//        $userRole->syncPermissions([$upvoteDownvotePermission]);
//        $commenterRole->syncPermissions([$upvoteDownvotePermission, $manageCommentsPermission]);
//        $adminRole->syncPermissions([$manageFeaturePermission, $manageUsersPermission, $manageCommentsPermission, $upvoteDownvotePermission]);
//
//        User::query()
//            ->where('email', 'admin@admin.dev')
//            ->first()
//            ->assignRole(RoleEnum::ADMIN->value);
//
//        User::factory()
//            ->create([
//               'name' => 'Commenter User',
//                'email' => 'commenter@commenter.dev',
//            ])->assignRole(RoleEnum::COMMENTER->value);
//
//        User::factory()
//            ->create([
//                'name' => 'User User',
//                'email' => 'user@user.dev'
//            ])->assignRole(RoleEnum::USER->value);

        Feature::factory()
            ->count(100)
            ->create();
    }
}
