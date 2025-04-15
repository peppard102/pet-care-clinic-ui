import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

const PageContainer = ({ title, children }: PageContainerProps): JSX.Element => (
	<Container
		sx={{
			my: 8,
		}}
	>
		<Typography variant="h3" textAlign="center" mb={5}>
			{title}
		</Typography>
		{children}
	</Container>
);

export default PageContainer;
