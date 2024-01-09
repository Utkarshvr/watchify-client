import useModal from "antd/es/modal/useModal";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function UploadVideoBtn({ isUsedInMenu }) {
  const { showModal } = useModal();

  if (isUsedInMenu) return <div onClick={showModal}>Upload</div>;
  return (
    <Button icon={<UploadOutlined />} onClick={showModal} type="primary">
      Upload
    </Button>
  );
}
