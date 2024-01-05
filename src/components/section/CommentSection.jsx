import { Flex, Typography } from "antd";
import AddComment from "../input/AddComment";

export default function CommentSection() {
  return (
    <Flex vertical gap={16}>
      <Typography.Text style={{ fontSize: 20 }} strong>
        816 Comments
      </Typography.Text>

      <AddComment />
    </Flex>
  );
}
