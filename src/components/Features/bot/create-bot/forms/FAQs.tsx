import React from 'react'
import { error, fieldsetStyles, inputStyles, sectionStyles } from '.'
import { Switch } from '@/components/ui/switch'
import { CircleAlert } from 'lucide-react'
import { useFormik } from 'formik'
import { faqsSchema, type FaqsFormValues } from '../Types'

const FAQs = () => {

    const [questions, setQuestions] = React.useState<boolean>(false);

    const formik = useFormik<FaqsFormValues>({
        initialValues: {
            faqQuestion: "",
            faqAnswer: "",
            addFaqCheckbox: false,
        },
        validationSchema: faqsSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values: FaqsFormValues) => {
            // Handle form submission
            console.log('Form submitted:', values);
        },
    });

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
                <label htmlFor="description" className='flex items-center gap-x-3'>Question <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                <textarea
                    id="description"
                    rows={5}
                    name="description"
                    placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                    className={inputStyles}
                />
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${formik.errors.addFaqCheckbox ? "opacity-1" : "opacity-0"}`}>{formik.errors.addFaqCheckbox ? (formik.errors.addFaqCheckbox) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
            </fieldset>

            <fieldset className={fieldsetStyles}>
                <label htmlFor="description" className='flex items-center gap-x-3'>Answer <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                <textarea
                    id="description"
                    rows={5}
                    name="description"
                    placeholder="Provide Instructions such as answer questions, ending each sections with ‘Best regards’"
                    className={inputStyles}
                />
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${formik.errors.faqAnswer ? "opacity-1" : "opacity-0"}`}>{formik.errors.faqAnswer ? (formik.errors.faqAnswer) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
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
                <div className='flex justify-between items-center'>
                    <p className={`${error} ${formik.errors.faqQuestion ? "opacity-1" : "opacity-0"}`}>{formik.errors.faqQuestion ? (formik.errors.faqQuestion) : ""}</p>
                    <p className='flex justify-end'>Max of 50 words</p>
                </div>
            </fieldset>
        </section>
        
    </div>
  )
}

export default FAQs