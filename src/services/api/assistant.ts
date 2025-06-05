import apiClient from "../config/api";

export interface ICreateCampaign {
  campaign: string;
  run_at: Date;
  repeat: string;
  repeat_until?: Date;
}

export function AsyncCreateCampaign(payload: ICreateCampaign, assistant_id: number) {
  return apiClient
    .post(`/assistants/${assistant_id}/broadcast`, payload)
    .then((response) => {
      return response.data;
    });
}
