import Button from '@mui/material/Button';
import PageContainer from '../shared/PageContainer';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { checkSymptoms } from '../../data/apiCalls';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import MarkdownRenderer from '../shared/MarkdownRenderer';

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState<string>('');
  const [actionPlan, setActionPlan] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const submitSymptoms = async (): Promise<void> => {
    setIsProcessing(true);
    setIsError(false);

    try {
      const response = await checkSymptoms(symptoms);
      setActionPlan(response);
    } catch {
      setIsError(true);
    }

    setIsProcessing(false);
  };

  return (
    <PageContainer title="Symptom Checker">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          id="outlined-basic"
          label="Input the pets symptoms:"
          variant="outlined"
          multiline
          maxRows={8}
          value={symptoms}
          sx={{ minWidth: { xs: '300px', sm: '500px', md: '600px' }, mb: 2 }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSymptoms(event.target.value)
          }
        />
        <Button variant="contained" onClick={submitSymptoms} sx={{ mb: 2 }}>
          Get action plan
        </Button>
        <Box>
          <MarkdownRenderer content={actionPlan} />
        </Box>
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
            Error accessing symptom checker service. Try again later.
          </Typography>
        )}
      </Box>
    </PageContainer>
  );
}
