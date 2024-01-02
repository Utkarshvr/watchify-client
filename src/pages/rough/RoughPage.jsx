import { API_URL } from "@/config/api.routes";
import { Button, Flex } from "antd";
import axios from "axios";

export default function RoughPage() {
  const channelID = "6559fd97076e8f3934fee0e1";
  // const videoID = "658d6fd765b6e96cfd215d55";
  const videoID = "jG7V22mwsO4PdpJa";
  const playlistID = "65930cc47d0fb6456c9c6497";

  async function callSubscribe() {
    try {
      const { data } = await axios.post(
        `${API_URL}/channel/${channelID}/subscribe`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function likeContent() {
    try {
      const { data } = await axios.post(
        `${API_URL}/like/${videoID}?contentType=video`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSubs() {
    try {
      const { data } = await axios.get(
        `${API_URL}/channel/${channelID}/subscribers`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getChannel() {
    try {
      const { data } = await axios.get(`${API_URL}/channel/${channelID}`, {
        withCredentials: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createPlaylist() {
    try {
      const { data } = await axios.post(
        `${API_URL}/playlist`,
        {
          title: "Utkarsh's Playlist 03",
          // desc,
          // isPrivate:true,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToThePlaylist() {
    try {
      const { data } = await axios.post(
        `${API_URL}/playlist/${playlistID}/add-videos`,
        {
          videos: [
            "658d6fd765b6e96cfd215d55",
            "658d706b65b6e96cfd215d57",
            // "658db85c435bf211e8c19aef",
            "658eb4015e19d52fce7cf254",
          ],
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToAllThePlaylists() {
    try {
      const { data } = await axios.post(
        `${API_URL}/playlist/add-video-to-playlists`,
        {
          video: "658d706b65b6e96cfd215d57",
          playlists: [
            "65931db6030ea77bd8b796bb",
            "65931dba030ea77bd8b796bd",
            "65931dbd030ea77bd8b796bf",
          ],
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex gap={12} vertical>
      <Button onClick={callSubscribe}>Subscribe: {channelID}</Button>
      <Button onClick={likeContent}>Like: {videoID}</Button>
      <Button onClick={getSubs}>GET Subscribers: {channelID}</Button>
      <Button onClick={getChannel}>GET Channel: {channelID}</Button>
      <Button onClick={createPlaylist}>Create Playlist</Button>
      <Button onClick={addToThePlaylist}>Update Playlist: {playlistID}</Button>
      <Button onClick={addToAllThePlaylists}>Update All Playlists</Button>
    </Flex>
  );
}
