import dataService from './dataService';
import { AxiosResponse } from 'axios';
import { Pet, QuestionAnswer, Vet } from '../types';

export const fetchVets = async (): Promise<Vet[]> => {
  const response: AxiosResponse<Vet[]> = await dataService.get('Vets');
  return response.data;
};

export const fetchPets = async (): Promise<Pet[]> => {
  const response: AxiosResponse<Pet[]> = await dataService.get('Pets');
  return response.data;
};

export const askQuestion = async (
  questionAnswers: QuestionAnswer[]
): Promise<string> => {
  const response: AxiosResponse<string> = await dataService.post(
    'GeneralQuestions',
    {
      questionAnswers,
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
