import { PlaySquareOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Typography } from "antd";
import { Link } from "react-router-dom";

import NoThumbnailImage from "@/assets/images/no-thumbnail.jpg";
import { gray } from "@ant-design/colors";

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlist/${playlist?._id}`}>
      <Flex vertical gap={4}>
        <div
          style={{
            position: "relative",
            // width: 260,
            borderRadius: 16,
            width: "100%",
          }}
        >
          <Image
            style={{
              borderRadius: 16,
              maxWidth: "100%",
            }}
            preview={false}
            src={playlist?.videos[0]?.thumbnail || NoThumbnailImage}
          />
          <Flex
            gap={2}
            style={{
              background: "rgba(0,0,0,0.6)",
              position: "absolute",
              bottom: 8,
              right: 8,
              borderRadius: 8,
              padding: "0.25em 0.5em",
            }}
            // icon={<PlaySquareOutlined />}
          >
            <PlaySquareOutlined style={{ color: "white" }} />
            <Typography.Text strong style={{ fontSize: 12 }}>
              {playlist?.videos?.length}{" "}
              {playlist?.videos?.length === 1 ? "video" : "videos"}
            </Typography.Text>
          </Flex>
        </div>

        <Typography.Text strong>{playlist?.title}</Typography.Text>
      </Flex>
    </Link>
  );
}
