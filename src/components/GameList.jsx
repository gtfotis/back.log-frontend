import { useEffect, useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";
// import GamePage from "/GamePage";
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

  const _fetchData = async () => {
    const url =
      "https://api.rawg.io/api/games?key=a2ca04aa98be4f3eb27685b04c96df2b&page=1";
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
              {/* <GamePage /> */}
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
