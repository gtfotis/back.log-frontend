import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

const GameDetails = () => {
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
        <div
          style={{ backgroundImage: `url('${game.background_image}')` }}
          className="backGroundOverlay"
        >
          <div className="gameDetails">
            <p>{game.name}</p>
            <p>Rating: {game.rating}</p>
            <p>Metacritic Score: {game.metacritic}</p>
            {/* {!!game.genres.length || game.genres.length !== undefined ? (
            <p>{game.genres[0].name}</p>
          ) : (
            ""
          )} */}
            <p>{game.description_raw}</p>

            <p>
              {game.developers.map((developer, index) => (
                <p key={index}>{developer.name}</p>
              ))}
            </p>
            <p>{game.name}</p>
          </div>
        </div>
      ) : (
        <p>Getting game data...</p>
      )}
    </>
  );
};

export default GameDetails;
