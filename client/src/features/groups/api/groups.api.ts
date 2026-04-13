// Groups API Configuration - Use RELATIVE paths
export const GROUPS_ENDPOINTS = {
    BASE: '/groups',
    GET_ALL: '/groups',
    CREATE: '/groups',
    JOIN: (id: string) => `/groups/${id}/join`,
    LEAVE: (id: string) => `/groups/${id}/leave`,
    TASKS: (id: string) => `/groups/${id}/tasks`,
    MEMBERS: (id: string) => `/groups/${id}/members`,
    FILES: (id: string) => `/groups/${id}/notes`,
};