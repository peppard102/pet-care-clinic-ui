import Box from '@mui/material/Box';
import usePets from '../../data/queryHooks/usePets';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface PetsSearchProps {
  openAddPetModal: () => void;
}

interface Pet {
  id: string | number;
  fullName: string;
  dateOfBirth: Date;
  formattedAddress: string;
}

export default function PetsSearch({ openAddPetModal }: PetsSearchProps) {
  const pets = usePets();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  return (
    <>
      <Button onClick={openAddPetModal} sx={{ mb: 1 }} endIcon={<AddIcon />}>
        Add New Pet
      </Button>
      <Box sx={{ mb: 2 }}>
        <Autocomplete
          options={pets}
          getOptionLabel={(option: Pet) => option.fullName}
          renderInput={(params) => (
            <TextField {...params} label="Search Pets" variant="outlined" />
          )}
          onChange={(_event, value: Pet | null) => setSelectedPet(value)}
          fullWidth
        />
      </Box>
      {selectedPet && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Name:</Typography>
            <Typography>{selectedPet.fullName}</Typography>
            <br />
            <Typography variant="h6">Date of birth:</Typography>
            <Typography>
              {selectedPet.dateOfBirth.toLocaleDateString()}
            </Typography>
            <br />
            <Typography variant="h6">Address:</Typography>
            <Typography>{selectedPet.formattedAddress}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
