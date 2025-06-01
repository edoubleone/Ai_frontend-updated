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
    filledForm: boolean;
    uploadTeamInfo: boolean,
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
    collectInformation: boolean;
    setRole: string;
    purposeOfRole: string;
    IndustryAndDescription: string;
    toneOfCommunication?: string;
    welcomeWords?: string;
    welcomeLoggedUser?: string;
    conclusion?: string;
    targetAudience: string;
    audiencePainPoints?: string;
    informationToCollect?: string[];
    whenToCollectInformation?: string;
}

export type SettingsFormValues = {
    talkLevel: string;
    jokeLevel: string;
    emodzy: string;
    additionalInstruction: string;
    addInstructionCheckbox?: boolean;
    additionalInstructionExtra?: string;
    additionalLimitation: string;
    addLimitationCheckbox?: boolean;
    additionalLimitationExtra?: string;
}

export type FaqsFormValues = {
    faqQuestion?: string;
    faqAnswer?: string;
    addFaqCheckbox?: boolean;
    extraQuestion?: string;
    extraAnswer?: string;
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
  filledForm: Yup.boolean(),
  uploadTeamInfo: Yup.boolean(),
  companyName: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Company name is required").min(5).max(100),
    otherwise: (schema) => schema.notRequired() // if filledForm is true, companyName can be not required
  }).min(5, "Company name must be at least 5 characters").max(100, "Company name must be at most 100 characters"),
  TypeOfAssistant: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required().oneOf(["Text", "Image"]),
    otherwise: (schema) => schema.notRequired(),
  }), // if filledForm is true, TypeOfAssistant can be not required
  IndustryAndDescription: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Industry and description are required").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired(),
  }),
  CompanyMission: Yup.string().notRequired().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  service: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Service is required").min(5),
    otherwise: (schema) => schema.notRequired(),
  }),
  Amount: Yup.number().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Amount is required").typeError("Amount must be a number").positive().integer(),
    otherwise: (schema) => schema.notRequired(),
  }),
  description: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Description is required").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired(),
  }),
  country: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Country is required").min(3).max(50),
    otherwise: (schema) => schema.notRequired(),
  }),
  city: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("City is required").min(2).max(50),
    otherwise: (schema) => schema.notRequired(),
  }),
  ZIPCode: Yup.number().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("ZIP code is required").typeError("ZIP code must be a number").positive().integer(),
    otherwise: (schema) => schema.notRequired(),
  }),
  state: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("State is required").min(2).max(50),
    otherwise: (schema) => schema.notRequired(),
  }),
  address1: Yup.string().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Address line 1 is required").min(10).max(100),
    otherwise: (schema) => schema.notRequired(),
  }),
  address2: Yup.string().notRequired().min(10).max(100),
  teamMemberName: Yup.string().when('uploadTeamInfo', {
    is: (uploadTeamInfo: boolean) => uploadTeamInfo, // if filledForm is not true
    then: (schema) => schema.required("Team member name is required").min(3).max(50),
    otherwise: (schema) => schema.notRequired(), // if filledForm is true, teamMemberName can be not required
  }),
  teamMemberPosition: Yup.string().when('uploadTeamInfo', {
    is: (uploadTeamInfo: boolean) => uploadTeamInfo, // if filledForm is not true
    then: (schema) => schema.required("Team member position is required").min(3).max(50),
    otherwise: (schema) => schema.notRequired(), // if filledForm is true, teamMemberPosition can be not required
  }),
  description_team: Yup.string().when('uploadTeamInfo', {
    is: (uploadTeamInfo: boolean) => uploadTeamInfo,
    then: (schema) => schema.required("Description is required").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired()
  })
});

// Step 2: Role & Audience
export const roleAndAudienceSchema = Yup.object({
  collectInformation: Yup.boolean(),
  setRole: Yup.string().required("Role is required"),
  purposeOfRole: Yup.string().required("Purpose is required"),
  IndustryAndDescription: Yup.string().required().test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  toneOfCommunication: Yup.string().required("Role description is required").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  welcomeWords: Yup.string().required("Please input tone description").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  welcomeLoggedUser: Yup.string().required("Please input tone description").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  conclusion: Yup.string().required("Please input tone description").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  targetAudience: Yup.string().required().oneOf(["Text", "Image", "All Users"]),
  audiencePainPoints: Yup.string().required("Please input audience pain points").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  informationToCollect: Yup.array().when('collectInformation', {
    is: (collectInformation: boolean) => collectInformation, // if collectInformation is true
    then: (schema) => schema.of(Yup.string()).min(1, "min of 1 data").max(5, "Max 5 items"),
    otherwise: (schema) => schema.notRequired(), // if collectInformation is false, informationToCollect can be not required
  }),
  whenToCollectInformation: Yup.string().when('collectInformation', {
    is: (collectInformation: boolean) => collectInformation, // if collectInformation is true
    then: (schema) => schema.required().oneOf(["Start of the chat", "End of the chat", "No Preference"]),
    otherwise: (schema) => schema.notRequired(), // if collectInformation is false, whenToCollectInformation can be not required
  }),
});

// Step 3: Settings
export const settingsSchema = Yup.object({
  talkLevel: Yup.string().required().oneOf(["none", "low", "moderate"]),
  jokeLevel: Yup.string().required().oneOf(["none", "low", "moderate"]),
  emodzy: Yup.string().required().oneOf(["none", "low", "moderate"]),
  additionalInstruction: Yup.string().required("Additional instructions are neccessary").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  addInstructionCheckbox: Yup.boolean(),
  additionalInstructionExtra: Yup.string().when('addInstructionCheckbox', {
    is: (addInstructionCheckbox: boolean) => addInstructionCheckbox,
    then: (schema) => schema.required("This field cannot be empty").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired(),
  }),
  additionalLimitation: Yup.string().required("Additional limitations are neccessary").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  addLimitationCheckbox: Yup.boolean(),
  additionalLimitationExtra: Yup.string().when('addLimitationCheckbox', {
    is: (addLimitationCheckbox: boolean) => addLimitationCheckbox,
    then: (schema) => schema.required("This field cannot be empty").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired(),
  })
});

// Step 4: FAQs
export const faqsSchema = Yup.object({
  faqQuestion: Yup.string().required("This questions are important").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  faqAnswer: Yup.string().required("Please provide the answer to this question").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
  addFaqCheckbox: Yup.boolean(),
  extraQuestion: Yup.string().when('addFaqCheckbox', {
    is: (addFaqCheckbox: boolean) => addFaqCheckbox,
    then: (schema) => schema.required("This field cannot be empty").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired(),
  }),
  extraAnswer: Yup.string().when('addFaqCheckbox', {
    is: (addFaqCheckbox: boolean) => addFaqCheckbox,
    then: (schema) => schema.required("This field cannot be empty").test("wordCount", "Max 50 words", val => !val || val.trim().split(/\s+/).length <= 50),
    otherwise: (schema) => schema.notRequired(),
  })
});

// Step 5: Customize
export const customizeSchema = Yup.object({
  general: Yup.boolean().notRequired(),
  colorsAndStyle: Yup.boolean().notRequired(),
  chatButton: Yup.boolean().notRequired(),
  additionalSettings: Yup.boolean().notRequired()
});


export const companyDetailsSchemaWithFile = Yup.object({
  filledForm: Yup.boolean(),
  assistant_id: Yup.number().when('filledForm', {
    is: (filledForm: boolean) => filledForm, // if filledForm is false
    then: (schema) => schema.required("Assistant ID is required").typeError("Assistant ID must be a number").positive().integer(),
    otherwise: (schema) => schema.notRequired() // if filledForm is true, assistant_id can be not required
  }),
  files: Yup.mixed().when('filledForm', {
    is: (filledForm: boolean) => !filledForm, // if filledForm is false
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
          'application/vnd.google-apps.document',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
          'application/pdf'
        ].includes(file.type))
      )
      .required("Company document is required"),
    otherwise: (schema) => schema.nullable() // if filledForm is true, files can be null
  })
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
