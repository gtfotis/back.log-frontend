import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../App.css";
import Search from "./Search";

const GameDetails = ({ setAuth, isAuthenticated }) => {
  const { game_slug } = useParams();
  const [game, setGame] = useState(null);

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
              <p>Rating: {game.rating}</p>
              {!!game.metacritic ? (
                <p>Metacritic Score: {game.metacritic}</p>
              ) : (
                ""
              )}
              {!!game.genre ? <p>Genre: {game.genre}</p> : ""}
              <p>Released: {game.released}</p>
              {game.developers.map((developer, index) => (
                <p key={index}>{developer.name}</p>
              ))}
              {!!isAuthenticated ? (
                ""
              ) : (
                <div className="addButtons">
                  <button className="btn btn-secondary btn-block btn-sm">
                    Add to Backlog
                  </button>
                  <button className="btn btn-secondary btn-block btn-sm">
                    Add to Favorites
                  </button>
                </div>
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
