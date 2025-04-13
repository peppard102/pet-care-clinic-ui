// Common types used across the application

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface BaseIndividual {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export interface Pet extends BaseIndividual {
  address: Address;
}

export interface Vet extends BaseIndividual {}
