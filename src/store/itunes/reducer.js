import initialState from "../initialState";
import * as types from "./types";

export default function itunesReducer(state = initialState.itunes, action) {
  if (action.type === types.SEARCH_ARTISTS_REQUESTED) {
    return {
      ...state,
      artistSearchLoading: true,
    };
  } else if (action.type === types.ARTIST_FETCH_SUCCEEDED) {
    return {
      ...state,
      artistSearchResults: action.artistSearchResults,
      artistSearchLoading: false,
    };
  } else if (action.type === types.ARTIST_FETCH_FAILED) {
    return {
      ...state,
      artistSearchError: action.artistSearchError,
      artistSearchLoading: false,
    };
  } else {
    return state;
  }
}
