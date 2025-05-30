import { error, fieldsetStyles, inputStyles, sectionStyles } from '.'
import { CircleAlert } from 'lucide-react'
import React from 'react';
import SelectionTab from '../components/SelectionTab';
import { useFormik } from 'formik';
import { roleAndAudienceSchema, type RoleAndAudienceFormValues } from '../Types';

const RoleAndAudience = () => {
    
    const whenToCollectInformation = ["Start of the chat", "End of the chat", "No Preference"];
    
    const [isWhenToCollectInformation, setIsWhenToCollectInformation] = React.useState<string>(whenToCollectInformation[0]);

    console.log(isWhenToCollectInformation);

    const formik = useFormik<RoleAndAudienceFormValues>({
        initialValues: {
            setRole: '',
            purposeOfRole: '',
            IndustryAndDescription: '',
            service: '',
            roleDescription: '',
            toneDescription1: '',
            toneDescription2: '',
            toneDescription3: '',
            targetAudience: 'All Users',
            audiencePainPoints: '',
            informationToCollect: [],
            whenToCollectInformation: isWhenToCollectInformation,
        },
        validationSchema: roleAndAudienceSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values: RoleAndAudienceFormValues) => {
            // Handle form submission
            console.log('Form submitted:', values);
        },
    });
    
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
                            name="setRole"
                            placeholder="Example: Experienced sales assistant"
                            className={inputStyles}
                        />
                    </fieldset>

                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="purposeOfRole" className='flex items-center gap-x-3'>Purpose of Role <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <input
                            type="text"
                            id="purposeOfRole"
                            name="purposeOfRole"
                            placeholder="Enter purpose of role"
                            className={inputStyles}
                        />
                        <p className={`${error} ${formik.touched && formik.errors.purposeOfRole ? "opacity-1" : "opacity-0"}`}>{formik.errors.purposeOfRole ? (formik.errors.purposeOfRole) : ""}</p>
                    </fieldset>
                </div>

                <div className='flex justify-between items-center gap-10'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="IndustryAndDescription" className='flex items-center gap-x-3'>Industry and Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="IndustryAndDescription"
                            rows={5}
                            name="IndustryAndDescription"
                            placeholder="For example, we create website that convert for start up "
                            className={inputStyles}
                        />
                        <p className='flex justify-end'>Max of 50 words</p>
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
                        <label htmlFor="service">Service/ Product</label>
                        <input
                            type="text"
                            id="service"
                            name="service"
                            placeholder="For example, we create website that convert for start up"
                            className={inputStyles}
                        />
                    </fieldset>
                </div>

                <div className='flex gap-x-10 justify-between'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="description" className='flex items-center gap-x-3'>Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="description"
                            rows={5}
                            name="description"
                            placeholder="For example, we create website that convert for start up"
                            className={inputStyles}
                        />
                        <p className='flex justify-end'>Max of 50 words</p>
                    </fieldset>

                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="description" className='flex items-center gap-x-3'>Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="description"
                            rows={5}
                            name="description"
                            placeholder="For example, we create website that convert for start up"
                            className={inputStyles}
                        />
                        <p className='flex justify-end'>Max of 50 words</p>
                    </fieldset>
                </div>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="description" className='flex items-center gap-x-3'>Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="description"
                        rows={5}
                        name="description"
                        placeholder="For example, we create website that convert for start up"
                        className={inputStyles}
                    />
                    <p className='flex justify-end'>Max of 50 words</p>
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
                        className={inputStyles}
                    >
                        <option value="Text">All Users</option>
                        <option value="Image">Image</option>
                    </select>
                </fieldset>

                <fieldset className={fieldsetStyles}>
                    <label htmlFor="description" className='flex items-center gap-x-3'>Audience Needs / Pains (optional) <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                    <textarea
                        id="description"
                        rows={5}
                        name="description"
                        placeholder="Describe the specific needs of the target audience."
                        className={inputStyles}
                    />
                    <p className='flex justify-end'>Max of 50 words</p>
                </fieldset>
            </section>

            <hr />

            <section className={sectionStyles}>
                <div>
                    <h2 className='text-lg font-semibold mb-2'>Collect Information?</h2>
                    <p className='text-sm text-gray-500'>This section determines if the assistant should collect information from users. Indicate “Yes” or “No” to help the assistant understand if gathering specific user details is necessary.</p>
                </div>

                <div className='flex justify-between w-full gap-10'>
                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="description" className='flex items-center gap-x-3'>What Information to Collect? <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <div className={inputStyles + ' flex gap-2 h-[150px] overflow-y-auto'}>

                        </div>
                        <p className='flex justify-end'>Max of 5</p>
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