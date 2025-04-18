import { rest } from 'msw';
import { vetsMockData } from './mockData/vetsMockData';
import { petsMockData } from './mockData/petsMockData';

export const handlers = [
  rest.post('*/SymptomChecker', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json('This is a mock action plan.'))
  ),
  rest.post('*/OpenAI', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json('This is a mock answer.'))
  ),
  rest.get('*/vets', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(vetsMockData))
  ),
  rest.get('*/pets', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(petsMockData))
  ),
];
