import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

export default function NavBar() {
	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={() => navigate('/')}
				>
					<PetsIcon />
				</IconButton>
				<Stack direction="row">
					{routes
						.filter(route => route.label)
						.map(route => (
							<Button
								key={route.href}
								onClick={() => navigate(route.href)}
								color="inherit"
								sx={{ mr: 2 }}
							>
								{route.label}
							</Button>
						))}
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
