import Button from "@/components/shared/button";
import { DatePicker } from "@/components/shared/datepicker";
import SecondaryInput from "@/components/shared/secondary-input";
import { SelectInput } from "@/components/shared/secondary-select";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AsyncCreateCampaign,
  type ICreateCampaign,
} from "@/services/api/assistant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateCampaign = ({
  id,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateCampaign) => AsyncCreateCampaign(payload, id),
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
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      campaign: "",
      run_at: undefined,
      repeat: "",
      repeat_until: undefined,
    },
    resolver: zodResolver(
      z.object({
        campaign: z.string().min(1, "Campaign is required"),
        run_at: z.date({ required_error: "Run at is required" }),
        repeat: z.string().min(1, "Repeat is required"),
        repeat_until: z.date().optional(),
      })
    ),
  });

  const onSubmit = async (data: ICreateCampaign) => {
    if (!id) return;
    mutate(data);
  };

  return (
    <DialogContent>
      <div className="flex flex-col gap-y-6 mt-6">
        <div>
          <h1 className="text-dark font-bold text-lg">Create Campaign</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <SecondaryInput
            label="Title"
            {...register("campaign")}
            error={!!errors.campaign}
            errorText={errors.campaign?.message}
            placeholder="Enter campaign title"
            type="text"
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

          {watch("repeat") !== RepeatEnum.None && (
            <DatePicker
              label="Repeat until"
              placeholder="Repeat until"
              date={watch("repeat_until")}
              onDateChange={(date) =>
                date && setValue("repeat_until", date, { shouldValidate: true })
              }
              error={!!errors.repeat_until}
              errorText={errors.repeat_until?.message}
            />
          )}

          <DialogFooter>
            <DialogClose
              type="button"
              className="flex-1 border-2 border-defaultBlue text-defaultBlue rounded-md"
            >
              Cancel
            </DialogClose>

            <Button type="submit" loading={isPending} wrapperclass="flex-1">
              Create
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
};

export default CreateCampaign;

const RepeatEnum = {
  None: "none",
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
} as const;
