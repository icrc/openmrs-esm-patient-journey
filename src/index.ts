import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { moduleName } from './constants';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const options = {
  featureName: 'esm-icrc-patient-journey-widget',
  moduleName,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const patientJourneyWidget = getAsyncLifecycle(
  () => import('./patient-journey/patient-journey.component'),
  options,
);
