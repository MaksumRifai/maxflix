import axios from "axios";

export const Movies = type => {
  let movieAPI = '12bd7c58'
  return axios.create({
    baseURL: `https://www.omdbapi.com/?apikey=${movieAPI}&${type}`
  });
};
