import { Button, Flex, Grid, Image, Typography, message } from "antd";
import LayoutMockup from "@/assets/images/Layout-Mockup.png";
import UserPic from "@/assets/images/user-pic.jpg";
import ScreenTitle from "@/components/ui/ScreenTitle";
import {
  useCustomizationAPI,
  useCustomizationForm,
} from "@/context/Form/CustomizationFormContext";
import UploadBtn from "@/components/button/UploadBtn";

export default function BrandingScreen() {
  const screens = Grid.useBreakpoint();

  const values = useCustomizationForm();
  const api = useCustomizationAPI();

  const removePicture = (field_name) => {
    api.setFieldValue(`branding.${field_name}.file`, null);
    api.setFieldValue(`branding.${field_name}.src`, "");
  };

  const uploadImg = (field_name, info) => {
    // Display preview of the first uploaded image
    if (info.fileList.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        api.setFieldValue(`branding.${field_name}.src`, reader.result);
      };
      reader.readAsDataURL(
        info.fileList[info.fileList.length - 1].originFileObj
      );
      api.setFieldValue(`branding.${field_name}.file`, info.file.originFileObj);
    }
  };

  console.log(values);

  return (
    <>
      <Flex style={{ maxWidth: "800px" }} vertical gap={32}>
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
                width: 400,
                padding: "2em 6em",
                background: "rgb(37,37,37)",
              }}
            >
              <Image
                src={values?.branding?.user_picture?.src || UserPic}
                referrerPolicy="no-referrer"
                width={160}
                height={160}
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
                {values?.branding?.user_picture?.src ? (
                  <>
                    <UploadBtn
                      title={"Change"}
                      uploadImg={uploadImg}
                      field_name={"user_picture"}
                      roundCrop
                    />
                    <Button onClick={() => removePicture("user_picture")}>
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <UploadBtn
                      title={"Upload"}
                      uploadImg={uploadImg}
                      field_name={"user_picture"}
                      roundCrop
                    />
                  </>
                )}
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
                width: 400,
                height: 200,
                padding: "1em",
                background: "rgb(37,37,37)",
              }}
            >
              <Image
                referrerPolicy="no-referrer"
                src={
                  values?.branding?.banner_image?.src === ""
                    ? LayoutMockup
                    : values?.branding?.banner_image?.src
                }
                width={300}
              />
            </Flex>
            <Flex vertical justify="center" gap={16}>
              <Typography.Text type="secondary">
                For the best results on all devices, use an image that’s at
                least 2048 x 1152 pixels and 6MB or less.
              </Typography.Text>
              <Flex gap={16}>
                {values?.branding?.banner_image?.src ? (
                  <>
                    <UploadBtn
                      title={"Change"}
                      uploadImg={uploadImg}
                      field_name={"banner_image"}
                    />
                    <Button onClick={() => removePicture("banner_image")}>
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <UploadBtn
                      title={"Upload"}
                      uploadImg={uploadImg}
                      field_name={"banner_image"}
                    />
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
