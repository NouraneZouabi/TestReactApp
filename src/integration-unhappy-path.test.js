// Un test d'intégration  pour le unhappy path.
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('Integration Test for Unhappy Path', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
