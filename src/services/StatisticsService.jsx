import axiosInstance from "@/api/axios";

export async function getSuccessfulAccessData(startDate, endDate) {
    try {
        const response = await axiosInstance.get("/statistics/successful-access-count", {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });

        return response.data.map((entry) => ({
            hour: entry.dateTime,
            cameraCount: entry.cameraAccessCount,
            rfidCount: entry.rfidAccessCount,
            doorName: entry.doorName
        }));
    } catch (error) {
        // throw new Error("Failed to fetch Successful Access Data")
        const message = error.response?.data?.message || "Failed to fetch Successful Access Data";
        throw new Error(message);
    }
}

export async function getFailedAccessData(startDate, endDate) {
    try {
        const response = await axiosInstance.get("/statistics/failed-access-count", {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });

        return response.data.map((entry) => ({
            hour: entry.dateTime,
            cameraCount: entry.cameraAccessCount,
            rfidCount: entry.rfidAccessCount,
            doorName: entry.doorName
        }));
    } catch (error) {
        // throw new Error("Failed to fetch Successful Access Data")
        const message = error.response?.data?.message || "Failed to fetch Successful Access Data";
        throw new Error(message);
    }
}