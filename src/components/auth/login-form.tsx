import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { UserLogin } from "@/services/api/auth";
import Button from "../shared/button";
import { useAuth } from "@/context/auth-provider";
import type { ErrorResponse } from "@/services/config/api";
import { toast } from "sonner";
import SecondaryInput from "../shared/secondary-input";
import PasswordInput from "../shared/password-input";
// import { KoolAiLogo } from "./kool-ai-logo"

export function LoginFormComponent() {
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
          <Link to="/" className="inline-block mb-8">
            <img
              src={logo}
              alt="Kool AI Logo"
              className="w-auto h-10 transition-opacity hover:opacity-80"
            />
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
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
              label="Password*"
              placeholder="******"
              {...register("password")}
            />

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button loading={isPending} disabled={!isValid} type="submit">
              Login
            </Button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">Or</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-gray-700">
                  Login with Google
                </span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-medium text-gray-700">
                  Login with Facebook
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Background Image (50% width) */}
      <div className="relative hidden w-1/2 lg:block bg-gradient-to-br from-purple-100 to-purple-200">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/images/login-background.png')",
          }}
        />
      </div>
    </div>
  );
}
