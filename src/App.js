import React, { useReducer, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import List from "./List";
import InputWithLabel from "./InputWithLabel";
import { useToast } from '@chakra-ui/react';
import './styles.css';
const API_ENDPOINT = "https://theaudiodb.com/api/v1/json/2/album.php?i=112024";

const actionTypes = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  REMOVE_ALBUM: "REMOVE_ALBUM",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, isLoading: true, isError: false };
    case actionTypes.FETCH_SUCCESS:
      return { ...state, albums: action.payload, isLoading: false };
    case actionTypes.FETCH_ERROR:
      return { ...state, isError: true, isLoading: false };
    case actionTypes.REMOVE_ALBUM:
      return {
        ...state,
        albums: state.albums.filter(album => album.idAlbum !== action.payload.idAlbum),
      };
    case actionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

const initialState = {
  searchTerm: "",
  albums: [],
  isLoading: false,
  isError: false,
};


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actionTypes.FETCH_START });

      try {
        const response = await axios.get(API_ENDPOINT);
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response.data.album });
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_ERROR });
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const handleRemoveAlbum = (item) => {
    toast({
      title: "Album deleted.",
      description: "Album has been deleted successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    dispatch({ type: actionTypes.REMOVE_ALBUM, payload: item });
  };

  const handleSearchInput = (event) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: event.target.value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(); // Refetch data when the form is submitted
  };

  const SearchedList = state.albums.filter((res) =>
    res.strAlbum.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container-sm">
        <h1 className="d-flex justify-content-center">Album </h1>
        <form onSubmit={handleSearchSubmit}>
          <InputWithLabel
            id="search"
            value={state.searchTerm}
            onInputChange={handleSearchInput}
          >
            <strong>Search:</strong>
          </InputWithLabel>
        </form>
        <hr />
        {state.isError && <p>Something went wrong ...</p>}
        {state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <List list={SearchedList} onRemoveItem={handleRemoveAlbum} />
        )}
      </div>

      <footer className="footer text-center text-lg-start">
        <div className="text-center p-3">© 2023 Copyright: Nouran ZOUABI</div>
      </footer>
    </>
  );
};

export default App;