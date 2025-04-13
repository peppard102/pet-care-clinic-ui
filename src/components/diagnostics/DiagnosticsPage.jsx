import Button from '@mui/material/Button';
import PageContainer from '../shared/PageContainer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { askQuestion } from '../../data/apiCalls';
import Skeleton from '@mui/material/Skeleton';

export default function DiagnosticsPage() {
	const [newQuestion, setNewQuestion] = useState('');
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isError, setIsError] = useState(false);

	const submitQuestion = async () => {
		setQuestions(prev => [...prev, newQuestion]);
		setNewQuestion('');
		setIsProcessing(true);
		setIsError(false);

		try {
			const answer = await askQuestion(newQuestion);
			setAnswers(prev => [...prev, answer]);
		} catch {
			setIsError(true);
		}

		setIsProcessing(false);
	};

	return (
		<PageContainer title="Diagnostics">
			<Box
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<TextField
					id="outlined-basic"
					label="Input your medical question:"
					variant="outlined"
					multiline
					maxRows={8}
					value={newQuestion}
					sx={{ minWidth: { xs: '300px', sm: '500px', md: '600px' }, mb: 2 }}
					onChange={event => setNewQuestion(event.target.value)}
				/>
				<Button variant="contained" onClick={submitQuestion} sx={{ mb: 2 }}>
					Submit question
				</Button>
				{questions.map((question, index) => (
					<Box>
						<Box
							sx={{
								mt: 5,
								maxWidth: '900px',
								border: '1px solid gray',
								padding: '10px',
								borderRadius: '8px',
							}}
						>
							<Typography component="span" fontWeight="bold">
								Question:
							</Typography>{' '}
							{question}
						</Box>
						<Typography sx={{ mt: 5, maxWidth: '900px' }}>
							{answers[index]}
						</Typography>
					</Box>
				))}
				{isProcessing && (
					<Skeleton
						variant="rounded"
						sx={{
							width: { xs: '90%', sm: 500 },
						}}
						height={60}
					/>
				)}
				{isError && (
					<Typography color="error">
						Error accessing diagnostics service. Try again later.
					</Typography>
				)}
			</Box>
		</PageContainer>
	);
}
