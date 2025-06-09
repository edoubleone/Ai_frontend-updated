import apiClient from "../config/api";
import type { CustomerHistory, IAssistant } from "../models/conversation.model";

export interface ICreateCampaign {
  campaign: string;
  run_at: Date;
  repeat: string;
  repeat_until?: Date;
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

export function GetAssistant(id: number): Promise<IAssistant> {
  return apiClient.get<IAssistant>(`/assistants/${id}`).then((response) => {
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
