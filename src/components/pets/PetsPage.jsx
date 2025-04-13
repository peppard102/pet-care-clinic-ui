import PageContainer from '../shared/PageContainer';
import { useState } from 'react';
import AddPet from './AddPet';
import useIsTabletOrSmaller from '../../utils/customHooks/useIsTabletOrSmaller';
import PetsTable from './PetsTable';
import PetsSearch from './PetsSearch';

export default function PetsPage() {
	const isTabletOrSmaller = useIsTabletOrSmaller();
	const [modalOpen, setModalOpen] = useState(false);
	const openAddPetModal = () => setModalOpen(true);

	return (
		<PageContainer title="Pets">
			{isTabletOrSmaller ? (
				<PetsSearch openAddPetModal={openAddPetModal} />
			) : (
				<PetsTable openAddPetModal={openAddPetModal} />
			)}
			<AddPet open={modalOpen} setOpen={setModalOpen} />
		</PageContainer>
	);
}
