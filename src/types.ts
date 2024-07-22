export interface Workflow {
  currentStep: WorkflowStep;
  previousSteps: WorkflowStep[];
  nextSteps: WorkflowStep[];
}

export interface Privilege {
  uuid: string;
  name: string;
  display?: string;
  description?: string;
}

export interface EncounterType {
  uuid: string;
  name: string;
  viewPrivilege: Privilege | null;
  editPrivilege: Privilege | null;
}

export interface Form {
  uuid: string;
  encounterType?: EncounterType;
  name: string;
  display?: string;
  version: string;
  published: boolean;
  retired: boolean;
  formCategory?: string;
}

export interface WorkflowForm {
  formUuid?: string;
  encounterTypeUuid?: string;
  display: string;
  isMandatory?: boolean;
  allowMultiple?: boolean;
  editPrivilege?: string;
}

export interface WorkflowEncounter {
  formUuid?: string;
  uuid?: string;
  encounterDatetime?: string | Date;
}

export interface WorkflowStep {
  encounterId?: string;
  step: string;
  date?: Date;
  status?: string;
  forms: WorkflowForm[];
}
