import { getAllVideos, subORUnsub } from "@/api/apiCalls";
import ChannelDescModal from "@/components/modal/ChannelDescModal";
import { API_URL } from "@/config/api.routes";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import PlaylistsFeed from "@/layout/PlaylistsFeed";
import VideoFeed from "@/layout/VideoFeed";
import { gray } from "@ant-design/colors";
import { EditOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Tabs, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

export default function ChannelPage() {
  const [channel, setChannel] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  const [videos, setVideos] = useState([]);

  // Modal States
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);

  const user = useAuthUser();

  let { user_handle } = useParams();
  user_handle = user_handle?.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  useEffect(() => {
    if (user_handle)
      (async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/channel/?user_handle=${user_handle}`,
            {
              withCredentials: true,
            }
          );
          console.log(data);
          setChannel(data?.channel);
          setIsSubscribed(data?.channel?.isSubscribed);
          setSubscribersCount(data?.channel?.subscribers_count);

          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      })();
  }, [user_handle]);

  useEffect(() => {
    if (channel)
      (async () => {
        try {
          const { data } = await getAllVideos(channel?._id);
          console.log(data);
          setVideos(data?.videos);
          return { data, error: null };
        } catch (error) {
          console.log(error);
          return { data: null, error };
        }
      })();
  }, [channel]);

  const items = [
    {
      key: "videos",
      label: "Videos",
      children: <VideoFeed videos={videos} />,
    },
    {
      key: "playlists",
      label: "Playlists",
      children: <PlaylistsFeed channelID={channel?._id} />,
    },
  ];

  const isMyOwnChannel = user?._id === channel?._id;

  async function subORUnsubChannel() {
    try {
      const { data } = await subORUnsub(channel?._id);
      setIsSubscribed(data?.isSubscribed);
      setSubscribersCount((prev) => (data?.isSubscribed ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Flex style={{ padding: 24 }} vertical gap={24}>
        {/* Banner */}
        {channel?.banner_image && (
          <Flex
            style={{
              borderRadius: 24,
              height: 250,
              background: gray[6],
            }}
          >
            <Image
              style={{
                borderRadius: 16,
                height: "100%",
                objectFit: "cover",
              }}
              preview={false}
              src={channel?.banner_image}
              width={"100%"}
            />
          </Flex>
        )}
        {/* Info */}
        <Flex gap={16}>
          <Image
            style={{ borderRadius: "100%" }}
            src={channel?.picture}
            width={200}
            preview={false}
          />
          <Flex vertical gap={4} style={{ padding: "1em 0" }}>
            <Typography.Title style={{ margin: 0 }}>
              {channel?.name}
            </Typography.Title>
            <Typography.Text type="secondary">
              {`@${channel?.user_handle}`}
              {" | "}
              {`${subscribersCount} ${
                subscribersCount === 1 ? "Subscriber" : "Subscribers"
              }`}
              {videos.length === 0
                ? null
                : ` | ${videos?.length} 
              ${videos?.length === 1 ? "Video" : "Videos"}`}
            </Typography.Text>
            {channel?.desc && (
              <Flex
                gap={4}
                style={{ cursor: "pointer" }}
                onClick={() => setIsDescModalOpen(true)}
              >
                <Typography.Text strong type="secondary">
                  {channel?.desc}
                </Typography.Text>
                <RightOutlined style={{ color: gray[5] }} />
              </Flex>
            )}
            {channel?.links?.length > 0 && (
              <Typography.Text type="secondary">
                {channel?.links?.length === 1 ? (
                  <Link target="_blank" to={channel?.links[0]?.url}>
                    {channel?.links[0]?.url}
                  </Link>
                ) : (
                  <>
                    <Link target="_blank" to={channel?.links[0]?.url}>
                      <Typography.Text strong style={{ color: "#3e7bff" }}>
                        {channel?.links[0]?.url?.replace(/^https:\/\//, "")}
                      </Typography.Text>
                    </Link>
                    <Typography.Text strong>
                      {" "}
                      <Typography.Text
                        strong
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsDescModalOpen(true)}
                      >
                        and {channel?.links?.length - 1} more{" "}
                        {channel?.links?.length - 1 === 1 ? "link" : "links"}
                      </Typography.Text>
                    </Typography.Text>
                  </>
                )}
              </Typography.Text>
            )}
            {/* Actions */}
            <Flex>
              {channel?._id ? (
                !isMyOwnChannel ? (
                  isSubscribed ? (
                    <Button disabled={!user?._id} onClick={subORUnsubChannel}>
                      Unsubscribe
                    </Button>
                  ) : (
                    <Button
                      disabled={!user?._id}
                      onClick={subORUnsubChannel}
                      type="primary"
                    >
                      Subscribe
                    </Button>
                  )
                ) : (
                  <Link to={`/studio/customization`}>
                    <Button type="default" icon={<EditOutlined />}>
                      Customize
                    </Button>
                  </Link>
                )
              ) : null}
            </Flex>
          </Flex>
        </Flex>

        {/* Tabs */}
        <Tabs
          defaultActiveKey={"videos"}
          activeKey={activeTab || "videos"}
          items={items}
          // tabBarExtraContent={<CustomizationTabAction />}
          onChange={(key_name) => setSearchParams({ tab: key_name })}
        />

        {/* MODAL */}
        <ChannelDescModal
          open={isDescModalOpen}
          closeModal={() => setIsDescModalOpen(false)}
          channel={channel}
        />
      </Flex>
    </>
  );
}
