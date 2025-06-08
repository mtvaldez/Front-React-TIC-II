import axiosInstance from "@/api/axios";

export async function getUsers() {
  try {
    const response = await axiosInstance.get("/users/all")
    const data = response.data
    return data.map(({ uuid: id, ...rest }) => ({ id, ...rest })); // Change uuid -> id in the array
  } catch (err) {
    // throw new Error("Failed fetching users")
    const message = error.response?.data?.message || "Failed fetching users";
    throw new Error(message);
  }
}

export async function getUsersPaginated(pNum, pSize, name) {
  try {
    const reqParams = {page: pNum, pageSize: pSize, nameLookUp: name}
    const response = await axiosInstance.get("/users", {params: reqParams})
    return response.data
  } catch (err) {
    // throw new Error("Failed fetching users")
    const message = error.response?.data?.message || "Failed fetching users";
    throw new Error(message);
  }
}



export async function createUser(fullName, cid, accessLevel) {
  const user = { fullName: fullName, cid: cid, accessLevel: accessLevel };
  try {
    await axiosInstance.post("/users", user);
  } catch (err) {
    // throw new Error("Failed to create user")
    const message = error.response?.data?.message || "Failed to create user";
    throw new Error(message);
  }
}

export async function changeUserAccessLevel(userId, level) {
  try {
    await axiosInstance.put(`/users/${userId}/change-access-level/${level}`)
  } catch (error) {
    // throw new Error("Failed to change User's Access Level")
    const message = error.response?.data?.message || "Failed to change User's Access Level";
    throw new Error(message);
  }
}

export async function setUserRFID(userId, rfid) {
  try {
    await axiosInstance.post(`/users/${userId}/rfid/${rfid}`);
  } catch (error) {
    // throw new Error("Failed to set User's RFID")
    const message = error.response?.data?.message || "Failed to set User's RFID";
    throw new Error(message);
  }
}

export async function setUserFace(userId, base64String) {
  try {
    const response = await axiosInstance.post(`/users/${userId}/vector`, base64String)

    // TODO Handle Photo Response
  } catch (error) {
    // throw new Error("Failed to set User's Face")
    const message = error.response?.data?.message || "Failed to set User's Face";
    throw new Error(message);
  }
}

export async function deleteUser(userId) {
  try {
    await axiosInstance.delete(`/users/${userId}`)
  } catch (error) {
    // throw new Error("Failed to delete user")
    const message = error.response?.data?.message || "Failed to delete User";
    throw new Error(message);
  }
}