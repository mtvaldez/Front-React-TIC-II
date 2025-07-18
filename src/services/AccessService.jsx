import axiosInstance from "@/api/axios";

export async function getSuccessfulAccessBetween(startDate, endDate) {
    try {
        const response = await axiosInstance.get("/statistics/successful-access-list", {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
        return response.data;
    } catch (error) {
        // throw new Error("Failed to fetch Successful Access List");
        const message = error.response?.data?.message || "Failed to fetch Successful Access List";
        throw new Error(message);
    }

}

export async function getFailedAccessBetween(startDate, endDate) {
    try {
        const response = await axiosInstance.get("/statistics/failed-access-list", {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
        return response.data;
    } catch (error) {
        // throw new Error("Failed to fetch Failed Access List");
        const message = error.response?.data?.message || "Failed to fetch Successful Access List";
        throw new Error(message);
    }
}