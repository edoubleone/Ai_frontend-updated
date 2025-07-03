import Button from "@/components/shared/button";
import { DatePicker } from "@/components/shared/datepicker";
import { PhoneInput } from "@/components/shared/phone-number-input";
import { SelectInput } from "@/components/shared/secondary-select";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AsyncCreateVoiceCampaign,
  type ICreateVoiceCampaign,
} from "@/services/api/assistant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateVoiceCampaign = ({
  id,
  closeModal,
  closed,
}: {
  id: number;
  closed: boolean;
  closeModal: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateVoiceCampaign) =>
      AsyncCreateVoiceCampaign(payload),
    onSuccess: () => {
      toast.success("Campaign created successfully");
      reset();
      closeModal();
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
      assistant_id: id,
      message: "",
      handle: "",
      run_at: undefined,
      repeat: "",
      channel: "voice",
    },
    resolver: zodResolver(
      z.object({
        assistant_id: z.number().min(1, "Assistant ID is required"),
        message: z.string().max(200, "Message should be at most 200 characters"),
        handle: z.string().min(1, "Enter phone number"),
        run_at: z.date({ required_error: "Select campaign date" }),
        repeat: z.string().min(1, "Select repeat period"),
        channel: z.string().min(1, "Select channel"),
      })
    ),
  });

  useEffect(() => {
    if (closed) {
      reset({
        assistant_id: id,
        message: "",
        handle: "",
        run_at: undefined,
        repeat: "",
        channel: "voice",
      });
    }
  }, [reset, closed, id]);

  const onSubmit = async (data: ICreateVoiceCampaign) => {
    if (!id) return;
    mutate(data);
  };

  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">Create Voice Campaign</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <PhoneInput
            label="Phone Number"
            placeholder="00 000 000"
            value={watch("handle")}
            onChange={(value) =>
              setValue("handle", value, { shouldValidate: true })
            }
            error={!!errors.handle}
            errorText={errors.handle?.message}
          />

          <SecondaryTextArea
            hasMax
            max={200}
            label="Message"
            errorText={errors.message?.message}
            rows={5}
            {...register("message")}
            error={!!errors.message}
            placeholder="Enter message"
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

          <DialogFooter>
            <DialogClose
              type="button"
              className="flex-1 border-2 border-defaultBlue text-defaultBlue rounded-md"
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={!isValid}
              loading={isPending}
              wrapperclass="flex-1"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
};

export default CreateVoiceCampaign;

const RepeatEnum = {
  None: "none",
  Daily: "daily",
  Weekly: "weekly",
} as const;
