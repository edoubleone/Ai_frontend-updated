export interface IAssistant {
  id: number;
  user_id: number;
  name: string;
  business_name: string;
  industry: string;
  description: string;
  greeting: string;
  persona: string;
  tone: string;
  small_talk_level: string;
  jokes_level: string;
  emoji_level: string;
  additional_instructions: string;
  config: {
    model: string;
    temperature: number;
    additionalProp1: {};
    system_prompt: string;
  };
  public_url: string;
  created_at: string;
  last_message: string;
  share_url: string;
}

export interface UserData {
  id: number,
  email: string,
  full_name: string,
  is_active: boolean
}

export interface IAssistantMessage {
  id: number
  role: "user" | "AI"
  content: string
  created_at: Date
}

