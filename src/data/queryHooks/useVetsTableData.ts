import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchVetsTableData } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { Vet } from '../../types';
import { formatAddress } from '../../utils/helperFunctions';

// Query for the list of vets.
const useVets = (): FormattedVet[] => {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKey.GET_VETS],
    queryFn: fetchVetsTableData,
    select: (data) =>
      data.map((vet) => ({
        ...vet,
        formattedAddress: formatAddress(
          vet?.address.street,
          vet?.address.city,
          vet?.address.state,
          vet?.address.zipCode
        ),
        fullName: `${vet?.firstName || ''} ${vet?.lastName || ''}`,
      })),
  });

  return data;
};

interface FormattedVet extends Vet {
  fullName: string;
}

export default useVets;
