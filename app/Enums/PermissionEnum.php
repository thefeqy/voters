<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case ManageFeatures = 'manage_features';

    case ManageUsers = 'manage_users';

    case ManageComments = 'manage_comments';

    case UpvoteDownvote = 'upvote_downvote';
}
