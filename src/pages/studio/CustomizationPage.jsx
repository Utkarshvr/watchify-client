import BasicInfoScreen from "@/Screens/studio/BasicInfoScreen";
import BrandingScreen from "@/Screens/studio/BrandingScreen";
import PageTitle from "@/components/ui/PageTitle";
import { Button, Tabs } from "antd";

const items = [
  {
    key: "Branding",
    label: "Branding",
    children: <BrandingScreen />,
  },
  {
    key: "Basic info",
    label: "Basic info",
    children: <BasicInfoScreen />,
  },
];

export default function CustomizationPage() {
  return (
    <>
      <PageTitle title={"Customization"} divider />
      <Tabs
        defaultActiveKey="Branding"
        items={items}
        // onChange={onChange}
        tabBarExtraContent={
          <>
            {" "}
            <Button>Btn</Button>
          </>
        }
      />
    </>
  );
}
