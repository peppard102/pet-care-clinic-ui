import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPets } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { formatAddress } from '../../utils/helperFunctions';
import { Pet } from '../../types';

// Query for the list of pets.
const usePets = (): Pet[] => {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKey.GET_PETS],
    queryFn: fetchPets,
    select: (data) =>
      data.map((pet) => ({
        ...pet,
        dateOfBirth: new Date(pet.dateOfBirth),
        formattedAddress: formatAddress(
          pet?.address.street,
          pet?.address.city,
          pet?.address.state,
          pet?.address.zipCode
        ),
        fullName: `${pet?.firstName || ''} ${pet?.lastName || ''}`,
      })),
  });

  return data || [];
};

export default usePets;
