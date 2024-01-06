import { Avatar, Button, Flex, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "../input/AddComment";
import { LikeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { addCommentToVideo } from "@/api/apiCalls";
import { useMessageAPI } from "@/context/Other/MessageProvider";

export default function RenderComments({ comments, videoID, refreshComments }) {
  const { success, error: errorAPI } = useMessageAPI();

  const [value, setValue] = useState("");
  const [replyStates, setReplyStates] = useState({});
  const [isPostingComment, setIsPostingComment] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log({ comments, videoID });

  const onSubmit = async (commentId) => {
    setIsPostingComment(true);
    try {
      const data = await addCommentToVideo(
        videoID,
        {
          content: value,
        },
        commentId
      );
      console.log(data);
      success("Reply Added");
      refreshComments();
    } catch (error) {
      console.log(error);
      errorAPI("Couldn't add reply");
    } finally {
      setIsPostingComment(false);
      setReplyStates((prevStates) => ({ ...prevStates, [commentId]: false }));
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyStates((prevStates) => ({ ...prevStates, [commentId]: true }));
  };

  return (
    <>
      {comments?.map((comment) => (
        <Flex gap={16} key={comment?._id}>
          <Link to={`/channel/@${comment?.commenter?.user_handle}`}>
            <Avatar
              src={comment?.commenter?.picture}
              size={comment?.isReply ? "small" : "large"}
            />
          </Link>
          <Flex style={{ width: "100%" }} vertical gap={16}>
            <Flex vertical gap={2}>
              <Flex gap={4}>
                <Link to={`/channel/@${comment?.commenter?.user_handle}`}>
                  <Typography.Text
                    style={{
                      ...(comment?.isReply ? { fontSize: 12 } : {}),
                    }}
                    strong
                  >
                    {`@${comment?.commenter?.user_handle}`}
                  </Typography.Text>
                </Link>
                <Typography.Text
                  style={{
                    ...(comment?.isReply ? { fontSize: 12 } : {}),
                  }}
                  type="secondary"
                >
                  {formatDistanceToNow(comment?.createdAt, { addSuffix: true })}
                </Typography.Text>
              </Flex>
              <Typography.Text
                style={{
                  ...(comment?.isReply ? { fontSize: 14 } : {}),
                }}
              >
                {comment?.content}
              </Typography.Text>
              {/* Actions */}
              <Flex gap={2}>
                <Button
                  style={{ maxWidth: "max-content" }}
                  shape="circle"
                  icon={<LikeOutlined />}
                  size="small"
                />
                {!replyStates[comment._id] && (
                  <Button
                    size="small"
                    style={{ maxWidth: "max-content" }}
                    type="text"
                    onClick={() => handleReplyClick(comment._id)}
                  >
                    Reply
                  </Button>
                )}
              </Flex>
              {replyStates[comment._id] && (
                <AddComment
                  isUserCommentingorReplying={replyStates[comment._id]}
                  isReply
                  value={value}
                  handleChange={handleChange}
                  hideActions={() =>
                    setReplyStates((prevStates) => ({
                      ...prevStates,
                      [comment._id]: false,
                    }))
                  }
                  showActions={() =>
                    setReplyStates((prevStates) => ({
                      ...prevStates,
                      [comment._id]: true,
                    }))
                  }
                  onSubmit={() => onSubmit(comment._id)}
                  isPostingComment={isPostingComment}
                />
              )}
            </Flex>
            {comment?.replies?.length > 0 && (
              <RenderComments
                key={comment?._id}
                videoID={videoID}
                comments={comment?.replies}
                refreshComments={refreshComments}
              />
            )}
          </Flex>
        </Flex>
      ))}
    </>
  );
}
