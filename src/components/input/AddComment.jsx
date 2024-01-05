import { useAuthUser } from "@/context/Auth/AuthProvider";
import { Avatar, Button, Flex, Input } from "antd";
import { useState } from "react";

export default function AddComment() {
  const user = useAuthUser();

  const [value, setValue] = useState("");
  const [isUserCommenting, setIsUserCommenting] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const autoExpand = () => {
    const textarea = document.getElementById("autoExpandTextarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <Flex gap={12} vertical>
      <Flex align="center" gap={16}>
        <Avatar src={user?.picture} size={"large"} />

        <Input.TextArea
          id="autoExpandTextarea"
          placeholder="Add a comment..."
          value={value}
          onChange={handleChange}
          onClick={() => setIsUserCommenting(true)}
          onInput={autoExpand}
          rows="1"
          style={{
            width: "100%",
            resize: "none",
            padding: 12,
            overflow: "hidden",
          }}
        />
      </Flex>
      {isUserCommenting && (
        <Flex justify="end" gap={8}>
          <Button onClick={() => setIsUserCommenting(false)}>Cancel</Button>
          <Button type="primary" disabled={!value}>
            Comment
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
