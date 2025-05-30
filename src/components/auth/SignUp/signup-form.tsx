import type React from "react";
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

// Type for form data inferred from Zod schema
type FormData = z.infer<typeof signUpSchema>;

export function SignupFormComponent() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const { mutate, isPending } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => handleSuccess(),
    onError: (error) => console.error(error),
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      full_name: `${data.firstName} ${data.lastName}`,
    };
    mutate(payload);
  };

  const handleSuccess = () => setShowSuccess(true);

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/login");
  };

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasMinLength = password.length >= 6;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full px-8 bg-white lg:w-1/2 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-block mb-8">
            <img src={logo} alt="Kool AI Logo" className="w-auto h-10 transition-opacity hover:opacity-80" />
          </Link>

          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">Sign up with us</h1>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">Login</Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" {...register("firstName")}
                  className="w-full px-4 py-3 text-gray-900 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" {...register("lastName")}
                  className="w-full px-4 py-3 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email address" {...register("email")}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password*</Label>
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
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[{
                label: "One special character",
                valid: hasSpecialChar
              }, {
                label: "One letter",
                valid: hasLetter
              }, {
                label: "One number",
                valid: hasNumber
              }, {
                label: "6 characters",
                valid: hasMinLength
              }].map(({ label, valid }, i) => (
                <div key={i} className="flex items-center gap-2">
                  {valid ? (
                    <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-300 rounded-full" />
                  )}
                  <span className={valid ? "text-green-600" : "text-gray-500"}>{label}</span>
                </div>
              ))}
            </div>

            <Button loading={isPending} disabled={!isValid} type="submit" className="mt-8">
              Sign up
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomButton type="button" variant="outline"
                className="flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">{/* Social SVG */}</svg>
                Continue with Google
              </CustomButton>
              {/* Add more social logins if needed */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
