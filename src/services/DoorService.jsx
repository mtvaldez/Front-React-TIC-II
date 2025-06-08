import axiosInstance from "@/api/axios";

export async function getDoors() {
    try {
        const response = await axiosInstance.get("/doors");
        return response.data;
    } catch (error) {
        // throw new Error("Failed to fetch doors")
        const message = error.response?.data?.message || "Failed to fetch doors";
        throw new Error(message);
    }
}

export async function getDoorsPaginated(pNum, pSize, name) {
    try {
        const reqParams = { page: pNum, pageSize: pSize, doorNameLookUp: name }
        const response = await axiosInstance.get("/doors", {params: reqParams});
        return response.data;
    } catch (error) {
        // throw new Error("Failed to fetch doors")
        const message = error.response?.data?.message || "Failed to fetch doors";
        throw new Error(message);
    }
}

export async function createDoor(name, passcode, accessLevel) {
    const door = { doorName: name, passcode: passcode, accessLevel: accessLevel }
    try {
        await axiosInstance.post("/doors/create", door)
    } catch (error) {
        // throw new Error("Failed to create door")
        const message = error.response?.data?.message || "Failed to create door";
        throw new Error(message);
    }
}

export async function deleteDoor(userId) {
    try {
        await axiosInstance.delete(`/doors/${userId}`);
    } catch (error) {
        // throw new Error("Failed to delete door")
        const message = error.response?.data?.message || "Failed to delete door";
        throw new Error(message);
    }
}

export async function changeDoorPasscode(doorId, newPassword) {
    try {
        await axiosInstance.put(`/doors/${doorId}/change-password/${newPassword}`);
    } catch (error) {
        // throw new Error("Failed to change Door's passcode")
        const message = error.response?.data?.message || "Failed to change Door's passcode";
        throw new Error(message);
    }
}


export async function changeDoorAccessLevel(doorId, level) {
    try {
        await axiosInstance.put(`/doors/${doorId}/change-access-level/${level}`)
    } catch (error) {
        // throw new Error("Failed to change Door's Access Level")
        const message = error.response?.data?.message || "Failed to change Door's Access Level";
        throw new Error(message);
    }
}