import { Row } from "antd";
import VideoCard from "@/components/cards/VideoCard";

export default function VideoFeed({ videos, vertical }) {
  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      style={{ margin: 0 }}
    >
      {videos?.map((video) => (
        <VideoCard vertical={vertical} key={video?._id} video={video} />
      ))}
    </Row>
  );
}
