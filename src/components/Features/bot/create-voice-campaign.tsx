import Button from "@/components/shared/button";
import { DatePicker } from "@/components/shared/datepicker";
import { PhoneInput } from "@/components/shared/phone-number-input";
import SecondaryInput from "@/components/shared/secondary-input";
import { SelectInput } from "@/components/shared/secondary-select";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import useCurrency from "@/hooks/use-currency";
import {
  AsyncCreateVoiceCampaign,
  type ICreateVoiceCampaign,
} from "@/services/api/assistant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ClockIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const CreateVoiceCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currencyCode } = useCurrency();

  const defaultCountry = currencyCode === "NGN" ? "NG" : "US";

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateVoiceCampaign) =>
      AsyncCreateVoiceCampaign(payload, Number(id)),
    onSuccess: () => {
      toast.success("Campaign created successfully");
      reset();
      navigate(-1);
    },
    onError: () => {
      toast.error("Error creating campaign");
    },
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      message: "",
      handle: "",
      run_at: undefined,
      repeat: "",
      channel: "voice",
      time: "",
    },
    resolver: zodResolver(
      z.object({
        message: z
          .string()
          .max(300, "Message should be at most 300 characters"),
        handle: z.string().min(1, "Enter phone number"),
        run_at: z.date({ required_error: "Select campaign date" }),
        repeat: z.string().min(1, "Select repeat period"),
        channel: z.string().min(1, "Select channel"),
        time: z.string().min(1, "Select time"),
      })
    ),
  });

  useEffect(() => {
    if (closed) {
      reset({
        message: "",
        handle: "",
        run_at: undefined,
        repeat: "",
        channel: "voice",
        time: "",
      });
    }
  }, [reset, closed, id]);

  const onSubmit = async (data: ICreateVoiceCampaign & { time: string }) => {
    const { time, run_at, ...rest } = data;

    let combinedDate = new Date(run_at);
    if (time) {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      combinedDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    }
    mutate({ ...rest, run_at: combinedDate });
  };

  return (
    <div className="flex flex-col gap-y-6 mt-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <PhoneInput
          label="Phone Number"
          placeholder="00 000 000"
          defaultCountry={defaultCountry}
          value={watch("handle")}
          onChange={(value) =>
            setValue("handle", value, { shouldValidate: true })
          }
          error={!!errors.handle}
          errorText={errors.handle?.message}
        />

        <DatePicker
          date={watch("run_at")}
          onDateChange={(date) =>
            date && setValue("run_at", date, { shouldValidate: true })
          }
          error={!!errors.run_at}
          errorText={errors.run_at?.message}
          label="Run at"
          placeholder="Run at"
        />

        <SecondaryInput
          type="time"
          id="time-picker"
          label="Time"
          icon={<ClockIcon className="size-4" />}
          placeholder="Time"
          {...register("time")}
          iconposition="right"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none text-sm flex placeholder:text-[#454545] px-4 focus:ring-[3px] ring-[#343CED] items-center rounded-md border border-[#D0D0D0] py-4 text-[#454545] outline-none bg-white w-full [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          error={!!errors.time}
          errorText={errors.time?.message}
        />

        <SelectInput
          label="Repeat"
          value={watch("repeat")}
          placeholder="Select"
          onChange={(value) =>
            setValue("repeat", value, { shouldValidate: true })
          }
          error={!!errors.repeat}
          errorText={errors.repeat?.message}
          options={Object.entries(RepeatEnum).map(([key, value]) => ({
            label: key,
            value,
          }))}
        />

        <SecondaryTextArea
          hasMax
          max={300}
          label="Message"
          errorText={errors.message?.message}
          rows={5}
          {...register("message")}
          error={!!errors.message}
          placeholder="Hi John, how are you today? We are reaching out to you tell you about our products. Should I go ahead?"
        />

        <div className="flex gap-x-2 col-span-2 justify-end flex-col md:flex-row">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="outline-blue"
            wrapperclass="sm:max-w-40"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!isValid}
            loading={isPending}
            wrapperclass="sm:max-w-40"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateVoiceCampaign;

const RepeatEnum = {
  None: "none",
  Daily: "daily",
  Weekly: "weekly",
} as const;
