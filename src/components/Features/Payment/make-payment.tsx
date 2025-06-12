import Button from "@/components/shared/button";
import SecondaryInput from "@/components/shared/secondary-input";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useCurrency from "@/hooks/use-currency";
import {
  AsyncInitializePaystack,
  AsyncInitializeStripe,
} from "@/services/api/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const MakePlanPayment = ({
  plan,
}: {
  plan: { name: string; price: number };
}) => {
  const { exchangeRate, currencySymbol, currencyCode } = useCurrency();

  const { mutate: initializePaystack } = useMutation({
    mutationFn: AsyncInitializePaystack,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: initializeStripe } = useMutation({
    mutationFn: AsyncInitializeStripe,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      paymentMethod: undefined,
    },
    resolver: zodResolver(
      z.object({
        email: z.string().email().min(1, { message: "Enter your email" }),
        paymentMethod: z
          .string()
          .min(1, { message: "Select a payment method" }),
      })
    ),
    mode: "onChange",
  });

  const onSubmit = () => {
    if (getValues("paymentMethod") === "paystack") {
      initializePaystack({
        email: getValues("email"),
        amount: Number((plan.price * exchangeRate).toFixed(2)),
        currency: currencyCode,
      });
    } else if (getValues("paymentMethod") === "stripe") {
      initializeStripe({
        email: getValues("email"),
        amount: Number((plan.price * exchangeRate).toFixed(2)),
        currency: currencyCode,
      });
    }
  };

  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <h1 className="text-dark font-bold text-lg">Plan Payment</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-7">
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                onValueChange={(value) => {
                  onChange(value);
                }}
                value={value}
                className="grid grid-cols-2 gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paystack" id="paystack" />
                  <Label
                    htmlFor="paystack"
                    className="inline-flex items-center gap-1.5"
                  >
                    <img src="/icon/paystack.svg" width={24} alt="paystack" />{" "}
                    Paystack
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label
                    htmlFor="stripe"
                    className="inline-flex items-center gap-1.5"
                  >
                    <img src="/icon/stripe.png" width={24} alt="stripe" />{" "}
                    Stripe
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          <SecondaryInput
            {...register("email")}
            errorText={errors.email?.message}
            error={!!errors.email}
            label="E-mail"
            placeholder="Enter email"
            type="email"
          />

          <SecondaryInput
            label="Amount"
            value={`${currencySymbol}${Number(
              (plan.price * exchangeRate).toFixed(2)
            )}`}
            readOnly
            disabled
            type="text"
          />

          <DialogFooter>
            <Button disabled={!isValid} type="submit" wrapperclass="!max-w-[180px]">
              Save
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
};

export default MakePlanPayment;
