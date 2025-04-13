import dataService from './dataService';
import { AxiosResponse } from 'axios';
import { Pet, Vet } from '../types';

export const fetchVets = async (): Promise<Vet[]> => {
  try {
    const response: AxiosResponse<Vet[]> = await dataService.get('vets');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPets = async (): Promise<Pet[]> => {
  try {
    const response: AxiosResponse<Pet[]> = await dataService.get('pets');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const askQuestion = async (question: string): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await dataService.post('OpenAI', { question });
    return response.data;
  } catch (error) {
    throw error;
  }
};
