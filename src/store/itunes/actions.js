import * as types from "./types";

export function searchArtists(client) {
   return { type: types.SEARCH_ARTISTS_REQUESTED, client };
}
