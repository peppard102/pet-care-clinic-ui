import dataService from './dataService';

export const fetchVets = async () => {
	try {
		return (await dataService.get('vets')).data;
	} catch (error) {
		throw error;
	}
};

export const fetchPets = async () => {
	try {
		return (await dataService.get('pets')).data;
	} catch (error) {
		throw error;
	}
};

export const askQuestion = async question => {
	try {
		return (await dataService.post('OpenAI', { question })).data;
	} catch (error) {
		throw error;
	}
};
