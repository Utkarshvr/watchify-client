import { useSubscriptionData } from "@/context/Other/SubscriptionProvider";
import VideoFeed from "@/layout/VideoFeed";

export default function SubscriptionVideos() {
  const { videos } = useSubscriptionData();
  console.log(videos);
  return (
    <>
      <VideoFeed videos={videos} />
    </>
  );
}
