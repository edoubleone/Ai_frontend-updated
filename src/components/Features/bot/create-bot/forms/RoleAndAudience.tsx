import { sectionStyles } from ".";
import { CircleAlert } from "lucide-react";
import React from "react";
import SelectionTab from "../components/SelectionTab";
import { useFormikContext } from "formik";
import { type RoleAndAudienceFormValues } from "../Types";
import { Switch } from "@/components/ui/switch";
import SecondaryInput from "@/components/shared/secondary-input";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import { SelectInput } from "@/components/shared/secondary-select";

const RoleAndAudience = () => {
  const { values, errors, setFieldValue, handleChange, handleBlur } =
    useFormikContext<RoleAndAudienceFormValues>();

  const whenToCollectInformation = [
    "Start of the chat",
    "End of the chat",
    "No Preference",
  ];

  const [isWhenToCollectInformation, setIsWhenToCollectInformation] =
    React.useState<string>(whenToCollectInformation[0]);
  const [toCollectInformation, setToCollectInformation] =
    React.useState<boolean>(false);

  values.collectInformation = toCollectInformation;

  values.whenToCollectInformation = isWhenToCollectInformation;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Main Role of the Assistant</h1>
      </div>

      <main className="flex flex-col gap-y-10 py-10">
        <section className={sectionStyles}>
          <div className="grid sm:grid-cols-2 items-start gap-10">
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
            <h2 className="text-lg font-semibold mb-2">Role Tone</h2>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur. Ornare lorem consectetur
              magna mi id. Porta id id sed blandit suspendisse.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 items-start gap-10">
            <SecondaryInput
              label="Tone of Communication"
              error={!!errors.toneOfCommunication}
              errorText={errors.toneOfCommunication}
              type="text"
              id="toneOfCommunication"
              value={values.toneOfCommunication}
              onChange={handleChange}
              onBlur={handleBlur}
              name="toneOfCommunication"
              placeholder="For example, we create website that convert for start up"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-10 items-start">
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

            <SecondaryTextArea
              info
              label=" Welcome (Logged in user) (Optional)"
              id="welcomeLoggedUser"
              value={values.welcomeLoggedUser}
              error={!!errors.welcomeLoggedUser}
              errorText={errors.welcomeLoggedUser}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              name="welcomeLoggedUser"
              placeholder="For example, we create website that convert for start up"
            />
          </div>

          <div className="grid sm:grid-cols-2 items-start gap-10">
            <SecondaryTextArea
              info
              label="Conclusion (Optional)"
              id="conclusion"
              rows={5}
              error={!!errors.conclusion}
              errorText={errors.conclusion}
              value={values.conclusion}
              onChange={handleChange}
              onBlur={handleBlur}
              name="conclusion"
              placeholder="For example, we create website that convert for start up"
            />
          </div>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Target Audience for This Role / Users
            </h2>
            <p className="text-sm text-gray-500">
              Describe the users and their potential needs that this role will
              interact with. This will help ensure the most personalized
              interaction with these users.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <SelectInput
              info
              name="targetAudience"
              label="Target Audience"
              error={!!errors.targetAudience}
              errorText={errors.targetAudience}
              placeholder="Target Audience"
              value={values.targetAudience}
              onChange={(value) => setFieldValue("targetAudience", value)}
              options={[{ value: "All Users", label: "All Users" }]}
            />

            <div className="hidden sm:block" />

            <SecondaryTextArea
              info
              label="Audience Needs / Pains (optional)"
              id="audiencePainPoints"
              error={!!errors.audiencePainPoints}
              errorText={errors.audiencePainPoints}
              rows={5}
              value={values.audiencePainPoints}
              onChange={handleChange}
              onBlur={handleBlur}
              name="audiencePainPoints"
              placeholder="Describe the specific needs of the target audience."
            />

            <div className="hidden sm:block" />
          </div>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="text-lg font-semibold mb-2">Collect Information?</h2>
            <div className="flex items-center w-full justify-between gap-[30px]">
              <span
                className={`${
                  toCollectInformation ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Add team members to streamline communication and enhance
                personalized interactions with our AI assistant.
              </span>
              <Switch
                checked={toCollectInformation}
                onCheckedChange={setToCollectInformation}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>

          <div
            className={`${
              toCollectInformation ? "flex flex-col sm:flex-row" : "hidden"
            } justify-between w-full gap-10`}
          >
            <SecondaryTextArea
              wrapperClass="flex-1"
              info
              id="informationToCollect"
              error={!!errors.informationToCollect}
              errorText={errors.informationToCollect}
              rows={5}
              value={values.informationToCollect}
              onChange={handleChange}
              hasMax
              max={5}
              maxLength={5}
              onBlur={handleBlur}
              name="informationToCollect"
              placeholder="Describe the specific needs of the target audience."
              label="What Information to Collect?"
            />

            <fieldset className="flex flex-1 flex-col gap-2 w-full">
              <label
                htmlFor="description"
                className="flex items-center gap-x-3"
              >
                When to Collect The Information{" "}
                <CircleAlert size={18} strokeWidth={1.25} className="text-sm" />
              </label>
              <SelectionTab
                option={whenToCollectInformation}
                setSelectedOption={setIsWhenToCollectInformation}
              />
            </fieldset>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RoleAndAudience;
