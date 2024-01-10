import NoVideo from "@/Screens/NoVideo";
import { getAllVideos } from "@/api/apiCalls";
import Loading from "@/components/ui/Loading";
import PageTitle from "@/components/ui/PageTitle";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import VideoFeed from "@/layout/VideoFeed";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const user = useAuthUser();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllVideos();
        // console.log(data);

        setVideos(data?.videos || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {videos?.length > 0 ? (
        <>
          <PageTitle title={"All Videos"} />
          <VideoFeed videos={videos} />
        </>
      ) : (
        <NoVideo />
      )}
    </>
  );
}
