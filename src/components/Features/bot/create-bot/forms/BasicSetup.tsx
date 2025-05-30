
import { Switch } from '@/components/ui/switch'
import React from 'react'
import {error, fieldsetStyles, inputStyles} from '@/components/Features/bot/create-bot/forms'
import { Download } from 'lucide-react';
import { useFormikContext } from 'formik';
import type { BasicSetupFormValues } from '../Types';



const BasicSetup = () => {

    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext<BasicSetupFormValues>();

    const [isText, setIsText] = React.useState(true);
    const [isMultilingual, setIsMultilingual] = React.useState(true);

    const fileInputRef = React.useRef(null);

  return (
    <main className='flex flex-col gap-y-10'>
        <div className="flex items-center gap-4 mb-6">
            <span className={`text-lg font-medium ${!isText ? "text-gray-900" : "text-gray-500"}`}>Image</span>
            <Switch checked={isText} onCheckedChange={setIsText} className="data-[state=checked]:bg-blue-600" />
            <span className={`text-lg font-medium ${isText ? "text-gray-900" : "text-gray-500"}`}>Text</span>
        </div>

        <div className='flex justify-between gap-10'>
            <fieldset className={fieldsetStyles}>
                <label htmlFor="name">Assistant&apos;s Name Displayed to Users</label>
                <input
                    type="text"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    placeholder="Example: Joe"
                    className={`${inputStyles} ${touched && errors.name ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.name != "" && !errors.name &&"ring-green-300"}`}
                />  
                <p className={`${error} ${errors.name ? "opacity-1" : "opacity-0"}`}>{errors.name ? (errors.name) : ""}</p>
            </fieldset>
            <fieldset className={fieldsetStyles}>
                <label htmlFor="typeOfAssistant">Type of Assistant</label>
                <input name="typeOfAssistant" value={isText ? values.typeOfAssistant="text" : values.typeOfAssistant="image"} disabled id="typeOfAssistant" className={`${inputStyles} capitalize cursor-not-allowed text-blue-600 font-medium bg-blue-50`} />
            </fieldset>
        </div>

        <div className='flex flex-col gap-3'>
            <fieldset className={fieldsetStyles}>
                <label htmlFor="language">Assistant&apos;s language</label>
                <input
                    type="text"
                    id="language"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="language"
                    placeholder="English"
                    className={`${inputStyles} ${touched && errors.language ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.language != "" && !errors.language &&"ring-green-400"}`}
                />
                <p className={`${error} ${touched && errors.language ? "opacity-1" : "opacity-0"}`}>{errors.language ? (errors.language) : ""}</p>
            </fieldset>

            <div className='flex items-center gap-[30px]'>
                <span className={`${isMultilingual ? "text-gray-900" : "text-gray-500"}`}>Is your Assistant Multilingual?</span>
                <Switch checked={isMultilingual} onCheckedChange={setIsMultilingual} className="data-[state=checked]:bg-blue-600" />
            </div>

            <fieldset className={`flex flex-col items-center gap-2 w-full max-w-md mt-10 transition-all border-dashed border-[1px] border-gray-500 p-4 rounded-lg relative ${!isText ? "duration-500 h-[200px] delay-150 opacity-1" : "h-0 opacity-0"}`}>
                <input
                    type="file"
                    id="uploadFile"
                    name="uploadFile"
                    onChange={(event) => {
                        if (!isText) {
                            const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                            setFieldValue("uploadFile", file);
                        }
                    }}
                    onBlur={handleBlur}
                    required={values.typeOfAssistant === "image"}
                    ref={fileInputRef}
                    className='outline-none border-none cursor-pointer opacity-0 z-[2] h-[150px]'
                    accept=".jpeg, .png, .svg"
                />
                <div className='flex flex-col items-center gap-y-4 absolute z-0'>
                    <Download size={30} className='text-blue-600 mt-5' />
                    <p className='text-blue-600 font-medium h-2'>{values.uploadFile
                            && (values.uploadFile instanceof File
                                ? values.uploadFile.name
                                : values.uploadFile)}</p>
                    <div className='flex flex-col items-center gap-1'>
                        <label htmlFor="uploadFile" className='font-semibold text-lg'>Drag & drop files or <span className='text-blue-600 cursor-pointer'>Browse</span> </label>
                        <p className='text-md text-gray-500'>Supported formats: JPEG, PNG,SVG</p>
                    </div>
                </div>

                <p className={`${error} ${touched && errors.uploadFile ? "opacity-1" : "opacity-0"}`}>{errors.uploadFile ? (errors.uploadFile) : ""}</p>    
            </fieldset>
        </div>
    </main>
  )
}

export default BasicSetup