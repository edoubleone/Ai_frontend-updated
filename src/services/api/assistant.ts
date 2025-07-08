import { MESSAGING_URL } from "@/utils";
import apiClient from "../config/api";
import type { CustomerHistory, IAssistant } from "../models/conversation.model";

export interface ICreateCampaign {
  campaign: string;
  run_at: Date;
  repeat: string;
  repeat_until?: Date;
}

export interface ICreateVoiceCampaign {
  assistant_id: number;
  message: string;
  handle: string;
  channel: string;
  run_at: Date;
  repeat: string;
}

export function AsyncCreateCampaign(
  payload: ICreateCampaign,
  assistant_id: number
) {
  return apiClient
    .post(`/assistants/${assistant_id}/broadcast`, payload)
    .then((response) => {
      return response.data;
    });
}

export function AsyncCreateVoiceCampaign(payload: ICreateVoiceCampaign) {
  return apiClient.post(`/campaigns/voice`, payload).then((response) => {
    return response.data;
  });
}

export function GetAssistant(id: number): Promise<IAssistant> {
  return apiClient.get<IAssistant>(`/assistants/${id}`).then((response) => {
    return response.data;
  });
}

export function DeleteAssistant(id: number) {
  return apiClient.delete(`/assistants/${id}`).then((response) => {
    return response.data;
  });
}

export function ChatAsCustomer(
  assistant_id: number,
  channel: string = "web",
  handle: string,
  message: string
) {
  return apiClient
    .post(
      `/assistants/${assistant_id}/customer-chat?channel=${channel}&handle=${handle}`,
      { message }
    )
    .then((response) => {
      return response.data;
    });
}

export function GetCustomerHistory(
  assistant_id: number,
  channel: string = "web",
  handle: string
): Promise<CustomerHistory> {
  return apiClient
    .get(
      `/assistants/${assistant_id}/customer/${handle}/history?channel=${channel}`
    )
    .then((response) => {
      return response.data;
    });
}

export function GetEmbedPage(business_id: string) {
  return apiClient
    .get(`${MESSAGING_URL}/embed/bot/${business_id}`)
    .then((response) => {
      return response.data;
    });
}

export const RegisterBotEmbed = async (payload: {
  business_id: string;
  bot_url: string;
}) => {
  const res = await apiClient.post(
    `${MESSAGING_URL}/api/bot-embed/register`,
    payload
  );
  return res.data;
};

export const GenerateEmbedKey = async (payload: {
  assistant_id: number;
  bot_url: string;
  owner_id: string;
  theme: string;
}) => {
  const res = await apiClient.post(`${MESSAGING_URL}/api/embed-key`, payload);
  return res.data;
};

export const GenerateEmbedSnippet = async (publicKey: string) => {
  const res = await apiClient.get(
    `${MESSAGING_URL}/api/embed-snippet/${publicKey}`
  );
  return res.data;
};
