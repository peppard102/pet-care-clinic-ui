import Button from '@mui/material/Button';
import PageContainer from '../shared/PageContainer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { askQuestion } from '../../data/apiCalls';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import MarkdownRenderer from '../shared/MarkdownRenderer';

export default function GeneralQuestionsPage(): React.ReactElement {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const submitQuestion = async (): Promise<void> => {
    setQuestions((prev) => [...prev, newQuestion]);
    setNewQuestion('');
    setIsProcessing(true);
    setIsError(false);

    try {
      const answer = await askQuestion(newQuestion);
      setAnswers((prev) => [...prev, answer]);
    } catch {
      setIsError(true);
    }

    setIsProcessing(false);
  };

  return (
    <PageContainer title="General Medical Questions">
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNewQuestion(event.target.value)
          }
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
            <Box sx={{ mt: 5 }}>
              <MarkdownRenderer content={answers[index]} />
            </Box>
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
            Error accessing general questions service. Try again later.
          </Typography>
        )}
      </Box>
    </PageContainer>
  );
}
