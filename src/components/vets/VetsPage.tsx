import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useVets from '../../data/queryHooks/useVets';
import PageContainer from '../shared/PageContainer';
import Button from '@pc/pet-clinic-components/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Vet } from '../../types';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
	borderRadius: '8px',
} as const;

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		sortable: false,
		width: 160,
	},
];

export default function VetsPage(): React.ReactElement {
	const vets: Vet[] = useVets();
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = (): void => setOpen(true);
	const handleClose = (): void => setOpen(false);

	return (
		<PageContainer title="Vets">
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={vets}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5]}
					checkboxSelection
					disableRowSelectionOnClick
				/>
			</Box>

			<Button variant="contained" onClick={handleOpen}>
				Open modal
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</PageContainer>
	);
}
