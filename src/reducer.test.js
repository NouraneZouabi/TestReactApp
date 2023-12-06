// Un test unitaire de la fonction reducer. Le test doit prendre en compte tous les cas possibles du reducer.
import reducer, { initialState, actionTypes } from './reducer';

const sampleAlbum = {
  idAlbum: 2115886,
  idArtist: 112024,
  Label: 47129,
  Album: 'Thursday',
  Artist: 'The Weeknd',
  YearReleased: 2011,
  Label: 'Republic Records',
};

test('reducer handles FETCH_START correctly', () => {
  const newState = reducer(initialState, { type: actionTypes.FETCH_START });
  expect(newState).toEqual({ ...initialState, isLoading: true, isError: false });
});

test('reducer handles FETCH_SUCCESS correctly', () => {
  const sampleAlbums = [sampleAlbum]; 
  const newState = reducer(initialState, { type: actionTypes.FETCH_SUCCESS, payload: sampleAlbums });
  expect(newState).toEqual({ ...initialState, albums: sampleAlbums, isLoading: false });
});

test('reducer handles FETCH_ERROR correctly', () => {
  const newState = reducer(initialState, { type: actionTypes.FETCH_ERROR });
  expect(newState).toEqual({ ...initialState, isError: true, isLoading: false });
});

test('reducer handles REMOVE_ALBUM correctly', () => {
  const stateWithAlbum = { ...initialState, albums: [sampleAlbum] }; 
  const newState = reducer(stateWithAlbum, { type: actionTypes.REMOVE_ALBUM, payload: sampleAlbum });
  expect(newState).toEqual({ ...initialState, albums: [], isLoading: false });
});

test('reducer handles SET_SEARCH_TERM correctly', () => {
  const searchTerm = 'sample search term';
  const newState = reducer(initialState, { type: actionTypes.SET_SEARCH_TERM, payload: searchTerm });
  expect(newState).toEqual({ ...initialState, searchTerm });
});
