import { API_URL } from "@/config/api.routes";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export const getUser = async () => {
  try {
    const url = `${API_URL}/auth/login/success`;
    const data = await fetch(url, { credentials: "include" }).then((response) =>
      response.json()
    );

    console.log(data);
    return { data: data?.data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
};

export const createVideo = async (formData) => {
  try {
    const url = `${API_URL}/video/create`;
    const data = await axiosInstance.post(url, formData);

    return { data, error: null };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCommentsOfVideo = async (videoID) => {
  try {
    const url = `${API_URL}/video/${videoID}/comments`;
    const data = await axiosInstance.get(url);

    return { data, error: null };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addCommentToVideo = async (videoID, formData, parentCommentID) => {
  try {
    const url = parentCommentID
      ? `${API_URL}/video/${videoID}/comment?parentCommentID=${parentCommentID}`
      : `${API_URL}/video/${videoID}/comment`;

    console.log(url);

    const data = await axiosInstance.post(url, formData);

    return { data, error: null };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllVideos = async (userId) => {
  try {
    const url = userId
      ? `${API_URL}/channel/${userId}/videos`
      : `${API_URL}/video/all`;
    const data = await axiosInstance.get(url);

    // console.log(data);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getVideoByID = async (videoID) => {
  try {
    const url = `${API_URL}/video/${videoID}`;
    const data = await axiosInstance.get(url);

    return { data, error: null };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChannel = async (channelID) => {
  try {
    const data = await axiosInstance.get(`${API_URL}/channel/${channelID}`);

    // console.log(data);
    return { data, error: null };
  } catch (error) {
    // console.log(error);
    return { data: null, error };
  }
};

export const subORUnsub = async (channelID) => {
  try {
    const data = await axiosInstance.post(
      `${API_URL}/channel/${channelID}/subscribe`
    );
    console.log(data);
    return { data, error: null };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function likeContent(videoID, contentType) {
  try {
    const data = await axiosInstance.post(
      `${API_URL}/like/${videoID}?contentType=${contentType}`
    );
    return { data, error: null };
  } catch (error) {
    console.log(error);
    throw error;
    // return { data: null, error };
  }
}

export async function getUsersPlaylists() {
  try {
    const data = await axiosInstance.get(`${API_URL}/user/me/playlists`);
    return { data, error: null };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addVideoToPlaylists(video_uuid, playlists) {
  try {
    const data = await axiosInstance.post(
      `${API_URL}/playlist/add-video-to-playlists`,
      {
        video: video_uuid,
        playlists,
      }
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function addVideoToPlaylist(video_uuid, playlistID) {
  try {
    const data = await axiosInstance.post(
      `${API_URL}/playlist/${playlistID}/toggle-video?video=${video_uuid}`
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function customiseUser(formData) {
  try {
    const url = `${API_URL}/user/me/customize`;
    const data = await axiosInstance.post(url, formData);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getWatchHistory() {
  try {
    const url = `${API_URL}/user/me/watch-history`;
    const data = await axiosInstance.get(url);
    console.log(data);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getUsersNotifications(isRead) {
  const url = isRead
    ? `${API_URL}/user/me/notifications?isRead=${isRead}`
    : `${API_URL}/user/me/notifications`;

  console.log({ notif_urL: url });
  const data = await axiosInstance.get(url);

  return data;
}

export async function markAllUsersNotificationsAsRead() {
  const url = `${API_URL}/user/me/notifications/markasread`;

  const data = await axiosInstance.post(url);

  return data;
}
export default axiosInstance;
