export interface Customer {
  id: number;
  handle: string;
  channel: string;
  full_name: string;
  email: string;
  gender: string;
  created_at: string;
}

export interface ICustomerHistory {
  history: [
    {
      id: number;
      role: "user" | "AI" | "assistant"
      content: string;
      origin: string;
      created_at: string;
    }
  ];
  last_message: {
    id: number;
    role: "user" | "AI" | "assistant"
    content: string;
    origin: string;
    created_at: string;
  };
}
