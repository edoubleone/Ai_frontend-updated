import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/shared/button";
import type { ErrorResponse } from "@/services/config/api";
import { toast } from "sonner";
import SecondaryInput from "@/components/shared/secondary-input";
import PasswordInput from "@/components/shared/password-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { ILogin } from "@/services/models/auth.model";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { useAdminAuth } from "@/context/admin-auth-provider";

export const AdminLog = async (data: ILogin) => {
  const res = await axios.post(`${BASE_URL}/auth/token`, data, {
    withCredentials: true,
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400,
  });
  return res;
};

export function AdminLoginFormComponent() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAdminAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: AdminLog,
    onSuccess: (response) => {
      const redirectUrl = response.headers["location"];

      if (redirectUrl) {
        try {
          const url = new URL(redirectUrl);
          const token = url.searchParams.get("token");

          if (token) {
            setAuthenticated(token);
            toast.success("Login successful");
            navigate("/admin/dashboard");
          } else {
            toast.error("Token not found in redirect URL");
          }
        } catch (err) {
          toast.error("Invalid redirect URL format");
        }
      } else {
        toast.error("Redirect URL not found in response headers");
      }
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.detail || "Login failed");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        username: z.string().email().min(1, { message: "Email is required" }),
        password: z.string().min(8).max(20),
      })
    ),
  });

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex flex-col justify-center w-full px-8 bg-white lg:w-1/2 lg:px-16">
        <div className="w-full max-w-md mx-auto py-10">
          {/* Logo */}
          <div className="flex items-center mb-8 gap-2">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Kool AI Logo"
                className="w-auto h-10 transition-opacity hover:opacity-80"
              />
            </Link>
            <p className="text-defaultBlue font-semibold text-sm">
              Admin Portal
            </p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit((data) => mutate(data))}
            className="space-y-6"
          >
            <SecondaryInput
              label="Email"
              type="email"
              placeholder="Enter your email address"
              {...register("username")}
            />

            <PasswordInput
              label="Password"
              placeholder="******"
              {...register("password")}
            />

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Checkbox />
                <span>Remember for 30 days</span>
              </Label>

              <Link
                to="/admin/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button loading={isPending} disabled={!isValid} type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative hidden w-1/2 lg:block bg-gradient-to-br from-purple-100 to-purple-200">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/images/auth-bg.png')",
          }}
        />
      </div>
    </div>
  );
}
