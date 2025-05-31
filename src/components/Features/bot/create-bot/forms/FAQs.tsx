import React from 'react'
import { error, fieldsetStyles, inputStyles, sectionStyles } from '.'
import { Switch } from '@/components/ui/switch'
import { CircleAlert } from 'lucide-react'
import { type FaqsFormValues } from '../Types'
import { useFormikContext } from 'formik'

const FAQs = () => {

    const {values, errors, touched, handleChange, handleBlur} = useFormikContext<FaqsFormValues>()

    const [questions, setQuestions] = React.useState<boolean>(false);

  return (
    <div>
        <section className={sectionStyles}>
            <div>
                <h2 className='text-lg font-semibold mb-2'>Question & Answer</h2>
                <div className='flex items-center w-full justify-between gap-[30px]'>
                    <span className={`${questions ? "text-gray-900" : "text-gray-500"}`}>You can add up to 200 questions and answers. Our AI will analyze user questions and match them with your entries to work its magic.</span>
                    <Switch checked={questions} onCheckedChange={setQuestions} className="data-[state=checked]:bg-blue-600" />
                </div>
            </div>

            <fieldset className={fieldsetStyles}>
                <label htmlFor="faqQuestion" className='flex items-center gap-x-3'>Question <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                <textarea
                    id="faqQuestion"
                    value={values.faqQuestion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    name="faqQuestion"
                    placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                    className={`${inputStyles} ${touched.faqQuestion && errors.faqQuestion ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.faqQuestion != "" && !errors.faqQuestion &&"ring-green-300"}`}
                />
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${errors.addFaqCheckbox ? "opacity-1" : "opacity-0"}`}>{errors.addFaqCheckbox ? (errors.addFaqCheckbox) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
            </fieldset>

            <fieldset className={fieldsetStyles}>
                <label htmlFor="faqAnswer" className='flex items-center gap-x-3'>Answer <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                <textarea
                    id="faqAnswer"
                    value={values.faqAnswer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    name="faqAnswer"
                    placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                    className={`${inputStyles} ${touched.faqAnswer && errors.faqAnswer ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.faqAnswer != "" && !errors.faqAnswer &&"ring-green-300"}`}
                />
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${errors.faqAnswer ? "opacity-1" : "opacity-0"}`}>{errors.faqAnswer ? (errors.faqAnswer) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
            </fieldset>

            <fieldset className={values.addFaqCheckbox ? fieldsetStyles : "hidden"}>
                <label htmlFor="extraQuestion" className='flex items-center gap-x-3'>Question <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                <textarea
                    id="extraQuestion"
                    value={values.extraQuestion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    name="extraQuestion"
                    placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                    className={`${inputStyles} ${touched.extraQuestion && errors.extraQuestion ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.extraQuestion != "" && !errors.extraQuestion &&"ring-green-300"}`}
                />
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${errors.extraQuestion ? "opacity-1" : "opacity-0"}`}>{errors.extraQuestion ? (errors.extraQuestion) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
            </fieldset>

            <fieldset className={values.addFaqCheckbox ? fieldsetStyles : "hidden"}>
                <label htmlFor="extraAnswer" className='flex items-center gap-x-3'>Answer <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                <textarea
                    id="extraAnswer"
                    value={values.extraAnswer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    name="extraAnswer"
                    placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                    className={`${inputStyles} ${touched.extraAnswer && errors.extraAnswer ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.extraAnswer != "" && !errors.extraAnswer &&"ring-green-300"}`}
                />
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${errors.extraAnswer ? "opacity-1" : "opacity-0"}`}>{errors.extraAnswer ? (errors.extraAnswer) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
            </fieldset>

            <fieldset className="flex items-center gap-x-3">
                <input
                    type='checkbox'
                    id="addFaqCheckbox"
                    name="addFaqCheckbox"
                    value={values.addFaqCheckbox ? "true" : "false"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="For example, we create website that convert for start up"
                    className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="addFaqCheckbox" className='flex items-center gap-x-3'>Add Instructions</label>
                <div className='flex justify-between items-center'>
                </div>
            </fieldset>
        </section>
        
    </div>
  )
}

export default FAQs