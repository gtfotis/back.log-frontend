import { Link } from "react-router-dom";
import GameList from "./GameList";

const Home = () => {
  return (
    <>
      <GameList />
      <div className="explore">
        Does your game stack tend to overflow? We've got you covered on your
        backlog.
      </div>
    </>
  );
};

export default Home;
