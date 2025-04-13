import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { element, oneOfType, arrayOf, string } from 'prop-types';

const PageContainer = ({ title, children }) => (
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

PageContainer.propTypes = {
	title: string,
	children: oneOfType([element, arrayOf(element)]),
};

export default PageContainer;
