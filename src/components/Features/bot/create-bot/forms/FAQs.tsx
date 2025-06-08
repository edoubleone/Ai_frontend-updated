import React from "react";
import { sectionStyles } from ".";
import { Switch } from "@/components/ui/switch";

import { type FaqsFormValues } from "../Types";
import { useFormikContext } from "formik";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const FAQs = () => {
  const { values, errors, setFieldValue, handleChange, handleBlur } =
    useFormikContext<FaqsFormValues>();

  const [questions, setQuestions] = React.useState<boolean>(false);

  return (
    <div>
      <section className={sectionStyles}>
        <div>
          <h2 className="text-lg font-semibold mb-2">Question & Answer</h2>
          <div className="flex items-center w-full justify-between gap-[30px]">
            <span
              className={`${questions ? "text-gray-900" : "text-gray-500"}`}
            >
              You can add up to 200 questions and answers. Our AI will analyze
              user questions and match them with your entries to work its magic.
            </span>
            <Switch
              checked={questions}
              onCheckedChange={setQuestions}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2">
          <SecondaryTextArea
            info
            id="faqQuestion"
            value={values.faqQuestion}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.faqQuestion}
            errorText={errors.faqQuestion}
            rows={5}
            name="faqQuestion"
            placeholder="e.g Are you opened on weekends?"
            label="Question"
          />
        </div>

        <div className="grid sm:grid-cols-2">
          <SecondaryTextArea
            info
            id="faqAnswer"
            value={values.faqAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.faqAnswer}
            errorText={errors.faqAnswer}
            rows={5}
            name="faqAnswer"
            placeholder="e.g Yes, but we close before 2pm"
            label="Answer"
          />
        </div>

        <div
          className={values.addFaqCheckbox ? "grid sm:grid-cols-2" : "hidden"}
        >
          <SecondaryTextArea
            info
            label="Question"
            id="extraQuestion"
            value={values.extraQuestion}
            onChange={handleChange}
            error={!!errors.extraQuestion}
            errorText={errors.extraQuestion}
            onBlur={handleBlur}
            rows={5}
            name="extraQuestion"
            hasMax
            max={50}
            placeholder="e.g Are you opened on weekends?"
          />
        </div>

        <div
          className={values.addFaqCheckbox ? "grid sm:grid-cols-2" : "hidden"}
        >
          <SecondaryTextArea
            label="Answer"
            id="extraAnswer"
            value={values.extraAnswer}
            error={!!errors.extraAnswer}
            errorText={errors.extraAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            name="extraAnswer"
            placeholder="e.g Yes, but we close before 2pm"
            hasMax
            max={50}
          />
        </div>

        <Label className="flex text-base text-[#5C5C5C] items-center gap-x-3">
          <Checkbox
            checked={values.addFaqCheckbox}
            onCheckedChange={(checked) =>
              setFieldValue("addFaqCheckbox", checked)
            }
          />
          Add Instructions
        </Label>
      </section>
    </div>
  );
};

export default FAQs;
