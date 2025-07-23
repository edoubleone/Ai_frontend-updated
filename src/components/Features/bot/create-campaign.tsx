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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const CreateTextCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateCampaign) =>
      AsyncCreateCampaign(payload, Number(id)),
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

  useEffect(() => {
    if (closed) {
      reset();
    }
  }, [reset, closed, id]);

  const onSubmit = async (data: ICreateCampaign) => {
    if (!id) return;
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-y-6 mt-6">
      {/* <div>
        <h1 className="text-dark font-bold text-lg">Create Campaign</h1>
      </div> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <SecondaryInput
          label="Campaign Title"
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
          label="When should the campaign run?"
          placeholder="Select date"
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

        <DatePicker
          label="Repeat until when?"
          disabled={watch("repeat") === RepeatEnum.None}
          placeholder="Select date"
          date={watch("repeat_until")}
          onDateChange={(date) =>
            date && setValue("repeat_until", date, { shouldValidate: true })
          }
          error={!!errors.repeat_until}
          errorText={errors.repeat_until?.message}
        />

        <div className="flex col-span-2 gap-x-2 justify-end flex-col md:flex-row">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="outline-blue"
            wrapperclass="sm:max-w-40"
          >
            Cancel
          </Button>

          <Button type="submit" loading={isPending} wrapperclass="sm:max-w-40">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTextCampaign;

const RepeatEnum = {
  None: "none",
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
} as const;
