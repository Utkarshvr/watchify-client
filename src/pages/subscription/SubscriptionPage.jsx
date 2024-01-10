import SubscriptionList from "@/components/list/SubscriptionList";
import SubscriptionVideos from "@/components/subscriptions/SubscriptionVideos";
import PageTitle from "@/components/ui/PageTitle";
import SubscriptionProvider from "@/context/Other/SubscriptionProvider";
import { Flex } from "antd";

export default function SubscriptionPage() {
  return (
    <SubscriptionProvider>
      <PageTitle title={"Subscriptions"} />
      <Flex vertical gap={12}>
        <SubscriptionList />
        <SubscriptionVideos />
      </Flex>
    </SubscriptionProvider>
  );
}
