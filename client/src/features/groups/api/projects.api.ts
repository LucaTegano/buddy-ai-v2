  // Projects API Configuration - Use RELATIVE paths
export const PROJECTS_ENDPOINTS = {
    GET_ALL: '/projects',
    CREATE: '/projects',
    GET_BY_ID: (id:string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
};