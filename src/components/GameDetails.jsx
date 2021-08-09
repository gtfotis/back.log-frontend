import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../App.css";
import GetScreenshots from "./GetScreenshots";

const GameDetails = ({ setAuth, isAuthenticated }) => {
  const { game_slug } = useParams();
  const [game, setGame] = useState(null);
  console.log("authentication is: ", isAuthenticated);
  useEffect(() => {
    (async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const url = `https://api.rawg.io/api/games/${game_slug}?key=${api_key}`;
      const game = await fetch(url).then((res) => res.json());
      setGame(game);
      console.log("the response is: ", game);
      console.log("background image: ", game.background_image);
    })();
  }, [setGame, game_slug]);

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
        user_id: "e5daae2d-cfa2-49ac-a9f6-203ec4a9d783",
        date: date,
        game_name: game.name,
        game_image: game.background_image_additional,
      };
      console.log("the body is: ", body);
      const response = await fetch("http://localhost:5000/backlog", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("the response is: ", response);
    } catch (err) {
      toast.error("This game is already in your backlog!");
      console.error(err.message);
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
                <p>Metacritic Score: {game.metacritic}</p>
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
