import axios from "axios";

export const fetchArtist = async ({ artistName, searchLimit }) => {
  return await axios.get(
    `https://itunes.apple.com/search?term=${artistName}&limit=${searchLimit}&entity=song`
  );
};
