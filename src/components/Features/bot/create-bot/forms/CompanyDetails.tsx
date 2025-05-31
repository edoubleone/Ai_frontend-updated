import { CircleAlert, Download, TriangleAlert } from 'lucide-react'
import {error, fieldsetStyles, inputStyles, sectionStyles} from '@/components/Features/bot/create-bot/forms'
import React from 'react'
import { Switch } from '@/components/ui/switch'
import { useFormikContext } from 'formik'
import { type CompanyDetailsFormValues } from '../Types'

const CompanyDetails = () => {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext<CompanyDetailsFormValues>();


    const [isVatIncluded, setIsVatIncluded] = React.useState(false);
    const [upLoadTeamMember, setUpLoadTeamMember] = React.useState(false);
    const [isToFillForm, setIsToFillForm] = React.useState(false);

    const fileInputRef = React.useRef(null);

    values.filledForm = isToFillForm;
    values.uploadTeamInfo = upLoadTeamMember;

  return (
    <div className='mb-10'>
        <header className=''>
            <h1 className='text-2xl font-semibold mb-6'>Company Details</h1>
            <div className='flex justify-between items-center gap-x-5 h-[100px]'>
                <p className='text-gray-500 py-3 px-5 bg-[#EEEEFD] rounded-lg'>Provide accurate information about your company by uploading your company&apos;s documents. <span className='py-1 mt-2 pr-4 pl-2 w-fit h-fit rounded-lg bg-red-200 text-red-700 font-medium flex items-center gap-x-2'><CircleAlert size={18} strokeWidth={1.25} className='text-sm' />Recommended</span></p>
                <div className='flex flex-col items-center gap-y-2'>
                    <p className='font-medium'>OR</p>
                    <Switch checked={isToFillForm} onCheckedChange={setIsToFillForm} className="data-[state=checked]:bg-blue-600" />
                </div>
                <p className='text-gray-500 h-full py-3 px-5 bg-[#EEEEFD] rounded-lg'>Provide information about your company to help the assistant understand your business better.</p>
            </div>
        </header>

        <form>
            <fieldset className={`flex flex-col items-center gap-2 w-full max-w-md mt-10 transition-all border-dashed border-[1px] border-gray-500 p-4 rounded-lg relative ${!isToFillForm ? "duration-500 h-[200px] delay-150 opacity-1" : "h-0 opacity-0"}`}>
                <input
                    type="file"
                    id="companyDocument"
                    name="companyDocument"
                    onChange={(event) => {
                        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                        setFieldValue("companyDocument", file);
                    }}
                    onBlur={handleBlur}
                    ref={fileInputRef}
                    className='outline-none border-none cursor-pointer opacity-0 z-[2] h-[150px]'
                    accept=".jpeg, .png, .svg"
                />
                <div className='flex flex-col items-center gap-y-4 absolute z-0'>
                    <Download size={30} className='text-blue-600 mt-5' />
                    <p className='text-blue-600 font-medium h-2'>{values.companyDocument
                            && (values.companyDocument instanceof File
                                ? values.companyDocument.name
                                : values.companyDocument)}</p>
                    <div className='flex flex-col items-center gap-1'>
                        <label htmlFor="companyDocument" className='font-semibold text-lg'>Drag & drop files or <span className='text-blue-600 cursor-pointer'>Browse</span> </label>
                        <p className='text-md text-gray-500'>Supported formats: Doc, PDF</p>
                    </div>
                </div>

                <p className={`${error} ${touched && errors.companyDocument ? "opacity-1" : "opacity-0"}`}>{errors.companyDocument ? (errors.companyDocument) : ""}</p>    
            </fieldset>
        </form>

        <form className={`flex-col gap-y-10 ${isToFillForm ? "flex" : "hidden"}`}>
            <div className="mb-4 bg-[#EEEEFD] px-5 py-4  flex gap-5 rounded-lg w-full">
                <TriangleAlert className='text-[#C82332] text-2xl w-[10%]' />
                <span>Please note that the more detailed the information you provide about your company, the better the assistant will be able to respond to questions. However, this will impact AI usage. Therefore, we recommend finding a balance between the completeness of information and its necessity. For example, if your assistant&apos;s goal is to gather information, it does not need to know details about your employees.</span>
            </div> 

            <main className='flex flex-col gap-y-10 py-10'>
                <section className={sectionStyles}>
                    <div className='flex justify-between items-center gap-10'>
                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.companyName}
                                name="companyName"
                                placeholder="Enter your company name"
                                className={`${inputStyles} ${touched && errors.companyName ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.companyName != "" && !errors.companyName &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.companyName ? "opacity-1" : "opacity-0"}`}>{errors.companyName ? (errors.companyName) : ""}</p>
                        </fieldset>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="typeOfAssistant">Type of Assistant</label>
                            <input name="typeOfAssistant" value={"Text"} disabled id="typeOfAssistant" className={`${inputStyles} cursor-not-allowed text-blue-600 font-medium bg-blue-50`} />
                        </fieldset>
                    </div>

                    <div className='flex justify-between items-center gap-10'>
                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="IndustryAndDescription" className='flex items-center gap-x-3'>Industry and Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                            <textarea
                                id="IndustryAndDescription"
                                rows={5}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.IndustryAndDescription}
                                name="IndustryAndDescription"
                                placeholder="For example, we create website that convert for start up "
                                className={`${inputStyles} ${touched && errors.IndustryAndDescription ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.IndustryAndDescription != "" && !errors.IndustryAndDescription &&"ring-green-300"}`}
                            />
                            <div className='flex justify-between'>
                                <p className={`${error} ${errors.IndustryAndDescription ? "opacity-1" : "opacity-0"}`}>{errors.IndustryAndDescription ? (errors.IndustryAndDescription) : ""}</p>
                                <p className='flex justify-end'>Max of 50 words</p>
                            </div>
                        </fieldset>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="CompanyMission" className='flex items-center gap-x-3'>Company&apos;s Mission (Optional) <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                            <textarea
                                id="CompanyMission"
                                rows={5}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.CompanyMission}
                                name="CompanyMission"
                                placeholder="Example: Our goal is to make diapers easier to reach across the world"
                                className={`${inputStyles}`}
                            />
                            <p className='flex justify-end'>Max of 50 words</p>
                        </fieldset>
                    </div>
                </section>

                <hr />

                <section className={sectionStyles}>
                    <div>
                        <h2 className='text-lg font-semibold mb-2'>Company Products</h2>
                        <div className='flex items-center w-full justify-between gap-[30px]'>
                            <span className={`${"text-gray-500"}`}>You can add up to 40 services of your company, which can be digital services, services, courses, training, or products</span>
                            {/* <Switch checked={isExtraServices} onCheckedChange={setIsExtraServices} className="data-[state=checked]:bg-blue-600" /> */}
                        </div>
                    </div>

                    <div className='flex justify-between gap-10'>
                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="service">Service/ Product</label>
                            <input
                                type="text"
                                id="service"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.service}
                                name="service"
                                placeholder="For example, we create website that convert for start up"
                                className={`${inputStyles} ${touched && errors.service ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.service != "" && !errors.service &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.service ? "opacity-1" : "opacity-0"}`}>{errors.service ? (errors.service) : ""}</p>
                        </fieldset>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="Amount">Amount</label>
                            <div className="w-full flex items-center bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <select
                                    name="Amount"
                                    id="Amount"
                                    className='h-full w-fit outline-none'
                                >
                                    <option value="dollar">$</option>
                                    <option value="naira">Image</option>
                                </select>

                                <input 
                                    type="text" 
                                    name="Amount"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Amount}
                                    id="Amount" 
                                    className='w-full bg-transparent outline-none px-4 py-[12px] ' 
                                />
                            </div>
                            <p className={`${error} ${errors.Amount ? "opacity-1" : "opacity-0"}`}>{errors.Amount ? (errors.Amount) : ""}</p>

                            <div className='flex items-center gap-[30px]'>
                                <span className={`${isVatIncluded ? "text-gray-900" : "text-gray-500"}`}>VAT included</span>
                                <Switch checked={isVatIncluded} onCheckedChange={setIsVatIncluded} className="data-[state=checked]:bg-blue-600" />
                            </div>
                        </fieldset>
                    </div>

                    <fieldset className={fieldsetStyles}>
                        <label htmlFor="description" className='flex items-center gap-x-3'>Description <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                        <textarea
                            id="description"
                            rows={5}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            name="description"
                            placeholder="For example, we create website that convert for start up"
                            className={`${inputStyles} ${touched && errors.description ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.description != "" && !errors.description &&"ring-green-300"}`}
                        />
                        <p className={`${error} ${errors.description ? "opacity-1" : "opacity-0"}`}>{errors.description ? (errors.description) : ""}</p>
                        <p className='flex justify-end'>Max of 50 words</p>
                    </fieldset>

                    <fieldset className="flex items-center gap-x-3">
                        <input
                            type='checkbox'
                            id="addProduct"
                            name="addProduct"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // value={values.description}
                            placeholder="For example, we create website that convert for start up"
                            className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* <p className={`${error} ${errors.name ? "opacity-1" : "opacity-0"}`}>{errors.name ? (errors.name) : ""}</p> */}
                        <label htmlFor="addProduct" className='flex items-center gap-x-3'>Add Product/ Service</label>
                    </fieldset>
                </section>

                <hr />

                <section className={sectionStyles}>
                    <div>
                        <h2 className='text-lg font-semibold mb-2'>Address</h2>
                        <div className='flex items-center w-full justify-between gap-[30px]'>
                            <span className={`${"text-gray-500"}`}>Add addresses to customize responses and improve location-based assistance.</span>
                            {/* <Switch checked={isCustomizable} onCheckedChange={setIsCustomizable} className="data-[state=checked]:bg-blue-600" /> */}
                        </div>
                    </div>

                    <div className='flex justify-between gap-10'>
                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                                name="country"
                                className={`${inputStyles} ${touched && errors.country ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.country != "" && !errors.country &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.country ? "opacity-1" : "opacity-0"}`}>{errors.country ? (errors.country) : ""}</p>
                        </fieldset>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                name="city"
                                className={`${inputStyles} ${touched && errors.city ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.city != "" && !errors.city &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.city ? "opacity-1" : "opacity-0"}`}>{errors.city ? (errors.city) : ""}</p>
                        </fieldset>
                    </div>

                    <div className='flex justify-between gap-10'>
                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="ZIPCode">ZIP Code</label>
                            <input
                                type="text"
                                id="ZIPCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ZIPCode}
                                name="ZIPCode"
                                className={`${inputStyles} ${touched && errors.ZIPCode ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.ZIPCode != "" && !errors.ZIPCode &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.ZIPCode ? "opacity-1" : "opacity-0"}`}>{errors.ZIPCode ? (errors.ZIPCode) : ""}</p>
                        </fieldset>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.state}
                                name="state"
                                className={`${inputStyles} ${touched && errors.state ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.state != "" && !errors.state &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.state ? "opacity-1" : "opacity-0"}`}>{errors.state ? (errors.state) : ""}</p>
                        </fieldset>
                    </div>

                    <div className='flex justify-between gap-10'>
                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="address1">Address 1</label>
                            <input
                                type="text"
                                id="address1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address1}
                                name="address1"
                                className={`${inputStyles} ${touched && errors.address1 ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.address1 != "" && !errors.address1 &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.address1 ? "opacity-1" : "opacity-0"}`}>{errors.address1 ? (errors.address1) : ""}</p>
                        </fieldset>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="address2">Address 2</label>
                            <input
                                type="text"
                                id="address2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address2}
                                name="address2"
                                className={`${inputStyles} ${touched && errors.address2 ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.address2 != "" && !errors.address2 &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.address2 ? "opacity-1" : "opacity-0"}`}>{errors.address2 ? (errors.address2) : ""}</p>
                        </fieldset>
                    </div>

                    <fieldset className="flex items-center gap-x-3">
                        <input
                            type='checkbox'
                            id="addAddress"
                            name="addAddress"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // value={values.addAddress}
                            placeholder="For example, we create website that convert for start up"
                            className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="addAddress" className='flex items-center gap-x-3'>Add Address</label>
                    </fieldset>
                </section>

                <hr />

                <section className={sectionStyles}>
                    <div>
                        <h2 className='text-lg font-semibold mb-2'>Team Members <span className='text-[#737373]'>(Optional)</span></h2>
                        <div className='flex items-center w-full justify-between gap-[30px]'>
                            <span className={`${upLoadTeamMember ? "text-gray-900" : "text-gray-500"}`}>Add team members to streamline communication and enhance personalized interactions with our AI assistant.</span>
                            <Switch checked={upLoadTeamMember} onCheckedChange={setUpLoadTeamMember} className="data-[state=checked]:bg-blue-600" />
                        </div>
                    </div>

                    <div className={`flex-col gap-10 ${upLoadTeamMember ? "flex" : "hidden"}`}>
                        <div className={`flex justify-between gap-10`}>
                            <fieldset className={fieldsetStyles}>
                                <label htmlFor="teamMemberName">Team Member&apos;s Name</label>
                                <input
                                    type="text"
                                    id="teamMemberName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.teamMemberName}
                                    name="teamMemberName"
                                    className={`${inputStyles} ${touched && errors.teamMemberName ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.teamMemberName != "" && !errors.teamMemberName &&"ring-green-300"}`}
                                />
                                <p className={`${error} ${errors.teamMemberName ? "opacity-1" : "opacity-0"}`}>{errors.teamMemberName ? (errors.teamMemberName) : ""}</p>
                            </fieldset>

                            <fieldset className={fieldsetStyles}>
                                <label htmlFor="teamMemberPosition">Team Member&apos;s Position</label>
                                <input
                                    type="text"
                                    id="teamMemberPosition"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.teamMemberPosition}
                                    name="teamMemberPosition"
                                    className={`${inputStyles} ${touched && errors.teamMemberPosition ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.teamMemberPosition != "" && !errors.teamMemberPosition &&"ring-green-300"}`}
                                />
                                <p className={`${error} ${errors.teamMemberPosition ? "opacity-1" : "opacity-0"}`}>{errors.teamMemberPosition ? (errors.teamMemberPosition) : ""}</p>
                            </fieldset>
                        </div>

                        <fieldset className={fieldsetStyles}>
                            <label htmlFor="description_team" className='flex items-center gap-x-3'>Description (Optional) <CircleAlert size={18} strokeWidth={1.25} className='text-sm' /></label>
                            <textarea
                                id="description_team"
                                rows={5}
                                name="description_team"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description_team}
                                placeholder="For example, we create website that convert for start up"
                                className={`${inputStyles} ${touched && errors.description_team ? " bg-red-50 ring-red-300" : " bg-white ring-gray-200"} ${values.description_team != "" && !errors.description_team &&"ring-green-300"}`}
                            />
                            <p className={`${error} ${errors.description_team ? "opacity-1" : "opacity-0"}`}>{errors.description_team ? (errors.description_team) : ""}</p>
                            <p className='flex justify-end'>Max of 50 words</p>
                        </fieldset>

                        <fieldset className="flex items-center gap-x-3">
                            <input
                                type='checkbox'
                                id="addTeamMember"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // value={values.description}
                                name="addTeamMember"
                                placeholder="For example, we create website that convert for start up"
                                className="h-5 w-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="addTeamMember" className='flex items-center gap-x-3'>Add Team Member</label>
                            {/* <p className={`${error} ${errors.name ? "opacity-1" : "opacity-0"}`}>{errors.name ? (errors.name) : ""}</p> */}
                        </fieldset>
                    </div>
                </section>
            </main>
        </form>
    </div>
  )
}

export default CompanyDetails