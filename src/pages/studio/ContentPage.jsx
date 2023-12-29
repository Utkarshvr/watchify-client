import PageTitle from "@/components/ui/PageTitle";
import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import VideoContentScreen from "./VideoContentScreen";

const items = [
  {
    key: "video",
    label: "Video",
    children: <VideoContentScreen />,
  },
];

export default function ContentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <>
      <PageTitle title={"Channel Content"} divider />
      <Tabs
        defaultActiveKey={"video"}
        activeKey={activeTab || "video"}
        items={items}
        // tabBarExtraContent={<CustomizationTabAction />}
        onChange={(key_name) => {
          // Change the query in URL
          setSearchParams({ tab: key_name });
        }}
      />
    </>
  );
}
