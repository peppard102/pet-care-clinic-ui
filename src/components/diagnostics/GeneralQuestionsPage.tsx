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
import { v4 as uuidv4 } from 'uuid';
import { QuestionAnswer } from '../../types';

export default function GeneralQuestionsPage(): React.ReactElement {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<
    QuestionAnswer[]
  >([]);
  const [isError, setIsError] = useState<boolean>(false);

  const submitQuestion = async (): Promise<void> => {
    const id = uuidv4(); // Generate a unique ID using UUID
    const newConversationHistory: QuestionAnswer[] = [
      ...conversationHistory,
      { id, question: newQuestion, answer: '', isLoading: true },
    ];

    setConversationHistory(newConversationHistory);
    setNewQuestion('');
    setIsError(false);

    try {
      const answer = await askQuestion(newConversationHistory);

      // Update just the answer for this question
      setConversationHistory((prev) =>
        prev.map((qa) =>
          qa.id === id ? { ...qa, answer, isLoading: false } : qa
        )
      );
    } catch {
      setIsError(true);
      // Update the loading state even on error
      setConversationHistory((prev) =>
        prev.map((qa) => (qa.id === id ? { ...qa, isLoading: false } : qa))
      );
    }
  };

  return (
    <PageContainer title="General Medical Questions">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {conversationHistory.map((qa) => (
          <Box key={qa.id}>
            <Box
              sx={{
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
              <Box sx={{ px: 4, mb: 3 }}>
                <MarkdownRenderer content={qa.answer} />
              </Box>
            )}
          </Box>
        ))}
        {isError && (
          <Typography color="error">
            Error accessing general questions service. Try again later.
          </Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Input your medical question:"
          variant="outlined"
          multiline
          maxRows={8}
          value={newQuestion}
          sx={{
            minWidth: { xs: '300px', sm: '500px', md: '600px' },
            mt: 6,
            mb: 2,
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNewQuestion(event.target.value)
          }
        />
        <Button variant="contained" onClick={submitQuestion} sx={{ mb: 2 }}>
          Submit question
        </Button>
      </Box>
    </PageContainer>
  );
}
