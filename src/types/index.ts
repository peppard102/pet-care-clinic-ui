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
  formattedAddress: string;
  fullName: string;
}

export interface Pet extends BaseIndividual {
  dateOfBirth: Date;
}

export interface Vet extends BaseIndividual {
  specialty: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  isLoading?: boolean;
}

export type PetApiResponse = {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  dateOfBirth: string;
};

export type VetApiResponse = {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  specialty: string;
};
