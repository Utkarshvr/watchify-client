import BasicInfoScreen from "@/Screens/studio/BasicInfoScreen";
import BrandingScreen from "@/Screens/studio/BrandingScreen";
import CustomizationTabAction from "@/components/customization-page/CustomizationTabAction";
import PageTitle from "@/components/ui/PageTitle";
import CustomizationFormProvider from "@/context/Form/CustomizationFormContext";
import { Tabs } from "antd";

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
      <CustomizationFormProvider>
        <PageTitle title={"Customization"} divider />
        <Tabs
          defaultActiveKey="Branding"
          items={items}
          tabBarExtraContent={<CustomizationTabAction />}
        />
      </CustomizationFormProvider>
    </>
  );
}
