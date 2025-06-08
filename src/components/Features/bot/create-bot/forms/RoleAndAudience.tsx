import { sectionStyles } from ".";
import { useFormikContext } from "formik";
import { type RoleAndAudienceFormValues } from "../Types";
import SecondaryInput from "@/components/shared/secondary-input";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import { SelectInput } from "@/components/shared/secondary-select";

const RoleAndAudience = () => {
  const { values, errors, setFieldValue, handleChange, handleBlur } =
    useFormikContext<RoleAndAudienceFormValues>();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Main Role of the Assistant</h1>
      </div>

      <main className="flex flex-col py-10 gap-y-10">
        <section className={sectionStyles}>
          <div className="grid items-start gap-10 sm:grid-cols-2">
            <SecondaryInput
              info
              type="text"
              id="setRole"
              label="Set Role"
              value={values.setRole}
              error={!!errors.setRole}
              errorText={errors.setRole}
              onChange={handleChange}
              onBlur={handleBlur}
              name="setRole"
              placeholder="Example: Experienced sales assistant"
            />

            <SecondaryInput
              info
              type="text"
              id="purposeOfRole"
              value={values.purposeOfRole}
              error={!!errors.purposeOfRole}
              errorText={errors.purposeOfRole}
              onChange={handleChange}
              onBlur={handleBlur}
              name="purposeOfRole"
              placeholder="Enter purpose of role"
              label="Purpose of Role"
            />

            <SecondaryTextArea
              info
              label="Industry and Description"
              id="IndustryAndDescription"
              error={!!errors.IndustryAndDescription}
              errorText={errors.IndustryAndDescription}
              rows={5}
              value={values.IndustryAndDescription}
              onChange={handleChange}
              onBlur={handleBlur}
              name="IndustryAndDescription"
              placeholder="For example, we create website that convert for start up "
            />
          </div>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="mb-2 text-lg font-semibold">Role Tone</h2>
          </div>

          <div className="grid items-start gap-10 sm:grid-cols-2">
            <SelectInput
              label="Tone of Communication"
              error={!!errors.toneOfCommunication}
              errorText={errors.toneOfCommunication}
              options={["friendly", "moderate", "strict"].map((tone) => ({
                value: tone,
                label: tone.charAt(0).toUpperCase() + tone.slice(1),
              }))}
              value={values.toneOfCommunication}
              onChange={(value) => setFieldValue("toneOfCommunication", value)}
              name="toneOfCommunication"
              placeholder="For example, we create website that convert for start up"
            />
          </div>

          <div className="grid items-start gap-10 sm:grid-cols-2">
            <SecondaryTextArea
              info
              label="Welcome words"
              id="welcomeWords"
              error={!!errors.welcomeWords}
              errorText={errors.welcomeWords}
              rows={5}
              name="welcomeWords"
              value={values.welcomeWords}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="For example, we create website that convert for start up"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default RoleAndAudience;
