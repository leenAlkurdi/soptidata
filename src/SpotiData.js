import React from "react";

const SpotiData = () => {
  const [data, setData] = useState([]);

  let test = [
    {
      _id: { $oid: "65b0306e4146088749465e39" },
      ts: "2020-06-01T15:02:59Z",
      ms_played: 224718,
      master_metadata_track_name: "Antidote",
      master_metadata_album_artist_name: "Travis Scott",
      master_metadata_album_album_name: "Rodeo",
      episode_name: null,
      episode_show_name: null,
      reason_start: "clickrow",
      reason_end: "fwdbtn",
      shuffle: true,
      skipped: null,
    },
    {
      _id: { $oid: "65b0306e4146088749465e3a" },
      ts: "2020-06-01T15:05:41Z",
      ms_played: 163053,
      master_metadata_track_name: "Rozzi",
      master_metadata_album_artist_name: "Paky",
      master_metadata_album_album_name: "Rozzi",
      episode_name: null,
      episode_show_name: null,
      reason_start: "fwdbtn",
      reason_end: "trackdone",
      shuffle: true,
      skipped: null,
    },
  ];

  const getData = () => {
    fetch("/spotify_data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>SpotiData</div>;
};

export default SpotiData;
