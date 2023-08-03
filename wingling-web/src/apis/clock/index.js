import instance from "@/utils/request";

export const clockIn = (params) => {
    return instance.post('/api/clock/clockIn', params);
}

export const clockOut = (params) => {
    return instance.post('/api/clock/clockOut', params);
}