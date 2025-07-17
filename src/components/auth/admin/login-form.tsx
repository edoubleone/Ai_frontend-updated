import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { UserLogin } from "@/services/api/auth";
import Button from "@/components/shared/button";
import { useAuth } from "@/context/auth-provider";
import type { ErrorResponse } from "@/services/config/api";
import { toast } from "sonner";
import SecondaryInput from "@/components/shared/secondary-input";
import PasswordInput from "@/components/shared/password-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { KoolAiLogo } from "./kool-ai-logo"

export function AdminLoginFormComponent() {
  const navigate = useNavigate();

  const { setAuthenticated } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: UserLogin,
    onSuccess: (data) => {
      setAuthenticated(data.access_token);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.detail);
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
      {/* Left Panel - Form (50% width) */}
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
            <p className="text-defaultBlue font-semibold text-sm">Admin Portal</p>
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
            {/* Email */}
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

            {/* Forgot Password */}
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

            {/* Login Button */}
            <Button loading={isPending} disabled={!isValid} type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel - Background Image (50% width) */}
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
