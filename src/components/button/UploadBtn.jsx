import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

export default function UploadBtn({ uploadImg, title, field_name, roundCrop }) {
  return (
    <ImgCrop
      rotationSider
      cropShape={roundCrop ? "round" : "rect"}
      aspect={roundCrop ? 90 / 90 : 2048 / 1152}
      showReset
    >
      <Upload
        beforeUpload={() => {
          // Prevent default upload behavior
          return false;
        }}
        onChange={(info) => uploadImg(field_name, info)}
        accept="image/*"
        showUploadList={false}
      >
        <Button>{title}</Button>
      </Upload>
    </ImgCrop>
  );
}
