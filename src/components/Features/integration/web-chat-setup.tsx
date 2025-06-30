import Button from "@/components/shared/button";
import copy from "@/assets/icons/copy-outline-white.svg";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import SecondaryInput from "@/components/shared/secondary-input";
import { useState } from "react";
import { toast } from "sonner";
import type { ErrorResponse } from "@/services/config/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GetEmbedPage } from "@/services/api/assistant";

interface FormData {
  businessName: string;
}

const WebChatSetup = () => {
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      businessName: "",
    },
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        businessName: z.string().min(1, "Business name is required"),
      })
    ),
  });

  const handleGenerateCode = async (data: FormData) => {
    try {
      setIsLoading(true);
      const result = await GetEmbedPage(data.businessName);
      setGeneratedCode(result);
    } catch (error) {
      const errorMessage =
        (error as ErrorResponse)?.response?.data?.detail ||
        (error as Error)?.message ||
        "Failed to generate embed code";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setGeneratedCode(null);
    reset();
  };

  return (
    <DialogContent className="!max-w-[570px]">
      <form
        onSubmit={handleSubmit(handleGenerateCode)}
        className="flex flex-col gap-y-6 mt-6"
      >
        <div>
          <h1 className="text-dark font-bold text-lg">Web chat setup</h1>
          <p className="text-base text-[#737373]">
            Enter registered business name to generate embed code for your web
            chat. This will be used to identify your business in the chat
            widget.
          </p>
        </div>

        <div className="grid gap-6">
          {generatedCode ? null : (
            <SecondaryInput
              label="Business Name"
              placeholder="Enter registered business name"
              {...register("businessName")}
              error={!!errors?.businessName}
              errorText={errors?.businessName?.message}
            />
          )}

          {generatedCode && (
            <div className="bg-[#EEEEFD] flex rounded-2xl divide-y flex-col w-full">
              <pre className="mx-5 text-xs w-fit text-dark my-2.5 whitespace-pre-wrap break-all">
                <code>
                  {`
${generatedCode}
`}
                </code>
              </pre>

              <Button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  toast.success("Embed code copied to clipboard");
                }}
                wrapperclass="justify-end py-2.5 px-5"
                className="!bg-dark !w-fit"
              >
                Copy
                <img src={copy} alt="copy icon" />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          {generatedCode ? (
            <Button
              type="button"
              wrapperclass="!max-w-[180px]"
              variant="outline"
              onClick={handleClear}
            >
              Clear
            </Button>
          ) : (
            <Button
              type="submit"
              wrapperclass="!max-w-[180px]"
              disabled={isLoading || !isValid}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default WebChatSetup;
