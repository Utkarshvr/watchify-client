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

  console.log(vertical);

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
      {playlists?.map((playlist) => (
        <Col
          key={playlist?._id}
          className="gutter-row"
          span={vertical ? 24 : 6}
          style={{ marginBottom: 16 }}
          xs={24}
          sm={12}
          md={8}
          lg={6}
        >
          <PlaylistCard playlist={playlist} />
        </Col>
      ))}
    </Row>
  );
}
