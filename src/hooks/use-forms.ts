import useSWR from 'swr';
import { openmrsFetch } from '@openmrs/esm-framework';
import { Form } from '../types';

export function useForms() {
  const { data, error, isValidating, mutate } = useSWR<{ data: { results: Array<Form> } }, Error>(
    `/ws/rest/v1/form?v=custom:(uuid,name,display,encounterType:(uuid,name,viewPrivilege,editPrivilege),version,published,retired,resources:(uuid,name,dataType,valueReference))`,
    openmrsFetch,
  );

  return {
    forms: data ? data?.data?.results : null,
    isError: error,
    isLoading: !data && !error,
    isValidating,
    mutate,
  };
}
