import { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import GameDetails from "./GameDetails";
import "../App.css";

const GameList = () => {
  const [games, setGames] = useState([]);

  function randomPage(min, max) {
    min = Math.ceil(1);
    max = Math.floor(10);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const _fetchData = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${api_key}&page=${randomPage()}&ordering=-rating`;
    const res = await fetch(url).then((res) => res.json());
    console.log("response from API is: ", res.results);
    return res.results;
  };

  useEffect(() => {
    (async () => {
      const games = await _fetchData();
      setGames(games);
    })();
  }, []);

  return (
    <>
      {!!games.length ? (
        <>
          <div className="explore">
            <h2>Top rated games</h2>
            <ul>
              {games.map((game, index) => (
                <>
                  <li key={index}>
                    <Link to={`/details/${game.slug}`}>{game.name}</Link>
                  </li>
                  <Route exact path={`/details/${game.slug}`}>
                    <GameDetails />
                  </Route>
                </>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading game list...</p>
      )}
    </>
  );
};

export default GameList;
