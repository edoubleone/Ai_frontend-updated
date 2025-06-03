import { Switch } from "@/components/ui/switch";
import SecondaryInput from "@/components/shared/secondary-input";
import { useFormikContext } from "formik";
import type { BasicSetupFormValues } from "../Types";

const BasicSetup = () => {
  const { values, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<BasicSetupFormValues>();

  return (
    <main className="flex flex-col gap-y-11">
      <div className="flex items-center gap-4 mb-6">
        <span
          className={`text-lg font-medium ${
            values.typeOfAssistant !== "text"
              ? "text-gray-900"
              : "text-gray-500"
          }`}
        >
          Image
        </span>
        <Switch
          checked={values.typeOfAssistant === "text"}
          onCheckedChange={(checked) =>
            setFieldValue("typeOfAssistant", checked ? "text" : "image")
          }
        />
        <span
          className={`text-lg font-medium ${
            values.typeOfAssistant === "text"
              ? "text-gray-900"
              : "text-gray-500"
          }`}
        >
          Text
        </span>
      </div>

      <div className="grid sm:grid-cols-2 items-start gap-10">
        <SecondaryInput
          wrapperClass=""
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          errorText={errors.name}
          label="Assistant's Name Displayed to Users"
          placeholder="Example: Joe"
        />

        <SecondaryInput
          name="typeOfAssistant"
          placeholder="Type of Assistant"
          value={values.typeOfAssistant}
          label="Type of Assistant"
          disabled
        />

        <div className="flex flex-col gap-y-2.5">
          <SecondaryInput
            value={values.language}
            onChange={handleChange}
            name="language"
            label="Assistant’s language"
            placeholder="English"
          />
          <div className="flex items-center gap-[30px]">
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
      </div>
    </main>
  );
};

export default BasicSetup;
