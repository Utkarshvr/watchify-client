import { VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Empty, Flex, Typography } from "antd";
import { Link } from "react-router-dom";

export default function NoVideo() {
  return (
    <Flex justify="center" align="center" style={{ margin: "auto" }} vertical>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 200,
        }}
        description={
          <Flex justify="center" align="center" gap={8} vertical>
            <Typography.Text type="secondary" strong>
              No Videos Found
            </Typography.Text>
            <Link to="/studio" component={Button}>
              <Button icon={<VideoCameraAddOutlined />} type="primary">
                Create
              </Button>
            </Link>
          </Flex>
        }
      />
    </Flex>
  );
}
