import { useEffect, useState } from "react";
import { Button, Flex, Image, Table, Typography } from "antd";
import { getAllVideos } from "@/api/apiCalls";

import VideoPlayerIntefaceImg from "@/assets/images/video-player-interface.jpg";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthUser } from "@/context/Auth/AuthProvider";

export default function VideoContentScreen() {
  const [videos, setVideos] = useState([]);
  const user = useAuthUser();
  console.log(videos);

  useEffect(() => {
    if (user)
      (async () => {
        try {
          const { data } = await getAllVideos(user?._id);
          setVideos(data?.videos);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [user]);

  const dataSource = videos.map((video) => ({
    key: video?._id,
    video: (
      <>
        <Flex gap={12}>
          <Image
            src={video?.thumbnail || VideoPlayerIntefaceImg}
            referrerPolicy="no-referrer"
            style={{ width: "120px" }}
          />
          <Flex vertical gap={4}>
            <Typography.Text type="secondary">{video?.title}</Typography.Text>
            <Button
              style={{ maxWidth: "fit-content" }}
              size="small"
              shape="circle"
            >
              <Link target="_blank" to={`/videos/${video?.videoID}`}>
                <LinkOutlined />
              </Link>
            </Button>
          </Flex>
        </Flex>
      </>
    ),
    visibility: (
      <Flex gap={8} align="center">
        {video?.isPublic ? <EyeOutlined /> : <EyeInvisibleOutlined />}

        <Typography.Text type="secondary">
          {video?.isPublic ? "Public" : "Private"}
        </Typography.Text>
      </Flex>
    ),
    date: new Date(video?.createdAt).toDateString(),
    views: video?.views_count,
    comments: video?.numComments,
    actions: (
      <Flex justify="center" gap={8}>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Flex>
    ),
  }));

  return (
    <div>
      <Table
        style={{ maxWidth: "100%" }}
        // rowSelection={rowSelection}
        columns={[
          {
            title: "Video",
            dataIndex: "video",
            fixed: "left",
            width: 450,
          },
          {
            title: "Visibility",
            dataIndex: "visibility",
          },
          {
            title: "Date",
            dataIndex: "date",
          },
          {
            title: "Views",
            dataIndex: "views",

            align: "center",
          },
          {
            title: "Comments",
            dataIndex: "comments",

            align: "center",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            align: "center",
            fixed: "right",
            width: 200,
          },
        ]}
        dataSource={dataSource}
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
}
