import gmailIcon from "@/assets/images/gmail.png";
import { Button, Image } from "antd";
import { googleAuth } from "@/helpers/GoogleAuth";
import { GoogleOutlined } from "@ant-design/icons";

export default function GoogleSignupBtn() {
  return (
    <Button
      onClick={googleAuth}
      // icon={<Image preview={false} src={gmailIcon} width={18} />}
      icon={<GoogleOutlined size={18} />}
      shape="round"
      type="default"
    >
      Login
    </Button>
  );
}
