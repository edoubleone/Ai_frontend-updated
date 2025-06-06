import { Switch } from "@/components/ui/switch";
import SecondaryInput from "@/components/shared/secondary-input";
import { useFormikContext } from "formik";
import type { BasicSetupFormValues } from "../Types";
import { SelectInput } from "@/components/shared/secondary-select";

const BasicSetup = () => {
  const { values, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<BasicSetupFormValues>();

  return (
    <main className="flex flex-col gap-y-11">
      <div className="grid sm:grid-cols-2 items-start gap-10">
        <SecondaryInput
          wrapperClass=""
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          error={!!errors.name}
          errorText={errors.name}
          label="Assistant's Name Displayed to Users"
          placeholder="Example: Joe"
        />

        <SelectInput
          name="typeOfAssistant"
          placeholder="Type of Assistant"
          options={[
            { label: "Text", value: "text" },
            { value: "image", label: "Image" },
          ]}
          value={values.typeOfAssistant}
          onChange={(value) => setFieldValue("typeOfAssistant", value)}
          label="Type of Assistant"
        />

        <div className="flex flex-col gap-y-2.5">
          <SecondaryInput
            value={values.language}
            onChange={handleChange}
            name="language"
            label="Assistant’s language"
            placeholder="English"
          />
          <div className="hidden items-center gap-[30px]">
            <span className={`text-base text-[#737373]`}>
              Is your Assistant Multilingual?
            </span>

            <Switch
              checked={values.isMultilingual}
              onCheckedChange={(checked) =>
                setFieldValue("isMultilingual", checked)
              }
            />
          </div>
        </div>

        <SecondaryInput
          name="customer_support_contact"
          onChange={handleChange}
          placeholder="e.g +1345635464234"
          value={values.customer_support_contact}
          error={!!errors.customer_support_contact}
          errorText={errors.customer_support_contact}
          label="Customer Support Contact"
        />
      </div>
    </main>
  );
};

export default BasicSetup;
