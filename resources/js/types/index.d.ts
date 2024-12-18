import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
    permissions: string[];
}

export type PaginatedData<T = any> = {
    data: T[];
    links: Record<string, string>;
}

export type Feature = {
    id: number;
    name: string;
    description: string;
    user: User;
    upvotes_count: number;
    user_has_upvoted: boolean;
    user_has_downvoted: boolean;
    created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
