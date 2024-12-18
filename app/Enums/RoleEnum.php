<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case USER = 'user';

    case COMMENTER = 'commenter';

    public static function labels(): array
    {
        return [
            self::ADMIN->value => 'Admin',
            self::USER->value => 'User',
            self::COMMENTER->value => 'Commenter',
        ];
    }

    public function label()
    {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::USER => 'User',
            self::COMMENTER => 'Commenter',
        };
    }
}
