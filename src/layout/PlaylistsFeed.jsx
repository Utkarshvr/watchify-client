import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/api.routes";
import PlaylistCard from "@/components/cards/PlaylistCard";

export default function PlaylistsFeed({ channelID, vertical }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      if (channelID) {
        try {
          const { data } = await axios.get(
            `${API_URL}/channel/${channelID}/playlists`,
            { withCredentials: true }
          );
          setPlaylists(data?.playlists);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [channelID]);

  console.log({ playlists });

  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      style={{ margin: 0 }}
    >
      <Col className="gutter-row" span={vertical ? 24 : 8}>
        {playlists?.map((playlist) => (
          <PlaylistCard key={playlist?._id} playlist={playlist} />
        ))}
      </Col>
    </Row>
  );
}
