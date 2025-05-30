import { VetApiResponse } from '../../data/apiCalls';

export const vetsMockData: VetApiResponse[] = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    specialty: 'Dermatology',
    address: {
      street: '567 Castle Black Drive',
      city: 'Winterfell',
      state: 'NY',
      zipCode: '10001',
    },
  },
  {
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    specialty: 'Cardiology',
    address: {
      street: '890 Kings Landing Blvd',
      city: 'Gold Coast',
      state: 'CA',
      zipCode: '90120',
    },
  },
  {
    id: 3,
    lastName: 'Lannister',
    firstName: 'Jaime',
    specialty: 'Oncology',
    address: {
      street: '234 Kingslayer Court',
      city: 'Lannisport',
      state: 'TX',
      zipCode: '75021',
    },
  },
  {
    id: 4,
    lastName: 'Stark',
    firstName: 'Arya',
    specialty: 'Pediatrics',
    address: {
      street: '678 Needle Street',
      city: 'Braavos',
      state: 'FL',
      zipCode: '33101',
    },
  },
  {
    id: 5,
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    specialty: 'Surgery',
    address: {
      street: '111 Dragon Queen Ave',
      city: 'Dragonstone',
      state: 'WA',
      zipCode: '98101',
    },
  },
  {
    id: 6,
    lastName: 'Melisandre',
    firstName: 'Chester',
    specialty: 'Radiology',
    address: {
      street: '333 Red Temple Way',
      city: 'Asshai',
      state: 'NV',
      zipCode: '89101',
    },
  },
  {
    id: 7,
    lastName: 'Clifford',
    firstName: 'Ferrara',
    specialty: 'Dermatology',
    address: {
      street: '445 Veterinary Circle',
      city: 'Oldtown',
      state: 'OR',
      zipCode: '97201',
    },
  },
  {
    id: 8,
    lastName: 'Frances',
    firstName: 'Rossini',
    specialty: 'Cardiology',
    address: {
      street: '777 Medical Plaza',
      city: 'Highgarden',
      state: 'GA',
      zipCode: '30301',
    },
  },
  {
    id: 9,
    lastName: 'Roxie',
    firstName: 'Harvey',
    specialty: 'Oncology',
    address: {
      street: '999 Healing Hands Lane',
      city: 'Dorne',
      state: 'AZ',
      zipCode: '85001',
    },
  },
];
