import { Button, Flex, Grid, Image, Typography } from "antd";
import LayoutMockup from "@/assets/images/Layout-Mockup.png";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import ScreenTitle from "@/components/ui/ScreenTitle";

export default function BrandingScreen() {
  const screens = Grid.useBreakpoint();

  const user = useAuthUser();

  return (
    <>
      <Flex vertical gap={32}>
        <Flex vertical gap={16}>
          <ScreenTitle
            title={"Picture"}
            content={`Your profile picture will appear where your channel is presented on Watchify, like next to your videos and comments`}
          />
          <Flex vertical={screens.xs ? true : false} gap={16}>
            <Flex
              justify="center"
              align="center"
              style={{
                maxWidth: 300,
                padding: "2em 6em",
                background: "rgb(37,37,37)",
              }}
            >
              <Image
                src={user?.picture}
                referrerpolicy="no-referrer"
                width={140}
                style={{ borderRadius: "100%" }}
              />
            </Flex>
            <Flex vertical justify="center" gap={16}>
              <Typography.Text type="secondary">
                It’s recommended to use a picture that’s at least 98 x 98 pixels
                and 4MB or less. Use a PNG or GIF (no animations) file. Make
                sure your picture follows the Community Guidelines.
              </Typography.Text>
              <Flex gap={16}>
                <Button>Change</Button>
                <Button>Remove</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex vertical gap={16}>
          <ScreenTitle
            title={"Banner Image"}
            content={`This image will appear across the top of your channel`}
          />
          <Flex vertical={screens.xs ? true : false} gap={16}>
            <Flex
              justify="center"
              align="center"
              style={{
                width: 300,
                height: 200,
                padding: "1em",
                background: "rgb(37,37,37)",
              }}
            >
              <Image
                referrerpolicy="no-referrer"
                src={LayoutMockup}
                width={300}
              />
            </Flex>
            <Flex vertical justify="center" gap={16}>
              <Typography.Text type="secondary">
                For the best results on all devices, use an image that’s at
                least 2048 x 1152 pixels and 6MB or less.
              </Typography.Text>
              <Flex gap={16}>
                <Button>Upload</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
