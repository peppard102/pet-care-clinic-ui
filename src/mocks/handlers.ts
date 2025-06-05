import { http, HttpResponse } from 'msw';
import { vetsMockData } from './mockData/vetsTableMockData';
import { petsMockData } from './mockData/petsMockData';
import { vetsDropdownMockData } from './mockData/vetsDropdownMockData';

export const handlers = [
  http.post('*/SymptomChecker', () => {
    return HttpResponse.json('This is a mock action plan.', { status: 200 });
  }),
  http.post('*/GeneralQuestions', () => {
    return HttpResponse.json('This is a mock answer.', { status: 200 });
  }),
  http.get('*/Vets', () => {
    return HttpResponse.json(vetsMockData, { status: 200 });
  }),
  http.get('*/Vets/dropdown', () => {
    return HttpResponse.json(vetsDropdownMockData, { status: 200 });
  }),
  http.get('*/Pets', () => {
    return HttpResponse.json(petsMockData, { status: 200 });
  }),
];
