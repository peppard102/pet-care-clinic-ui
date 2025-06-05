import dataService from './dataService';
import { AxiosResponse } from 'axios';
import {
  QuestionAnswer,
  PetApiResponse,
  VetTableApiResponse,
  VetDropdownApiResponse,
} from '../types';

export const fetchVetsTableData = async (): Promise<VetTableApiResponse[]> => {
  const response: AxiosResponse<VetTableApiResponse[]> = await dataService.get(
    'Vets'
  );
  return response.data;
};

export const fetchVetsDropdownData = async (): Promise<
  VetDropdownApiResponse[]
> => {
  const response: AxiosResponse<VetDropdownApiResponse[]> =
    await dataService.get('Vets/dropdown');
  return response.data;
};

export const fetchPets = async (): Promise<PetApiResponse[]> => {
  const response: AxiosResponse<PetApiResponse[]> = await dataService.get(
    'Pets'
  );
  return response.data;
};

export const askQuestion = async (
  conversationHistory: QuestionAnswer[]
): Promise<string> => {
  const response: AxiosResponse<string> = await dataService.post(
    'GeneralQuestions',
    {
      conversationHistory,
    }
  );

  return response.data;
};

export const checkSymptoms = async (symptoms: string): Promise<string> => {
  const response: AxiosResponse<string> = await dataService.post(
    'SymptomChecker',
    { input: symptoms }
  );

  return response.data;
};
