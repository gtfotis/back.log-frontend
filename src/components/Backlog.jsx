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
    } catch (err) {
      console.error(err.message);
    }
  };

  const onRemoveBacklog = async (e) => {
    e.preventDefault();
    try {
      const gameToRemove = {
        user_id: backlog[0].user_id,
        game_id: backlog[0].game_id,
      };
      console.log("the body is: ", gameToRemove);
      const response = await fetch("http://localhost:5000/backlog/delete", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(gameToRemove),
      });
      const parseRes = response.json();
      toast.success(parseRes);
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getBacklog();
  }, []);

  return (
    <>
      <div className="explore">Total games in backlog: {backlog.length}</div>
      <div className="backlogstuff ">
        <div className="row">
          {!!backlog.length ? (
            <>
              {backlog.map((game, index) => (
                <>
                  <div className="card  col-6 col-sm-3" width="18rem">
                    <Link to={`/details/${game.game_id}`}>
                      <img
                        className="card-img-top"
                        src={`${game.game_image}`}
                        alt={`${game.game_name}`}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{game.game_name}</h5>
                      <p className="card-text">
                        added: {game.date_added.substring(0, 10)}
                      </p>
                      <button
                        type="submit"
                        onClick={onRemoveBacklog}
                        className="btn btn-secondary"
                      >
                        Remove from backlog
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="backlogDiv">
              You haven't added any games to your backlog yet!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Backlog;
