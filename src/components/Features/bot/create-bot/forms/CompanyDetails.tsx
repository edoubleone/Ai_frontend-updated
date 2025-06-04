import { CircleAlert, Download, TriangleAlert } from "lucide-react";
import {
  error,
  sectionStyles,
} from "@/components/Features/bot/create-bot/forms";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useFormikContext } from "formik";
import { type CompanyDetailsFormValues } from "../Types";
import SecondaryInput from "@/components/shared/secondary-input";

import SecondaryTextArea from "@/components/shared/secondary-textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import InputSelectCombo from "@/components/shared/input-select";

const CompanyDetails = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<CompanyDetailsFormValues>();

  const [isVatIncluded, setIsVatIncluded] = React.useState(false);
  const [upLoadTeamMember, setUpLoadTeamMember] = React.useState(false);
  const [isToFillForm, setIsToFillForm] = React.useState(false);

  const fileInputRef = React.useRef(null);

  values.filledForm = isToFillForm;
  values.uploadTeamInfo = upLoadTeamMember;

  return (
    <div className="flex flex-col gap-y-[30px]">
      <header>
        <h1 className="text-2xl font-semibold mb-6">Company Details</h1>
        <div className="flex justify-between items-stretch gap-x-5">
          <p className="text-gray-500 flex-1 py-3 px-5 bg-[#EEEEFD] rounded-lg flex flex-col justify-center">
            Provide accurate information about your company by uploading your
            company&apos;s documents.{" "}
            <span className="py-1 mt-2 pr-4 pl-2 w-fit h-fit rounded-lg bg-red-200 text-red-700 font-medium flex items-center gap-x-2">
              <CircleAlert size={18} strokeWidth={1.25} className="text-sm" />
              Recommended
            </span>
          </p>
          <div className="flex flex-col justify-center items-center gap-y-2">
            <p className="font-medium">OR</p>
            <Switch
              checked={isToFillForm}
              onCheckedChange={setIsToFillForm}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          <p className="text-gray-500 flex-1 py-3 px-5 bg-[#EEEEFD] rounded-lg flex flex-col justify-center">
            Provide information about your company to help the assistant
            understand your business better.
          </p>
        </div>
      </header>

      <form>
        <fieldset
          className={`flex flex-col items-center gap-2 w-full max-w-md mt-10 transition-all border-dashed border-[1px] border-gray-500 p-4 rounded-lg relative ${
            !isToFillForm
              ? "duration-500 h-[200px] delay-150 opacity-1"
              : "hidden opacity-0"
          }`}
        >
          <input
            type="file"
            id="companyDocument"
            name="companyDocument"
            onChange={(event) => {
              const file = event.currentTarget.files
                ? event.currentTarget.files[0]
                : null;
              setFieldValue("companyDocument", file);
            }}
            onBlur={handleBlur}
            ref={fileInputRef}
            className="outline-none border-none cursor-pointer opacity-0 z-[2] h-[150px]"
            accept=".pdf"
          />
          <div className="flex flex-col items-center gap-y-4 absolute z-0">
            <Download size={30} className="text-blue-600 mt-5" />
            <p className="text-blue-600 font-medium h-2">
              {values.companyDocument &&
                (values.companyDocument instanceof File
                  ? values.companyDocument.name
                  : values.companyDocument)}
            </p>
            <div className="flex flex-col items-center gap-1">
              <label
                htmlFor="companyDocument"
                className="font-semibold text-lg"
              >
                Drag & drop files or{" "}
                <span className="text-blue-600 cursor-pointer">Browse</span>{" "}
              </label>
              <p className="text-md text-gray-500">
                Supported formats: Doc, PDF
              </p>
            </div>
          </div>

          <p
            className={`${error} ${
              touched && errors.companyDocument ? "opacity-1" : "opacity-0"
            }`}
          >
            {errors.companyDocument ? errors.companyDocument : ""}
          </p>
        </fieldset>
      </form>

      <form
        className={`flex-col gap-y-[30px] ${isToFillForm ? "flex" : "hidden"}`}
      >
        <div className="bg-[#EEEEFD] px-5 py-4 flex gap-5 rounded-lg w-full">
          <TriangleAlert className="text-[#C82332] text-2xl w-[10%]" />
          <span>
            Please note that the more detailed the information you provide about
            your company, the better the assistant will be able to respond to
            questions. However, this will impact AI usage. Therefore, we
            recommend finding a balance between the completeness of information
            and its necessity. For example, if your assistant&apos;s goal is to
            gather information, it does not need to know details about your
            employees.
          </span>
        </div>

        <main className="flex flex-col gap-y-[30px]">
          <div className="grid items-start gap-10 sm:grid-cols-2">
            <SecondaryInput
              name="companyName"
              onChange={handleChange}
              label="Company Name"
              placeholder="Enter your company name"
              onBlur={handleBlur}
              errorText={errors.companyName}
              value={values.companyName}
              error={errors.companyName && touched.companyName ? true : false}
            />

            <SecondaryInput
              placeholder="Assistant Type"
              label="Type of Assistant"
              name="TypeOfAssistant"
              value={values.TypeOfAssistant}
              onChange={handleChange}
              readOnly
            />

            <SecondaryTextArea
              rows={5}
              info
              hasMax
              label="Industry and Description"
              maxLength={50}
              onChange={handleChange}
              errorText={errors.IndustryAndDescription}
              onBlur={handleBlur}
              value={values.IndustryAndDescription}
              error={
                errors.IndustryAndDescription && touched.IndustryAndDescription
                  ? true
                  : false
              }
              name="IndustryAndDescription"
              placeholder="For example, we create website that convert for start up "
            />

            <SecondaryTextArea
              info
              hasMax
              label="Company's Mission (Optional)"
              maxLength={50}
              errorText={errors.IndustryAndDescription}
              rows={5}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.CompanyMission}
              error={
                errors.CompanyMission && touched.CompanyMission ? true : false
              }
              name="CompanyMission"
              placeholder="Example: Our goal is to make diapers easier to reach across the world"
            />
          </div>

          <hr />

          <section className={sectionStyles}>
            <div>
              <h2 className="text-lg font-semibold mb-2">Company Products</h2>
              <div className="flex items-center w-full justify-between gap-[30px]">
                <span className={`${"text-gray-500"}`}>
                  You can add up to 40 services of your company, which can be
                  digital services, services, courses, training, or products
                </span>
                {/* <Switch checked={isExtraServices} onCheckedChange={setIsExtraServices} className="data-[state=checked]:bg-blue-600" /> */}
              </div>
            </div>

            <div className="grid items-start sm:grid-cols-2 gap-10">
              <SecondaryInput
                type="text"
                id="service"
                label="Service / Product"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.service}
                name="service"
                error={errors.service && touched.service ? true : false}
                placeholder="For example, we create website that convert for start up"
                errorText={errors.service}
              />

              <div className="flex flex-col gap-y-2">
                <InputSelectCombo
                  label="Amount"
                  value={values.Amount}
                  onChange={handleChange}
                  name="Amount"
                  placeholder="Amount"
                  options={[
                    {
                      value: "$",
                      label: "$",
                    },
                    {
                      value: "€",
                      label: "€",
                    },
                    {
                      value: "£",
                      label: "£",
                    },
                  ]}
                />

                <Label className="flex text-sm text-[#737373] items-center gap-x-3">
                  VAT included
                  <Switch
                    checked={isVatIncluded}
                    onCheckedChange={(checked) => setIsVatIncluded(checked)}
                  />
                </Label>
              </div>

              <SecondaryTextArea
                info
                hasMax
                label="Description"
                maxLength={50}
                error={!!errors.description}
                errorText={errors.description}
                rows={5}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
                placeholder="For example, we create website that convert for start up"
              />
            </div>

            <Label className="flex items-center gap-x-3">
              <Checkbox id="addProduct" name="addProduct" />
              Add Product/ Service
            </Label>
          </section>

          <hr />

          <section className={sectionStyles}>
            <div>
              <h2 className="text-lg font-semibold mb-2">Address</h2>
              <div className="flex items-center w-full justify-between gap-[30px]">
                <span className={`${"text-gray-500"}`}>
                  Add addresses to customize responses and improve
                  location-based assistance.
                </span>
                {/* <Switch checked={isCustomizable} onCheckedChange={setIsCustomizable} className="data-[state=checked]:bg-blue-600" /> */}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 items-start gap-10">
              <SecondaryInput
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter country"
                value={values.country}
                error={errors.country && touched.country ? true : false}
                errorText={errors.country}
                name="country"
                label="Country"
              />

              <SecondaryInput
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter city"
                value={values.city}
                error={errors.city && touched.city ? true : false}
                errorText={errors.city}
                name="city"
                label="City"
              />

              <SecondaryInput
                placeholder="ZIP Code"
                onChange={handleChange}
                error={errors.ZIPCode && touched.ZIPCode ? true : false}
                errorText={errors.ZIPCode}
                onBlur={handleBlur}
                value={values.ZIPCode}
                name="ZIPCode"
                label="ZIP Code"
              />

              <SecondaryInput
                placeholder="State"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.state && touched.state ? true : false}
                errorText={errors.state}
                value={values.state}
                name="state"
                label="State"
              />

              <SecondaryInput
                placeholder="Address 1"
                onChange={handleChange}
                error={errors.address1 && touched.address1 ? true : false}
                errorText={errors.address1}
                onBlur={handleBlur}
                value={values.address1}
                name="address1"
                label="Address 1"
              />

              <SecondaryInput
                placeholder="Address 2"
                onChange={handleChange}
                error={errors.address2 && touched.address2 ? true : false}
                errorText={errors.address2}
                onBlur={handleBlur}
                value={values.address2}
                name="address2"
                label="Address 2"
              />
            </div>

            <Label className="flex items-center gap-x-3">
              <Checkbox id="addProduct" name="addProduct" />
              Add Address
            </Label>
          </section>

          <hr />

          <section className={sectionStyles}>
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Team Members <span className="text-[#737373]">(Optional)</span>
              </h2>
              <div className="flex items-center w-full justify-between gap-[30px]">
                <span
                  className={`${
                    upLoadTeamMember ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  Add team members to streamline communication and enhance
                  personalized interactions with our AI assistant.
                </span>
                <Switch
                  checked={upLoadTeamMember}
                  onCheckedChange={setUpLoadTeamMember}
                />
              </div>
            </div>

            <div
              className={`flex-col gap-10 ${
                upLoadTeamMember ? "flex" : "hidden"
              }`}
            >
              <div className={`grid sm:grid-cols-2 items-start gap-10`}>
                <SecondaryInput
                  type="text"
                  id="teamMemberName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label=" Team Member's Name"
                  error={!!errors.teamMemberName}
                  errorText={errors.teamMemberName}
                  placeholder="Enter team member's name"
                  value={values.teamMemberName}
                  name="teamMemberName"
                />

                <SecondaryInput
                  type="text"
                  id="teamMemberPosition"
                  placeholder="Enter team member's position"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teamMemberPosition}
                  error={!!errors.teamMemberPosition}
                  errorText={errors.teamMemberPosition}
                  name="teamMemberPosition"
                  label=" Team Member's Position"
                />

                <SecondaryTextArea
                  info
                  hasMax
                  label="Description (Optional)"
                  maxLength={50}
                  errorText={errors.description}
                  rows={5}
                  id="description_team"
                  name="description_team"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.description_team}
                  value={values.description_team}
                  placeholder="For example, we create website that convert for start up"
                />
              </div>

              <Label className="flex items-center gap-x-3">
                <Checkbox id="addProduct" name="addProduct" />
                Add Team Member
              </Label>
            </div>
          </section>
        </main>
      </form>
    </div>
  );
};

export default CompanyDetails;
