import React, { useEffect } from "react";
import Login from "./login/Login";
import { getTokenFromUrl } from "./login/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "../player/Player";
import { useDataLayerValue } from "../contextApi/DataLayer";

const spotify = new SpotifyWebApi();

function Signin() {
  const [{ user }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("3qDMWt2VzjfuAhfr43lfWI")
      .then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
      

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    }
  }, [user, dispatch]);

  return (
    <div className="signin">
      {user ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default Signin;
