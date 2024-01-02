import {
  getChannel,
  getVideoByID,
  likeContent,
  subORUnsub,
} from "@/api/apiCalls";
import { gray } from "@ant-design/colors";
import {
  LikeOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShareModal from "../modal/ShareModal";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import SaveToPlaylistModal from "../modal/SaveToPlaylistModal";

export default function VideoCardLong({ videoID }) {
  // Video States
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Channel States
  const [channelInfo, setchannelInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [subscribersCount, setSubscribersCount] = useState(0);

  // Share Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Own Details
  const user = useAuthUser();

  useEffect(() => {
    (async () => {
      if (videoID) {
        try {
          const { data } = await getVideoByID(videoID);
          setVideo(data.video);
          setIsLiked(data.video?.isLiked);
          setLikesCount(data.video?.likes_count);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [videoID]);

  const channelID = video?.creator?._id;

  useEffect(() => {
    if (channelID)
      (async () => {
        try {
          const { data } = await getChannel(channelID);
          setchannelInfo(data?.channel);
          setIsSubscribed(data?.channel?.isSubscribed);
          setSubscribersCount(data?.channel?.subscribers_count);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [channelID]);

  async function subORUnsubChannel() {
    try {
      const { data } = await subORUnsub(channelID);
      setIsSubscribed(data?.isSubscribed);
      setSubscribersCount((prev) => (data?.isSubscribed ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(error);
    }
  }

  async function likeORUnlikeVideo() {
    try {
      const { data } = await likeContent(videoID, "video");
      setIsLiked(data?.isLiked);
      setLikesCount((prev) => (data?.isLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(error);
    }
  }

  return isLoading && !video ? (
    <p>LOADING...</p>
  ) : (
    <>
      <Flex
        style={{
          width: "100%",
        }}
        vertical
        gap={6}
      >
        {/* THUMBNAIL */}
        <video
          src={video?.link}
          controls
          autoPlay
          style={{
            borderRadius: 12,
            width: "1200px",
            maxWidth: "100%",
            maxHeight: 600,
          }}
        />

        {/* CHANNEL INFO */}
        <Flex vertical style={{ padding: "0 0.5em" }} gap={8}>
          <Typography.Text style={{ fontSize: 18 }} strong>
            {video?.title}
          </Typography.Text>

          {/* Channel Info & Action Box */}
          <Flex justify="space-between">
            <Flex gap={8} align="center">
              <Link to={`/channel/@${video?.creator?.user_handle}`}>
                <Avatar
                  style={{ minWidth: "40px", minHeight: "40px" }}
                  src={video?.creator?.picture}
                  size={"default"}
                />
              </Link>
              <Flex vertical>
                <Link to={`/channel/@${video?.creator?.user_handle}`}>
                  <Typography.Text
                    style={{ fontSize: 14 }}
                    strong
                    type="secondary"
                  >
                    {video?.creator?.name}
                  </Typography.Text>
                </Link>

                <Typography.Text style={{ fontSize: 12 }} type="secondary">
                  {subscribersCount}{" "}
                  {subscribersCount === 1 ? "Subscriber" : "Subscribers"}
                </Typography.Text>
              </Flex>
              {channelInfo ? (
                user?._id === channelID ? null : isSubscribed ? (
                  <Button onClick={subORUnsubChannel}>Unsubscribe</Button>
                ) : (
                  <Button onClick={subORUnsubChannel} type="primary">
                    Subscribe
                  </Button>
                )
              ) : null}
            </Flex>

            {/* Actions */}
            <Flex align="center" gap={8}>
              {/* (Like, Dislike) | Share |  */}

              <Button
                shape="circle"
                icon={<LikeOutlined />}
                style={{
                  ...(isLiked ? { background: gray[6] } : {}),
                }}
                onClick={likeORUnlikeVideo}
              >
                {likesCount}
              </Button>
              <Button
                onClick={() => setIsShareModalOpen(true)}
                icon={<ShareAltOutlined />}
              >
                Share
              </Button>
              <Button
                onClick={() => setIsSaveModalOpen(true)}
                icon={<PlusCircleOutlined />}
              >
                Save
              </Button>
              {/* <Dropdown menu={{ items }} trigger={["click"]}>
                <Button shape="circle" icon={<MoreOutlined />} />
              </Dropdown> */}
            </Flex>
          </Flex>

          {/* Description Box */}
          <Flex
            vertical
            style={{ borderRadius: 12, background: gray[6], padding: 12 }}
            gap={8}
          >
            <Typography.Text strong>
              {video?.views_count}{" "}
              {video?.views_count === 1 ? "view" : "views "}
              {" | "}
              {formatDistanceToNow(new Date(video?.createdAt), {
                addSuffix: true,
              })}
            </Typography.Text>
            <Typography.Text>{video?.desc}</Typography.Text>
          </Flex>
        </Flex>

        {/* MODAL */}
        {isShareModalOpen ? (
          <ShareModal
            open={isShareModalOpen}
            closeModal={() => setIsShareModalOpen(false)}
            url={`${import.meta.env.VITE_CLIENT_URL}/videos/${videoID}`}
          />
        ) : null}
        {isSaveModalOpen ? (
          <SaveToPlaylistModal
            open={isSaveModalOpen}
            closeModal={() => setIsSaveModalOpen(false)}
            video_uuid={video?._id}
          />
        ) : null}
      </Flex>
    </>
  );
}
