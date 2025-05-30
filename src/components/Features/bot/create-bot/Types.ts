import * as Yup from 'yup';


export interface BotFormTrigger {
    submit: () => void;
}

export type BasicSetupFormValues = {
    name: string;
    typeOfAssistant: string;
    language: string;
    uploadFile: File | null;
    isMultilingual: boolean;
}

export type CompanyDetailsFormValues = {
    companyName: string;
    TypeOfAssistant: string;
    IndustryAndDescription: string;
    CompanyMission?: string;
    service?: string;
    Amount?: number;
    description?: string;
    country?: string;
    city?: string;
    ZIPCode?: string;
    state?: string;
    address1?: string;
    address2?: string;
    teamMemberName?: string;
    teamMemberPosition?: string;
    companyDocument?: File | null;
    description_team?: string;
}

export type RoleAndAudienceFormValues = {
    setRole: string;
    purposeOfRole: string;
    IndustryAndDescription: string;
    service?: string;
    roleDescription?: string;
    toneDescription1?: string;
    toneDescription2?: string;
    toneDescription3?: string;
    targetAudience: string;
    audiencePainPoints?: string;
    informationToCollect: string[];
    whenToCollectInformation: string;
}

export type SettingsFormValues = {
    talkLevel: string;
    jokeLevel: string;
    emodzy: string;
    additionalInstruction?: string;
    addInstructionCheckbox?: boolean;
    additionalLimitation?: string;
    addLimitationCheckbox?: boolean;
}

export type FaqsFormValues = {
    faqQuestion?: string;
    faqAnswer?: string;
    addFaqCheckbox?: boolean;
}

export type CustomizeFormValues = {
    general?: boolean;
    colorsAndStyle?: boolean;
    chatButton?: boolean;
    additionalSettings?: boolean;
}


// Step 0: Basic Setup
export const basicSetupSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Assistant name is required"),
  typeOfAssistant: Yup.string().required("Type of Assistant is required"),
  language: Yup.string().min(2).max(20).required("Language is required"),
  uploadFile: Yup.mixed().when('assistantType', {
    is: (typeOfAssistant: string) => typeOfAssistant !== 'text', // if assistantType is not 'text'
    then: (schema) => schema
      .test(
        'fileSize',
        'File too large (max 10 MB)',
        (file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024)
      )
      .test(
        'fileType',
        'Unsupported file format',
        (file) => !file || (file instanceof File && [
          'image/jpeg',
          'image/png',
          'application/svg+xml',
          'image/svg+xml',
        ].includes(file.type))
      ),
    otherwise: (schema) => schema.nullable() // if assistantType is 'text', file can be null
  }),
  isMultilingual: Yup.boolean().required()
});

// Step 1: Company Details
export const companyDetailsSchema = Yup.object({
  companyName: Yup.string().required("Company name is required").min(5).max(100),
  TypeOfAssistant: Yup.string().required().oneOf(["Text", "Image"]),
  IndustryAndDescription: Yup.string().required().test(
    "wordCount",
    "Must be under 50 words",
    val => !val || val.trim().split(/\s+/).length <= 50
  ),
  CompanyMission: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  service: Yup.string().required("Service is required").min(5),
  Amount: Yup.number().typeError("Amount must be a number").positive().required("Amount is required"),
  description: Yup.string().required("Description is required").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  country: Yup.string().required("Country is required").min(3).max(50),
  city: Yup.string().required("City is required").min(3).max(50),
  ZIPCode: Yup.number().required("ZIP Code is required").typeError("ZIP Code must be a number").positive().integer(),
  state: Yup.string().notRequired(),
  address1: Yup.string().notRequired(),
  address2: Yup.string().notRequired(),
  teamMemberName: Yup.string().notRequired(),
  teamMemberPosition: Yup.string().notRequired(),
  companyDocument: Yup.mixed().test(
    'fileSize',
    'File too large (max 10 MB)',
    (file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024)
  ).test(
    'fileType',
    'Unsupported file format',
    (file) => !file || (file instanceof File && [
          'application/vnd.google-apps.document',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
          'application/pdf'
        ].includes(file.type))
  ),
  description_team: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50)
});

// Step 2: Role & Audience
export const roleAndAudienceSchema = Yup.object({
  setRole: Yup.string().required("Role is required"),
  purposeOfRole: Yup.string().required("Purpose is required"),
  IndustryAndDescription: Yup.string().required().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  service: Yup.string().notRequired(),
  roleDescription: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  toneDescription1: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  toneDescription2: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  toneDescription3: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  targetAudience: Yup.string().required().oneOf(["Text", "Image", "All Users"]),
  audiencePainPoints: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  informationToCollect: Yup.array().of(Yup.string()).max(5, "Max 5 items"),
  whenToCollectInformation: Yup.string().required().oneOf(["Start of the chat", "End of the chat", "No Preference"])
});

// Step 3: Settings
export const settingsSchema = Yup.object({
  talkLevel: Yup.string().required().oneOf(["None", "Low", "Moderate"]),
  jokeLevel: Yup.string().required().oneOf(["None", "Low", "Moderate"]),
  emodzy: Yup.string().required().oneOf(["None", "Low", "Moderate"]),
  additionalInstruction: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  addInstructionCheckbox: Yup.boolean().notRequired(),
  additionalLimitation: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  addLimitationCheckbox: Yup.boolean().notRequired(),
});

// Step 4: FAQs
export const faqsSchema = Yup.object({
  faqQuestion: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  faqAnswer: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  addFaqCheckbox: Yup.boolean().notRequired()
});

// Step 5: Customize
export const customizeSchema = Yup.object({
  general: Yup.boolean().notRequired(),
  colorsAndStyle: Yup.boolean().notRequired(),
  chatButton: Yup.boolean().notRequired(),
  additionalSettings: Yup.boolean().notRequired()
});

// Schema per step
export const stepSchemas = [
  basicSetupSchema,
  companyDetailsSchema,
  roleAndAudienceSchema,
  settingsSchema,
  faqsSchema,
  customizeSchema,
  Yup.object({}) // Preview (no validation needed)
];
