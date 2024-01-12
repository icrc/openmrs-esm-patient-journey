import React from 'react';
import { CardHeader, EmptyState } from '@openmrs/esm-patient-common-lib';
import { TableContainer, InlineLoading, TableHeader } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useConfig, usePatient, useVisit } from '@openmrs/esm-framework';
import { Checkmark, CircleFilled, CircleDash } from '@carbon/icons-react';
import { Workflow } from '../types';
import { useWorkflow } from '../hooks/use-workflow';
import { extractEncounters } from '../helpers';
import PatientJourneyStep from '../patient-journey-step/patient-journey-step.component';
import PatientJourneyAction from '../patient-journey-actions/patient-journey-actions.component';
import styles from './patient-journey.scss';

export interface PatientJourneyProps {
  basePath: string;
  patient: fhir.Patient;
}

const PatientJourney: React.FC<PatientJourneyProps> = ({ patient, basePath }) => {
  const config = useConfig();
  const { t } = useTranslation();
  const { patientUuid } = usePatient();
  const { currentVisit, isLoading } = useVisit(patientUuid);
  const encounters = extractEncounters(currentVisit);
  const workflow: Workflow = useWorkflow(config.steps, encounters);

  if (!currentVisit) {
    return (
      <EmptyState displayText={t('activeVisit', 'active visit')} headerTitle={t('patientJourney', 'Patient Journey')} />
    );
  }

  if (isLoading) {
    return (
      <CardHeader title={t('patientJourney', 'Patient Journey')}>
        <span>{isLoading ? <InlineLoading /> : null}</span>
      </CardHeader>
    );
  }

  if (!config.steps) {
    console.error("Couldn't load workflow configuration. Steps not found.");
    return null;
  }

  return (
    <div>
      <CardHeader title={t('patientJourney', 'Patient Journey')}>
        <></>
      </CardHeader>
      <TableContainer className={styles.patientJourney}>
        <div className={styles.responsiveContainer}>
          <div className={styles.column}>
            <TableHeader />
            {workflow.previousSteps.map((workflowStep) => (
              <PatientJourneyStep
                key={workflowStep.step}
                workflowStep={workflowStep}
                encounters={encounters}
                showDetails
                icon={<Checkmark className={styles.blue} />}
              />
            ))}
            <PatientJourneyStep
              workflowStep={workflow.currentStep}
              encounters={encounters}
              icon={<CircleFilled className={styles.blue} />}
              highlighted
              showDetails
            />
            {workflow.nextSteps.map((workflowStep) => (
              <PatientJourneyStep
                key={workflowStep.step}
                workflowStep={workflowStep}
                encounters={encounters}
                icon={<CircleDash className={styles.blue} />}
                showDetails={false}
              />
            ))}
          </div>
          <div className={styles.column}>
            <TableHeader>{t('currentVisitSuggestedActions', 'Current visit suggested actions')}</TableHeader>
            <PatientJourneyAction
              workflowStep={workflow.currentStep}
              encounters={encounters}
              currentVisit={currentVisit}
              showEndVisitAction={!workflow.nextSteps.length}
            />
          </div>
        </div>
      </TableContainer>
    </div>
  );
};
export default PatientJourney;
