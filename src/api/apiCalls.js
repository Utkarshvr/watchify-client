import { API_URL } from "@/config/api.routes";
import axios from "axios";

export const getUser = async () => {
  try {
    const url = `${API_URL}/auth/login/success`;
    const response = await fetch(url, { credentials: "include" });

    const data = await response.json();
    console.log(data);
    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
};

export const getAllVideos = async (userId) => {
  try {
    const url = userId
      ? `${API_URL}/user/${userId}/videos`
      : `${API_URL}/video/all`;
    const { data } = await axios.get(url, { withCredentials: true });

    console.log(data);
    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
};

export const getVideoByID = async (videoID) => {
  try {
    const url = `${API_URL}/video/${videoID}`;
    const { data } = await axios.get(url, { withCredentials: true });

    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
};
