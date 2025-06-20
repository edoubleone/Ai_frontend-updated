import apiClient from "../config/api";
import { MESSAGING_URL } from "@/utils";
import type { ISubscriptionPlan } from "../models/payment.model";
interface PaymentPlanRequest {
  email: string;
}

export type PlanType =
  | "basic-monthly"
  | "basic-yearly"
  | "standard-monthly"
  | "standard-yearly"
  | "professional-monthly"
  | "professional-yearly"
  | "enterprise-monthly"
  | "enterprise-yearly";

interface PaymentInitializationRequest {
  email: string;
  currency: string;
  amount: number;
}

interface StripePlanResponse {
  session_id: string;
  checkout_url: string;
}

interface StripePlanRequest {
  email: string;
  currency: string;
}

export type StripePlanType =
  | "basic-monthly"
  | "basic-yearly"
  | "standard-monthly"
  | "standard-yearly"
  | "professional-monthly"
  | "professional-yearly"
  | "enterprise-monthly"
  | "enterprise-yearly"
  | "extras-monthly";

const asyncStripePlan = (
  plan: StripePlanType,
  payload: StripePlanRequest
): Promise<StripePlanResponse> => {
  return apiClient
    .post(`${MESSAGING_URL}/stripepayments/${plan}`, payload)
    .then((response) => response.data);
};

const getCurrentPlanPaystack = (email: string): Promise<ISubscriptionPlan> => {
  return apiClient
    .get<ISubscriptionPlan>(
      `${MESSAGING_URL}/paystack/current-plan?email=${email}`
    )
    .then((res) => res.data);
};

const getCurrentPlanStripe = (email: string): Promise<ISubscriptionPlan> => {
  return apiClient
    .get<ISubscriptionPlan>(
      `${MESSAGING_URL}/stripepayments/current-plan?email=${email}`
    )
    .then((res) => res.data);
};

const stripePlans = {
  asyncStripeBasicMonthly: (email: string) =>
    asyncStripePlan("basic-monthly", { email, currency: "usd" }),
  asyncStripeBasicYearly: (email: string) =>
    asyncStripePlan("basic-yearly", { email, currency: "usd" }),
  asyncStripeStandardMonthly: (email: string) =>
    asyncStripePlan("standard-monthly", { email, currency: "usd" }),
  asyncStripeStandardYearly: (email: string) =>
    asyncStripePlan("standard-yearly", { email, currency: "usd" }),
  asyncStripeProfessionalMonthly: (email: string) =>
    asyncStripePlan("professional-monthly", { email, currency: "usd" }),
  asyncStripeProfessionalYearly: (email: string) =>
    asyncStripePlan("professional-yearly", { email, currency: "usd" }),
  asyncStripeEnterpriseMonthly: (email: string) =>
    asyncStripePlan("enterprise-monthly", { email, currency: "usd" }),
  asyncStripeEnterpriseYearly: (email: string) =>
    asyncStripePlan("enterprise-yearly", { email, currency: "usd" }),
  asyncStripeExtrasMonthly: (email: string) =>
    asyncStripePlan("extras-monthly", { email, currency: "usd" }),
};

const asyncPaystackPlan = (plan: PlanType, payload: PaymentPlanRequest) => {
  return apiClient
    .post(`${MESSAGING_URL}/paystack/${plan}`, payload)
    .then((response) => response.data);
};

const asyncInitializePaystack = (payload: PaymentInitializationRequest) => {
  return apiClient
    .post(`${MESSAGING_URL}/payments/initialize`, payload)
    .then((response) => response.data);
};

const asyncInitializeStripe = (payload: PaymentInitializationRequest) => {
  return apiClient
    .post(`${MESSAGING_URL}/stripepayments/initialize`, payload)
    .then((response) => response.data);
};

const getStripePaymentHistory = (email: string) => {
  return apiClient
    .get(`${MESSAGING_URL}/stripepayments/history?email=${email}`)
    .then((res) => res.data);
};

const getPaystackPaymentHistory = (email: string) => {
  return apiClient
    .get(`${MESSAGING_URL}/paystack/history?email=${email}`)
    .then((res) => res.data);
};

const paystackPlans = {
  asyncPayBasicMonthly: (email: string) =>
    asyncPaystackPlan("basic-monthly", { email }),
  asyncPayBasicYearly: (email: string) =>
    asyncPaystackPlan("basic-yearly", { email }),
  asyncPayStandardMonthly: (email: string) =>
    asyncPaystackPlan("standard-monthly", { email }),
  asyncPayStandardYearly: (email: string) =>
    asyncPaystackPlan("standard-yearly", { email }),
  asyncPayProfessionalMonthly: (email: string) =>
    asyncPaystackPlan("professional-monthly", { email }),
  asyncPayProfessionalYearly: (email: string) =>
    asyncPaystackPlan("professional-yearly", { email }),
  asyncPayEnterpriseMonthly: (email: string) =>
    asyncPaystackPlan("enterprise-monthly", { email }),
  asyncPayEnterpriseYearly: (email: string) =>
    asyncPaystackPlan("enterprise-yearly", { email }),
};

export {
  asyncPaystackPlan,
  asyncInitializePaystack,
  asyncInitializeStripe,
  getStripePaymentHistory,
  getPaystackPaymentHistory,
  paystackPlans,
  asyncStripePlan,
  stripePlans,
  getCurrentPlanPaystack,
  getCurrentPlanStripe,
};
