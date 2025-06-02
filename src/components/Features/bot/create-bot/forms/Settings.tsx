import React from 'react'
import { error, fieldsetStyles, inputStyles, sectionStyles } from '.'
import { CircleAlert, TriangleAlert } from 'lucide-react'
import SelectionTab from '../components/SelectionTab'
import { useFormikContext } from 'formik'
import { type SettingsFormValues } from '../Types'

const Settings = () => {
    const {values, errors, touched, handleChange, handleBlur} = useFormikContext<SettingsFormValues>();

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
        <main className='flex flex-col gap-y-10 py-10'>
            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Small Talk</h2>
                    <p className='text-sm text-gray-500'>Casual, friendly conversations about non-controversial topics to build rapport and create a comfortable interaction atmosphere</p>
                </div>

                <div className='w-[45%]'>
                    <SelectionTab option={Options} setSelectedOption={setTalkLevel} />
                </div>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Jokes</h2>
                    <p className='text-sm text-gray-500'>Enable to include jokes in responses, making the assistant&apos;s interactions more engaging</p>
                </div>

                <div className='w-[45%]'>
                    <SelectionTab option={Options} setSelectedOption={setJokeLevel} />
                </div>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Emodzy</h2>
                    <p className='text-sm text-gray-500'>Enable to add emojis to responses, making the assistant&apos;s interactions more friendly</p>
                </div>

                <div className='w-[45%]'>
                    <SelectionTab option={Options} setSelectedOption={setEmodzy} />
                </div>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Additional Instructions
                        {/* <span className='text-[#737373]'>(Optional)</span> */}
                    </h2>
                    <div className='flex items-center w-full justify-between gap-[30px]'>
                        <span className={`${"text-gray-500"}`}>Here you can textually describe additional instructions for your assistant if you did not see a corresponding section above.</span>
                        {/* <Switch checked={addistionalInfo} onCheckedChange={setAdditionalInfo} className="data-[state=checked]:bg-blue-600" /> */}
                    </div>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="additionalInstruction" className='flex items-center gap-x-3'>Additional Instruction <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="additionalInstruction"
                        rows={5}
                        value={values.additionalInstruction}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="additionalInstruction"
                        placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                        className={`${inputStyles} ${touched && errors.additionalInstruction ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.additionalInstruction != "" && !errors.additionalInstruction &&"ring-green-300"}`}
                    />
                    <p className={`${error} ${touched && errors.additionalInstruction ? "opacity-1" : "opacity-0"}`}>{errors.additionalInstruction ? (errors.additionalInstruction) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </fieldset>

                <fieldset className={values.addInstructionCheckbox ? fieldsetStyles : "hidden"}>
                    <label htmlFor="additionalInstructionExtra" className='flex items-center gap-x-3'>Additional Instruction <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="additionalInstructionExtra"
                        rows={5}
                        value={values.additionalInstructionExtra}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="additionalInstructionExtra"
                        placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                        className={`${inputStyles} ${touched && errors.additionalInstructionExtra ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.additionalInstructionExtra != "" && !errors.additionalInstructionExtra &&"ring-green-300"}`}
                    />
                    <div className='flex justify-between items-start'>
                        <p className={`${error} ${touched && errors.additionalInstructionExtra ? "opacity-1" : "opacity-0"}`}>{errors.additionalInstructionExtra ? (errors.additionalInstructionExtra) : ""}</p>
                        <p className='flex justify-end'>Max of 50 words</p>
                    </div>
                </fieldset>

                <fieldset className="flex items-center gap-x-3">
                    <input
                        type='checkbox'
                        value={values.addInstructionCheckbox ? "true" : "false"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="addInstructionCheckbox"
                        name="addInstructionCheckbox"
                        placeholder="For example, we create website that convert for start up"
                        className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="addInstructionCheckbox" className='flex items-center gap-x-3'>Add Instructions</label>
                </fieldset>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Assistant Restrictions
                        {/* <span className='text-[#737373]'>(Optional)</span> */}
                    </h2>
                    <div className='flex items-center w-full justify-between gap-[30px]'>
                        <div className="mb-4 bg-[#EEEEFD] px-5 py-4  flex gap-5 rounded-lg w-full">
                            <TriangleAlert className='text-[#C82332] text-2xl w-[10%]' />
                            <span>Add restrictions carefully as they may impact the quality of the assistant&aspo;s responses. Only apply restrictions if you are certain of their necessity. Also, please note that Resonoon has built-in system limitations to protect your assistants from hackers and breaches.</span>
                        </div>
                        {/* <Switch checked={addistionalInfo} onCheckedChange={setAdditionalInfo} className="data-[state=checked]:bg-blue-600 mt-20" /> */}
                    </div>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="additionalLimitation" className='flex items-center gap-x-3'>Additional Limitation <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="additionalLimitation"
                        value={values.additionalLimitation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        name="additionalLimitation"
                        placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                        className={`${inputStyles} ${touched && errors.additionalLimitation ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.additionalLimitation != "" && !errors.additionalLimitation &&"ring-green-300"}`}
                    />
                    <div className='flex justify-between items-start'>
                        <p className={`${error} ${touched && errors.additionalLimitation ? "opacity-1" : "opacity-0"}`}>{errors.additionalLimitation ? (errors.additionalLimitation) : ""}</p>
                        <p className='flex justify-end'>Max of 50 words</p>
                    </div>
                </fieldset>

                <fieldset className={values.addLimitationCheckbox ? fieldsetStyles : "hidden"}>
                    <label htmlFor="additionalLimitationExtra" className='flex items-center gap-x-3'>Additional Limitation <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="additionalLimitationExtra"
                        value={values.additionalLimitationExtra}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        name="additionalLimitationExtra"
                        placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                        className={`${inputStyles} ${touched && errors.additionalLimitationExtra ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.additionalLimitationExtra != "" && !errors.additionalLimitationExtra &&"ring-green-300"}`}
                    />
                    <div className='flex justify-between items-start'>
                        <p className={`${error} ${touched && errors.additionalLimitationExtra ? "opacity-1" : "opacity-0"}`}>{errors.additionalLimitationExtra ? (errors.additionalLimitationExtra) : ""}</p>
                        <p className='flex justify-end'>Max of 50 words</p>
                    </div>
                </fieldset>

                <fieldset className="flex items-center gap-x-3">
                    <input
                        type='checkbox'
                        value={values.addLimitationCheckbox ? "true" : "false"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="addLimitationCheckbox"
                        name="addLimitationCheckbox"
                        placeholder="For example, we create website that convert for start up"
                        className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="addLimitationCheckbox" className='flex items-center gap-x-3'>Add Limitation</label>
                </fieldset>
            </section>
        </main>
        
    </div>
  )
}

export default Settings