import { gray } from "@ant-design/colors";
import { Button, Empty, Flex, Layout, Typography } from "antd";
import { Link, useRouteError } from "react-router-dom";
import errorImg from "@/assets/images/error-img.png";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Layout style={{ background: gray[7], minHeight: "100vh" }}>
      <Flex justify="center" align="center" style={{ margin: "auto" }} vertical>
        <Empty
          image={errorImg}
          imageStyle={{
            height: 300,
          }}
          description={
            <Flex justify="center" align="center" gap={16} vertical>
              <Flex justify="center" align="center" gap={2} vertical>
                <Typography.Text type="secondary" strong>
                  Sorry, an unexpected error has occurred
                </Typography.Text>
                <Typography.Text type="danger" strong>
                  {error.statusText || error.message}
                </Typography.Text>
              </Flex>
              <Link to="/" component={Button}>
                <Button type="primary">Go Back</Button>
              </Link>
            </Flex>
          }
        />
      </Flex>
    </Layout>
  );
};

export default ErrorPage;
