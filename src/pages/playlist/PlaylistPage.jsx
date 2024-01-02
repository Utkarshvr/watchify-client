import { useEffect, useState } from "react";
import { API_URL } from "@/config/api.routes";
import { gray } from "@ant-design/colors";
import { Avatar, Flex, Image, Typography } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NoThumbnailImage from "@/assets/images/no-thumbnail.jpg";
import VideoFeed from "@/layout/VideoFeed";

export default function PlaylistPage() {
  const { playlistID } = useParams();

  // States
  const [playlist, setPlaylist] = useState(null);

  // Error
  const [isError, setIsError] = useState(false);
  const initialErrorState = {
    info: {},
    status_code: 0,
    message: "",
  };
  const [error, setError] = useState(initialErrorState);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/playlist/${playlistID}`, {
          withCredentials: true,
        });
        console.log(data);
        setPlaylist(data?.data?.playlist);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setError({
          info: error?.response?.data,
          status_code: error?.response?.data?.statusCode,
          message: error?.response?.data?.message,
        });
      }
    })();
  }, [playlistID]);

  console.log(error);

  if (isError)
    return (
      <Flex vertical gap={4} style={{ padding: 16 }}>
        <Typography.Text strong>Error: {error?.status_code}</Typography.Text>
        <Typography.Text strong> {error?.message}</Typography.Text>
      </Flex>
    );

  return (
    <>
      <Flex gap={16} style={{ padding: 16 }} vertical={false}>
        <Flex
          vertical
          gap={12}
          style={{
            borderRadius: 12,
            padding: 12,
            background: gray[6],
            // maxWidth: 360,
          }}
          flex={0.3}
        >
          <Image
            style={{
              borderRadius: 12,
              // maxWidth: 340,
              // maxHeight: 200,
            }}
            preview={false}
            src={
              playlist?.videos?.length > 0
                ? playlist?.videos[0]?.thumbnail
                : NoThumbnailImage
            }
          />

          <Flex vertical gap={4}>
            <Typography.Title>{playlist?.title}</Typography.Title>

            <Link to={`/channel/@${playlist?.owner?.user_handle}`}>
              <Flex gap={4} align="center">
                <Avatar src={playlist?.owner?.picture} />
                <Flex vertical gap={0}>
                  <Typography.Text strong>
                    {playlist?.owner?.name}
                  </Typography.Text>
                  <Typography.Text
                    style={{ fontSize: 10 }}
                    type="secondary"
                    strong
                  >
                    {`@${playlist?.owner?.user_handle}`}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Link>
            <Typography.Text strong type="secondary" style={{ fontSize: 12 }}>
              {playlist?.videos?.length}{" "}
              {playlist?.videos?.length === 1 ? "Video" : "Videos"}
            </Typography.Text>
          </Flex>

          <Typography.Text>{playlist?.desc}</Typography.Text>
        </Flex>

        <Flex
          vertical
          gap={12}
          style={{
            borderRadius: 12,
            padding: 12,
            // background: gray[6],
          }}
          flex={0.7}
        >
          <VideoFeed
            usage="playlist"
            vertical
            videos={playlist?.videos}
            playlistID={playlistID}
          />
        </Flex>
      </Flex>
    </>
  );
}
