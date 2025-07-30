import { MESSAGING_URL } from "@/utils";
import apiClient from "../config/api";

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
  const response = apiClient.get(`${MESSAGING_URL}/analytics/stripe/amount-summary`);
  return response;
}

function getPaystackAmountSummary() {
  const response = apiClient.get(
    `${MESSAGING_URL}/analytics/paystack/amount-summary`
  );
  return response;
}

export {
  getStripeAnalytics,
  getPaystackAnalytics,
  getPaystackTransactionStatus,
  getStripeTransactionStatus,
  getStripeAmountSummary,
  getPaystackAmountSummary,
};
