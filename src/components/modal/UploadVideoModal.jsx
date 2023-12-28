import { Button, Flex, Image, Input, Modal, Typography, Upload } from "antd";
import { useModal } from "@/context/Other/ModalProvider";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { API_URL } from "@/config/api.routes";
import axios from "axios";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import { useEffect, useState } from "react";
import { useMessageAPI } from "@/context/Other/MessageProvider";

function createVideoFormData(values) {
  const formData = new FormData();

  // Append fields to formData
  for (const field in values) {
    if (typeof values[field] === "object") {
      console.log(field, values[field]);
      formData.append(field, values[field]?.file);
    } else {
      // For non-array fields, append directly
      formData.append(field, values[field]);
    }
  }
  return formData;
}

const UploadVideoModal = () => {
  const { open, closeModal } = useModal();
  const [isUploading, setIsUploading] = useState(false);

  const user = useAuthUser();
  const { success } = useMessageAPI();

  // form submit
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      creator: user?._id,

      title: "",
      desc: "",

      video: { file: null, src: "" },
      thumbnail: { file: null, src: "" },

      isPublic: true,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsUploading(true);
      try {
        const formData = createVideoFormData(values);

        const url = `${API_URL}/video/create`;
        const { data } = await axios.post(url, formData);
        console.log(data);
        resetForm();
        closeModal();
        success("Video Uploaded Succesfully");
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    },
  });

  useEffect(() => {
    if (user) setFieldValue("creator", user?._id);
  }, [user?._id]);

  const removeThumbnail = () => {
    setFieldValue("thumbnail.file", null);
    setFieldValue("thumbnail.src", "");
  };

  const addThumbnail = (info) => {
    setFieldValue(
      "thumbnail.file",
      info.fileList[info.fileList.length - 1].originFileObj
    );
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue("thumbnail.src", reader.result);
    };
    reader.readAsDataURL(info.fileList[info.fileList.length - 1].originFileObj);
  };

  const removeVideo = () => {
    setFieldValue("video.file", null);
    setFieldValue("video.src", "");
  };

  const addVideo = (info) => {
    setFieldValue(
      "video.file",
      info.fileList[info.fileList.length - 1].originFileObj
    );
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue("video.src", reader.result);
    };
    reader.readAsDataURL(info.fileList[info.fileList.length - 1].originFileObj);
  };

  return (
    <>
      <Modal
        title="Upload Video"
        centered
        open={open}
        okText={"Upload"}
        onOk={handleSubmit}
        okButtonProps={{
          loading: isUploading,
          //   disabled: isUploading,
        }}
        onCancel={closeModal}
        width={1000}
      >
        <Flex vertical gap={16}>
          <Input
            placeholder="Title"
            value={values?.title}
            onChange={handleChange}
            name="title"
          />
          <TextArea
            placeholder="Description"
            value={values?.desc}
            onChange={handleChange}
            name="desc"
            style={{ height: 100 }}
          />

          <Flex align="center" gap={8}>
            <Flex
              style={{ width: "50%" }}
              justify="center"
              align="center"
              gap={8}
            >
              <Flex vertical align="center" gap={2}>
                {values?.thumbnail?.src ? (
                  <>
                    <Image
                      src={values?.thumbnail?.src}
                      referrerPolicy="no-referrer"
                      style={{ width: "100%" }}
                      height={180}
                    />

                    <Button onClick={removeThumbnail} type="text" danger>
                      Remove
                    </Button>
                  </>
                ) : (
                  <Upload
                    beforeUpload={() => {
                      // Prevent default upload behavior
                      return false;
                    }}
                    onChange={addThumbnail}
                    accept="image/*"
                    showUploadList={false}
                    style={{ width: "100%" }}
                  >
                    <Button
                      type="dashed"
                      style={{
                        height: "100%",
                        width: "350px",
                        padding: "2em 4em",
                      }}
                    >
                      <Flex align="center" justify="center" vertical gap={8}>
                        <UploadOutlined size={28} />
                        <Typography.Text type="secondary">
                          Upload Thumbnail
                        </Typography.Text>
                      </Flex>
                    </Button>
                  </Upload>
                )}
              </Flex>
            </Flex>
            <Flex
              style={{ width: "50%" }}
              align="center"
              justify="center"
              gap={8}
            >
              {" "}
              <Flex vertical align="center" gap={2}>
                {values?.video?.src ? (
                  <>
                    <video
                      src={values?.video?.src}
                      style={{ width: "100%" }}
                      height={200}
                      autoPlay
                      controls
                      loop
                    />

                    <Button onClick={removeVideo} type="text" danger>
                      Remove
                    </Button>
                  </>
                ) : (
                  <Upload
                    beforeUpload={() => {
                      // Prevent default upload behavior
                      return false;
                    }}
                    onChange={addVideo}
                    accept="video/*"
                    showUploadList={false}
                    style={{ width: "100%" }}
                  >
                    <Button
                      type="dashed"
                      style={{
                        height: "100%",
                        width: "350px",
                        padding: "2em 4em",
                      }}
                    >
                      <Flex align="center" justify="center" vertical gap={8}>
                        <UploadOutlined size={28} />
                        <Typography.Text type="secondary">
                          Upload Video
                        </Typography.Text>
                      </Flex>
                    </Button>
                  </Upload>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default UploadVideoModal;
