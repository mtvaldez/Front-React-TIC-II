import axiosInstance from "@/api/axios";

export async function createAdmin(email, password) {
  const admin = { email: email, password: password }
  try {
    await axiosInstance.post("/auth/register", admin)
  } catch (error) {
    // throw new Error("Failed to create")
    const message = error.response?.data?.message || "Failed to create";
    throw new Error(message);
  }
}

export async function changePassword(oldPswd, newPswd) {
  const credentials = { email: localStorage.getItem("ses-mail"), password: newPswd, oldPassword: oldPswd }
  try {
    await axiosInstance.put("/auth/change-password", credentials)
  } catch (error) {
    // throw new Error("Failed to change Password");
    const message = error.response?.data?.message || "Failed to change Password";
    throw new Error(message);
  }
}

export async function login(email, password) {
  const credentials = { email: email, password: password }
  try {
    const response = await axiosInstance.post("/auth/login", credentials)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("ses-email", email);
  } catch (error) {
    // throw new Error("Login Failed")
    const message = error.response?.data?.message || "Login Failed";
    throw new Error(message);
  }
}