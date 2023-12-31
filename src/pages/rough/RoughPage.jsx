import { API_URL } from "@/config/api.routes";
import { Button, Flex } from "antd";
import axios from "axios";

export default function RoughPage() {
  const channelID = "655a00629574d11be96ede10";
  // const videoID = "658d6fd765b6e96cfd215d55";
  const videoID = "jG7V22mwsO4PdpJa";

  async function callSubscribe() {
    try {
      const { data } = await axios.post(
        `${API_URL}/subscribe/${channelID}`,
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
      const { data } = await axios.post(`${API_URL}/like/${videoID}?contentType=video`, null, {
        withCredentials: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex gap={12} vertical>
      <Button onClick={callSubscribe}>{"Call: `/api/subscribe/:id`"}</Button>
      <Button onClick={likeContent}>
        {"Like Video POST: `/api/like/:id`"}
      </Button>
    </Flex>
  );
}
