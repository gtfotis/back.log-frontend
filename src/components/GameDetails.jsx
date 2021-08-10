import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../App.css";
import GetScreenshots from "./GetScreenshots";

const GameDetails = ({ setAuth, isAuthenticated }) => {
  const { game_slug } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const url = `https://api.rawg.io/api/games/${game_slug}?key=${api_key}`;
      const game = await fetch(url).then((res) => res.json());
      setGame(game);
    })();
  }, [setGame, game_slug]);

  const [user_id, setID] = useState("");
  async function getID() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setID(parseRes.user_id);
      console.log("the parse res is:, ", parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getID();
  }, []);

  var pad = function (num) {
    return ("00" + num).slice(-2);
  };
  var date;
  date = new Date();
  date =
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    " " +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds());

  const onSubmitBacklog = async (e) => {
    e.preventDefault();
    try {
      const body = {
        game_id: game.id,
        user_id: user_id,
        date: date,
        game_name: game.name,
        game_image: game.background_image_additional,
      };
      const response = await fetch("http://localhost:5000/backlog", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      toast.success(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onRemoveBacklog = async (e) => {
    e.preventDefault(e);
    try {
      const gameToRemove = {
        user_id: user_id,
        game_id: game.id,
      };
      const response = await fetch("http://localhost:5000/backlog/delete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(gameToRemove),
      });
      console.log("the response is: ", response);
      toast.success(`${game.name} was removed from your backlog!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {!!game ? (
        <>
          <div
            style={{ backgroundImage: `url('${game.background_image}')` }}
            className="backGroundOverlay"
          >
            <div className="gameDetails">
              <p>{game.name}</p>
              <GetScreenshots />
              <p>Rating: {game.rating}</p>
              {!!game.metacritic ? (
                <p>
                  Metacritic Score:{" "}
                  <a alt="metacritic link" href={`${game.metacritic_url}`}>
                    {game.metacritic}
                  </a>
                </p>
              ) : (
                ""
              )}
              {!!game.genre ? <p>Genre: {game.genre}</p> : ""}
              <p>
                Released: {game.released !== null ? `${game.released}` : "TBA"}
              </p>{" "}
              {game.developers > 0 ? (
                <p>Developed by: {game.developers[0].name}</p>
              ) : (
                ""
              )}
              {game.website !== "" ? (
                <p>
                  <a href={`${game.website}`}>Website</a>
                </p>
              ) : (
                ""
              )}
              {!!isAuthenticated ? (
                <div className="addButtons">
                  <button
                    onClick={onSubmitBacklog}
                    className="btn btn-secondary btn-block btn-sm"
                  >
                    Add to Backlog
                  </button>{" "}
                  <button
                    onClick={onRemoveBacklog}
                    className="btn btn-secondary btn-block btn-sm"
                  >
                    Remove from Backlog
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Getting game data...</p>
      )}
    </>
  );
};

export default GameDetails;
