import { z } from "zod";

export interface ILogin {
  username: string;
  password: string;
}

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter"),
});
