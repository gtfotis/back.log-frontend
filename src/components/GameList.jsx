import { useEffect, useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import GameDetails from "./GameDetails";
import "../App.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const games = await _fetchData();
      setGames(games);
    })();
  }, [setGames]);

  function randomPage(min, max) {
    min = Math.ceil(1);
    max = Math.floor(29622);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const _fetchData = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${api_key}&page=${randomPage()}`;
    const res = await fetch(url).then((res) => res.json());
    console.log("response from API is: ", res.results);
    return res.results;
  };

  return (
    <>
      {!!games.length ? (
        <>
          <div className="games">
            <Route exact path="/">
              <ul>
                {games.map((game, index) => (
                  <li key={index}>
                    <Link to={`/${game.slug}`}>{game.name}</Link>
                  </li>
                ))}
              </ul>
            </Route>
            <Route path="/:game_slug">
              <GameDetails />
              <button onClick={() => history.goBack()}>Back</button>
            </Route>
          </div>
        </>
      ) : (
        <p>Loading game list...</p>
      )}
    </>
  );
};

export default GameList;
