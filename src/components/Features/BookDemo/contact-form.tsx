"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SecondaryInput from "@/components/shared/secondary-input";
import { PhoneInput } from "@/components/shared/phone-number-input";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import Button from "@/components/shared/button";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  phoneNumber: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to our privacy policy.",
  }),
});

type ContactFormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "NGN",
      phoneNumber: "",
      message: "",
      agreeToPrivacy: false,
    },
  });

  function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", values);
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();

      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SecondaryInput
                    label="First name"
                    placeholder="First name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SecondaryInput
                    label="Last name"
                    placeholder="Last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SecondaryInput
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  defaultCountry="NG"
                  label="Phone Number"
                  placeholder="0810 000 000"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SecondaryTextArea
                  label="Message"
                  placeholder="Tell us how we can help..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToPrivacy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal text-gray-900">
                  You agree to our friendly privacy policy.
                </FormLabel>
                <FormMessage className="text-red-600" />
              </div>
            </FormItem>
          )}
        />

        <Button wrapperclass="mt-2" type="submit" loading={isSubmitting}>
          {isSubmitting
            ? "Sending..."
            : isSuccess
            ? "Message Sent!"
            : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
