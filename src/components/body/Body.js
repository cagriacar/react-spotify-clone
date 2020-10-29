import React from 'react'
import './style/Body.css'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Header from '../header/Header'
import { useDataLayerValue } from '../contextApi/DataLayer';
import SongRow from "./SongRow";

function Body({spotify}) {
  

  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:3qDMWt2VzjfuAhfr43lfWI`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };
  
  return (
    <div className="body">
    <Header spotify={spotify} />

    <div className="body__info">
      <img src={discover_weekly?.images[0].url} alt="" />
      <div className="body__infoText">
        <strong>Çalma Listesi</strong>
        <h2>Haftalık Keşif</h2>
        <p>{discover_weekly?.description}</p>
      </div>
    </div>

    <div className="body__songs">
      <div className="body__icons">
        <PlayCircleFilledIcon
          className="body__shuffle"
          onClick={playPlaylist}
        />
        <FavoriteIcon fontSize="large" />
        <MoreHorizIcon />
      </div>

      {discover_weekly?.tracks.items.map((item) => (
        <SongRow key={item.track.id} playSong={playSong} track={item.track} />
       
      ))}
    </div>
  </div>
  )
}

export default Body
