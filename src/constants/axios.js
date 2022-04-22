import axios from "axios";

export const baseURL = "https://gateway.marvel.com/v1/public";
export default axios.create({baseURL});

export const URL = {
  characters: '/characters',
}


