import { call, put, takeLatest } from "redux-saga/effects";
import { SEARCH_ARTISTS_REQUESTED } from "../store/itunes/types";
import { fetchArtist } from "../utils/api/Api";

export function* fetchItunesArtist(action) {
  try {
    const artistSearchResponse = yield call(fetchArtist, action.payload);
    if (
      artistSearchResponse.status >= 200 &&
      artistSearchResponse.status < 300
    ) {
      yield put({
        type: "ARTIST_FETCH_SUCCEEDED",
        artistSearchResults: artistSearchResponse.data.results,
      });
    } else {
      //Test this by changing the API Url inside fetchArtist to a malformed request
      throw artistSearchResponse;
    }
  } catch (error) {
    yield put({ type: "ARTIST_FETCH_FAILED", artistSearchError: error });
  }
}

export function* fetchArtistTracksSaga() {
  yield takeLatest(SEARCH_ARTISTS_REQUESTED, fetchItunesArtist);
}

export default fetchArtistTracksSaga;
