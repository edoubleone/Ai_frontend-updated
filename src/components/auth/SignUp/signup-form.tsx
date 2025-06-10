import Button from "@/components/shared/button";
import { Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import type { z } from "zod";
import { signUpSchema } from "@/services/models/auth.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/services/api/auth";
import { toast } from "sonner";
import type { ErrorResponse } from "@/services/config/api";
import SecondaryInput from "@/components/shared/secondary-input";
import PasswordInput from "@/components/shared/password-input";

// Type for form data inferred from Zod schema
type FormData = z.infer<typeof signUpSchema>;

export function SignupFormComponent() {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password");

  const { mutate, isPending } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.detail || "Registration failed");
    },
  });

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      full_name: `${data.firstName} ${data.lastName}`,
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
              Sign up with us
            </h1>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 gap-4">
              <SecondaryInput
                label="First Name"
                placeholder="First Name"
                {...register("firstName")}
                errorText={errors.firstName?.message}
              />

              <SecondaryInput
                label="Last Name"
                placeholder="Last Name"
                {...register("lastName")}
                errorText={errors.lastName?.message}
              />
            </div>

            <SecondaryInput
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              {...register("email")}
              errorText={errors.email?.message}
            />

            <PasswordInput
              label="Password*"
              placeholder="****"
              {...register("password")}
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
              loading={isPending}
              disabled={!isValid}
              type="submit"
              className="mt-8"
            >
              Sign up
            </Button>

            {/* <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomButton
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                </svg>
                Continue with Google
              </CustomButton>
            </div> */}
          </form>
        </div>
      </div>
      <div className="relative hidden w-1/2 lg:block">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/images/signup-bg.png')",
          }}
        />
      </div>
    </div>
  );
}
