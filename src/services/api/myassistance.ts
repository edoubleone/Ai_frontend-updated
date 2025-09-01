import { BASE_URL } from "@/utils";
import apiClient from "../config/api";
import type { IAssistant as IAssistantModel } from "../models/conversation.model";

export interface IAssistant {
  id: number;
  agentsName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  availability: "Available" | "Offline" | "Busy";
  issues: string;
  industry?: string;
  persona?: string;
  tone?: string;
  created_at: string;
  updated_at: string;
}

export interface IAlert {
  id: number;
  assistant_id: number;
  title: string;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "resolved" | "dismissed";
  created_at: string;
  updated_at: string;
}

// Map assistant data to table format
const mapAssistantToTable = (assistant: IAssistantModel): IAssistant => {
  return {
    id: assistant.id,
    agentsName: assistant.name,
    displayName:
      assistant.business_name || assistant.name || `Assistant ${assistant.id}`,
    email: `assistant-${assistant.id}@example.com`, // Placeholder email
    phoneNumber: "+2348133333333", // Placeholder phone
    availability: "Available", // Default availability
    issues: "No issues", // Default issues
    industry: assistant.industry || "N/A",
    persona: assistant.persona || "N/A",
    tone: assistant.tone || "N/A",
    created_at: assistant.created_at,
    updated_at: assistant.updated_at,
  };
};

export async function GetAssistants(): Promise<IAssistant[]> {
  try {
    console.log("Fetching assistants from:", `${BASE_URL}/assistants/`);
    const response = await apiClient.get<IAssistantModel[]>(
      `${BASE_URL}/assistants/`
    );
    console.log("Raw API response:", response.data);
    // Map the assistant data to the table format
    const mappedData = response.data.map(mapAssistantToTable);
    console.log("Mapped data:", mappedData);
    return mappedData;
  } catch (error) {
    console.error("Error fetching assistant data:", error);
    // Return empty array as fallback
    return [];
  }
}

export async function GetAssistant(id: number): Promise<IAssistant> {
  try {
    const response = await apiClient.get<IAssistantModel>(
      `${BASE_URL}/assistants/${id}`
    );
    return mapAssistantToTable(response.data);
  } catch (error) {
    console.error(`Error fetching assistant ${id}:`, error);
    throw error;
  }
}

export async function GetAssistantAlerts(
  assistantId: number
): Promise<IAlert[]> {
  try {
    console.log("Fetching alerts for assistant:", assistantId);
    const response = await apiClient.get<IAlert[]>(
      `${BASE_URL}/alerts/assistants/${assistantId}/alerts`
    );
    console.log("Raw alerts response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching alerts for assistant ${assistantId}:`, error);
    console.error("Error details:", {
      message: error?.message,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
    });
    // Return empty array as fallback
    return [];
  }
}
