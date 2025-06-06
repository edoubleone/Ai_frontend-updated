import React from "react";
import { sectionStyles } from ".";
import { TriangleAlert } from "lucide-react";
import SelectionTab from "../components/SelectionTab";
// import { Switch } from '@/components/ui/switch'
import { useFormikContext } from "formik";
import { type SettingsFormValues } from "../Types";
import SecondaryTextArea from "@/components/shared/secondary-textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Settings = () => {
  const { values, errors, setFieldValue, handleChange, handleBlur } =
    useFormikContext<SettingsFormValues>();

  // const [addistionalInfo, setAdditionalInfo] = React.useState<boolean>(false);

    const Options = ["none", "low", "moderate"];

  const [talkLevel, setTalkLevel] = React.useState<string>(Options[0]);
  const [jokeLevel, setJokeLevel] = React.useState<string>(Options[0]);
  const [emodzy, setEmodzy] = React.useState<string>(Options[0]);

  values.emodzy = emodzy;
  values.jokeLevel = jokeLevel;
  values.talkLevel = talkLevel;

  return (
    <div>
      <main className="flex flex-col py-10 gap-y-10">
        <section className={sectionStyles}>
          <div>
            <h2 className="mb-2 text-lg font-semibold">Small Talk</h2>
            <p className="text-sm text-gray-500">
              Casual, friendly conversations about non-controversial topics to
              build rapport and create a comfortable interaction atmosphere
            </p>
          </div>

          <div className="w-[45%]">
            <SelectionTab option={Options} setSelectedOption={setTalkLevel} />
          </div>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="mb-2 text-lg font-semibold">Jokes</h2>
            <p className="text-sm text-gray-500">
              Enable to include jokes in responses, making the assistant&apos;s
              interactions more engaging
            </p>
          </div>

          <div className="w-[45%]">
            <SelectionTab option={Options} setSelectedOption={setJokeLevel} />
          </div>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="mb-2 text-lg font-semibold">Emodzy</h2>
            <p className="text-sm text-gray-500">
              Enable to add emojis to responses, making the assistant&apos;s
              interactions more friendly
            </p>
          </div>

          <div className="w-[45%]">
            <SelectionTab option={Options} setSelectedOption={setEmodzy} />
          </div>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="mb-2 text-lg font-semibold">
              Additional Instructions
              {/* <span className='text-[#737373]'>(Optional)</span> */}
            </h2>
            <div className="flex items-center w-full justify-between gap-[30px]">
              <span className={`${"text-gray-500"}`}>
                Here you can textually describe additional instructions for your
                assistant if you did not see a corresponding section above.
              </span>
              {/* <Switch checked={addistionalInfo} onCheckedChange={setAdditionalInfo} className="data-[state=checked]:bg-blue-600" /> */}
            </div>
          </div>

          <div className="grid sm:grid-cols-2">
            <SecondaryTextArea
              id="additionalInstruction"
              rows={5}
              hasMax
              max={50}
              error={!!errors.additionalInstruction}
              errorText={errors.additionalInstruction}
              value={values.additionalInstruction}
              onChange={handleChange}
              onBlur={handleBlur}
              name="additionalInstruction"
              placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
              label="Additional Instruction"
              info
            />
          </div>

          <div
            className={
              values.addInstructionCheckbox ? "grid grid-cols-2" : "hidden"
            }
          >
            <SecondaryTextArea
              id="additionalInstructionExtra"
              rows={5}
              error={!!errors.additionalInstructionExtra}
              errorText={errors.additionalInstructionExtra}
              hasMax
              max={50}
              value={values.additionalInstructionExtra}
              onChange={handleChange}
              onBlur={handleBlur}
              name="additionalInstructionExtra"
              placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
              label="Additional Instruction"
              info
            />
          </div>

          <Label className="flex text-base text-[#5C5C5C] items-center gap-x-3">
            <Checkbox
              checked={values.addInstructionCheckbox}
              onCheckedChange={(checked) =>
                setFieldValue("addInstructionCheckbox", checked)
              }
            />
            Add Instructions
          </Label>
        </section>

        <hr />

        <section className={sectionStyles}>
          <div>
            <h2 className="mb-2 text-lg font-semibold">
              Assistant Restrictions
              {/* <span className='text-[#737373]'>(Optional)</span> */}
            </h2>
            <div className="flex items-center w-full justify-between gap-[30px]">
              <div className="mb-4 bg-[#EEEEFD] px-5 py-4  flex gap-5 rounded-lg w-full">
                <TriangleAlert className="text-[#C82332] text-2xl w-[10%]" />
                <span>
                  Add restrictions carefully as they may impact the quality of
                  the assistant&aspo;s responses. Only apply restrictions if you
                  are certain of their necessity. Also, please note that
                  Resonoon has built-in system limitations to protect your
                  assistants from hackers and breaches.
                </span>
              </div>
              {/* <Switch checked={addistionalInfo} onCheckedChange={setAdditionalInfo} className="data-[state=checked]:bg-blue-600 mt-20" /> */}
            </div>
          </div>

          <div className="grid sm:grid-cols-2">
            <SecondaryTextArea
              label="Additional Limitation"
              info
              id="additionalLimitation"
              value={values.additionalLimitation}
              error={!!errors.additionalLimitation}
              errorText={errors.additionalLimitation}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              max={50}
              hasMax
              name="additionalLimitation"
              placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
            />
          </div>

          <div
            className={
              values.addLimitationCheckbox ? "grid sm:grid-cols-2" : "hidden"
            }
          >
            <SecondaryTextArea
              info
              label="Additional Limitation"
              id="additionalLimitationExtra"
              error={!!errors.additionalLimitationExtra}
              errorText={errors.additionalLimitationExtra}
              value={values.additionalLimitationExtra}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              name="additionalLimitationExtra"
              placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
              hasMax
              max={50}
            />
          </div>

          <Label className="flex text-base text-[#5C5C5C] items-center gap-x-3">
            <Checkbox
              checked={values.addLimitationCheckbox}
              onCheckedChange={(checked) =>
                setFieldValue("addLimitationCheckbox", checked)
              }
            />
            Add Limitation
          </Label>
        </section>
      </main>
    </div>
  );
};

export default Settings;
