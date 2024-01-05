import { useAuthUser } from "@/context/Auth/AuthProvider";
import { Avatar, Button, Flex, Input } from "antd";

export default function AddComment({
  isReply,
  handleChange,
  value,
  showActions,
  hideActions,
  isUserCommentingorReplying,
  onSubmit,
  isPostingComment,
}) {
  const user = useAuthUser();

  const autoExpand = () => {
    const textarea = document.getElementById("autoExpandTextarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <Flex gap={12} vertical>
      <Flex align="center" gap={16}>
        <Avatar src={user?.picture} size={isReply ? "small" : "large"} />

        <Input.TextArea
          id="autoExpandTextarea"
          placeholder={isReply ? "Add a reply..." : "Add a comment..."}
          value={value}
          onChange={handleChange}
          onClick={showActions}
          onInput={autoExpand}
          rows="1"
          style={{
            width: "100%",
            resize: "none",
            padding: isReply ? 6 : 12,
            overflow: "hidden",
          }}
          size={isReply ? "small" : "middle"}
        />
      </Flex>
      {isUserCommentingorReplying && (
        <Flex justify="end" gap={8}>
          <Button size={isReply ? "small" : "middle"} onClick={hideActions}>
            Cancel
          </Button>
          <Button
            size={isReply ? "small" : "middle"}
            type="primary"
            disabled={!value || isPostingComment}
            onClick={onSubmit}
          >
            {isReply ? "Reply" : "Comment"}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
