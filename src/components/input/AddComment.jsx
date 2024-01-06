import { addCommentToVideo } from "@/api/apiCalls";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import { useMessageAPI } from "@/context/Other/MessageProvider";
import { Avatar, Button, Flex, Input } from "antd";
import { useState } from "react";

export default function AddComment({
  isReply,
  // handleChange,
  // value,
  showCommentForm,
  hideCommentForm,
  isUserCommentingorReplying,
  // onSubmit,
  // isPostingComment,
  refreshComments,

  videoID,
  commentId,
}) {
  console.log("AddCommentts.jsx");

  const user = useAuthUser();
  const { success, error: errorAPI } = useMessageAPI();

  const autoExpand = () => {
    const textarea = document.getElementById("autoExpandTextarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [value, setValue] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsPostingComment(true);
    try {
      const data = await addCommentToVideo(
        videoID,
        {
          content: value,
        },
        isReply && commentId ? commentId : null
      );
      console.log(data);
      success("Reply Added");
      refreshComments();
      if (isReply) hideCommentForm();
      setValue("");
      autoExpand();
    } catch (error) {
      console.log(error);
      errorAPI("Couldn't add reply");
    } finally {
      setIsPostingComment(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex gap={12} vertical>
        <Flex align="center" gap={16}>
          <Avatar src={user?.picture} size={isReply ? "small" : "large"} />

          <Input.TextArea
            id="autoExpandTextarea"
            placeholder={isReply ? "Add a reply..." : "Add a comment..."}
            value={value}
            onChange={handleChange}
            onClick={showCommentForm}
            onInput={autoExpand}
            rows="1"
            style={{
              width: "100%",
              resize: "none",
              padding: isReply ? 6 : 12,
              overflow: "hidden",
              ...(value?.length > 0 ? {} : { height: "auto" }),
            }}
            size={isReply ? "small" : "middle"}
          />
        </Flex>
        {isReply && isUserCommentingorReplying ? (
          <Flex justify="end" gap={8}>
            <Button
              size={isReply ? "small" : "middle"}
              onClick={hideCommentForm}
            >
              Cancel
            </Button>
            <Button
              size={isReply ? "small" : "middle"}
              htmlType="submit"
              type="primary"
              disabled={!value || isPostingComment}
              // onClick={onSubmit}
            >
              {isReply ? "Reply" : "Comment"}
            </Button>
          </Flex>
        ) : value.length > 0 ? (
          <Flex justify="end" gap={8}>
            <Button
              size={isReply ? "small" : "middle"}
              onClick={hideCommentForm}
            >
              Cancel
            </Button>
            <Button
              size={isReply ? "small" : "middle"}
              htmlType="submit"
              type="primary"
              disabled={!value || isPostingComment}
              // onClick={onSubmit}
            >
              {isReply ? "Reply" : "Comment"}
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </form>
  );
}
