import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@carbon/react';
import { CheckmarkFilled, CircleStroke, CloseFilled } from '@carbon/icons-react';
import { Visit, getConfig, showModal, usePatient, useSession, userHasAccess } from '@openmrs/esm-framework';
import { launchFormEntryOrHtmlForms } from '@openmrs/esm-patient-common-lib';
import { WorkflowEncounter, WorkflowStep } from '../types';
import { useForms } from '../hooks/use-forms';
import { getEncounter } from '../helpers';
import styles from './patient-journey-actions.scss';
import { HtmlFormEntryForm } from '@openmrs/esm-patient-forms-app/src/config-schema';

export interface PatientJourneyActionsProps {
  workflowStep: WorkflowStep;
  encounters: Array<WorkflowEncounter>;
  currentVisit: Visit;
  showEndVisitAction: boolean;
}

const PatientJourneyAction: React.FC<PatientJourneyActionsProps> = ({
  workflowStep,
  encounters,
  currentVisit,
  showEndVisitAction,
}) => {
  const { t } = useTranslation();
  const { forms, mutate } = useForms();
  const { patientUuid } = usePatient();
  const session = useSession();

  const [htmlFormEntryFormsConfig, setHtmlFormEntryFormsConfig] = useState<Array<HtmlFormEntryForm> | undefined>();
  useEffect(() => {
    getConfig('@openmrs/esm-patient-forms-app').then((config) => {
      setHtmlFormEntryFormsConfig(config.htmlFormEntryForms as []);
    });
  }, []);

  const endVisit = useCallback(() => {
    const dispose = showModal('end-visit-dialog', {
      closeModal: () => dispose(),
      patientUuid,
    });
  }, [patientUuid]);

  return (
    <>
      {workflowStep?.forms.map((form, i) => {
        return (
          <div key={i} className={styles.journeyAction} style={{ cursor: 'pointer' }}>
            <div className={styles.action}>
              {getEncounter(form.formUuid, encounters) ? (
                <CheckmarkFilled className={styles.icon} />
              ) : (
                <CircleStroke className={styles.icon} />
              )}
              {userHasAccess(
                forms?.find((f) => f.encounterType.uuid === form.encounterTypeUuid)?.encounterType?.editPrivilege?.name,
                session?.user,
              ) && (
                <Link
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    launchFormEntryOrHtmlForms(
                      htmlFormEntryFormsConfig,
                      patientUuid,
                      form.formUuid,
                      currentVisit.uuid,
                      getEncounter(form.formUuid, encounters)?.uuid ?? '',
                      forms?.find((f) => f.uuid === form.formUuid)?.display,
                      currentVisit.visitType.uuid,
                      currentVisit.startDatetime,
                      currentVisit.stopDatetime,
                      () => mutate(),
                    );
                  }}
                  role="presentation"
                  className={styles.formName}
                >
                  {forms?.find((f) => f.uuid === form.formUuid)?.display}
                  {form.isMandatory && <span style={{ color: 'red' }}>&nbsp;*</span>}
                </Link>
              )}
            </div>
          </div>
        );
      })}
      {showEndVisitAction && (
        <div className={styles.action}>
          <CloseFilled className={styles.icon} />
          <Link style={{ cursor: 'pointer' }} onClick={endVisit} role="presentation" className={styles.formName}>
            {t('endvisit', 'End Visit')}
          </Link>
        </div>
      )}
    </>
  );
};

export default PatientJourneyAction;
