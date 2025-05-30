import { BASE_URL } from "@/utils";
import apiClient from "../config/api";
import type {
  IAssistant,
  IAssistantMessage,
} from "../models/conversation.model";

export async function GetAssistants(): Promise<IAssistant[]> {
  const response = await apiClient.get<IAssistant[]>(`${BASE_URL}/assistants/`);
  return response.data;
}

export function ChatWithAssistant({
  message,
  assistant_id,
}: {
  message: string;
  assistant_id: number;
}) {
  return apiClient.post(`${BASE_URL}/assistants/${assistant_id}/chat`, {
    message,
  });
}

export async function GetAssistantChatHistory(
  assistant_id: number
): Promise<IAssistantMessage[]> {
  const response = await apiClient.get<IAssistantMessage[]>(
    `${BASE_URL}/assistants/${assistant_id}/history`
  );
  return response.data;
}
