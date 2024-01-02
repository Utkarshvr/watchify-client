import {
  InstagramFilled,
  LinkOutlined,
  YoutubeFilled,
  TwitterSquareFilled,
  FacebookFilled,
  LinkedinFilled,
//   PinterestSquareFilled,
  GithubFilled,
  RedditSquareFilled,
//   SnapchatSquareFilled,
//   WhatsAppSquareFilled,
//   TumblrSquareFilled,
  SlackSquareFilled,
  DribbbleSquareFilled,
  BehanceSquareFilled,
} from "@ant-design/icons";

import { Flex, Modal, Typography } from "antd";
import { Link } from "react-router-dom";

export default function ChannelDescModal({ closeModal, open, channel }) {
  const desc = channel?.desc;
  const renderDescription = () => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    const parts = desc.split(linkRegex);

    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>;
      } else {
        const url = part.trim();
        return (
          <Link key={index} to={url} target="_blank">
            {url}
          </Link>
        );
      }
    });
  };

  return (
    <Modal
      title="About"
      centered
      open={open}
      okButtonProps={{
        style: { display: "none" },
      }}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      onCancel={closeModal}
    >
      <Typography.Text style={{ whiteSpace: "break-spaces" }}>
        {desc ? renderDescription() : null}
      </Typography.Text>

      <Flex vertical style={{ margin: "1em 0" }}>
        <Typography.Title style={{ fontSize: 18 }}>Links</Typography.Title>
        <Flex vertical gap={8}>
          {channel?.links?.map((link) => (
            <Flex gap={8} key={link?.url}>
              {/* ICON */}
              <SocialIcon fontSize={20} url={link?.url} />
              <Flex vertical>
                <Typography.Text strong style={{ fontSize: 14, margin: 0 }}>
                  {link?.platform}
                </Typography.Text>
                <Link to={link?.url} target="_blank">
                  {link?.url?.replace(/^https?:\/\/(www\.)?/, "")}
                </Link>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Modal>
  );
}
function SocialIcon({ url, fontSize }) {
  // Extract the desired part (e.g., "instagram")
  const websiteName = url.match(/^https?:\/\/(?:www\.)?([^.]+)\./)?.[1] || "";

  switch (websiteName) {
    case "instagram":
      return <InstagramFilled style={{ fontSize }} />;
    case "youtube":
      return <YoutubeFilled style={{ fontSize }} />;
    case "twitter":
      return <TwitterSquareFilled style={{ fontSize }} />;
    case "facebook":
      return <FacebookFilled style={{ fontSize }} />;
    case "linkedin":
      return <LinkedinFilled style={{ fontSize }} />;
    // case "pinterest":
    //   return <PinterestSquareFilled style={{ fontSize }} />;
    case "github":
      return <GithubFilled style={{ fontSize }} />;
    case "reddit":
      return <RedditSquareFilled style={{ fontSize }} />;
    // case "snapchat":
    //   return <SnapchatSquareFilled style={{ fontSize }} />;
    // case "whatsapp":
    //   return <WhatsAppSquareFilled style={{ fontSize }} />;
    // case "tumblr":
    //   return <TumblrSquareFilled style={{ fontSize }} />;
    case "slack":
      return <SlackSquareFilled style={{ fontSize }} />;
    case "dribbble":
      return <DribbbleSquareFilled style={{ fontSize }} />;
    case "behance":
      return <BehanceSquareFilled style={{ fontSize }} />;
    default:
      return <LinkOutlined style={{ fontSize }} />;
  }
}
