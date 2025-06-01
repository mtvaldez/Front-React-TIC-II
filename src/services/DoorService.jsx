import axiosInstance from "@/api/axios";

export async function getDoors() {
    try {
        const response = await axiosInstance.get("/doors");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch doors")
    }
}

export async function createDoor(name, passcode, accessLevel) {
    const door = { doorName: name, passcode: passcode, accessLevel: accessLevel }
    try {
        await axiosInstance.post("/doors/create", door)
    } catch (error) {
        throw new Error("Failed to create door")
    }
}

export async function deleteDoor(userId) {
    try {
        await axiosInstance.delete(`/doors/${userId}`);
    } catch (error) {
        throw new Error("Failed to delete door")
    }
}

export async function changeDoorPasscode(doorId, newPassword) {
    try {
        await axiosInstance.put(`/doors/${doorId}/change-password/${newPassword}`);
    } catch (error) {
        throw new Error("Failed to change Door's passcode")
    }
}


export async function changeDoorAccessLevel(doorId, level) {
    try {
        await axiosInstance.put(`/doors/${doorId}/change-access-level/${level}`)
    } catch (error) {
        throw new Error("Failed to change Door's Access Level")
    }
}