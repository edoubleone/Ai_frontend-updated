'use client';

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  countryCode: z.string().default("NGN"),
  phoneNumber: z.string().min(6, { message: "Phone number must be at least 6 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  agreeToPrivacy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to our privacy policy." })
  })
})

const countryCodes = [
  { value: "NGN", label: "NGN", flag: "🇳🇬" },
  { value: "US", label: "US", flag: "🇺🇸" },
  { value: "UK", label: "UK", flag: "🇬🇧" },
  { value: "CA", label: "CA", flag: "🇨🇦" },
  { value: "AU", label: "AU", flag: "🇦🇺" }
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
      agreeToPrivacy: false
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(values)
      setIsSuccess(true)
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "NGN",
        phoneNumber: "",
        message: "",
        agreeToPrivacy: false
      })
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstName" className="text-sm font-light">First name</FormLabel>
                <FormControl>
                  <Input id="firstName" placeholder="First name" {...field} type="text" className="text-gray-900 bg-white border-gray-300" />
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
                <FormLabel htmlFor="lastName" className="text-sm font-light">Last name</FormLabel>
                <FormControl>
                  <Input id="lastName" placeholder="Last name" {...field} type="text" className="text-gray-900 bg-white border-gray-300" />
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
              <FormLabel htmlFor="email" className="text-gray-900">Email</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="you@company.com" {...field} className="text-gray-900 bg-white border-gray-300" />
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
              <FormLabel htmlFor="phoneNumber" className="text-gray-900">Phone number</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Select
                    value={form.watch("countryCode")}
                    onValueChange={(value) => form.setValue("countryCode", value)}
                  >
                    <SelectTrigger className="w-[100px] bg-white border-gray-300 text-gray-900">
                      <SelectValue>
                        {countryCodes.find(c => c.value === form.watch("countryCode"))?.flag}{" "}
                        {form.watch("countryCode")}
                      </SelectValue>
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
                </FormControl>
                <FormControl>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+234 810 000 000"
                    {...field}
                    className="flex-1 text-gray-900 bg-white border-gray-300"
                  />
                </FormControl>
              </div>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="message" className="text-gray-900">Message</FormLabel>
              <FormControl>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Type your message..."
                  {...field}
                  className="text-gray-900 bg-white border-gray-300"
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
                  id="agreeToPrivacy"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="agreeToPrivacy" className="text-sm font-normal text-gray-900">
                  You agree to our friendly privacy policy.
                </FormLabel>
                <FormMessage className="text-red-600" />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}
