import { Link } from "react-router-dom";
import GameList from "./GameList";

const Home = () => {
  return (
    <>
      <GameList />
      <div className="explore">Stuff</div>
      <div className="explore">More stuff</div>
    </>
  );
};

export default Home;
