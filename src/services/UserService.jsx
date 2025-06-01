import axiosInstance from "@/api/axios";

export async function getUsers() {
  try {
    const response = await axiosInstance.get("/users")
    const data = response.data
    return data.map(({ uuid: id, ...rest }) => ({ id, ...rest })); // Change uuid -> id in the array
  } catch (err) {
    throw new Error("Failed fetching users")
  }
}

export async function createUser(fullName, cid, accessLevel) {
  const user = { fullName: fullName, cid: cid, accessLevel: accessLevel };
  try {
    await axiosInstance.post("/users", user);
  } catch (err) {
    throw new Error("Failed to create user")
  }
}

export async function changeUserAccessLevel(userId, level) {
  try {
    await axiosInstance.put(`/users/${userId}/change-access-level/${level}`)
  } catch (error) {
    throw new Error("Failed to change User's Access Level")
  }
}

export async function setUserRFID(userId, rfid) {
  try {
    await axiosInstance.post(`/users/${userId}/rfid/${rfid}`);
  } catch (error) {
    throw new Error("Failed to set User's RFID")
  }
}

export async function setUserFace(userId, base64String) {
  try {
    const response  = await axiosInstance.post(`/users/${userId}/vector`, base64String)
    
    // TODO Handle Photo Response
  } catch (error) {
    throw new Error("Failed to set User's Face")
  }
}

export async function deleteUser(userId) {
  try {
    await axiosInstance.delete(`/users/${userId}`)
  } catch (error) {
    throw new Error("Failed to delete user")
  }
}