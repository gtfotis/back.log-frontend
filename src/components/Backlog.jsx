import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
const Backlog = ({ setAuth }) => {
  const [backlog, setBacklog] = useState([]);

  const getBacklog = async () => {
    try {
      const response = await fetch("http://localhost:5000/backlog", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      console.log("backlog token is: ", localStorage.token);
      const backlog = await response.json();
      // console.log("backlog response: ", backlog);
      setBacklog(backlog);
    } catch (err) {
      console.error(err.message);
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
              <li key={index}>
                <Link to={`/details/${game.game_id}`}>{game.game_id}</Link>,
                added: {game.date_added}
              </li>
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
