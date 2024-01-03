import { getWatchHistory } from "@/api/apiCalls";
import ScreenTitle from "@/components/ui/ScreenTitle";
import VideoFeed from "@/layout/VideoFeed";
import { Flex } from "antd";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await getWatchHistory();
        console.log(data, error);

        setWatchHistory(data?.watchHistory);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Flex vertical style={{ padding: 16 }}>
      <ScreenTitle
        title={"Watch History"}
        content={"Keep Track of your Watching History"}
      />

      <Flex
        vertical
        gap={12}
        style={{
          borderRadius: 12,
          padding: 12,
          // background: gray[6],
        }}
        flex={0.7}
      >
        <VideoFeed
          //   align="center"
          showLastWatched
          videos={watchHistory?.map((history) => history?.video)}
        />
      </Flex>
    </Flex>
  );
}
