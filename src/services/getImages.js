import axios from "axios";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "27775752-b90a2892c91517bf7619ab756";

export const getImages = async (imageName, page, perPage) => {
  const response = await axios.get(
    `${BASE_URL}/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return response;
};
