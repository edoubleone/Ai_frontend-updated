import { error, fieldsetStyles, inputStyles, sectionStyles } from '.'
import { CircleAlert } from 'lucide-react'
import React from 'react';
import SelectionTab from '../components/SelectionTab';
import { useFormikContext } from 'formik';
import { type RoleAndAudienceFormValues } from '../Types';
import { Switch } from '@/components/ui/switch';

const RoleAndAudience = () => {

    const { values, errors, touched, handleChange, handleBlur } = useFormikContext<RoleAndAudienceFormValues>();
    
    const whenToCollectInformation = ["Start of the chat", "End of the chat", "No Preference"];
    
    const [isWhenToCollectInformation, setIsWhenToCollectInformation] = React.useState<string>(whenToCollectInformation[0]);
    const [toCollectInformation, setToCollectInformation] = React.useState<boolean>(false);

    values.collectInformation = toCollectInformation;


    values.whenToCollectInformation = isWhenToCollectInformation;

    
  return (
    <div>
        <div>
            <h1 className='text-2xl font-semibold'>Main Role of the Assistant</h1>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur. Ornare lorem consectetur magna mi id. Porta id id sed blandit suspendisse.</p>
        </div>

        <main className='flex flex-col gap-y-10 py-10'>
            <section className={sectionStyles}>
                <div className='flex justify-between items-center gap-10'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="setRole" className='flex items-center gap-x-3'>Set Role <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <input
                            type="text"
                            id="setRole"
                            value={values.setRole}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="setRole"
                            placeholder="Example: Experienced sales assistant"
                            className={`${inputStyles} ${touched && errors.setRole ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.setRole != "" && !errors.setRole &&"ring-green-300"}`}
                        />
                        <p className={`${error} ${touched && errors.setRole ? "opacity-1" : "opacity-0"}`}>{errors.setRole ? (errors.setRole) : ""}</p>
                    </fieldset>

                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="purposeOfRole" className='flex items-center gap-x-3'>Purpose of Role <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <input
                            type="text"
                            id="purposeOfRole"
                            value={values.purposeOfRole}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="purposeOfRole"
                            placeholder="Enter purpose of role"
                            className={`${inputStyles} ${touched && errors.purposeOfRole ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.purposeOfRole != "" && !errors.purposeOfRole &&"ring-green-300"}`}
                        />
                        <p className={`${error} ${touched && errors.purposeOfRole ? "opacity-1" : "opacity-0"}`}>{errors.purposeOfRole ? (errors.purposeOfRole) : ""}</p>
                    </fieldset>
                </div>

                <div className='flex justify-between items-center gap-10'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="IndustryAndDescription" className='flex items-center gap-x-3'>Industry and Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="IndustryAndDescription"
                            rows={5}
                            value={values.IndustryAndDescription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="IndustryAndDescription"
                            placeholder="For example, we create website that convert for start up "
                            className={`${inputStyles} ${touched && errors.IndustryAndDescription ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.IndustryAndDescription != "" && !errors.IndustryAndDescription &&"ring-green-300"}`}
                        />
                        <div className='flex justify-between items-start'>
                            <p className={`${error} ${touched && errors.IndustryAndDescription ? "opacity-1" : "opacity-0"}`}>{errors.IndustryAndDescription ? (errors.IndustryAndDescription) : ""}</p>
                            <p className='flex justify-end'>Max of 50 words</p>
                        </div>
                    </fieldset>
                </div>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Role Tone</h2>
                    <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur. Ornare lorem consectetur magna mi id. Porta id id sed blandit suspendisse.</p>
                </div>

                <div className='flex justify-between gap-10'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="toneOfCommunication">Tone of Communication</label>
                        <input
                            type="text"
                            id="toneOfCommunication"
                            value={values.toneOfCommunication}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="toneOfCommunication"
                            placeholder="For example, we create website that convert for start up"
                            className={`${inputStyles} ${touched && errors.toneOfCommunication ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.toneOfCommunication != "" && !errors.toneOfCommunication &&"ring-green-300"}`}
                        />
                        <p className={`${error} ${touched && errors.toneOfCommunication ? "opacity-1" : "opacity-0"}`}>{errors.toneOfCommunication ? (errors.toneOfCommunication) : ""}</p>
                    </fieldset>
                </div>

                <div className='flex gap-x-10 justify-between'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="welcomeWords" className='flex items-center gap-x-3'> Welcome words <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="welcomeWords"
                            rows={5}
                            name="welcomeWords"
                            value={values.welcomeWords}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="For example, we create website that convert for start up"
                            className={`${inputStyles} ${touched && errors.welcomeWords ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.welcomeWords != "" && !errors.welcomeWords &&"ring-green-300"}`}
                        />
                        <div className='flex justify-between items-center'>
                            <p className={`${error} ${touched && errors.welcomeWords ? "opacity-1" : "opacity-0"}`}>{errors.welcomeWords ? (errors.welcomeWords) : ""}</p>
                            <p className='flex justify-end'>Max of 50 words</p>
                        </div>
                    </fieldset>

                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="welcomeLoggedUser" className='flex items-center gap-x-3'>Welcome (Logged in user) (Optional) <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="welcomeLoggedUser"
                            value={values.welcomeLoggedUser}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={5}
                            name="welcomeLoggedUser"
                            placeholder="For example, we create website that convert for start up"
                            className={`${inputStyles} ${touched && errors.welcomeLoggedUser ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.welcomeLoggedUser != "" && !errors.welcomeLoggedUser &&"ring-green-300"}`}
                        />
                        <div className='flex justify-between items-center'>
                            <p className={`${error} ${touched && errors.welcomeLoggedUser ? "opacity-1" : "opacity-0"}`}>{errors.welcomeLoggedUser ? (errors.welcomeLoggedUser) : ""}</p>
                            <p className='flex justify-end'>Max of 50 words</p>
                        </div>
                    </fieldset>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="conclusion" className='flex items-center gap-x-3'>Conclusion (Optional) <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="conclusion"
                        rows={5}
                        value={values.conclusion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="conclusion"
                        placeholder="For example, we create website that convert for start up"
                        className={`${inputStyles} ${touched && errors.conclusion ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.conclusion != "" && !errors.conclusion &&"ring-green-300"}`}
                    />
                    <div className='flex justify-between items-center'>
                        <p className={`${error} ${touched && errors.conclusion ? "opacity-1" : "opacity-0"}`}>{errors.conclusion ? (errors.conclusion) : ""}</p>
                        <p className='flex justify-end'>Max of 50 words</p>
                    </div>
                </fieldset>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Target Audience for This Role / Users</h2>
                    <p className='text-sm text-gray-500'>Describe the users and their potential needs that this role will interact with. This will help ensure the most personalized interaction with these users.</p>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="targetAudience" className='flex items-center gap-x-3'>Target Audience <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <select
                        name="targetAudience"
                        id="targetAudience"
                        value={values.targetAudience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputStyles} ${touched && errors.targetAudience ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.targetAudience != "" && !errors.targetAudience &&"ring-green-300"}`}
                    >
                        <option defaultValue="Select your audience"></option>
                        <option value="All Users">All Users</option>
                        <option value="Image">Image</option>
                    </select>
                    <p className={`${error} ${touched && errors.targetAudience ? "opacity-1" : "opacity-0"}`}>{errors.targetAudience ? (errors.targetAudience) : ""}</p>
                </fieldset>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="audiencePainPoints" className='flex items-center gap-x-3'>Audience Needs / Pains (optional) <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="audiencePainPoints"
                        rows={5}
                        value={values.audiencePainPoints}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="audiencePainPoints"
                        placeholder="Describe the specific needs of the target audience."
                        className={`${inputStyles} ${touched && errors.audiencePainPoints ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.audiencePainPoints != "" && !errors.audiencePainPoints &&"ring-green-300"}`}
                    />
                    <div className='flex justify-between items-center h-full'>
                        <p className={`${error} ${touched && errors.audiencePainPoints ? "opacity-1" : "opacity-0"}`}>{errors.audiencePainPoints ? (errors.audiencePainPoints) : ""}</p>
                        <p className='flex justify-end'>Max of 50 words</p>
                    </div>
                </fieldset>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Collect Information?</h2>
                    <div className='flex items-center w-full justify-between gap-[30px]'>
                        <span className={`${toCollectInformation ? "text-gray-900" : "text-gray-500"}`}>Add team members to streamline communication and enhance personalized interactions with our AI assistant.</span>
                        <Switch checked={toCollectInformation} onCheckedChange={setToCollectInformation} className="data-[state=checked]:bg-blue-600" />
                    </div>
                </div>

                <div className={`${toCollectInformation ? "flex" : "hidden"} justify-between w-full gap-10`}>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="informationToCollect" className='flex items-center gap-x-3'>What Information to Collect? <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="informationToCollect"
                            rows={5}
                            value={values.informationToCollect}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="informationToCollect"
                            placeholder="Describe the specific needs of the target audience."
                            className={`${inputStyles} ${touched && errors.informationToCollect ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.informationToCollect && !errors.informationToCollect &&"ring-green-300"}`}
                        />
                        <div className='flex justify-between items-center h-full'>
                            <p className={`${error} ${touched && errors.informationToCollect ? "opacity-1" : "opacity-0"}`}>{errors.informationToCollect ? (errors.informationToCollect) : ""}</p>
                            <p className='flex justify-end'>Max of 5</p>
                        </div>
                    </fieldset>

                    <fieldset className="flex flex-col gap-2 w-full">
                        <label htmlFor="description" className='flex items-center gap-x-3'>What Information to Collect? <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <SelectionTab option={whenToCollectInformation} setSelectedOption={setIsWhenToCollectInformation} />
                    </fieldset>
                </div>
            </section>
        </main>
    </div>
  )
}

export default RoleAndAudience