import { Flex, Typography } from "antd";

export default function ScreenTitle({ title, content }) {
  return (
    <Flex vertical>
      <Typography.Title level={4}>{title}</Typography.Title>

      <Typography.Text type="secondary">{content}</Typography.Text>
    </Flex>
  );
}
