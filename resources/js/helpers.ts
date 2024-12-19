import {User} from "@/types";

export const can = (user: User, permission: string): boolean => {
    return user.permissions.includes(permission)
}

export const canAny = (user: User, permissions: string[]): boolean => {
    return permissions.some(permission => user.permissions.includes(permission))
}

export const hasRole = (user: User, role: string): boolean => {
    return user.roles.includes(role)
}
