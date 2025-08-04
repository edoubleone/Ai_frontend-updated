export interface UserSummary {
  total_users: string;
  active_users: string;
  inactive_users: string;
}

export interface UsersList {
  users: UsersData[];
}

export interface UsersData {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  status: "active" | "inactive";
  last_active: string;
}
