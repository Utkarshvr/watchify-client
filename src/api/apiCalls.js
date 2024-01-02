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

export const getChannel = async (channelID) => {
  try {
    const { data } = await axios.get(`${API_URL}/channel/${channelID}`, {
      withCredentials: true,
    });
    // console.log(data);
    return { data, error: null };
  } catch (error) {
    // console.log(error);
    return { data: null, error };
  }
};

export const subORUnsub = async (channelID) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/channel/${channelID}/subscribe`,
      null,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
};
export async function likeContent(videoID, contentType) {
  try {
    const { data } = await axios.post(
      `${API_URL}/like/${videoID}?contentType=${contentType}`,
      null,
      {
        withCredentials: true,
      }
    );
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}
export async function getUsersPlaylists() {
  try {
    const { data } = await axios.get(`${API_URL}/user/me/playlists`, {
      withCredentials: true,
    });
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}

export async function addVideoToPlaylists(video_uuid, playlists) {
  try {
    const { data } = await axios.post(
      `${API_URL}/playlist/add-video-to-playlists`,
      {
        video: video_uuid,
        playlists,
      },
      {
        withCredentials: true,
      }
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function addVideoToPlaylist(video_uuid, playlistID) {
  try {
    const { data } = await axios.post(
      `${API_URL}/playlist/${playlistID}/toggle-video?video=${video_uuid}`,
      null,
      {
        withCredentials: true,
      }
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
