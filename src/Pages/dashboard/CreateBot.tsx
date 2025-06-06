import { ChevronLeft } from "lucide-react";
import {
  BasicSetup,
  Preview,
  CompanyDetails,
  Customize,
  Settings,
  FAQs,
  RoleAndAudience,
} from "../../components/Features/bot/create-bot/forms";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import type { BotEditPageProps } from "../../components/Features/bot/bot-edit-page";
import { stepSchemas } from "../../components/Features/bot/create-bot/Types";
import apiClient, { type ErrorResponse } from "@/services/config/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Button from "@/components/shared/button";

export function CreateAssistant(payload: any) {
  return apiClient.post(`/assistants/`, payload);
}

export function UploadKnowledgeFile(assistant_id: string, files: FormData) {
  return apiClient.post(`/knowledge/${assistant_id}/knowledge`, files, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const steps = [
  {
    heading: "Basic Setup",
    desc: "Give a name to your new assistant. This name will be used when it introduces itself to your clients. Select the languages your assistant will communicate in and choose its type: voice or text.",
    component: <BasicSetup />,
  },
  {
    heading: "Give us details about your Company",
    desc: "In this section, we will ask you to provide details about your company that the assistant should know to perform its functions effectively. Imagine that you are training a new employee and telling them about your company.",
    component: <CompanyDetails />,
  },
  {
    heading: "Level Three, Fine Tuning your Agent",
    desc: "Create and customize the assistant’s role by defining its tasks, target audience, and communication style. This section helps you tailor the assistant to meet specific needs and ensure consistent and personalized user interactions.",
    component: <RoleAndAudience />,
  },
  {
    heading: "Additional Settings and Restrictions",
    desc: "Here you can set up the bot’s reactions to random client phrases, support for small talk, use of emojis, as well as configure restrictions and limitations for your assistant. For example: 'Offer cross-sells (recommend complementary products)' or 'Use short and clear phrases, avoiding complex technical terms' or 'Emphasize modern technologies, innovative solutions, and speed of service' or 'When questions about returns arise, always provide a link to the return policy page.'",
    component: <Settings />,
  },
  {
    heading: "FAQ",
    desc: "Add a FAQ section so users can find information about your company easily. You can train the assistant’s knowledge specifically to your product or service.",
    component: <FAQs />,
  },
  {
    heading: "Customize",
    desc: "Customize the look and feel of your Bot to reflect your brand and website",
    component: <Customize />,
  },
  {
    heading: "Full Preview",
    desc: "Here’s a final preview of how your Bot Assistant looks like. If you are not satisfy with it, kindly go back to edit.",
    component: <Preview />,
  },
];

const initialValues = {
  name: "",
  typeOfAssistant: "text",
  language: "English",
  uploadFile: undefined,
  isMultilingual: true,
  companyName: "",
  companyDescription: "",
  companyWebsite: "",
};

const CreateBot: React.FC<BotEditPageProps> = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    setAnimate(false); // Reset animation
    const timeout = setTimeout(() => {
      setAnimate(true); // Trigger animation after a tick
    }, 50); // small delay for reflow

    return () => clearTimeout(timeout); // cleanup
  }, [currentStep]);

  const handleValidation = async (
    validateForm: any,
    setTouched: any,
    errors: any
  ) => {
    // Validate the current step's form
    const formErrors = await validateForm();

    setTouched(
      Object.keys(errors).reduce((touchedObj: any, key: string) => {
        touchedObj[key] = true;
        return touchedObj;
      }, {})
    );

    return formErrors;
  };

  const handleNextStep = async (
    validateForm: any,
    setTouched: any,
    errors: any,
    event?: React.FormEvent
  ) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }

    // console.log('data :', validateForm.data);

    // Validate the current step's form
    const formErrors = await handleValidation(validateForm, setTouched, errors);

    if (Object.keys(formErrors).length === 0) {
      setAnimate(true);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const { mutateAsync: uploadKnowledgeFile } = useMutation({
    mutationFn: (data: any) =>
      UploadKnowledgeFile(data.assistantId, data.formData),
    onError: (err: ErrorResponse) => {
      toast.error(
        err?.response?.data?.detail || "Something went wrong. Try again"
      );
      navigate("/dashboard");
    },
    onSuccess: () => {
      toast.success("Assistant created successfully!");
      navigate("/dashboard");
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: CreateAssistant,
    onError: () => {
      toast.error("Something went wrong. Try again");
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);

      const payload = {
        name: values.name,
        business_name: values.companyName || "",
        industry: values.IndustryAndDescription || "",
        description: values.description || "",
        greeting: values.greeting || "",
        persona: values.setRole || "",
        customer_support_contact: values.customer_support_contact || "",
        tone: values.toneOfCommunication || "",
        small_talk_level: values.talkLevel || "none",
        jokes_level: values.jokeLevel || "none",
        emoji_level: values.emodzy || "none",
        additional_instructions: values.additionalInstruction || "",
        config: {},
      };

      const response = await mutateAsync(payload);
      const assistantId = response.data.assistant.id;

      if (values.uploadFile || values.companyDocument) {
        const formData = new FormData();
        if (values.uploadFile) {
          formData.append("files", values.uploadFile);
        }
        if (values.companyDocument) {
          formData.append("files", values.companyDocument);
        }
        await uploadKnowledgeFile({ assistantId, formData });
      }

      toast.success("Assistant created successfully!");
      navigate("/dashboard");

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating assistant or uploading file:", error);
      setIsSubmitting(false);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setAnimate(true);
  };

  const totalSteps = steps.length;

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="flex flex-col">
      <header className="mb-4">
        <Button
          variant="ghost"
          wrapperclass="w-fit"
          onClick={() => navigate(-1)}
          className="!px-0 bg-transparent !w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </header>

      <main className="flex flex-col bg-background rounded-lg p-8">
        <header>
          <h1 className="text-2xl font-semibold mb-4">
            Let's set up your AI Assistant
          </h1>
          <p className="text-gray-600 mb-6">
            Customize and fine-tune the way your assistant communicates and
            interacts with customers to ensure it delivers consistent, engaging,
            and brand-aligned conversations across every touchpoint.
          </p>
        </header>

        {/* Progress Bar */}
        <div className="relative w-full mb-6">
          <div className="w-full h-[3px] bg-[#D0D0D0] absolute top-5">
            <div
              className="h-full bg-blue-600"
              style={{
                width: `${progressPercentage}%`,
                transition: "all ease-in-out 0.5s",
              }}
            />
          </div>
          <div className="w-full flex justify-between">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-10 w-10 rounded-full z-[2] transition-colors duration-500 delay-200 ${
                  currentStep >= index ? "bg-blue-600" : "bg-[#D0D0D0]"
                } flex items-center justify-center font-semibold text-background`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={stepSchemas[currentStep]}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({ validateForm, setTouched, errors, values }) => (
            <div>
              <main className={`flex flex-col gap-y-3 w-full`}>
                <section
                  className={`flex flex-col gap-y-3 transition-all duration-500 delay-300 ${
                    animate
                      ? "translate-y-0 opacity-100 scale-100"
                      : "-translate-y-10 opacity-0 scale-95"
                  }`}
                >
                  <h2 className="font-semibold text-lg">
                    {steps[currentStep].heading}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {steps[currentStep].desc}
                  </p>
                </section>

                <section>{steps[currentStep].component}</section>
              </main>

              <footer
                className={`flex w-full justify-between mt-12 items-center`}
              >
                <button
                  type="button"
                  disabled={currentStep === 0}
                  className="px-5 py-2 bg-transparent hover:bg-background transition-colors rounded-lg text-defaultBlue font-medium"
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>

                <div className="flex gap-3.5 items-center">
                  {currentStep < totalSteps - 1 && (
                    <Button
                      variant="outline-blue"
                      type="button"
                      className="!w-[207px]"
                      // disabled={currentStep === 0}
                      onClick={() => handleSubmit(values)}
                    >
                      {isSubmitting ? "Saving..." : "Save and Finish Later"}
                    </Button>
                  )}
                  {!isLastStep ? (
                    <Button
                      className="!w-[207px]"
                      type="button"
                      // onClick={currentStep === 0 ? () => handleSubmit(values) : () => handleNextStep(validateForm, setTouched, errors)}
                      onClick={() =>
                        handleNextStep(validateForm, setTouched, errors)
                      }
                    >
                      Proceed
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => handleSubmit(values)}>
                      {isSubmitting ? "Submitting..." : "Finish"}
                    </Button>
                  )}
                </div>
              </footer>
            </div>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default CreateBot;
