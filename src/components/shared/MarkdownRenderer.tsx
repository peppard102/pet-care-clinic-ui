import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography } from '@mui/material';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps): React.ReactElement {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <Typography variant="body1">{children}</Typography>
        ),
        h1: ({ children }) => (
          <Typography variant="h4" gutterBottom>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h5" gutterBottom>
            {children}
          </Typography>
        ),
        li: ({ children }) => (
          <li>
            <Typography component="span">{children}</Typography>
          </li>
        ),
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
