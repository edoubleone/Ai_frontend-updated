import { MESSAGING_URL } from "@/utils";
import apiClient from "../config/api";
import type {
  AdminPaymentHistoryResponse,
  UsersList,
  UserSummary,
} from "../models/admin";

function getStripeAnalytics() {
  const response = apiClient.get(`${MESSAGING_URL}/analytics/stripe`);
  return response;
}

function getPaystackAnalytics() {
  const response = apiClient.get(`${MESSAGING_URL}/analytics/paystack`);
  return response;
}

function getPaystackTransactionStatus() {
  const response = apiClient.get(`${MESSAGING_URL}/analytics/paystack/status`);
  return response;
}

function getStripeTransactionStatus() {
  const response = apiClient.get(`${MESSAGING_URL}/analytics/stripe/status`);
  return response;
}

function getStripeAmountSummary() {
  const response = apiClient.get(
    `${MESSAGING_URL}/analytics/stripe/amount-summary`
  );
  return response;
}

function getPaystackAmountSummary() {
  const response = apiClient.get(
    `${MESSAGING_URL}/analytics/paystack/amount-summary`
  );
  return response;
}

function getTotalUsers() {
  return apiClient.get(`${MESSAGING_URL}/admin/user-count`).then((response) => {
    return response.data;
  });
}

function getUserSummary(): Promise<UserSummary> {
  return apiClient
    .get<UserSummary>(`${MESSAGING_URL}/admin/user-status-summary`)
    .then((response) => {
      return response.data;
    });
}

function getUserActivity(
  start_date?: string,
  end_date?: string
): Promise<UserSummary> {
  const params = {
    start_date,
    end_date,
  };
  return apiClient
    .get<UserSummary>(`${MESSAGING_URL}/admin/user-activity`, { params })
    .then((response) => {
      return response.data;
    });
}

function getUsersList(): Promise<UsersList> {
  return apiClient
    .get<UsersList>(`${MESSAGING_URL}/admin/users-list`)
    .then((response) => {
      return response.data;
    });
}

async function getPaystackAdminHistory(): Promise<AdminPaymentHistoryResponse> {
  const res = await apiClient.get<AdminPaymentHistoryResponse>(
    `${MESSAGING_URL}/analytics/paystack/history`
  );
  return res.data;
}

async function getStripeAdminHistory(): Promise<AdminPaymentHistoryResponse> {
  const res = await apiClient.get<AdminPaymentHistoryResponse>(
    `${MESSAGING_URL}/analytics/stripe/history`
  );
  return res.data;
}

export {
  getStripeAnalytics,
  getPaystackAnalytics,
  getPaystackTransactionStatus,
  getStripeTransactionStatus,
  getStripeAmountSummary,
  getPaystackAmountSummary,
  getStripeAdminHistory,
  getPaystackAdminHistory,
  getTotalUsers,
  getUserSummary,
  getUsersList,
  getUserActivity,
};
