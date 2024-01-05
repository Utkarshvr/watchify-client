import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input, Modal, Typography } from "antd";
import { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ButtonStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  alignItems: "center",
};

export default function ShareModal({ open, closeModal }) {
  const [isCopied, setIsCopied] = useState(false);
  const url = location.href;

  return (
    <Modal
      title="Share Video"
      centered
      open={open}
      okButtonProps={{
        style: { display: "none" },
      }}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      onCancel={closeModal}
    >
      <Flex style={{ padding: 8 }} gap={8} vertical align="center">
        <Flex gap={16} align="center">
          <WhatsappShareButton style={ButtonStyle} url={url}>
            <WhatsappIcon size={48} style={{ borderRadius: "100%" }} />
            <Typography.Text strong style={{ fontSize: 12 }} type="secondary">
              Whatsapp
            </Typography.Text>
          </WhatsappShareButton>
          <EmailShareButton style={ButtonStyle} url={url}>
            <EmailIcon size={48} style={{ borderRadius: "100%" }} />
            <Typography.Text strong style={{ fontSize: 12 }} type="secondary">
              Mail
            </Typography.Text>
          </EmailShareButton>
          <FacebookShareButton style={ButtonStyle} url={url}>
            <FacebookIcon size={48} style={{ borderRadius: "100%" }} />
            <Typography.Text strong style={{ fontSize: 12 }} type="secondary">
              Facebook
            </Typography.Text>
          </FacebookShareButton>
          <TwitterShareButton style={ButtonStyle} url={url}>
            <TwitterIcon size={48} style={{ borderRadius: "100%" }} />
            <Typography.Text strong style={{ fontSize: 12 }} type="secondary">
              Twitter
            </Typography.Text>
          </TwitterShareButton>
          <LinkedinShareButton style={ButtonStyle} url={url}>
            <LinkedinIcon size={48} style={{ borderRadius: "100%" }} />
            <Typography.Text strong style={{ fontSize: 12 }} type="secondary">
              LinkedIn
            </Typography.Text>
          </LinkedinShareButton>
        </Flex>
        <Divider />

        <Input
          value={url}
          readOnly
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
                navigator.clipboard.writeText(url);
                setIsCopied(true);

                // Reset the "Copied" state after a short delay
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}
            />
          }
        />
      </Flex>
    </Modal>
  );
}
