import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPets } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { formatAddress } from '../../utils/helperFunctions';

// Query for the list of pets.
const usePets = () => {
	const { data } = useSuspenseQuery({
		queryKey: [QueryKey.GET_PETS],
		queryFn: fetchPets
	});

	return (
		data?.map(pet => ({
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
