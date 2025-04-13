import { lazy, ReactElement } from 'react';

const VetsPage = lazy(() => import('./components/vets/VetsPage'));
const PetsPage = lazy(() => import('./components/pets/PetsPage'));
const DiagnosticsPage = lazy(() =>
	import('./components/diagnostics/DiagnosticsPage')
);

interface Route {
	label: string | null;
	href: string;
	component: ReactElement;
}

export const routes: Route[] = [
	{
		label: null,
		href: '/',
		component: <VetsPage />,
	},
	{
		label: 'Vets',
		href: '/vets',
		component: <VetsPage />,
	},
	{
		label: 'Pets',
		href: '/pets',
		component: <PetsPage />,
	},
	{
		label: 'Diagnostics',
		href: '/diagnostics',
		component: <DiagnosticsPage />,
	},
];
