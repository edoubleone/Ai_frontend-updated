import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { BasicSetup, Preview, CompanyDetails, Customize, Settings, FAQs, RoleAndAudience } from './forms'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, useFormikContext } from 'formik'
import type { BotEditPageProps } from '../bot-edit-page'
import { stepSchemas } from './Types'

  const steps = [
    {heading: 'Basic Setup', desc: "Give a name to your new assistant. This name will be used when it introduces itself to your clients. Select the languages your assistant will communicate in and choose its type: voice or text.", component: <BasicSetup /> },
    {heading: 'Give us details about your Company', desc: "In this section, we will ask you to provide details about your company that the assistant should know to perform its functions effectively. Imagine that you are training a new employee and telling them about your company.", component: <CompanyDetails /> },
    {heading: 'Role and Audience', desc: "Create and customize the assistant’s role by defining its tasks, target audience, and communication style. This section helps you tailor the assistant to meet specific needs and ensure consistent and personalized user interactions.", component: <RoleAndAudience /> },
    {heading: 'Additional Settings and Restrictions', desc: "Here you can set up the bot’s reactions to random client phrases, support for small talk, use of emojis, as well as configure restrictions and limitations for your assistant. For example: 'Offer cross-sells (recommend complementary products)' or 'Use short and clear phrases, avoiding complex technical terms' or 'Emphasize modern technologies, innovative solutions, and speed of service' or 'When questions about returns arise, always provide a link to the return policy page.'", component: <Settings /> },
    {heading: 'FAQ', desc: "Add a FAQ section so users can find information about your company easily. You can train the assistant’s knowledge specifically to your product or service.", component: <FAQs /> },
    {heading: 'Customize', desc: "Customize the look and feel of your Bot to reflect your brand and website", component: <Customize /> },
    {heading: 'Full Preview', desc: "Here’s a final preview of how your Bot Assistant looks like. If you are not satisfy with it, kindly go back to edit.", component: <Preview /> }
  ];

  const initialValues = {
    name: '',
    typeOfAssistant: '',
    language: '',
    uploadFile: undefined,
    isMultilingual: true,
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
  }


const CreateBot: React.FC<BotEditPageProps> = ({onBack}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    setAnimate(false); // Reset animation
    const timeout = setTimeout(() => {
      setAnimate(true); // Trigger animation after a tick
    }, 50); // small delay for reflow

    return () => clearTimeout(timeout); // cleanup
  }, [currentStep]);

  const handleValidation = async (validateForm:any, setTouched:any, errors:any) => {
    // Validate the current step's form
    const formErrors = await validateForm();

    setTouched(Object.keys(errors).reduce((touchedObj:any, key:string) => {
      touchedObj[key] = true;
      return touchedObj;
    }
    , {}));
    
    return formErrors;
  }


  const handleNextStep = async (validateForm:any, setTouched:any, errors:any, event?:React.FormEvent) => {
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }

    // Validate the current step's form
    const formErrors = await handleValidation(validateForm, setTouched, errors);

    
    if (Object.keys(formErrors).length === 0) {
      setAnimate(true);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }

  const handleSubmit = async (values:any) => {
    // Handle form submission logic here
    console.log('Form data: ', values);
    // Validate the entire form before submission
    const { validateForm, setTouched, errors } = useFormikContext();
    // Validate the form
    setTouched({}); // Reset touched state
    // Get the form errors

    const formErrors = handleValidation(validateForm, setTouched, errors);

    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/billing', values); 
      console.log("This is the response: ", response.config.data);
      alert('Form submitted successfully');
      // setAlertVisible(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
      setIsSubmitting(false);
    }

    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted with this values: ', values);

      if (onBack) {
        onBack();
      }
    }
    
  
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setAnimate(true);
  }

  const totalSteps = steps.length;

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className='flex flex-col h-full bg-secondary p-6'>
      <header className='mb-4'>
        <Button onClick={onBack} className='px-5 py-2 bg-transparent hover:bg-background transition-colors rounded-lg' variant="ghost">
          <ChevronLeft className="w-4 h-4 ml-2" />
          Back
        </Button>
      </header>

      <main className='flex flex-col h-full bg-background rounded-lg p-8'>
        <header>
          <h1 className='text-2xl font-semibold mb-4'>Let&apos;s set up your Bot Assistant</h1>
          <p className='text-gray-600 mb-6'>Customize and fine-tune the way your assistant communicates and interacts with customers to ensure it delivers consistent, engaging, and brand-aligned conversations across every touchpoint.</p>
        </header>

        {/* Progress Bar */}
        <div className='relative w-full mb-6'>
          <div className='w-full h-[3px] bg-[#D0D0D0] absolute top-5'><div className='h-full bg-blue-600' style={{width: `${progressPercentage}%`, transition: "all ease-in-out 0.5s"}} /></div>
          <div className='w-full flex justify-between'>
            {steps.map((_, index) => (
              <div key={index} className={`h-10 w-10 rounded-full z-[2] transition-colors duration-500 delay-200 ${currentStep >= index ? "bg-blue-600" : "bg-[#D0D0D0]"} flex items-center justify-center font-semibold text-background`}>{index + 1}</div>
            ))}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={stepSchemas[currentStep]}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >{({ validateForm, setTouched, errors, values }) => (
          <div>
            <main className={`flex flex-col gap-y-3 transition-all w-full h-full duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              <section className={`flex flex-col gap-y-3 transition-all duration-500 delay-300 ${animate ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95'}`}>
                <h2 className='font-semibold text-lg'>{steps[currentStep].heading}</h2>
                <p className='text-gray-600 mb-4'>{steps[currentStep].desc}</p>
              </section>

              <section>
                {steps[currentStep].component}
              </section>
            </main>


            <footer className={`w-full flex-1 flex items-center ${currentStep > 0 ?"justify-between" : "justify-end"}`}>
            {currentStep > 0 && <button
              type='button'
              className='px-5 py-2 bg-transparent hover:bg-background transition-colors rounded-lg text-gray-600 font-medium'
              disabled={currentStep === 0}
              onClick={handlePreviousStep}
            >
              Previous
            </button>}

            <div className='flex justify-end items-center gap-x-5'>
              {currentStep < totalSteps-1 && <button
                type='button'
                className='px-5 py-2 bg-transparent hover:bg-background transition-colors rounded-lg text-gray-600 font-medium'
                // disabled={currentStep === 0}
                onClick={() => handleSubmit(values)}
              >
                {isSubmitting ? "Saving..." : "Save and Finish Later"}
              </button>}
              {!isLastStep ? (<button
                type='button'
                className='px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg font-medium'
                onClick={() => handleNextStep(validateForm, setTouched, errors)}
              >
                Proceed</button>) : (<button
                type='button'
                className='px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg font-medium'
                onClick={() => handleNextStep(validateForm, setTouched, errors)}
              >
                {isSubmitting ? "Submitting..." : "Finish"}
              </button>)}
            </div>
          </footer>
        </div>
        )}
        </Formik>
      </main>
    </div>
  )
}

export default CreateBot