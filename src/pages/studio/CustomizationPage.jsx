import BasicInfoScreen from "@/Screens/studio/BasicInfoScreen";
import BrandingScreen from "@/Screens/studio/BrandingScreen";
import CustomizationTabAction from "@/components/customization-page/CustomizationTabAction";
import PageTitle from "@/components/ui/PageTitle";
import CustomizationFormProvider from "@/context/Form/CustomizationFormContext";
import { Tabs } from "antd";
import {
  useSearchParams,
} from "react-router-dom";

const items = [
  {
    key: "branding",
    label: "Branding",
    children: <BrandingScreen />,
  },
  {
    key: "basic_info",
    label: "Basic info",
    children: <BasicInfoScreen />,
  },
];

export default function CustomizationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <>
      <CustomizationFormProvider>
        <PageTitle title={"Customization"} divider />
        <Tabs
          defaultActiveKey={"branding"}
          activeKey={activeTab}
          items={items}
          tabBarExtraContent={<CustomizationTabAction />}
          onChange={(key_name) => {
            // Change the query in URL
            setSearchParams({ tab: key_name });
          }}
        />
      </CustomizationFormProvider>
    </>
  );
}
