import { Flex, Image, List } from "antd";
import { Link } from "react-router-dom";
import NotificationIcon from "./NotificationIcon";
import notificationTypes from "@/constant/notificationTypes";

export default function NotificationItem({ item, isUnread }) {
  let title,
    description,
    imageSrc,
    avatar,
    isLinkRequired,
    link_href = null;
  console.log(item);
  avatar = <NotificationIcon severity={item?.severity} />;

  switch (item?.notificationType) {
    case notificationTypes.videoUpload.success():
      title = item?.payload?.video?.title + ": " + "Uploaded";
      description = new Date(item?.createdAt).toLocaleString();
      imageSrc = item?.payload?.video?.thumbnail;
      link_href = `/video/${item?.payload?.video?.videoID}`;
      isLinkRequired = true;

      break;

    default:
      title = item?.payload?.video?.title + ": " + "Uploading...";
      description = new Date(item?.createdAt).toLocaleString();
    //   imageSrc = null;
      //   link_href = `/video/${item?.payload?.video?.videoID}`;
      isLinkRequired = false;

      break;
  }

  console.log(
    {
      title,
      description,
      imageSrc,
      avatar,
      isLinkRequired,
      link_href,
    },
    item?.notificationType,
    notificationTypes.videoUpload.success()
  );
  const content = (
    <List.Item>
      <List.Item.Meta avatar={avatar} title={title} description={description} />
      <Flex gap={8} align="center">
        <Image src={imageSrc} preview={false} width={100} />

        {isUnread && (
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "100%",
              background: "#fff",
            }}
          />
        )}
      </Flex>
    </List.Item>
  );

  return isLinkRequired ? <Link to={link_href}>{content}</Link> : content;
}
