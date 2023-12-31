import { getVideoByID } from "@/api/apiCalls";
import { Avatar, Flex, Image, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VideoCardLong({ videoID }) {
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(video);
  useEffect(() => {
    (async () => {
      if (videoID) {
        try {
          const { data } = await getVideoByID(videoID);
          setVideo(data.video);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [videoID]);
  return isLoading && !video ? (
    <p>LOADING...</p>
  ) : (
    <>
      <Flex
        style={{
          widows: "100%",
        }}
        vertical
        gap={6}
      >
        {/* THUMBNAIL */}
        <video
          src={video?.link}
          controls
          autoPlay
          style={{
            borderRadius: 12,
            width: "1200px",
            maxWidth: "100%",
            maxHeight: 600,
          }}
        />

        {/* CHANNEL INFO */}
        <Flex vertical style={{ padding: "0 0.5em" }} gap={8}>
          <Typography.Text style={{ fontSize: 18 }} strong>
            {video?.title}
          </Typography.Text>

          <Flex gap={8} align="center">
            <Link to={`/channel/@${video?.creator?.user_handle}`}>
              <Avatar
                style={{ minWidth: "40px", minHeight: "40px" }}
                src={video?.creator?.picture}
                size={"default"}
              />
            </Link>
            <Flex vertical>
              <Link to={`/channel/@${video?.creator?.user_handle}`}>
                <Typography.Text
                  style={{ fontSize: 14 }}
                  strong
                  type="secondary"
                >
                  {video?.creator?.name}
                </Typography.Text>
              </Link>

              <Typography.Text style={{ fontSize: 12 }} type="secondary">
                {"10.2M Subscribers"}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
