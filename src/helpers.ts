import { Visit } from '@openmrs/esm-framework';
import { WorkflowEncounter } from './types';

export function extractEncounters(visit: Visit): Array<WorkflowEncounter> {
  if (!visit || !visit.encounters || !Array.isArray(visit.encounters)) {
    return [];
  }

  return visit.encounters
    .map((encounter) => ({
      uuid: encounter.uuid,
      formUuid: encounter.form && encounter.form.uuid ? encounter.form.uuid : null,
      encounterDatetime: new Date(encounter.encounterDatetime),
    }))
    .sort((a, b) => {
      return new Date(a.encounterDatetime).getTime() - new Date(b.encounterDatetime).getTime();
    });
}

export function getEncounter(formUuid, encounters) {
  return encounters.find((enc) => enc.formUuid === formUuid);
}

export function getFilledForms(step, encounters) {
  return step?.forms?.filter((form) => encounters.some((filledForm) => filledForm.formUuid === form.formUuid)) ?? [];
}

export function getStepDate(step, encounters) {
  const stepForms = step?.forms.map((form) => form.formUuid);

  for (const encounter of encounters.reverse()) {
    if (stepForms && stepForms.includes(encounter.formUuid)) {
      return encounter.encounterDatetime;
    }
  }

  return new Date();
}
