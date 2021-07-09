import axios from "axios";

export const Trailer = titleTrailer => {
  let youtubeAPI = 'AIzaSyDx4NSpM8LuwJQCjmQDDR81YAJhWM3oWYY'
  return axios.create({
    baseURL: `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeAPI}&q=${titleTrailer}&type=video&maxResults=1`
  });
};
