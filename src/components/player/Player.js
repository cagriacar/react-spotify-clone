import React from 'react'
import "./style/Player.css";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";

function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
  }
export default Player;
