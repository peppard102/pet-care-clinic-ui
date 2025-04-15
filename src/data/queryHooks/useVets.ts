import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchVets } from '../apiCalls';
import { QueryKey } from './QueryKeys';
import { Vet } from '../../types';

// Query for the list of vets.
const useVets = (): FormattedVet[] => {
	const { data } = useSuspenseQuery<Vet[]>({
		queryKey: [QueryKey.GET_VETS],
		queryFn: fetchVets
	});

	return data.map((vet: Vet): FormattedVet => ({
		...vet,
		fullName: `${vet.firstName} ${vet.lastName}`,
	}));
};

interface FormattedVet extends Vet {
  fullName: string;
}

export default useVets;
