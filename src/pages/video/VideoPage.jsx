import { useParams } from "react-router-dom";
import VideoCardLong from "@/components/cards/VideoCardLong";
import { Flex } from "antd";
import VideoFeed from "@/layout/VideoFeed";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/api/apiCalls";

export default function VideoPage() {
  const { videoID } = useParams();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <Flex
        style={{ height: "150vw", padding: 8, position: "relative" }}
        gap={8}
      >
        <Flex vertical flex={0.7}>
          <Flex>
            <VideoCardLong videoID={videoID} />
          </Flex>
          <Flex>Comments</Flex>
        </Flex>
        <Flex flex={0.3}>
          {isLoading ? (
            <p>LOADING...</p>
          ) : (
            <VideoFeed vertical videos={videos} />
          )}
        </Flex>
      </Flex>
    </>
  );
}
