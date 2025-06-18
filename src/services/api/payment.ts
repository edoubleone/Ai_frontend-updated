import { MESSAGING_URL } from "@/utils";
import apiClient from "../config/api";

export function AsyncInitializePaystack(payload: {
  email: string;
  currency: string;
  amount: number;
}) {
  return apiClient
    .post(`${MESSAGING_URL}/payments/initialize`, payload)
    .then((response) => {
      return response.data;
    });
}

export function AsyncInitializeStripe(payload: {
  email: string;
  currency: string;
  amount: number;
}) {
  return apiClient
    .post(`${MESSAGING_URL}/stripepayments/initialize`, payload)
    .then((response) => {
      return response.data;
    });
}

export function getStripePaymentHistory(email: string) {
  return apiClient.get(`/stripepayments/history?email=${email}`).then((res) => {
    return res.data;
  });
}

export function getPaystackPaymentHistory(email: string) {
  return apiClient.get(`/stripepayments/history?email=${email}`).then((res) => {
    return res.data;
  });
}
