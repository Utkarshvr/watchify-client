import {
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Modal,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useModal } from "@/context/Other/ModalProvider";
import { useFormik } from "formik";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import { useEffect, useState } from "react";
import { useMessageAPI } from "@/context/Other/MessageProvider";
import { createVideo, getUsersPlaylists } from "@/api/apiCalls";
import { useCreatePlaylistModal } from "@/context/Other/CreatePlaylistModalProvider";
import SelectPlaylist from "../input/select/SelectPlaylist";

function createVideoFormData(values) {
  const formData = new FormData();

  // Append fields to formData
  for (const field in values) {
    console.log(
      typeof values[field],

      "isArray: ",
      Array.isArray(values[field])
    );

    if (Array.isArray(values[field])) {
      console.log("ARRAYY!!!!");
      console.log(values[field]);
      values[field].forEach((playlistID, index) => {
        console.log(`${field}[${index}]`, playlistID);
        formData.append(`${field}[${index}]`, playlistID);
      });
    } else if (typeof values[field] === "object") {
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

      selectedPlaylists: [],

      isPublic: true,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsUploading(true);
      closeModal();

      try {
        const formData = createVideoFormData(values);

        const data = await createVideo(formData);

        console.log(data);
        resetForm();
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

  // User's PLaylist

  // Playlist Modal API
  const {
    showModal: showPlaylistCreationModal,
    open: openPlaylistCreationModal,
  } = useCreatePlaylistModal();

  // Get user's all playlists
  const [playlists, setPlaylists] = useState([]);
  // const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await getUsersPlaylists();

        const playlistsExcludingDefault = data?.playlists?.filter(
          (list) => !list?.isDefault
        );

        setPlaylists(playlistsExcludingDefault || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [openPlaylistCreationModal]);

  const onPlaylistSelection = (selectedArray) => {
    // setSelectedPlaylists(selectedArray);
    setFieldValue("selectedPlaylists", selectedArray);
  };

  const screens = Grid.useBreakpoint();
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
        <Flex gap={16} vertical={!screens.md}>
          <Flex flex={0.6} vertical gap={16}>
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
              <Typography.Text style={{ fontSize: 16 }} type="secondary">
                Public:{" "}
              </Typography.Text>
              <Switch
                onChange={(checked) => setFieldValue("isPublic", checked)}
                checked={values.isPublic}
                // size="small"
                style={{ maxWidth: "max-content" }}
              />
            </Flex>
            <Flex vertical gap={4}>
              <SelectPlaylist
                allPlaylists={playlists}
                loading={isLoading}
                selectedPlaylists={values.selectedPlaylists}
                onPlaylistSelection={onPlaylistSelection}
              />
              <Button
                icon={<PlusCircleOutlined />}
                style={{ maxWidth: "max-content" }}
                onClick={showPlaylistCreationModal}
                type="text"
              >
                Create New Playlist
              </Button>
            </Flex>
          </Flex>

          <Flex flex={0.4} align="center" vertical gap={8}>
            <Flex
              // style={{ width: "50%" }}
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
                      style={{ maxWidth: 360 }}
                      // height={200}
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
                    style={{ maxWidth: 360 }}
                  >
                    <Button
                      type="dashed"
                      style={{
                        height: "100%",
                        width: !screens.md ? 250 : "350px",
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
              // style={{ width: "50%" }}
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
                      style={{ maxWidth: 360 }}
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
                        width: !screens.md ? 250 : "350px",
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
