import { Row } from "antd";
import VideoCard from "@/components/cards/VideoCard";

export default function VideoFeed({
  activeVideo,
  videos,
  vertical,
  usage,
  playlistID,
}) {
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
      {videos?.map((video, index) => (
        <VideoCard
          vertical={vertical}
          usage={usage}
          key={video?._id}
          video={video}
          index={index}
          playlistID={playlistID}
          activeVideo={activeVideo}
        />
      ))}
    </Row>
  );
}
