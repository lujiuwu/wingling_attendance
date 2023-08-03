import instance from "@/utils/request";

// 获取历史补卡申请
export const getApplyHistory = (params) => {
    return instance.get(`/api/makeupClock/get/${params}`);
}

// 提交补卡申请
export const applyMakeupClock = (params) => {
    return instance.post("/api/makeupClock/create", params);
}