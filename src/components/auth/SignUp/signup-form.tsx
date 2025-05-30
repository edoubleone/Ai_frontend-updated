import { useState } from "react";
import { Button as CustomButton } from "@/components/ui/button";
import Button from "@/components/shared/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SuccessModal } from "@/components/auth/SignUp/success-modal";
import { VerificationModal } from "@/components/auth/SignUp/verification-modal";
import logo from "@/assets/images/logo.png";
import type { z } from "zod";
import { signUpSchema } from "@/services/models/auth.model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/services/api/auth";
import type { ErrorResponse } from "@/services/config/api";
import { toast } from "sonner";

type FormData = z.infer<typeof signUpSchema>;

export function SignupFormComponent() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      handleSuccess();
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.detail);
    },
  });

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
  const email = watch("email");

  const onSubmit = async (data: FormData) => {
    // Handle form submission here
    const payload = {
      ...data,
      full_name: `${data.firstName} ${data.lastName}`,
    };
    mutate(payload);
  };

  // Password validation
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleVerification = (code: string) => {
    console.log("Verification code:", code);
    // Handle verification logic here
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/login");
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Panel - Form (50% width) */}
        <div className="flex flex-col justify-center w-full px-8 bg-white lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md mx-auto">
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

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    className="w-full px-4 py-3 text-gray-900 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    className="w-full px-4 py-3 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <Label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password*
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="******"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  {hasSpecialChar ? (
                    <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  )}
                  <span
                    className={
                      hasSpecialChar ? "text-green-600" : "text-gray-500"
                    }
                  >
                    One special character
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasLetter ? (
                    <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  )}
                  <span
                    className={hasLetter ? "text-green-600" : "text-gray-500"}
                  >
                    One letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNumber ? (
                    <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  )}
                  <span
                    className={hasNumber ? "text-green-600" : "text-gray-500"}
                  >
                    One number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasMinLength ? (
                    <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  )}
                  <span
                    className={
                      hasMinLength ? "text-green-600" : "text-gray-500"
                    }
                  >
                    6 characters
                  </span>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                loading={isPending}
                disabled={!isValid}
                type="submit"
                className="mt-8 "
              >
                Sign up
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
              <div className="grid grid-cols-2 gap-4">
                <CustomButton
                  type="button"
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
                    Sign up with Google
                  </span>
                </CustomButton>

                <CustomButton
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-medium text-gray-700">
                    Sign up with Facebook
                  </span>
                </CustomButton>
              </div>

              {/* Terms */}
              <p className="mt-6 text-sm leading-relaxed text-gray-500">
                By continuing, you agree to the{" "}
                <Link to="/terms" className="text-gray-700 hover:underline">
                  Terms of Service
                </Link>{" "}
                and acknowledge you've read our{" "}
                <Link to="/privacy" className="text-gray-700 hover:underline">
                  Privacy Policy.
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Panel - Background Image (50% width) */}
        <div className="relative hidden w-1/2 lg:block">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('/images/background.png')",
            }}
          />
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerification}
        onSuccess={handleSuccess}
        email={email}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Successful!"
        message="Congratulations! You've successfully signed up to Agentic AI."
        buttonText="Okay"
      />
    </>
  );
}
