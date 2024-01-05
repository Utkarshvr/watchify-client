import { Flex, Typography } from "antd";
import AddComment from "../input/AddComment";
import { useEffect, useState } from "react";
import { getCommentsOfVideo } from "@/api/apiCalls";
import RenderComments from "../ui/RenderComments";

export default function CommentSection({ videoID }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ videoID });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await getCommentsOfVideo("6597ecdb3dc5600f638e1bc9");
        console.log(data);

        setComments(data?.data?.comments || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading)
    return (
      <Typography.Text strong type="success">
        Loading Comments...
      </Typography.Text>
    );
  return (
    <Flex vertical gap={16}>
      <Typography.Text style={{ fontSize: 20 }} strong>
        {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
      </Typography.Text>

      <AddComment videoID={videoID} />

      {/* All Comments */}
      <Flex gap={16} vertical>
        <RenderComments videoID={videoID} comments={comments} />
      </Flex>
    </Flex>
  );
}
