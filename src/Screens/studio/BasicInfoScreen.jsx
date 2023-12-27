import { Button, Flex, Form, Grid, Image, Input, Typography } from "antd";
import LayoutMockup from "@/assets/images/Layout-Mockup.png";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import ScreenTitle from "@/components/ui/ScreenTitle";
import { PlusOutlined } from "@ant-design/icons";

export default function BasicInfoScreen() {
  const screens = Grid.useBreakpoint();

  const user = useAuthUser();

  return (
    <>
      <Flex vertical gap={32}>
        <Form>
          <Flex vertical gap={24}>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Channel Name"}
                content={
                  "Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on YouTube and not other Google services. You can change your name twice in 14 days."
                }
              />
              <Input placeholder="Channel Name" value={user?.name} />
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
                value={user?.user_handle}
              />
              <Typography.Text type="secondary">{`https://www.watchify.com/${user?.user_handle}`}</Typography.Text>
            </Flex>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Channel URL"}
                content={`This is the standard web address for your channel. It includes your unique channel ID, which is the numbers and letters at the end of the URL. `}
              />
              <Input
                addonBefore="https://www.watchify.com/channel/"
                placeholder="Handle"
                value={`${user?.channelID}`}
              />
            </Flex>
            <Flex vertical gap={12}>
              <ScreenTitle
                title={"Links"}
                content={`Share external links with your viewers. They'll be visible on your channel profile and about page.`}
              />
              {[
                {
                  linkTitle: "Instagram",
                  url: "https://www.instagram.com/uv._.codes/",
                },
                {
                  linkTitle: "Twitter",
                  url: "https://twitter.com/uv_codes",
                },
                {
                  linkTitle: "Linkedin",
                  url: "https://www.linkedin.com/in/utkarsh-verma-8965a7246/",
                },
              ].map(({ linkTitle, url }) => (
                <Flex key={url} gap={8}>
                  <Input
                    style={{ maxWidth: 150 }}
                    placeholder="Link Title"
                    value={linkTitle}
                  />
                  <Input placeholder="URL" value={url} />
                </Flex>
              ))}
              <Button style={{ width: "fit-content" }} type="text" icon={<PlusOutlined />}>
                Add Link
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </>
  );
}
