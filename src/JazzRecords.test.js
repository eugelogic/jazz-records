import { render, screen } from '@testing-library/react';
import JazzRecords from './JazzRecords';

test('renders learn react link', () => {
  render(<JazzRecords />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
