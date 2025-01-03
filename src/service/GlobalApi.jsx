import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_KEY,
    "X-Goog-FieldMask":"places.photos,places.displayName,places.id",
  },
};
 
export const getPlaceDetails =async (data) => {
  try {
    const response =await axios.post(BASE_URL, data, config);
    return response;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    throw error;
  }
};
  

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1000&maxHeightPx=1000&key=${
  import.meta.env.VITE_GOOGLE_PLACE_KEY
}`;