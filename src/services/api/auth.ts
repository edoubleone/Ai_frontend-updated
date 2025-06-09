import apiClient from "../config/api";
import type { ILogin } from "../models/auth.model";
import type { UserData } from "../models/conversation.model";

export function UserLogin(payload: ILogin) {
  return apiClient.post(`/auth/token`, payload).then((response) => {
    return response.data;
  });
}

export function RegisterUser(payload: any) {
  return apiClient.post(`/auth/register`, payload).then((response) => {
    return response.data;
  });
}

export function LogOutUser() {
  return apiClient.post(`/auth/logout`).then((response) => {
    return response.data;
  });
}

export async function GetUserData(): Promise<UserData> {
  const response = await apiClient.get<UserData>(`/auth/me`);
  return response.data;
}
