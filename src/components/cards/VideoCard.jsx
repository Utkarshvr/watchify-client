import { Avatar, Col, Flex, Grid, Image, Typography } from "antd";
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
  showLastWatched = false,
}) {
  const isUsedInPlaylist = usage === "playlist";

  const screens = Grid.useBreakpoint();

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
      xs={vertical ? null : 24}
      sm={vertical ? null : 12}
      md={vertical ? null : 8}
      lg={vertical ? null : 6}
    >
      <Link
        to={
          isUsedInPlaylist
            ? `/videos/${video?.videoID}?playlist=${playlistID}&index=${
                index + 1
              }`
            : `/videos/${video?.videoID}`
        }
        style={{ minWidth: "max-content" }}
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
              width: "100%",
            }}
            vertical={isUsedInPlaylist ? false : true}
            gap={6}
            align={isUsedInPlaylist ? "center" : "flex-start"}
          >
            {/* THUMBNAIL */}
            <Image
              src={video?.thumbnail}
              preview={false}
              width={isUsedInPlaylist ? 200 : "100%"}
              style={{
                // maxWidth: "100%",
                borderRadius: 12,
                // maxWidth: isUsedInPlaylist ? 200 : "100%",
                // maxHeight: 200,
                width: isUsedInPlaylist ? 200 : "100%",
                height: 250,
                objectFit: screens.xs ? "cover" : "contain",
                // border: "4px solid #fff",
                // background: "#151515",
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
                <Typography.Text
                  // style={{
                  //   minWidth: "max-content",
                  // }}
                  strong
                >
                  {video?.title}
                </Typography.Text>
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
                {showLastWatched && video?.lastWatched && (
                  <Typography.Text type="secondary">
                    Watched:{" "}
                    {formatDistanceToNow(new Date(video?.lastWatched), {
                      addSuffix: true,
                    })}
                  </Typography.Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Col>
  );
}
