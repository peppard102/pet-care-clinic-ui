import dataService from './dataService';
import { AxiosResponse } from 'axios';
import { Pet, Vet } from '../types';

export const fetchVets = async (): Promise<Vet[]> => {
  const response: AxiosResponse<Vet[]> = await dataService.get('vets');
  return response.data;
};

export const fetchPets = async (): Promise<Pet[]> => {
  const response: AxiosResponse<Pet[]> = await dataService.get('pets');
  return response.data;
};

export const askQuestion = async (question: string): Promise<string> => {
  const response: AxiosResponse<string> = await dataService.post('OpenAI', { question });
  return response.data;
};
