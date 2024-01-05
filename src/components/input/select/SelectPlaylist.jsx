import { Select, Space } from "antd";
import { useEffect, useState } from "react";

const SelectPlaylist = ({
  allPlaylists,
  selectedPlaylists,
  defaultValue,
  onPlaylistSelection,
  loading,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (allPlaylists?.length > 0)
      setOptions(
        allPlaylists?.map((playlist) => ({
          label: playlist?.title,
          value: playlist?._id,
        }))
      );
  }, [allPlaylists]);

  return (
    <Space
      style={{
        width: "100%",
      }}
      direction="vertical"
    >
      <Select
        mode="multiple"
        allowClear
        style={{
          width: "100%",
        }}
        loading={loading}
        placeholder="Select any Playlist(s)"
        defaultValue={defaultValue || []}
        value={selectedPlaylists}
        onChange={onPlaylistSelection}
        options={options}
      />
    </Space>
  );
};
export default SelectPlaylist;
