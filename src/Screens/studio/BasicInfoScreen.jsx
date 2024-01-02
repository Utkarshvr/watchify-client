import { Button, Flex, Form, Input, Typography } from "antd";
import ScreenTitle from "@/components/ui/ScreenTitle";
import {
  CheckOutlined,
  CopyOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  useCustomizationAPI,
  useCustomizationForm,
} from "@/context/Form/CustomizationFormContext";
import { useRef, useState } from "react";

export default function BasicInfoScreen() {
  const scrollContainerRef = useRef(null);

  const [isCopied, setIsCopied] = useState(false);
  const [hasClickedAddLinkBtn, setHasClickedAddLinkBtn] = useState(false);

  const values = useCustomizationForm();
  const api = useCustomizationAPI();

  const scrollToBottom = () => {
    // Use current to access the DOM element
    scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // remove link
  const handleRemoveLink = (index) => {
    const updatedLink = [...values.basic.links];
    updatedLink.splice(index, 1); // Remove the object at the specified index
    api.setFieldValue("basic.links", updatedLink);
  };
  // add link
  const handleAddLink = () => {
    const updatedLink = [...values.basic.links];
    updatedLink.push({
      platform: "",
      url: "",
    });
    api.setFieldValue("basic.links", updatedLink);

    setHasClickedAddLinkBtn(true);
    scrollToBottom();
  };

  return (
    <>
      <Flex style={{ maxWidth: "800px", overflowY: "auto" }} vertical>
        <Form>
          <Flex vertical gap={24}>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Channel Name"}
                content={
                  "Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on YouTube and not other Google services. You can change your name twice in 14 days."
                }
              />
              <Input
                placeholder="Channel Name"
                value={values?.basic?.name}
                onChange={api.handleChange}
                name="basic.name"
              />
            </Flex>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Handle"}
                content={
                  "Choose your unique handle by adding letters and numbers. You can change your handle back within 14 days. Handles can be changed twice every 14 days. "
                }
              />
              <Input
                addonBefore="@"
                placeholder="Handle"
                value={values?.basic?.user_handle}
                onChange={api.handleChange}
                name="basic.user_handle"
              />
              <Typography.Text type="secondary">{`${
                import.meta.env.VITE_CLIENT_URL
              }/channel/@${values?.basic?.user_handle}`}</Typography.Text>
            </Flex>
            <Flex vertical gap={12}>
              <ScreenTitle title={"Description"} />
              <Input.TextArea
                placeholder="Description"
                value={values?.basic?.desc}
                onChange={api.handleChange}
                name="basic.desc"
                style={{ height: 160 }}
              />
            </Flex>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Channel URL"}
                content={`This is the standard web address for your channel. It includes your unique channel ID, which is the numbers and letters at the end of the URL. `}
              />
              <Input
                addonBefore="https://www.watchify.com/channel/"
                placeholder="Handle"
                value={`${values?.basic?.channelID}`}
                addonAfter={
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={
                      isCopied ? (
                        <CheckOutlined style={{ color: "#53ffa3" }} />
                      ) : (
                        <CopyOutlined />
                      )
                    }
                    onClick={() => {
                      // Copy `values?.basic?.channelID`
                      navigator.clipboard.writeText(values?.basic?.channelID);
                      setIsCopied(true);

                      // Reset the "Copied" state after a short delay
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 2000);
                    }}
                  />
                }
                readOnly
              />
            </Flex>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Links"}
                content={`Share external links with your viewers. They'll be visible on your channel profile and about page.`}
              />
              {values?.basic?.links?.length > 0
                ? values?.basic?.links?.map(({ platform, url }, index) => (
                    <Flex key={url} gap={8}>
                      <Input
                        style={{ maxWidth: 150 }}
                        placeholder="Link Title"
                        value={platform}
                        name={`basic.links[${index}].platform`}
                        onChange={api.handleChange}
                        autoFocus={
                          hasClickedAddLinkBtn &&
                          index === values.basic.links.length - 1
                        }
                      />
                      <Input
                        placeholder="URL"
                        value={url}
                        name={`basic.links[${index}].url`}
                        onChange={api.handleChange}
                      />
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        size="small"
                        icon={<MinusCircleOutlined />}
                        onClick={() => handleRemoveLink(index)}
                      />
                    </Flex>
                  ))
                : null}
              <Button
                style={{ width: "fit-content" }}
                type="text"
                icon={<PlusOutlined />}
                onClick={handleAddLink}
              >
                Add Link
              </Button>
            </Flex>
          </Flex>
        </Form>
        <div style={{ width: "100%", height: 64 }} ref={scrollContainerRef} />
      </Flex>
    </>
  );
}
