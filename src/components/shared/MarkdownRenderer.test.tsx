import { render, screen } from '@testing-library/react';
import MarkdownRenderer from './MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('renders paragraphs', () => {
    render(<MarkdownRenderer content={'This is a paragraph.'} />);
    const paragraph = screen.getByText('This is a paragraph.');
    expect(paragraph.tagName).toBe('P');
  });

  it('renders h1 as Typography h4', () => {
    render(<MarkdownRenderer content={'# Heading 1'} />);
    const heading = screen.getByText('Heading 1');
    expect(heading.tagName).toBe('H4');
  });

  it('renders h2 as Typography h5', () => {
    render(<MarkdownRenderer content={'## Heading 2'} />);
    const heading = screen.getByText('Heading 2');
    expect(heading.tagName).toBe('H5');
  });

  it('renders list items as li', () => {
    render(<MarkdownRenderer content={'- Item 1'} />);
    const listItem = screen.getByText('Item 1');
    expect(listItem.tagName).toBe('SPAN');
    expect(listItem.closest('li')).not.toBeNull();
  });

  it('renders strong and em elements', () => {
    render(<MarkdownRenderer content={'**bold** _italic_'} />);
    const bold = screen.getByText('bold');
    const italic = screen.getByText('italic');
    expect(bold.tagName).toBe('STRONG');
    expect(italic.tagName).toBe('EM');
  });
});
