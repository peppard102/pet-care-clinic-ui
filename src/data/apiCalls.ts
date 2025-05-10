import dataService from './dataService';
import { AxiosResponse } from 'axios';
import { Pet, QuestionAnswer, Vet } from '../types';

export const fetchVets = async (): Promise<Vet[]> => {
  const response: AxiosResponse<Vet[]> = await dataService.get('Vets');
  return response.data;
};
const testKey = 'ghp_GitGuardianTestGithubTokenDontUseIt1234567890';
export const fetchPets = async (): Promise<Pet[]> => {
  const response: AxiosResponse<Pet[]> = await dataService.get('Pets');
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
