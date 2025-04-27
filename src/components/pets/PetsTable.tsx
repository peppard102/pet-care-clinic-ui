import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import usePets from '../../data/queryHooks/usePets';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface PetsTableProps {
  openAddPetModal: () => void;
}

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
    description: 'Full name',
    width: 160,
  },
  {
    field: 'formattedAddress',
    headerName: 'Address',
    description: 'The address of the pet',
    sortable: true,
    width: 360,
  },
];

export default function PetsTable({ openAddPetModal }: PetsTableProps) {
  const pets = usePets();

  return (
    <>
      <Button onClick={openAddPetModal} sx={{ mb: 1 }} endIcon={<AddIcon />}>
        Add New Pet
      </Button>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pets}
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
    </>
  );
}
