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
import Grid from '@mui/material/Grid';

interface AddPetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface PetFormValues {
  firstName: string;
  lastName: string;
  vet: string;
  dateOfBirth: Date;
  street: string;
  apartmentNumber: string;
  city: string;
  state: string;
  zipCode: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
  street: Yup.string().required('Street is required'),
  apartmentNumber: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string()
    .required('State is required')
    .matches(/^[A-Z]{2}$/, 'Must be a valid 2-letter state code'),
  zipCode: Yup.string()
    .required('Zip code is required')
    .matches(
      /^\d{5}(-\d{4})?$/,
      'Must be a valid zip code (e.g., 12345 or 12345-6789)'
    ),
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
      street: '',
      apartmentNumber: '',
      city: '',
      state: '',
      zipCode: '',
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
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="firstName"
                label="Pet first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="lastName"
                label="Pet last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
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
                        formik.touched.dateOfBirth &&
                        !!formik.errors.dateOfBirth,
                      helperText:
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                          ? String(formik.errors.dateOfBirth)
                          : '',
                      onBlur: () => {
                        formik.setFieldTouched('dateOfBirth', true, true);
                      },
                      name: 'dateOfBirth',
                      sx: { width: '100%' },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="street"
                label="Street Address"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.street && !!formik.errors.street}
                helperText={formik.touched.street && formik.errors.street}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="apartmentNumber"
                label="Apt/Suite (Optional)"
                value={formik.values.apartmentNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.apartmentNumber &&
                  !!formik.errors.apartmentNumber
                }
                helperText={
                  formik.touched.apartmentNumber &&
                  formik.errors.apartmentNumber
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && !!formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="state"
                label="State"
                value={formik.values.state}
                onChange={(e) => {
                  formik.setFieldValue('state', e.target.value.toUpperCase());
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.state && !!formik.errors.state}
                helperText={
                  (formik.touched.state && formik.errors.state) ||
                  '2-letter code'
                }
                inputProps={{ maxLength: 2 }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="zipCode"
                label="Zip Code"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zipCode && !!formik.errors.zipCode}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} type="submit" variant="contained" fullWidth>
            Add Pet
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
