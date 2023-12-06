// Un test d'intégration pour le happy path.
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('Integration Test for Happy Path', async () => {
  const sampleAlbumData = {
    idAlbum: 2115886,
    idArtist: 112024,
    Label: 47129,
    Album: 'Thursday',
    Artist: 'The Weeknd',
    YearReleased: 2011,
    Label: 'Republic Records',
  };

  axios.get.mockResolvedValueOnce({ data: { album: [sampleAlbumData] } });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Thursday/i)).toBeInTheDocument();
  });
});
