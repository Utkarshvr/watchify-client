import { Avatar, Col, Flex, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function VideoCard({ video, vertical }) {
  return (
    <Col className="gutter-row" span={vertical ? 24 : 8}>
      <Link to={`/videos/${video?.videoID}`}>
        <Flex
          style={{
            maxWidth: 400,

            borderRadius: 12,
            // backgroundColor: "#282828",
            padding: 4,
            // marginBottom: 16,
          }}
          vertical
          gap={6}
        >
          {/* THUMBNAIL */}
          <Image
            src={video?.thumbnail}
            preview={false}
            style={{ maxWidth: "100%", borderRadius: 12 }}
          />

          {/* CHANNEL INFO */}
          <Flex style={{ padding: "0 0.5em" }} gap={8}>
            <Link to={`/channel/@${video?.creator?.user_handle}`}>
              <Avatar
                style={{ minWidth: "40px", minHeight: "40px" }}
                src={video?.creator?.picture}
                size={"default"}
              />
            </Link>

            <Flex vertical>
              <Typography.Text strong>{video?.title}</Typography.Text>
              <Link to={`/channel/@${video?.creator?.user_handle}`}>
                <Typography.Text type="secondary">
                  {video?.creator?.name}
                </Typography.Text>
              </Link>
              <Flex gap={2}>
                <Typography.Text type="secondary">
                  {"11K views "}
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
      </Link>
    </Col>
  );
}
