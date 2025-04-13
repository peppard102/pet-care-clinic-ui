import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchVets } from '../apiCalls';
import { QueryKey } from './QueryKeys';

// Query for the list of vets.
const useVets = () => {
	const { data } = useSuspenseQuery({
		queryKey: [QueryKey.GET_VETS],
		queryFn: fetchVets
	});

	return data.map(vet => ({
		...vet,
		fullName: `${vet.firstName} ${vet.lastName}`,
	}));
};

export default useVets;
