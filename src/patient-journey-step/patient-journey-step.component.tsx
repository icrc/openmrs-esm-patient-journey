import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@openmrs/esm-framework';
import styles from './patient-journey-step.scss';
import { WorkflowEncounter, WorkflowStep } from '../types';
import { getFilledForms, getStepDate } from '../helpers';

export interface PatientJourneyStepProps {
  workflowStep: WorkflowStep;
  encounters: Array<WorkflowEncounter>;
  icon: ReactElement;
  highlighted?: boolean;
  showDetails?: boolean;
}

const PatientJourneyStep: React.FC<PatientJourneyStepProps> = ({
  workflowStep,
  encounters,
  icon,
  highlighted,
  showDetails = true,
}) => {
  const { t } = useTranslation();
  const stepDate = getStepDate(workflowStep, encounters);
  const filledForms = getFilledForms(workflowStep, encounters);

  return (
    <div className={showDetails ? styles.highlightedStep : styles.step}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.contentContainer}>
        <span className={highlighted ? styles.highlight : ''}>{t(workflowStep?.step)}</span>
        <div>
          {showDetails && (
            <>
              <div className={styles.stepStatus}>
                {t('numberOfTotalDone', '{{number}} of {{total}} possible encounter(s) done.', {
                  number: filledForms?.length,
                  total: workflowStep?.forms?.length,
                })}
              </div>
              <div className={styles.stepStatus}>{formatDate(stepDate, { day: true, time: true })}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientJourneyStep;
