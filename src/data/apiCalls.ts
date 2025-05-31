import dataService from './dataService';
import { AxiosResponse } from 'axios';
import { QuestionAnswer, PetApiResponse, VetApiResponse } from '../types';

export const fetchVets = async (): Promise<VetApiResponse[]> => {
  const response: AxiosResponse<VetApiResponse[]> = await dataService.get(
    'Vets'
  );
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
