import { WorkflowEncounter, WorkflowStep } from '../types';

export const useWorkflow = (
  workflowSteps: WorkflowStep[],
  workflowEncounters: WorkflowEncounter[],
): {
  currentStep: WorkflowStep;
  previousSteps: WorkflowStep[];
  nextSteps: WorkflowStep[];
} => {
  let currentStep: WorkflowStep | null = null;
  let previousSteps: WorkflowStep[] = [];
  let nextSteps: WorkflowStep[] = [];

  if (!workflowSteps) {
    return {
      currentStep,
      previousSteps,
      nextSteps,
    };
  }

  workflowSteps.some((step, index) => {
    const allMandatoryFormsFilled = step.forms.find(
      (form) => form.isMandatory && !workflowEncounters.map((item) => item.formUuid)?.includes(form.formUuid),
    );

    if (allMandatoryFormsFilled) {
      currentStep = step;
      previousSteps = workflowSteps.slice(0, index);
      nextSteps = workflowSteps.slice(index + 1);
      return true;
    }
    return false;
  });

  if (!currentStep) {
    currentStep = workflowSteps[workflowSteps.length - 1];
    previousSteps = workflowSteps.slice(0, workflowSteps.length - 1);
    nextSteps = [];
  }

  return {
    currentStep,
    previousSteps,
    nextSteps,
  };
};
