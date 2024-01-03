import { addVideoToPlaylist, getUsersPlaylists } from "@/api/apiCalls";
import { useCreatePlaylistModal } from "@/context/Other/CreatePlaylistModalProvider";
import { useMessageAPI } from "@/context/Other/MessageProvider";
import { PlusOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, Table } from "antd";
import { useEffect, useState } from "react";

export default function SaveToPlaylistModal({ open, closeModal, video_uuid }) {
  // States
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Message API
  const { success } = useMessageAPI();

  // Playlist Modal API
  const {
    showModal: showPlaylistCreationModal,
    open: openPlaylistCreationModal,
  } = useCreatePlaylistModal();

  // Get user's all playlists
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUsersPlaylists();

        const playlistsExcludingLikedVideos = data?.playlists?.filter(
          (list) => list?.title !== "Liked Videos"
        );

        setPlaylists(playlistsExcludingLikedVideos);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [openPlaylistCreationModal, selectedRowKeys]);

  useEffect(() => {
    const playlistsContainingGivenVideo = playlists
      ?.map((playlist) =>
        playlist?.videos?.some((video) => video?._id?.toString() === video_uuid)
          ? playlist?._id
          : null
      )
      ?.filter(Boolean);

    setSelectedRowKeys(playlistsContainingGivenVideo);
    // setInitialSelectedRowKeys(playlistsContainingGivenVideo);
  }, [playlists]);

  const onSelect = async (record, selected, selectedRows) => {
    const playlistID = record?.key;
    setIsLoading(true);
    try {
      const { data } = await addVideoToPlaylist(video_uuid, playlistID);
      // console.log(data?.message);
      success(data?.message);
      console.log(data);

      setSelectedRowKeys(selectedRows?.map((e) => e.key));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onSelect,
  };

  // data source
  const dataSource = playlists.map((playlist) => ({
    key: playlist?._id,
    title: playlist?.title,
    videos: playlist?.videos?.length,
    visibility: playlist?.isPrivate ? <LockOutlined /> : <UnlockOutlined />,
  }));

  return (
    <Modal
      title="Save video to..."
      centered
      open={open}
      onCancel={closeModal}
      footer={
        <Flex justify="space-between" align="center">
          <Button
            onClick={showPlaylistCreationModal}
            type="default"
            icon={<PlusOutlined />}
          >
            Create new playlist
          </Button>
        </Flex>
      }
      width={400}
    >
      <Flex style={{ paddingTop: 16, paddingBottom: 16, width: "100%" }}>
        <Table
          style={{ width: "100%", borderRadius: 100 }}
          // rowSelection={rowSelection}
          rowSelection={rowSelection}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Videos",
              dataIndex: "videos",
              align: "center",
            },
            {
              title: "Visibility",
              dataIndex: "visibility",
              align: "center",
            },
          ]}
          dataSource={dataSource}
          // showHeader={false}
          loading={isLoading}
          pagination={{ style: { display: "none" } }}
        />
      </Flex>
    </Modal>
  );
}
