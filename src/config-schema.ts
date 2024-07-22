import { Type } from '@openmrs/esm-framework';

export const requiredPrivilege = 'View Patient journey widget';

export const configSchema = {
  steps: {
    _type: Type.Array,
    _elements: {
      step: {
        _type: Type.String,
        _description: 'Step name',
      },
      forms: {
        _type: Type.Array,
        _description: 'List of forms to be included in this step.',
        _elements: {
          formUuid: {
            _type: Type.UUID,
            _description: 'Form uuid.',
          },
          encounterTypeUuid: {
            _type: Type.UUID,
            _default: null,
            _description: 'Encounter type uuid.',
          },
          isMandatory: {
            _type: Type.Boolean,
            _default: false,
            _description: 'Flag to indicate if it is a mandatory form to proceed to the next step',
          },
        },
        _default: [],
      },
    },
    _default: [],
  },
};

export interface ConfigObject {
  steps: {
    step: string;
    forms: Array<{
      formUuid: string;
      encounterTypeUuid: string;
      isMandatory: boolean;
    }>;
  };
}
