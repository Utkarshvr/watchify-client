import NoVideo from "@/Screens/NoVideo";
import { getAllVideos } from "@/api/apiCalls";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import VideoFeed from "@/layout/VideoFeed";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const user = useAuthUser();
  useEffect(() => {
    console.log("first");
    (async () => {
      console.log("IN AYSNC");
      try {
        console.log("IN TRYY");
        const { data } = await getAllVideos(user?._id);
        console.log("AFTER DATA");
        console.log(data);

        setVideos(data?.videos);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <>{videos.length > 0 ? <VideoFeed videos={videos} /> : <NoVideo />}</>;
}
