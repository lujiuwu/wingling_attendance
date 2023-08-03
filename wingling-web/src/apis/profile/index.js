import instance from "@/utils/request";

// 修改用户信息
export const updateProfile = (userId, params) => {
    return instance.post(`/api/user/edit/${userId}`, params);
}