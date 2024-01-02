import { API_URL } from "@/config/api.routes";
import { useCreatePlaylistModal } from "@/context/Other/CreatePlaylistModalProvider";
import { useMessageAPI } from "@/context/Other/MessageProvider";
import { Flex, Input, Modal, Switch, Typography } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

export default function CreatePlaylistModal() {
  // Message API
  const { success, error } = useMessageAPI();
  const [isLoading, setIsLoading] = useState(false);

  const { open, closeModal } = useCreatePlaylistModal();

  // form submit
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      isPrivate: true,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      if (values.title === null || values.title.trim() === "")
        return error(`Title is Required`);
      try {
        const url = `${API_URL}/playlist`;
        const { data } = await axios.post(url, values, {
          withCredentials: true,
        });
        console.log(data);
        resetForm();
        closeModal();
        success("Playlist Created");
      } catch (error) {
        console.log(error);
        error("Couldn't create playlist");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Modal
      title="Create Playlist"
      centered
      open={open}
      onCancel={closeModal}
      okText="Create"
      onOk={handleSubmit}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      width={500}
    >
      <Flex vertical gap={8}>
        <Flex align="center" gap={8}>
          <Typography.Text style={{ fontSize: 16 }} type="secondary">
            Private:{" "}
          </Typography.Text>
          <Switch
            onChange={(checked) => setFieldValue("isPrivate", checked)}
            checked={values.isPrivate}
            // size="small"
            style={{ maxWidth: "max-content" }}
          />
        </Flex>

        <Input
          name="title"
          value={values.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <Input.TextArea
          name="desc"
          value={values.desc}
          placeholder="Description"
          onChange={handleChange}
          style={{ height: 120 }}
        />
      </Flex>
    </Modal>
  );
}
