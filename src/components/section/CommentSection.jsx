import { Flex, Typography } from "antd";
import AddComment from "../input/AddComment";
import { useEffect, useState } from "react";
import { getCommentsOfVideo } from "@/api/apiCalls";
import RenderComments from "../ui/RenderComments";

export default function CommentSection({ videoID }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserCommented, setHasUserCommented] = useState(false);

  const refreshComments = () => setHasUserCommented((prev) => !prev);

  useEffect(() => {
    if (videoID)
      (async () => {
        setIsLoading(true);
        try {
          const { data } = await getCommentsOfVideo(videoID);
          console.log(data);

          setComments(data?.data?.comments || []);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      })();
  }, [hasUserCommented, videoID]);

  if (comments?.length === 0 && isLoading)
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

      <AddComment videoID={videoID} refreshComments={refreshComments} />

      {/* All Comments */}
      <Flex gap={16} vertical>
        <RenderComments
          videoID={videoID}
          refreshComments={refreshComments}
          comments={comments}
        />
      </Flex>
    </Flex>
  );
}
