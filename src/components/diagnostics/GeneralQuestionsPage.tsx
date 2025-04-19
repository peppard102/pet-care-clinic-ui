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

interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  isLoading?: boolean;
}

export default function GeneralQuestionsPage(): React.ReactElement {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const submitQuestion = async (): Promise<void> => {
    const id = `qa-${Date.now()}`; // Generate a unique ID using timestamp

    // Immediately add the question with loading state
    setQuestionAnswers((prev) => [
      ...prev,
      { id, question: newQuestion, answer: '', isLoading: true },
    ]);

    setNewQuestion('');
    setIsError(false);

    try {
      const answer = await askQuestion(newQuestion);

      // Update just the answer for this question
      setQuestionAnswers((prev) =>
        prev.map((qa) =>
          qa.id === id ? { ...qa, answer, isLoading: false } : qa
        )
      );
    } catch {
      setIsError(true);
      // Update the loading state even on error
      setQuestionAnswers((prev) =>
        prev.map((qa) => (qa.id === id ? { ...qa, isLoading: false } : qa))
      );
    }
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
        {questionAnswers.map((qa) => (
          <Box key={qa.id}>
            <Box
              sx={{
                mt: 5,
                mb: 3,
                maxWidth: '900px',
                border: '1px solid gray',
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              <Typography component="span" fontWeight="bold">
                Question:
              </Typography>{' '}
              {qa.question}
            </Box>
            {qa.isLoading ? (
              <Skeleton
                variant="rounded"
                sx={{
                  width: { xs: '90%', sm: 500 },
                }}
                height={60}
              />
            ) : (
              <MarkdownRenderer content={qa.answer} />
            )}
          </Box>
        ))}

        {isError && (
          <Typography color="error">
            Error accessing general questions service. Try again later.
          </Typography>
        )}
      </Box>
    </PageContainer>
  );
}
