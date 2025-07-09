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

function CompleteOnboarding(skip: boolean) {
  return apiClient.post(`/auth/onboarding`, { skip }).then((response) => {
    return response.data;
  });
}

function ForgotPassword(email: string) {
  return apiClient.post(`/auth/forgot-password`, { email }).then((response) => {
    return response.data;
  });
}

function AsyncResetPassword(payload: { new_password: string; token: string }) {
  return apiClient.post(`/auth/reset-password`, payload).then((response) => {
    return response.data;
  });
}

export { CompleteOnboarding, ForgotPassword, AsyncResetPassword };
