import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Backlog = ({ setAuth, isAuthenticated }) => {
  const [backlog, setBacklog] = useState([]);

  const getBacklog = async () => {
    try {
      const response = await fetch("http://localhost:5000/backlog", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const backlog = await response.json();
      setBacklog(backlog);
      console.log("the response is ", backlog);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onRemoveBacklog = async (e) => {
    e.preventDefault(e);
    try {
      const gameToRemove = {
        user_id: backlog.user_id,
        game_id: backlog.game_id,
      };
      console.log("the body is: ", gameToRemove);
      const response = await fetch("http://localhost:5000/backlog/delete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(gameToRemove),
      });
      console.log("the response is: ", response);
      toast.success(`${backlog.game_name} was removed from your backlog!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getBacklog();
  }, []);

  return (
    <div className="backlogDiv">
      <h2>my backlog</h2>
      {!!backlog.length ? (
        <>
          <ul>
            {backlog.map((game, index) => (
              <>
                <li key={index}>
                  <Link to={`/details/${game.game_id}`}>
                    <img
                      alt={`${game.game_id}`}
                      width="150px"
                      height="100px"
                      src={game.game_image}
                    ></img>
                    {game.game_name}
                  </Link>
                  , added: {game.date_added.substring(0, 10)}
                </li>
                <button onClick={onRemoveBacklog} className="delete-game">
                  Remove
                </button>
              </>
            ))}
          </ul>
          Total games in backlog: {backlog.length}
        </>
      ) : (
        <p>You haven't added any games to your backlog yet!</p>
      )}
    </div>
  );
};

export default Backlog;
