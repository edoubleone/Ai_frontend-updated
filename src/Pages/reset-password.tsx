import { useMutation } from "@tanstack/react-query";
import logo from "@/assets/images/logo.png";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "sonner";
import { AsyncResetPassword } from "../services/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ErrorResponse } from "@/services/config/api";

import PasswordInput from "@/components/shared/password-input";
import { Check } from "lucide-react";
import Button from "@/components/shared/button";
import { useEffect } from "react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        new_password: z
          .string()
          .min(6, "Password must be at least 6 characters")
          .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
          )
          .regex(/\d/, "Password must contain at least one number")
          .regex(/[a-zA-Z]/, "Password must contain at least one letter"),
        token: z.string(),
      })
    ),
    defaultValues: {
      new_password: "",
      token: token || "",
    },
  });

  const password = watch("new_password");

  const { mutate, isPending } = useMutation({
    mutationFn: AsyncResetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.detail || "Registration failed");
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      reset({
        token,
        new_password: "",
      });
    }
  }, [token]);

  const onSubmit = (data: { new_password: string; token: string }) => {
    const payload = {
      ...data,
    };
    mutate(payload);
  };

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasMinLength = password.length >= 6;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full px-8 bg-white lg:w-1/2 lg:px-16">
        <div className="w-full max-w-md mx-auto py-10">
          <Link to="/" className="inline-block mb-8">
            <img
              src={logo}
              alt="Kool AI Logo"
              className="w-auto h-10 transition-opacity hover:opacity-80"
            />
          </Link>

          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Forgot password
            </h1>
            <p className="text-gray-600">Enter your new password</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              label="Password*"
              placeholder="****"
              {...register("new_password")}
              errorText={errors.new_password?.message}
              error={!!errors.new_password}
            />

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                {
                  label: "One special character",
                  valid: hasSpecialChar,
                },
                {
                  label: "One letter",
                  valid: hasLetter,
                },
                {
                  label: "One number",
                  valid: hasNumber,
                },
                {
                  label: "6 characters",
                  valid: hasMinLength,
                },
              ].map(({ label, valid }, i) => (
                <div key={i} className="flex items-center gap-2">
                  {valid ? (
                    <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-300 rounded-full" />
                  )}
                  <span className={valid ? "text-green-600" : "text-gray-500"}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <Button
              disabled={!isValid || isPending}
              loading={isPending}
              type="submit"
              className="mt-8"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
      <div className="relative hidden w-1/2 lg:block">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/images/login-background.png')",
          }}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
