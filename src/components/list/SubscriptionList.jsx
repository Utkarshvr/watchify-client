import { useSubscriptionData } from "@/context/Other/SubscriptionProvider";
import { Avatar, Flex, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";

export default function SubscriptionList() {
  const { subscriptions, isLoading } = useSubscriptionData();

  return (
    <Flex
      gap={12}
      align="center"
      style={{
        overflowX: "scroll",
        padding: "0.8em 0",
      }}
    >
      {isLoading ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
            <Skeleton.Avatar
              key={e}
              active={isLoading}
              size={"large"}
              shape={"circle"}
            />
          ))}
        </>
      ) : (
        subscriptions.map(({ channel }) => {
          return (
            <Link key={channel?._id} to={`/channel/@${channel?.user_handle}`}>
              <Flex vertical gap={4} justify="center" align="center">
                <Avatar src={channel?.picture} size={"default"} />
                <Typography.Text strong style={{ fontSize: 8 }}>
                  @{channel?.user_handle}
                </Typography.Text>
              </Flex>
            </Link>
          );
        })
      )}
    </Flex>
  );
}
