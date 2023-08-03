import instance from "@/utils/request";

export const getAllStatistics = () => {
    return instance.get("/api/duration/progress");
}

export const getPersonalRecords = (params) => {
    return instance.get(`/api/attendance/weeklyAttendance/${params}`);
}