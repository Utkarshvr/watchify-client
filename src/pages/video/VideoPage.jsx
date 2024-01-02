import { useParams, useSearchParams } from "react-router-dom";
import VideoCardLong from "@/components/cards/VideoCardLong";
import { Flex, Typography } from "antd";
import VideoFeed from "@/layout/VideoFeed";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/api/apiCalls";
import axios from "axios";
import { API_URL } from "@/config/api.routes";
import { gray } from "@ant-design/colors";

export default function VideoPage() {
  // ROUTER STATES
  const { videoID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const playlistID = searchParams.get("playlist");
  const videoIndex = searchParams.get("index") || 0;

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Playlist
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllVideos();
        // console.log(data);

        setVideos(data?.videos?.filter((video) => video?.videoID !== videoID));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [videoID]);

  useEffect(() => {
    console.log({ playlistID });

    if (playlistID)
      (async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/playlist/${playlistID}`,
            {
              withCredentials: true,
            }
          );
          console.log(data);
          setPlaylist(data?.data?.playlist);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [playlistID]);

  return (
    <>
      <Flex
        style={{ height: "150vw", padding: 24, position: "relative" }}
        gap={24}
      >
        <Flex vertical flex={0.7}>
          <Flex>
            <VideoCardLong videoID={videoID} />
          </Flex>
          <Flex>Comments</Flex>
        </Flex>
        <Flex vertical flex={0.3}>
          {isLoading ? (
            <p>LOADING...</p>
          ) : playlistID ? (
            <>
              <Flex
                vertical
                gap={12}
                style={{
                  borderRadius: 12,
                  padding: 12,
                  // background: gray[6],
                  borderWidth: 2,
                  borderColor: gray[6],
                  border: "solid",
                }}
                flex={0.7}
              >
                <Typography.Text strong>{playlist?.title}</Typography.Text>
                <VideoFeed
                  usage="playlist"
                  vertical
                  videos={playlist?.videos}
                  playlistID={playlistID}
                  activeVideo={videoID}
                />
              </Flex>
              <VideoFeed vertical videos={videos} />
            </>
          ) : (
            <VideoFeed vertical videos={videos} />
          )}
        </Flex>
      </Flex>
    </>
  );
}
