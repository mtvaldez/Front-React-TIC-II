const mail =  sessionStorage.getItem("ses-mail");
const token = sessionStorage.getItem('token');

import axiosInstance from "@/api/axios";

export async function createAdmin(email, password) {
  const admin = { email: email, password: password}
  try {
    await axiosInstance.post("/auth/register", admin)
  } catch (error) {
    throw new Error("Failed to create")
  }
}

export async function changePassword(oldPswd, newPswd) {
  const credentials = { email: sessionStorage.getItem("ses-mail"), password: newPswd, oldPassword: oldPswd}
  try {
    await axiosInstance.put("/auth/change-password", credentials)
  } catch (error) {
    throw new Error("Failed to change Password")
  }
}

export async function login(email, password) {
  const credentials = { email: email, password: password }
  try {
    const response = await axiosInstance.post("/auth/login", credentials)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("ses-email", email);
  } catch (error) {
    throw new Error("Login Failed")
  }
}