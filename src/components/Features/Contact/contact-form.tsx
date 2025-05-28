"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  countryCode: z.string().default("NGN"),
  phoneNumber: z.string().min(6, {
    message: "Phone number must be at least 6 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to our privacy policy.",
  }),
})

const countryCodes = [
  { value: "NGN", label: "NGN", flag: "🇳🇬" },
  { value: "US", label: "US", flag: "🇺🇸" },
  { value: "UK", label: "UK", flag: "🇬🇧" },
  { value: "CA", label: "CA", flag: "🇨🇦" },
  { value: "AU", label: "AU", flag: "🇦🇺" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
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
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      form.reset()

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900">First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} className="bg-white border-gray-300 text-gray-900" />
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
                <FormLabel className="text-gray-900">Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} className="bg-white border-gray-300 text-gray-900" />
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
              <FormLabel className="text-gray-900">Email</FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" {...field} className="bg-white border-gray-300 text-gray-900" />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-gray-900">Phone number</FormLabel>
          <div className="flex gap-2">
            <Select defaultValue="NGN" onValueChange={(value) => form.setValue("countryCode", value)}>
              <SelectTrigger className="w-[100px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="NGN" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span className="text-gray-900">{country.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormControl>
                  <Input
                    placeholder="+234 810 000 000"
                    {...field}
                    className="flex-1 bg-white border-gray-300 text-gray-900"
                  />
                </FormControl>
              )}
            />
          </div>
          <FormMessage className="text-red-600">{form.formState.errors.phoneNumber?.message}</FormMessage>
        </FormItem>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help..."
                  className="min-h-[120px] bg-white border-gray-300 text-gray-900"
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

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}
