import { Avatar, Col, Flex, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { gray } from "@ant-design/colors";

export default function VideoCard({
  video,
  vertical,
  usage,
  playlistID,
  index,
  activeVideo,
}) {
  const isUsedInPlaylist = usage === "playlist";

  return (
    <Col
      style={{
        background: isUsedInPlaylist
          ? video?.videoID === activeVideo
            ? gray[6]
            : "transparent"
          : "transparent",
        borderRadius: 12,
      }}
      className="gutter-row"
      span={vertical ? 24 : 6}
    >
      <Link
        to={
          isUsedInPlaylist
            ? `/videos/${video?.videoID}?playlist=${playlistID}&index=${
                index + 1
              }`
            : `/videos/${video?.videoID}`
        }
      >
        <Flex align="center" gap={4}>
          {isUsedInPlaylist ? (
            <Typography.Text strong>
              {!isNaN(index) ? index + 1 : null}
            </Typography.Text>
          ) : null}
          <Flex
            style={{
              // maxWidth: isUsedInPlaylist ? 200 : 400,
              borderRadius: 12,
              padding: 4,
            }}
            vertical={isUsedInPlaylist ? false : true}
            gap={6}
            align={isUsedInPlaylist ? "center" : "flex-start"}
          >
            {/* THUMBNAIL */}
            <Image
              src={video?.thumbnail}
              preview={false}
              style={{
                // maxWidth: "100%",
                borderRadius: 12,
                maxWidth: isUsedInPlaylist ? 200 : "100%",
              }}
            />

            {/* CHANNEL INFO */}
            <Flex style={{ padding: "0 0.5em" }} gap={8}>
              {isUsedInPlaylist ? null : (
                <Link to={`/channel/@${video?.creator?.user_handle}`}>
                  <Avatar
                    style={{ minWidth: "40px", minHeight: "40px" }}
                    src={video?.creator?.picture}
                    size={"default"}
                  />
                </Link>
              )}
              <Flex vertical>
                <Typography.Text strong>{video?.title}</Typography.Text>
                <Link to={`/channel/@${video?.creator?.user_handle}`}>
                  <Typography.Text type="secondary">
                    {video?.creator?.name}
                  </Typography.Text>
                </Link>
                <Flex gap={2}>
                  <Typography.Text type="secondary">
                    {video?.views_count}{" "}
                    {video?.views_count === 1 ? "view" : "views "}
                  </Typography.Text>
                  <Typography.Text type="secondary" strong>
                    &middot;
                  </Typography.Text>

                  <Typography.Text type="secondary">
                    {formatDistanceToNow(new Date(video?.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Col>
  );
}
