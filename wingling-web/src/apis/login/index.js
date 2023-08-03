import instance from "@/utils/request";

export const login = (params) => {
    return instance.post('/api/auth/login', params);
}