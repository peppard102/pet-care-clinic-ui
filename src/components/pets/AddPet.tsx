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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { startOfTomorrow } from 'date-fns';

interface AddPetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface PetFormValues {
  firstName: string;
  lastName: string;
  vet: string;
  dateOfBirth: Date;
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
  dateOfBirth: Yup.date()
    .typeError('Date of birth must be a valid date')
    .min(new Date('1900-01-01'), 'Date of birth must be after 01/01/1900')
    .max(startOfTomorrow(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
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
      dateOfBirth: new Date(),
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of birth"
              value={formik.values.dateOfBirth}
              onChange={(newValue) => {
                formik.setFieldValue('dateOfBirth', newValue);
              }}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  error:
                    formik.touched.dateOfBirth && !!formik.errors.dateOfBirth,
                  helperText:
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                      ? String(formik.errors.dateOfBirth)
                      : '',
                  onBlur: () => {
                    formik.setFieldTouched('dateOfBirth', true, true);
                  },
                  name: 'dateOfBirth',
                  sx: { mb: 4, width: '100%' },
                },
              }}
            />
          </LocalizationProvider>
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
              {vets.map((vet) => (
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
