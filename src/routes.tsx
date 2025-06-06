import { lazy, ReactElement } from 'react';

const SymptomCheckerPage = lazy(
  () => import('./components/symptomChecker/SymptomCheckerPage')
);
const VetsPage = lazy(() => import('./components/vets/VetsPage'));
const PetsPage = lazy(() => import('./components/pets/PetsPage'));
const GeneralQuestionsPage = lazy(
  () => import('./components/diagnostics/GeneralQuestionsPage')
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
    component: <SymptomCheckerPage />,
  },
  {
    label: 'Symptom Checker',
    href: '/symptom-checker',
    component: <SymptomCheckerPage />,
  },
  {
    label: 'General Medical Questions',
    href: '/general-questions',
    component: <GeneralQuestionsPage />,
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
];
