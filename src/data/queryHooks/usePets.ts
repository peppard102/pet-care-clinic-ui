import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPets } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { formatAddress } from '../../utils/helperFunctions';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PetData {
  id: string | number;
  firstName: string;
  lastName: string;
  age: number;
  address: Address;
}

interface FormattedPet extends PetData {
  formattedAddress: string;
  fullName: string;
}

// Query for the list of pets.
const usePets = (): FormattedPet[] => {
	const { data } = useSuspenseQuery({
		queryKey: [QueryKey.GET_PETS],
		queryFn: fetchPets
	});

	return (
		data?.map((pet: PetData): FormattedPet => ({
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

export default usePets;
