import { WorkflowStep } from '../types';

export const workflowSteps: WorkflowStep[] = [
  {
    step: 'Step 1',
    date: null,
    status: null,
    forms: [
      {
        formUuid: '97c09137-5bf6-4afc-8073-ccde16bb2698',
        encounterTypeUuid: '849f7545-6839-4788-be48-bbc800d2692f',
        display: 'Initial Decision After Registration',
        isMandatory: true,
      },
    ],
  },
  {
    step: 'Step 2',
    forms: [
      {
        formUuid: '8e4289bc-cfda-4d07-a90b-c28a7ff6c576',
        encounterTypeUuid: '01f08012-e4a4-4add-8c11-b977bdb1c8ba',
        display: 'Initial assessment Form',
        isMandatory: true,
      },
    ],
  },
  {
    step: 'Step 3',
    forms: [
      {
        formUuid: '5ce338a9-eede-ee79-a96d-d99754135a5b',
        encounterTypeUuid: '5ce338a9-dfde-2279-a96d-d58522a22a22',
        display: 'Initial assessment Outcome and Goal Setting',
        isMandatory: true,
      },
      {
        formUuid: '13a42203-1675-422a-9149-0d480b9cc1c7',
        encounterTypeUuid: '5ce338a9-dfde-4779-a96d-d9022da35a5b',
        display: 'Stump Assessment',
        isMandatory: true,
      },
      {
        formUuid: 'ff8e2a9d-bd7d-3a23-a4dc-8079a0e7f648',
        encounterTypeUuid: '5ce338a9-dfde-4779-a96d-d58585a35a5b',
        display: 'Muscle and ROM - Lower Limb',
      },
      {
        formUuid: 'c7bcdf30-b0f0-43d4-9a38-7f23cf86186c',
        encounterTypeUuid: '549d700a-74b2-458c-904c-5f8cd6af561e',
        display: 'Muscle and ROM - Upper Limb',
      },
      {
        formUuid: 'a7efgf30-b0f0-43d4-9a37-7f23cf86198b',
        encounterTypeUuid: '946e912b-74b2-458c-904c-9z3aa9bc923b',
        display: 'Muscle and ROM - Trunk',
      },
      {
        formUuid: '26bc8e97-4243-46da-b998-fc49892eff8d',
        encounterTypeUuid: '7b78eeb7-2ba2-4b27-afe4-d0bdb74b6319',
        display: 'Pain Assessment',
      },
    ],
  },
];
