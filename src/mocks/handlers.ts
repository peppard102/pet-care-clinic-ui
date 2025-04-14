import { rest } from 'msw';
import { vetsMockData } from './mockData/vetsMockData';
import { petsMockData } from './mockData/petsMockData';

export const handlers = [
	// This endpoint gets the list of vets at the clinic
	rest.get('*/vets', (_req, res, ctx) =>
		res(ctx.status(200), ctx.json(vetsMockData))
	),

	// This endpoint gets the list of pets at the clinic
	rest.get('*/pets', (_req, res, ctx) =>
		res(ctx.status(200), ctx.json(petsMockData))
	),

	// This endpoint gets the list of pets at the clinic
	rest.post('*/OpenAI', (_req, res, ctx) =>
		res(ctx.status(200), ctx.json('This is a mock answer.'))
	),
];
