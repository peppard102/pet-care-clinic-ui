import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchVetsDropdownData } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { VetDropdownApiResponse } from '../../types';

// Query for the list of vets for the dropdown.
const useVetsDropdownData = (): VetDropdownApiResponse[] => {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKey.GET_VETS],
    queryFn: fetchVetsDropdownData,
  });

  return data;
};

export default useVetsDropdownData;
