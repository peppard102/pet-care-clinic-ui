import Box from '@mui/material/Box';
import useVets from '../../data/queryHooks/useVets';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';

interface AddPetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface PetFormValues {
  firstName: string;
  lastName: string;
  vet: string;
  age: number;
}

const style = {
	position: 'absolute',
	top: '40%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid gray',
	boxShadow: 24,
	p: 4,
	borderRadius: '8px',
};

const validationSchema = Yup.object({
	firstName: Yup.string()
		.max(15, 'Must be 15 characters or less')
		.required('First name is required'),
	lastName: Yup.string()
		.max(20, 'Must be 20 characters or less')
		.required('Last name is required'),
	age: Yup.number()
		.typeError('Age must be a number')
		.max(200, 'Must be 200 years or less')
		.min(0, 'Must be 0 years or more')
		.required('Age is required'),
	vet: Yup.string().required('Vet is required'),
});

export default function AddPet({ open, setOpen }: AddPetProps) {
	const handleClose = (): void => setOpen(false);
	const vets = useVets();

	const formik = useFormik<PetFormValues>({
		initialValues: {
			firstName: '',
			lastName: '',
			vet: '',
			age: 0,
		},
		validationSchema,
		onSubmit: (values: PetFormValues) => {
			alert(JSON.stringify(values, null, 2)); // TODO: replace with post request
		},
	});

	return (
		<Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
			<Box sx={style}>
				<Typography id="modal-title" variant="h6" component="h2" mb={3}>
					Add a new pet:
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						id="firstName"
						label="Pet first name"
						value={formik.values.firstName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.firstName && !!formik.errors.firstName}
						helperText={formik.touched.firstName && formik.errors.firstName}
						sx={{ mb: 4, mr: 1 }}
					/>
					<TextField
						id="lastName"
						label="Pet last name"
						value={formik.values.lastName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.lastName && !!formik.errors.lastName}
						helperText={formik.touched.lastName && formik.errors.lastName}
						sx={{ mb: 4 }}
					/>
					<TextField
						id="age"
						label="Age"
						value={formik.values.age}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.age && !!formik.errors.age}
						helperText={formik.touched.age && formik.errors.age}
						sx={{ mb: 4 }}
					/>
					<FormControl fullWidth>
						<TextField
							id="vet"
							name="vet"
							label="Vet"
							value={formik.values.vet}
							onChange={formik.handleChange}
							error={formik.touched.vet && !!formik.errors.vet}
							helperText={formik.touched.vet && formik.errors.vet}
							select
						>
							{vets.map(vet => (
								<MenuItem key={vet.id} value={vet.id}>
									{vet.fullName}
								</MenuItem>
							))}
						</TextField>
					</FormControl>
					<Button sx={{ mt: 5 }} type="submit" variant="contained" fullWidth>
						Add Pet
					</Button>
				</form>
			</Box>
		</Modal>
	);
}
