import Box from '@mui/material/Box';
import useVetsDropdownData from '../../data/queryHooks/useVetsDropdownData';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { startOfTomorrow } from 'date-fns';
import Grid from '@mui/material/Grid';
import { US_STATES } from '../../utils/constants';

interface AddPetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type PetFormValues = {
  firstName: string;
  lastName: string;
  vet: string;
  dateOfBirth: Date;
  street: string;
  apartmentNumber?: string;
  city: string;
  state: string;
  zipCode: string;
};

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
  state: Yup.string().required('State is required'),
  zipCode: Yup.string()
    .required('Zip code is required')
    .matches(
      /^\d{5}(-\d{4})?$/,
      'Must be a valid zip code (e.g., 12345 or 12345-6789)'
    ),
});

export default function AddPet({ open, setOpen }: AddPetProps) {
  const handleClose = (): void => setOpen(false);
  const vets = useVetsDropdownData();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PetFormValues>({
    // @ts-expect-error - YupResolver type inference is complex
    resolver: yupResolver(validationSchema),
    defaultValues: {
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
    mode: 'onBlur', // Validate on blur
    reValidateMode: 'onChange', // Re-validate on change after blur
    criteriaMode: 'firstError', // Only show first error per field
  });

  const onSubmit: SubmitHandler<PetFormValues> = (data) => {
    alert(JSON.stringify(data, null, 2)); // TODO: replace with post request
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" mb={3}>
          Add a new pet:
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="firstName"
                label="Pet first name"
                {...register('firstName', { shouldUnregister: true })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="lastName"
                label="Pet last name"
                {...register('lastName', { shouldUnregister: true })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { ref, ...field }, fieldState }) => (
                    <DatePicker
                      label="Date of birth"
                      inputRef={ref}
                      {...field}
                      slotProps={{
                        textField: {
                          error: !!fieldState.error,
                          helperText: fieldState.error?.message,
                          fullWidth: true,
                          variant: 'outlined',
                          margin: 'normal',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <FormControl fullWidth>
                <Controller
                  name="vet"
                  control={control}
                  render={({ field: { ref, ...field }, fieldState }) => (
                    <TextField
                      inputRef={ref}
                      select
                      label="Vet"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      {...field}
                    >
                      <MenuItem value="">
                        <em>Select a vet</em>
                      </MenuItem>
                      {vets.map((vet) => (
                        <MenuItem key={vet.id} value={vet.id}>
                          {vet.fullName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="street"
                label="Street Address"
                {...register('street', { shouldUnregister: true })}
                error={!!errors.street}
                helperText={errors.street?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="apartmentNumber"
                label="Apt/Suite (Optional)"
                {...register('apartmentNumber', { shouldUnregister: true })}
                error={!!errors.apartmentNumber}
                helperText={errors.apartmentNumber?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="city"
                label="City"
                {...register('city', { shouldUnregister: true })}
                error={!!errors.city}
                helperText={errors.city?.message}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Controller
                name="state"
                control={control}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <TextField
                    inputRef={ref}
                    select
                    label="State"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    {...field}
                  >
                    <MenuItem value="">
                      <em>Select a state</em>
                    </MenuItem>
                    {US_STATES.map((state) => (
                      <MenuItem key={state.abbreviation} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                id="zipCode"
                label="Zip Code"
                {...register('zipCode', { shouldUnregister: true })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
                fullWidth
                variant="outlined"
                margin="normal"
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
