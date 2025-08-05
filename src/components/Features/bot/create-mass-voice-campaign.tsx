import Button from "@/components/shared/button";
import { DatePicker } from "@/components/shared/datepicker";
import { PhoneInput } from "@/components/shared/phone-number-input";
import SecondaryInput from "@/components/shared/secondary-input";
import { SelectInput } from "@/components/shared/secondary-select";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import useCurrency from "@/hooks/use-currency";
import {
  CreateBulkVoiceCampaign,
  type ICreateBulkVoiceCampaign,
} from "@/services/api/assistant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ClockIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type FormData = {
  message: string;
  run_at: Date;
  repeat: string;
  channel: string;
  time: string;
};

const CreateMassVoiceCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currencyCode } = useCurrency();

  const defaultCountry = currencyCode === "NGN" ? "NG" : "US";

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateBulkVoiceCampaign) =>
      CreateBulkVoiceCampaign(payload, Number(id)),
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
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      message: "",
      run_at: new Date(),
      repeat: "",
      channel: "voice",
      time: "",
    },
    resolver: zodResolver(
      z.object({
        message: z
          .string()
          .max(300, "Message should be at most 300 characters"),
        run_at: z.date({ required_error: "Select campaign date" }),
        repeat: z.string().min(1, "Select repeat period"),
        channel: z.string().min(1, "Select channel"),
        time: z.string().min(1, "Select time"),
      })
    ),
  });

  const [phoneNumbers, setPhoneNumbers] = useState([""]);

  useEffect(() => {
    if (closed) {
      reset({
        message: "",
        run_at: new Date(),
        repeat: "",
        channel: "voice",
        time: "",
      });
      setPhoneNumbers([""]);
    }
  }, [reset, closed, id]);

  const onSubmit = async (data: FormData) => {
    const { time, run_at, ...rest } = data;

    let combinedDate = new Date(run_at);
    if (time) {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      combinedDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    }
    mutate({
      ...rest,
      handles: phoneNumbers.filter((phoneNumber) => phoneNumber !== ""),
      run_at: combinedDate,
    });
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleRemovePhoneNumber = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    setPhoneNumbers(
      phoneNumbers.map((phoneNumber, i) => (i === index ? value : phoneNumber))
    );
  };

  return (
    <div className="flex flex-col gap-y-6 mt-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <DatePicker
          date={watch("run_at")}
          onDateChange={(date) =>
            date && setValue("run_at", date, { shouldValidate: true })
          }
          error={!!errors.run_at}
          errorText={errors.run_at?.message}
          label="When should it run?"
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

        <div className="grid col-span-2 gap-6">
          <div className="col-span-2 grid sm:grid-cols-2 items-start gap-6">
            {phoneNumbers.map((phoneNumber, index) => (
              <div key={index} className="flex w-full  gap-2 items-center">
                <PhoneInput
                  label={`Phone Number ${index + 1}`}
                  placeholder="00 000 000"
                  defaultCountry={defaultCountry}
                  wrapperClass="w-full"
                  error={phoneNumber === "" && index > 0}
                  errorText="Phone number is required"
                  value={phoneNumber}
                  onChange={(value) => handlePhoneNumberChange(index, value)}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline-blue"
                    className="!p-0 !text-sm !border-none"
                    wrapperclass="!w-fit"
                    onClick={() => handleRemovePhoneNumber(index)}
                  >
                    <Trash2Icon className="size-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline-blue"
            className="!p-0 !text-sm !border-none"
            wrapperclass="!w-fit"
            onClick={handleAddPhoneNumber}
          >
            <PlusIcon className="size-5" /> Add Phone Number
          </Button>
        </div>

        <SecondaryTextArea
          hasMax
          max={300}
          label="Message"
          errorText={errors.message?.message}
          rows={5}
          {...register("message")}
          error={!!errors.message}
          wrapperClass="col-span-2"
          placeholder="Hi John, how are you today? We are reaching out to you tell you about our products. Should I go ahead?"
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
            disabled={
              !isValid ||
              phoneNumbers.filter((phoneNumber) => phoneNumber !== "")
                .length === 0
            }
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

export default CreateMassVoiceCampaign;

const RepeatEnum = {
  None: "none",
  Daily: "daily",
  Weekly: "weekly",
} as const;
