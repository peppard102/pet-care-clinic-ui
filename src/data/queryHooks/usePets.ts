import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPets } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { formatAddress } from '../../utils/helperFunctions';
import { Pet } from '../../types';

// Query for the list of pets.
const usePets = (): FormattedPet[] => {
	const { data } = useSuspenseQuery<Pet[]>({
		queryKey: [QueryKey.GET_PETS],
		queryFn: fetchPets
	});

	return (
		data?.map((pet: Pet): FormattedPet => ({
			...pet,
			formattedAddress: formatAddress(
				pet?.address.street,
				pet?.address.city,
				pet?.address.state,
				pet?.address.zipCode
			),
			fullName: `${pet?.firstName || ''} ${pet?.lastName || ''}`,
		})) || []
	);
};

interface FormattedPet extends Pet {
  formattedAddress: string;
  fullName: string;
}

export default usePets;
