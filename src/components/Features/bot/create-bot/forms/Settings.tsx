import React from 'react'
import { fieldsetStyles, inputStyles, sectionStyles } from '.'
import { CircleAlert, TriangleAlert } from 'lucide-react'
import SelectionTab from '../components/SelectionTab'
import { Switch } from '@/components/ui/switch'
import { useFormik } from 'formik'
import { settingsSchema, type SettingsFormValues } from '../Types'

const Settings = () => {
    const [addistionalInfo, setAdditionalInfo] = React.useState<boolean>(false);

    const Options = ["None", "Low", "Moderate"];

    const [talkLevel, setTalkLevel] = React.useState<string>(Options[0]);
    const [jokeLevel, setJokeLevel] = React.useState<string>(Options[0]);
    const [emodzy, setEmodzy] = React.useState<string>(Options[0]);

    const formik = useFormik<SettingsFormValues>({
        initialValues: {
            talkLevel: talkLevel,
            jokeLevel: jokeLevel,
            emodzy: emodzy,
            additionalInstruction: '',
            addInstructionCheckbox: false,
            additionalLimitation: '',
            addLimitationCheckbox: false,
        },
        validationSchema: settingsSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values: SettingsFormValues) => {
            // Handle form submission
            console.log('Form submitted:', values);
        },
    });

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
                    <h2 className='text-lg font-semibold mb-2'>Additional Instructions<span className='text-[#737373]'>(Optional)</span></h2>
                    <div className='flex items-center w-full justify-between gap-[30px]'>
                        <span className={`${addistionalInfo ? "text-gray-900" : "text-gray-500"}`}>Here you can textually describe additional instructions for your assistant if you did not see a corresponding section above.</span>
                        <Switch checked={addistionalInfo} onCheckedChange={setAdditionalInfo} className="data-[state=checked]:bg-blue-600" />
                    </div>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="description" className='flex items-center gap-x-3'>Additional Instruction <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="description"
                        rows={5}
                        name="description"
                        placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                        className={inputStyles}
                    />
                    <p>{formik.errors.additionalInstruction}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </fieldset>

                <fieldset className="flex items-center gap-x-3">
                    <input
                        type='checkbox'
                        id="description"
                        name="description"
                        placeholder="For example, we create website that convert for start up"
                        className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="description" className='flex items-center gap-x-3'>Add Instructions</label>
                </fieldset>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Assistant Restrictions<span className='text-[#737373]'>(Optional)</span></h2>
                    <div className='flex items-center w-full justify-between gap-[30px]'>
                        <div className="mb-4 bg-[#EEEEFD] px-5 py-4  flex gap-5 rounded-lg w-full">
                            <TriangleAlert className='text-[#C82332] text-2xl w-[10%]' />
                            <span>Add restrictions carefully as they may impact the quality of the assistant&aspo;s responses. Only apply restrictions if you are certain of their necessity. Also, please note that Resonoon has built-in system limitations to protect your assistants from hackers and breaches.</span>
                        </div>
                        <Switch checked={addistionalInfo} onCheckedChange={setAdditionalInfo} className="data-[state=checked]:bg-blue-600 mt-20" />
                    </div>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="description" className='flex items-center gap-x-3'>Additional Limitation <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="description"
                        rows={5}
                        name="description"
                        placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                        className={inputStyles}
                    />
                    <p className='flex justify-end'>Max of 50 words</p>
                </fieldset>

                <fieldset className="flex items-center gap-x-3">
                    <input
                        type='checkbox'
                        id="description"
                        name="description"
                        placeholder="For example, we create website that convert for start up"
                        className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="description" className='flex items-center gap-x-3'>Add Limitation</label>
                </fieldset>
            </section>
        </main>
        
    </div>
  )
}

export default Settings